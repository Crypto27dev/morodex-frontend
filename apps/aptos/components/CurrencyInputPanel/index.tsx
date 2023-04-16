import { useMemo } from 'react'
import { Currency, CurrencyAmount, Percent } from '@pancakeswap/aptos-swap-sdk'
import { useAccount, useAccountBalance } from '@pancakeswap/awgmi'
import { useIsMounted } from '@pancakeswap/hooks'
import { useCurrencyBalance } from 'hooks/Balances'
import { useTranslation } from '@pancakeswap/localization'
import { AtomBox } from '@pancakeswap/ui'
import { Button, ChevronDownIcon, CopyButton, SkeletonV2, Swap as SwapUI, Text, useModal } from '@pancakeswap/uikit'
import { CoinRegisterButton } from 'components/CoinRegisterButton'
import { CurrencyLogo } from 'components/Logo'
import CurrencySearchModal from 'components/SearchModal/CurrencySearchModal'
import styled from 'styled-components'
import { BridgeButton } from 'components/Swap/BridgeButton'
import useBridgeInfo from 'components/Swap/hooks/useBridgeInfo'

type Props = {
  id: string
  value: string
  onUserInput: (value: string) => void
  onInputBlur?: () => void
  currency?: Currency
  otherCurrency?: Currency
  onCurrencySelect: (currency: Currency) => void
  hideBalance?: boolean
  disableCurrencySelect?: boolean
  onPercentInput?: (percent: number) => void
  showQuickInputButton?: boolean
  onMax?: () => void
  showMaxButton: boolean
  maxAmount?: CurrencyAmount<Currency>
  lpPercent?: string
  label?: string
  disabled?: boolean
  showBridgeWarning?: boolean
}

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`

export const CurrencyInputPanel = ({
  id,
  value,
  onUserInput,
  onInputBlur,
  currency,
  onCurrencySelect,
  otherCurrency,
  hideBalance,
  disableCurrencySelect,
  label,
  onPercentInput,
  showQuickInputButton = false,
  onMax,
  showMaxButton,
  maxAmount,
  lpPercent,
  disabled,
  showBridgeWarning,
}: Props) => {
  const { account } = useAccount()
  const { bridgeResult } = useBridgeInfo({ currency })
  const currencyBalance = useCurrencyBalance(currency?.wrapped?.address)

  const isMounted = useIsMounted()
  const { t } = useTranslation()

  const { data, isLoading } = useAccountBalance({
    address: account?.address,
    coin: currency?.wrapped?.address,
    enabled: !!currency,
    watch: true,
  })

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
    />,
  )

  const percentAmount = useMemo(
    () => ({
      25: maxAmount ? maxAmount.multiply(new Percent(25, 100)).toExact() : undefined,
      50: maxAmount ? maxAmount.multiply(new Percent(50, 100)).toExact() : undefined,
      75: maxAmount ? maxAmount.multiply(new Percent(75, 100)).toExact() : undefined,
    }),
    [maxAmount],
  )

  const isAtPercentMax = (maxAmount && value === maxAmount.toExact()) || (lpPercent && lpPercent === '100')
  const isShowPercentButton =
    isMounted && account && currency && currencyBalance?.greaterThan(0) && !disabled && label !== 'To'

  return (
    <SwapUI.CurrencyInputPanel
      id={id}
      value={value}
      onUserInput={onUserInput}
      onInputBlur={onInputBlur}
      showBridgeWarning={showBridgeWarning}
      top={
        <>
          <AtomBox display="flex" flexWrap="wrap">
            <Button
              variant="text"
              scale="sm"
              py={0}
              px="0.5rem"
              onClick={onPresentCurrencyModal}
              title={currency?.name}
            >
              <SkeletonV2 isDataReady={isMounted} width="24px" height="24px" variant="circle" mr="8px">
                <CurrencyLogo currency={currency} size="24px" />
              </SkeletonV2>
              <Text>{currency?.symbol}</Text>
              {!disableCurrencySelect && <ChevronDownIcon />}
            </Button>
            {currency && currency.address ? (
              <AtomBox display="flex" gap="4px" ml="4px" alignItems="center">
                <CopyButton
                  width="16px"
                  buttonColor="textSubtle"
                  text={currency.address}
                  tooltipMessage={t('Token address copied')}
                />
                {currency && currency.isToken && account && !isLoading && !data && (
                  <CoinRegisterButton currency={currency} />
                )}
                {bridgeResult && <BridgeButton url={bridgeResult.url} />}
              </AtomBox>
            ) : null}
          </AtomBox>
          {account && currency && isMounted && (
            <Text
              onClick={!disabled ? onMax : undefined}
              color="textSubtle"
              fontSize="12px"
              textAlign="right"
              style={{ display: 'inline', cursor: 'pointer' }}
            >
              {!hideBalance && !!currency
                ? t('Balance: %balance%', { balance: !isLoading ? data?.formatted ?? '0' : t('Loading') })
                : ' -'}
            </Text>
          )}
        </>
      }
      bottom={
        <InputRow selected={!!disableCurrencySelect}>
          {isShowPercentButton &&
            showQuickInputButton &&
            onPercentInput &&
            [25, 50, 75].map((percent) => {
              const isAtCurrentPercent =
                (maxAmount && value === percentAmount[percent]) || (lpPercent && lpPercent === percent.toString())

              return (
                <Button
                  key={`btn_quickCurrency${percent}`}
                  onClick={() => {
                    onPercentInput(percent)
                  }}
                  scale="xs"
                  mr="5px"
                  variant={isAtCurrentPercent ? 'primary' : 'secondary'}
                  style={{ textTransform: 'uppercase' }}
                >
                  {percent}%
                </Button>
              )
            })}
          {isShowPercentButton && showMaxButton && (
            <Button
              onClick={onMax}
              scale="xs"
              variant={isAtPercentMax ? 'primary' : 'secondary'}
              style={{ textTransform: 'uppercase' }}
            >
              {t('Max')}
            </Button>
          )}
        </InputRow>
      }
    />
  )
}
