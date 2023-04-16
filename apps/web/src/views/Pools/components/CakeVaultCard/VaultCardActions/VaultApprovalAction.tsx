import { Button, AutoRenewIcon, Skeleton } from '@pancakeswap/uikit'
import { VaultKey } from 'state/types'
import { useTranslation } from '@pancakeswap/localization'
import { useVaultApprove } from '../../../hooks/useApprove'

interface ApprovalActionProps {
  vaultKey: VaultKey
  setLastUpdated: () => void
  isLoading?: boolean
}

const VaultApprovalAction: React.FC<React.PropsWithChildren<ApprovalActionProps>> = ({
  vaultKey,
  isLoading = false,
  setLastUpdated,
}) => {
  const { t } = useTranslation()

  const { handleApprove, pendingTx } = useVaultApprove(vaultKey, setLastUpdated)

  return (
    <>
      {isLoading ? (
        <Skeleton width="100%" height="52px" />
      ) : (
        <Button
          isLoading={pendingTx}
          endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
          disabled={pendingTx}
          onClick={handleApprove}
          width="100%"
        >
          {t('Enable')}
        </Button>
      )}
    </>
  )
}

export default VaultApprovalAction
