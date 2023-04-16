import useGetPublicIfoV3Data from 'views/Ifos/hooks/v3/useGetPublicIfoData'
import useGetWalletIfoV3Data from 'views/Ifos/hooks/v3/useGetWalletIfoData'
import { Ifo } from 'config/constants/types'
import IfoFoldableCard from './IfoFoldableCard'

interface Props {
  ifo: Ifo
}

const IfoCardV3Data: React.FC<React.PropsWithChildren<Props>> = ({ ifo }) => {
  const publicIfoData = useGetPublicIfoV3Data(ifo)
  const walletIfoData = useGetWalletIfoV3Data(ifo)

  return <IfoFoldableCard ifo={ifo} publicIfoData={publicIfoData} walletIfoData={walletIfoData} />
}

export default IfoCardV3Data
