import { createGlobalStyle } from 'styled-components'
import { PancakeTheme } from '@pancakeswap/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
  .animate-x-slide {
    animation: x-slide 4s ease-in-out infinite;
    width: 0;
  }
  .animate-y-slide {
    animation: y-slide 4s ease-in-out infinite;
    height: 0;
  }
  @keyframes x-slide {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      width: 100%;
    }
  }
  @keyframes y-slide {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      height: 100%;
    }
  }
`

export default GlobalStyle
