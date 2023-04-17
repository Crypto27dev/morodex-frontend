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
  .fa-spin {
    -webkit-animation-name: fa-spin;
    animation-name: fa-spin;
    -webkit-animation-delay: var(--fa-animation-delay, 0s);
    animation-delay: var(--fa-animation-delay, 0s);
    -webkit-animation-direction: var(--fa-animation-direction, normal);
    animation-direction: var(--fa-animation-direction, normal);
    -webkit-animation-duration: var(--fa-animation-duration, 2s);
    animation-duration: var(--fa-animation-duration, 2s);
    -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
    animation-iteration-count: var(--fa-animation-iteration-count, infinite);
    -webkit-animation-timing-function: var(--fa-animation-timing, linear);
    animation-timing-function: var(--fa-animation-timing, linear);
  }
  @keyframes fa-spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  .settings {
    position: absolute;
    right: 2rem;
    color: rgb(255 255 255);
    padding: 1rem;
    border: solid 2px rgb(229, 231, 235);
    z-index: 999;
  }
`

export default GlobalStyle
