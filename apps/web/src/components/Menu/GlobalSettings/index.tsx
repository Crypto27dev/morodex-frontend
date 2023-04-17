import { Flex, IconButton, CogIcon, useModal } from '@pancakeswap/uikit'
import SettingsModal from './SettingsModal'

type Props = {
  color?: string
  mr?: string
  mode?: string
}

const GlobalSettings = ({ color, mr = '8px', mode }: Props) => {
  const [onPresentSettingsModal] = useModal(<SettingsModal mode={mode} />)

  // const [shown, setShown] = useState(false);
  // const onPresentSettingsModal = () => {
  //   setShown(!shown);
  // }

  return (
    <Flex>
      <IconButton
        onClick={onPresentSettingsModal}
        variant="text"
        scale="sm"
        mr={mr}
        id={`open-settings-dialog-button-${mode}`}
      >
        <CogIcon height={24} width={24} color={color || 'textSubtle'} />
      </IconButton>
      {/* <div className='settings' style={{ visibility: (shown ? 'visible' : 'hidden') }}>
        test mode
      </div> */}
    </Flex>
  )
}

export default GlobalSettings
