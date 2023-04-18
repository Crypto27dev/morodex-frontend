import {
  Box,
  UserMenu,
  UserMenuItem,
} from '@pancakeswap/uikit'

export const MainMenu = () => {

  return (
    <Box height="100%">
      <UserMenu
        avatarSrc={`/images/bars.svg`}
      >
        {() =>
          (<>
            <UserMenuItem style={{ justifyContent: 'flex-start' }}
              as="a"
              href="/swap">
              Swap
            </UserMenuItem>
            <UserMenuItem style={{ justifyContent: 'flex-start' }}
              as="a"
              href="/liquidity">
              Liquidity
            </UserMenuItem>
          </>)
        }
      </UserMenu>
    </Box >
  )
}
