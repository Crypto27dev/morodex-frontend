import { ChangeEvent, useEffect, useRef, useState } from 'react'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Box,
  Button,
  Text,
  Flex,
  IconButton,
  InlineMenu,
  Input,
  InputGroup,
  SearchIcon,
  CloseIcon,
} from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import orderBy from 'lodash/orderBy'
import { useGetNftFilters } from 'state/nftMarket/hooks'
import { useNftStorage } from 'state/nftMarket/storage'
import styled from 'styled-components'
import { Item } from './types'
import { FilterButton, ListOrderState, SearchWrapper } from '../ListFilter/styles'
import { TraitItemRow } from './styles'

interface ListTraitFilterProps {
  title?: string
  traitType: string
  items: Item[]
  collectionAddress: string
}

const TriggerButton = styled(Button)<{ hasItem: boolean }>`
  ${({ hasItem }) =>
    hasItem &&
    `
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    padding-right: 8px;
  `}
`

const CloseButton = styled(IconButton)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`

export const ListTraitFilter: React.FC<React.PropsWithChildren<ListTraitFilterProps>> = ({
  title,
  traitType,
  items,
  collectionAddress,
}) => {
  const { t } = useTranslation()
  const { updateItemFilters } = useNftStorage()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [orderState, setOrderState] = useState<ListOrderState>({ orderKey: 'count', orderDir: 'asc' })
  const wrapperRef = useRef(null)
  const menuRef = useRef(null)
  const nftFilters = useGetNftFilters(collectionAddress)
  const { orderKey, orderDir } = orderState

  const traitFilter = nftFilters[traitType]
  const isTraitSelected = !!traitFilter

  const filteredItems =
    query && query.length > 1
      ? items.filter((item) => item.label.toLowerCase().indexOf(query.toLowerCase()) !== -1)
      : items

  const handleClearItem = () => {
    const newFilters = { ...nftFilters }

    delete newFilters[traitType]

    updateItemFilters({
      collectionAddress,
      nftFilters: newFilters,
    })
  }

  const handleMenuClick = () => setIsOpen(!isOpen)

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setQuery(value)
  }

  const handleItemSelect = ({ attr }: Item) => {
    updateItemFilters({
      collectionAddress,
      nftFilters: { ...nftFilters, [traitType]: attr },
    })
  }

  const toggleSort = (newOrderKey: string) => () => {
    setOrderState((prevOrderDir) => {
      if (prevOrderDir.orderKey !== newOrderKey) {
        return {
          orderKey: newOrderKey,
          orderDir: 'asc',
        }
      }

      return {
        orderKey: newOrderKey,
        orderDir: prevOrderDir.orderDir === 'asc' ? 'desc' : 'asc',
      }
    })
  }

  // @TODO Fix this in the Toolkit
  // This is a fix to ensure the "isOpen" value is aligned with the menus's (to avoid a double click)
  useEffect(() => {
    const handleClickOutside = ({ target }: Event) => {
      if (
        wrapperRef.current &&
        menuRef.current &&
        !menuRef.current.contains(target) &&
        !wrapperRef.current.contains(target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [setIsOpen, wrapperRef, menuRef])

  return (
    <Flex alignItems="center" mr="4px" mb="4px">
      <Box ref={wrapperRef}>
        <InlineMenu
          component={
            <TriggerButton
              onClick={handleMenuClick}
              variant={isTraitSelected ? 'subtle' : 'light'}
              scale="sm"
              hasItem={isTraitSelected}
            >
              {title}
            </TriggerButton>
          }
          isOpen={isOpen}
          options={{ placement: 'bottom' }}
        >
          <Box maxWidth="375px" ref={menuRef}>
            <SearchWrapper alignItems="center" p="16px">
              <InputGroup startIcon={<SearchIcon color="textSubtle" />}>
                <Input name="query" placeholder={t('Search')} onChange={handleChange} value={query} />
              </InputGroup>
            </SearchWrapper>
            <Flex alignItems="center" p="16px">
              <FilterButton onClick={toggleSort('label')} style={{ flex: 1 }}>
                <Text fontSize="12px" color="secondary" fontWeight="bold" textTransform="uppercase">
                  {t('Name')}
                </Text>
                <Box width="18px">
                  {orderKey === 'label' && orderDir === 'asc' && <ArrowUpIcon width="18px" color="secondary" />}
                  {orderKey === 'label' && orderDir === 'desc' && <ArrowDownIcon width="18px" color="secondary" />}
                </Box>
              </FilterButton>
              <FilterButton onClick={toggleSort('count')}>
                <Text fontSize="12px" color="secondary" fontWeight="bold" textTransform="uppercase">
                  {t('Count')}
                </Text>
                <Box width="18px">
                  {orderKey === 'count' && orderDir === 'asc' && <ArrowUpIcon width="18px" color="secondary" />}
                  {orderKey === 'count' && orderDir === 'desc' && <ArrowDownIcon width="18px" color="secondary" />}
                </Box>
              </FilterButton>
            </Flex>
            <Box height="240px" overflowY="auto">
              {filteredItems.length > 0 ? (
                orderBy(filteredItems, orderKey, orderDir).map((filteredItem) => {
                  const handleSelect = () => handleItemSelect(filteredItem)
                  const isItemSelected = traitFilter ? traitFilter.value === filteredItem.attr.value : false

                  return (
                    <TraitItemRow
                      key={filteredItem.label}
                      item={filteredItem}
                      isSelected={isItemSelected}
                      onSelect={handleSelect}
                    />
                  )
                })
              ) : (
                <Flex alignItems="center" justifyContent="center" height="230px">
                  <Text color="textDisabled" textAlign="center">
                    {t('No results found')}
                  </Text>
                </Flex>
              )}
            </Box>
          </Box>
        </InlineMenu>
      </Box>
      {isTraitSelected && (
        <CloseButton variant={isTraitSelected ? 'subtle' : 'light'} scale="sm" onClick={handleClearItem}>
          <CloseIcon color="currentColor" width="18px" />
        </CloseButton>
      )}
    </Flex>
  )
}
