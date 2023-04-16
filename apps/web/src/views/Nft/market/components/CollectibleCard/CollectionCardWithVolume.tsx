import { Flex, Text } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { BNBAmountLabel } from './styles'
import { CollectionCard } from './index'

interface CollectionCardWithVolumeProps {
  bgSrc: string
  avatarSrc?: string
  collectionName: string
  url?: string
  disabled?: boolean
  volume: number
}

const CollectionCardWithVolume: React.FC<CollectionCardWithVolumeProps> = ({
  bgSrc,
  avatarSrc,
  collectionName,
  url,
  volume,
}) => {
  const { t } = useTranslation()
  return (
    <CollectionCard bgSrc={bgSrc} avatarSrc={avatarSrc} collectionName={collectionName} url={url}>
      <Flex alignItems="center">
        <Text fontSize="12px" color="textSubtle">
          {t('Volume')}
        </Text>
        <BNBAmountLabel amount={volume} />
      </Flex>
    </CollectionCard>
  )
}

export default CollectionCardWithVolume
