import PoweredBy from 'components/layerZero/PoweredBy'
import { LinkExternal } from '@pancakeswap/uikit'

const AptosBridgeFooter = () => {
  return (
    <>
      <PoweredBy />
      <LinkExternal m="20px auto" href="https://docs.dapp-frontend-prince.web.app/get-started-aptos/aptos-faq#cake-bridging">
        Need Help?
      </LinkExternal>
      <LinkExternal m="20px auto" href="https://docs.dapp-frontend-prince.web.app/get-started-aptos/aptos-coin-guide">
        Don’t see your assets?
      </LinkExternal>
    </>
  )
}

export default AptosBridgeFooter
