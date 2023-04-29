// import styled from 'styled-components'
// import { PageSection } from '@pancakeswap/uikit'
// import { useAccount } from 'wagmi'
// import useTheme from 'hooks/useTheme'
// import Container from 'components/Layout/Container'
import { useMemo, useState } from 'react'
import { PageMeta } from 'components/Layout/Page'
// import { useTranslation } from '@pancakeswap/localization'
// import { useActiveChainId } from 'hooks/useActiveChainId'
// import { ChainId } from '@pancakeswap/sdk'
// import Hero from './components/Hero'
// import { swapSectionData, earnSectionData, cakeSectionData } from './components/SalesSection/data'
// import MetricsSection from './components/MetricsSection'
// import SalesSection from './components/SalesSection'
// import WinSection from './components/WinSection'
// import FarmsPoolsRow from './components/FarmsPoolsRow'
// import Footer from './components/Footer'
// import CakeDataRow from './components/CakeDataRow'
// import { WedgeTopLeft, InnerWedgeWrapper, OuterWedgeWrapper, WedgeTopRight } from './components/WedgeSvgs'
// import UserBanner from './components/UserBanner'
// import MultipleBanner from './components/Banners/MultipleBanner'
import LogChart from './components/Charts/LogChart'
import LineChart from './components/Charts/LineChart'
import BeamChart from './components/Charts/BeamChart'
import {
  useAllTokenDataSWR,
  useProtocolChartDataSWR,
  useProtocolDataSWR,
  useProtocolTransactionsSWR,
} from 'state/info/hooks'

const Home: React.FC<React.PropsWithChildren> = () => {
  // const { theme } = useTheme()
  // const { address: account } = useAccount()
  // const { chainId } = useActiveChainId()
  const [usdAmount, setUsdAmount] = useState(null);
  const [gainAmount, setGainAmount] = useState(null);
  const locale = ("en-US");
  const protocolData = useProtocolDataSWR()
  const chartData = useProtocolChartDataSWR()
  const transactions = useProtocolTransactionsSWR()
  const currentDate = useMemo(
    () => new Date().toLocaleString(locale, { month: 'short', year: 'numeric', day: 'numeric' }),
    [locale],
  )

  function handleUsdAmountChange(e) {
    const inputUsdAmount = e.target.value;
    const calcGainAmount = inputUsdAmount * (0.003 - 0.0007);
    setUsdAmount(inputUsdAmount);
    setGainAmount(calcGainAmount.toFixed(2));
  }

  return (
    <>
      <PageMeta />
      <style>
        {`
          #home-1 .page-bg {
            background: linear-gradient(139.73deg, #e6fdff 0%, #f3efff 100%);
          }
          [data-theme='dark'] #home-1 .page-bg {
            background: radial-gradient(103.12% 50% at 50% 50%, #21193a 0%, #191326 100%);
          }
          #home-2 .page-bg {
            background: linear-gradient(180deg, #ffffff 22%, #d7caec 100%);
          }
          [data-theme='dark'] #home-2 .page-bg {
            background: linear-gradient(180deg, #09070c 22%, #201335 100%);
          }
          #home-3 .page-bg {
            background: linear-gradient(180deg, #6fb6f1 0%, #eaf2f6 100%);
          }
          [data-theme='dark'] #home-3 .page-bg {
            background: linear-gradient(180deg, #0b4576 0%, #091115 100%);
          }
          #home-4 .inner-wedge svg {
            fill: #d8cbed;
          }
          [data-theme='dark'] #home-4 .inner-wedge svg {
            fill: #201335;
          }
          .custom-animate-ping {
            animation: ping 3s cubic-bezier(0,0,.2,1) infinite;
          }
          
          .animate-x-slide {
              animation: x-slide 4s ease-in-out infinite;
              width: 0;
          }
          
          @keyframes x-slide {
              0% {
                  opacity: 1;
              }
          
              to {
                  opacity: 0;
                  width: 100%;
              }
          }
          
          .animate-y-slide {
              animation: y-slide 4s ease-in-out infinite;
              height: 0;
          }
          
          @keyframes y-slide {
              0% {
                  opacity: 1;
              }
          
              to {
                  height: 100%;
                  opacity: 0;
              }
          }
          
          .loading:after {
              animation: dots 1s steps(5) infinite;
              content: " .";
          }
          
          @keyframes dots {
              0%,20% {
                  color: transparent;
                  text-shadow: .25em 0 0 transparent,.5em 0 0 transparent;
              }
          
              40% {
                  color: #ffffff80;
                  text-shadow: .25em 0 0 transparent,.5em 0 0 transparent;
              }
          
              60% {
                  text-shadow: .25em 0 0 #ffffff80,.5em 0 0 transparent;
              }
          
              80%,to {
                  text-shadow: .25em 0 0 #ffffff80,.5em 0 0 #ffffff80;
              }
          }
          
          *,:after,:before {
              border: 0 solid #e5e7eb;
              box-sizing: border-box;
          }
          
          :after,:before {
              --tw-content: "";
          }
          
          html {
              -webkit-text-size-adjust: 100%;
              font-feature-settings: normal;
              font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
              line-height: 1.5;
              -moz-tab-size: 4;
              -o-tab-size: 4;
              tab-size: 4;
          }
          
          body {
              line-height: inherit;
              margin: 0;
          }
          
          hr {
              border-top-width: 1px;
              color: inherit;
              height: 0;
          }
          
          abbr:where([title]) {
              -webkit-text-decoration: underline dotted;
              text-decoration: underline dotted;
          }
          
          h1,h2,h3,h4,h5,h6 {
              font-size: inherit;
              font-weight: inherit;
          }
          
          a {
              color: inherit;
              text-decoration: inherit;
          }
          
          b,strong {
              font-weight: bolder;
          }
          
          code,kbd,pre,samp {
              font-family: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;
              font-size: 1em;
          }
          
          small {
              font-size: 80%;
          }
          
          sub,sup {
              font-size: 75%;
              line-height: 0;
              position: relative;
              vertical-align: baseline;
          }
          
          sub {
              bottom: -.25em;
          }
          
          sup {
              top: -.5em;
          }
          
          table {
              border-collapse: collapse;
              border-color: inherit;
              text-indent: 0;
          }
          
          button,input,optgroup,select,textarea {
              color: inherit;
              font-family: inherit;
              font-size: 100%;
              font-weight: inherit;
              line-height: inherit;
              margin: 0;
              padding: 0;
          }
          
          button,select {
              text-transform: none;
          }
          
          [type=button],[type=reset],[type=submit],button {
              -webkit-appearance: button;
              background-color: transparent;
              background-image: none;
          }
          
          :-moz-focusring {
              outline: auto;
          }
          
          :-moz-ui-invalid {
              box-shadow: none;
          }
          
          progress {
              vertical-align: baseline;
          }
          
          ::-webkit-inner-spin-button,::-webkit-outer-spin-button {
              height: auto;
          }
          
          [type=search] {
              -webkit-appearance: textfield;
              outline-offset: -2px;
          }
          
          ::-webkit-search-decoration {
              -webkit-appearance: none;
          }
          
          ::-webkit-file-upload-button {
              -webkit-appearance: button;
              font: inherit;
          }
          
          summary {
              display: list-item;
          }
          
          blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre {
              margin: 0;
          }
          
          fieldset {
              margin: 0;
          }
          
          fieldset,legend {
              padding: 0;
          }
          
          menu,ol,ul {
              list-style: none;
              margin: 0;
              padding: 0;
          }
          
          textarea {
              resize: vertical;
          }
          
          input::-moz-placeholder,textarea::-moz-placeholder {
              color: #9ca3af;
              opacity: 1;
          }
          
          input::placeholder,textarea::placeholder {
              color: #9ca3af;
              opacity: 1;
          }
          
          [role=button],button {
              cursor: pointer;
          }
          
          :disabled {
              cursor: default;
          }
          
          audio,canvas,embed,iframe,img,object,svg,video {
              display: block;
              vertical-align: middle;
          }
          
          img,video {
              height: auto;
              max-width: 100%;
          }
          
          [hidden] {
              display: none;
          }
          
          html {
              background: #000;
              color-scheme: only light;
              font-family: DM Sans,system-ui,sans-serif;
          }
          
          noscript {
              background: #fff;
          }
          
          * {
              scrollbar-color: var(--buy) hsla(0,0%,100%,.15);
              scrollbar-width: thin;
          }
          
          ::-webkit-scrollbar {
              height: 6px;
              width: 6px;
          }
          
          ::-webkit-scrollbar-track {
              background: hsla(0,0%,100%,.15);
          }
          
          ::-webkit-scrollbar-thumb {
              background-color: var(--buy);
              border-radius: 10px;
          }
          
          :focus {
              outline: none;
          }
          
          :focus-visible {
              outline: none;
          }
          
          *,:after,:before {
              --tw-border-spacing-x: 0;
              --tw-border-spacing-y: 0;
              --tw-translate-x: 0;
              --tw-translate-y: 0;
              --tw-rotate: 0;
              --tw-skew-x: 0;
              --tw-skew-y: 0;
              --tw-scale-x: 1;
              --tw-scale-y: 1;
              --tw-pan-x: ;
              --tw-pan-y: ;
              --tw-pinch-zoom: ;
              --tw-scroll-snap-strictness: proximity;
              --tw-ordinal: ;
              --tw-slashed-zero: ;
              --tw-numeric-figure: ;
              --tw-numeric-spacing: ;
              --tw-numeric-fraction: ;
              --tw-ring-inset: ;
              --tw-ring-offset-width: 0px;
              --tw-ring-offset-color: #fff;
              --tw-ring-color: rgba(59,130,246,.5);
              --tw-ring-offset-shadow: 0 0 #0000;
              --tw-ring-shadow: 0 0 #0000;
              --tw-shadow: 0 0 #0000;
              --tw-shadow-colored: 0 0 #0000;
              --tw-blur: ;
              --tw-brightness: ;
              --tw-contrast: ;
              --tw-grayscale: ;
              --tw-hue-rotate: ;
              --tw-invert: ;
              --tw-saturate: ;
              --tw-sepia: ;
              --tw-drop-shadow: ;
              --tw-backdrop-blur: ;
              --tw-backdrop-brightness: ;
              --tw-backdrop-contrast: ;
              --tw-backdrop-grayscale: ;
              --tw-backdrop-hue-rotate: ;
              --tw-backdrop-invert: ;
              --tw-backdrop-opacity: ;
              --tw-backdrop-saturate: ;
              --tw-backdrop-sepia: ;
          }
          
          ::backdrop {
              --tw-border-spacing-x: 0;
              --tw-border-spacing-y: 0;
              --tw-translate-x: 0;
              --tw-translate-y: 0;
              --tw-rotate: 0;
              --tw-skew-x: 0;
              --tw-skew-y: 0;
              --tw-scale-x: 1;
              --tw-scale-y: 1;
              --tw-pan-x: ;
              --tw-pan-y: ;
              --tw-pinch-zoom: ;
              --tw-scroll-snap-strictness: proximity;
              --tw-ordinal: ;
              --tw-slashed-zero: ;
              --tw-numeric-figure: ;
              --tw-numeric-spacing: ;
              --tw-numeric-fraction: ;
              --tw-ring-inset: ;
              --tw-ring-offset-width: 0px;
              --tw-ring-offset-color: #fff;
              --tw-ring-color: rgba(59,130,246,.5);
              --tw-ring-offset-shadow: 0 0 #0000;
              --tw-ring-shadow: 0 0 #0000;
              --tw-shadow: 0 0 #0000;
              --tw-shadow-colored: 0 0 #0000;
              --tw-blur: ;
              --tw-brightness: ;
              --tw-contrast: ;
              --tw-grayscale: ;
              --tw-hue-rotate: ;
              --tw-invert: ;
              --tw-saturate: ;
              --tw-sepia: ;
              --tw-drop-shadow: ;
              --tw-backdrop-blur: ;
              --tw-backdrop-brightness: ;
              --tw-backdrop-contrast: ;
              --tw-backdrop-grayscale: ;
              --tw-backdrop-hue-rotate: ;
              --tw-backdrop-invert: ;
              --tw-backdrop-opacity: ;
              --tw-backdrop-saturate: ;
              --tw-backdrop-sepia: ;
          }
          
          .container {
              width: 100%;
          }
          
          @media (min-width: 640px) {
              .container {
                  max-width:640px;
              }
          }
          
          @media (min-width: 768px) {
              .container {
                  max-width:768px;
              }
          }
          
          @media (min-width: 1024px) {
              .container {
                  max-width:1024px;
              }
          }
          
          @media (min-width: 1280px) {
              .container {
                  max-width:1280px;
              }
          }
          
          @media (min-width: 1536px) {
              .container {
                  max-width:1536px;
              }
          }
          
          .sr-only {
              clip: rect(0,0,0,0)!important;
              border-width: 0!important;
              height: 1px!important;
              margin: -1px!important;
              overflow: hidden!important;
              padding: 0!important;
              position: absolute!important;
              white-space: nowrap!important;
              width: 1px!important;
          }
          
          .visible {
              visibility: visible!important;
          }
          
          .collapse {
              visibility: collapse!important;
          }
          
          .static {
              position: static!important;
          }
          
          .fixed {
              position: fixed!important;
          }
          
          .absolute {
              position: absolute!important;
          }
          
          .relative {
              position: relative!important;
          }
          
          .inset-0 {
              bottom: 0!important;
              left: 0!important;
              right: 0!important;
              top: 0!important;
          }
          
          .inset-x-1 {
              left: .25rem!important;
              right: .25rem!important;
          }
          
          .inset-y-0 {
              bottom: 0!important;
              top: 0!important;
          }
          
          .inset-x-2 {
              left: .5rem!important;
              right: .5rem!important;
          }
          
          .top-1 {
              top: .25rem!important;
          }
          
          .left-2 {
              left: .5rem!important;
          }
          
          .bottom-1 {
              bottom: .25rem!important;
          }
          
          .top-2 {
              top: .5rem!important;
          }
          
          .top-50 {
              top: 50%!important;
          }
          
          .left-50 {
              left: 50%!important;
          }
          
          .top-16 {
              top: 4rem!important;
          }
          
          .right-0 {
              right: 0!important;
          }
          
          .top-14 {
              top: 3.5rem!important;
          }
          
          .top-20 {
              top: 5rem!important;
          }
          
          .right-2 {
              right: .5rem!important;
          }
          
          .top-0 {
              top: 0!important;
          }
          
          .left-05 {
              left: .125rem!important;
          }
          
          .left-0 {
              left: 0!important;
          }
          
          .top-05 {
              top: .125rem!important;
          }
          
          .bottom-05 {
              bottom: .125rem!important;
          }
          
          .bottom-0 {
              bottom: 0!important;
          }
          
          .right-05 {
              right: .125rem!important;
          }
          
          .right-8 {
              right: 2rem!important;
          }
          
          .-top-0 {
              top: 0!important;
          }
          
          .bottom-8 {
              bottom: 2rem!important;
          }
          
          .bottom-2 {
              bottom: .5rem!important;
          }
          
          .z-50 {
              z-index: 50!important;
          }
          
          .z-100 {
              z-index: 100!important;
          }
          
          .z-40 {
              z-index: 40!important;
          }
          
          .z-0 {
              z-index: 0!important;
          }
          
          .z-10 {
              z-index: 10!important;
          }
          
          .order-last {
              order: 9999!important;
          }
          
          .float-right {
              float: right!important;
          }
          
          .m-auto {
              margin: auto!important;
          }
          
          .m-3 {
              margin: .75rem!important;
          }
          
          .mx-auto {
              margin-left: auto!important;
              margin-right: auto!important;
          }
          
          .my-10 {
              margin-bottom: 2.5rem!important;
              margin-top: 2.5rem!important;
          }
          
          .my-28 {
              margin-bottom: 7rem!important;
              margin-top: 7rem!important;
          }
          
          .my-6 {
              margin-bottom: 1.5rem!important;
              margin-top: 1.5rem!important;
          }
          
          .mx-2 {
              margin-left: .5rem!important;
              margin-right: .5rem!important;
          }
          
          .-mx-6 {
              margin-left: -1.5rem!important;
              margin-right: -1.5rem!important;
          }
          
          .my-4 {
              margin-bottom: 1rem!important;
              margin-top: 1rem!important;
          }
          
          .my-05 {
              margin-bottom: .125rem!important;
              margin-top: .125rem!important;
          }
          
          .my-0 {
              margin-bottom: 0!important;
              margin-top: 0!important;
          }
          
          .-mx-2 {
              margin-left: -.5rem!important;
              margin-right: -.5rem!important;
          }
          
          .my-2 {
              margin-bottom: .5rem!important;
              margin-top: .5rem!important;
          }
          
          .mx-1 {
              margin-left: .25rem!important;
              margin-right: .25rem!important;
          }
          
          .-mt-36 {
              margin-top: -9rem!important;
          }
          
          .mb-10 {
              margin-bottom: 2.5rem!important;
          }
          
          .mt-2 {
              margin-top: .5rem!important;
          }
          
          .mb-8 {
              margin-bottom: 2rem!important;
          }
          
          .ml-4 {
              margin-left: 1rem!important;
          }
          
          .mt-24 {
              margin-top: 6rem!important;
          }
          
          .mb-4 {
              margin-bottom: 1rem!important;
          }
          
          .mt-3 {
              margin-top: .75rem!important;
          }
          
          .ml-3 {
              margin-left: .75rem!important;
          }
          
          .mt-8 {
              margin-top: 2rem!important;
          }
          
          .ml-2 {
              margin-left: .5rem!important;
          }
          
          .mt-6 {
              margin-top: 1.5rem!important;
          }
          
          .mt-10 {
              margin-top: 2.5rem!important;
          }
          
          .-mt-14 {
              margin-top: -3.5rem!important;
          }
          
          .mt-32 {
              margin-top: 8rem!important;
          }
          
          .-mt-8 {
              margin-top: -2rem!important;
          }
          
          .mt-72 {
              margin-top: 18rem!important;
          }
          
          .mt-4 {
              margin-top: 1rem!important;
          }
          
          .mt-14 {
              margin-top: 3.5rem!important;
          }
          
          .mb-20 {
              margin-bottom: 5rem!important;
          }
          
          .-mt-28 {
              margin-top: -7rem!important;
          }
          
          .mr-2 {
              margin-right: .5rem!important;
          }
          
          .mr-4 {
              margin-right: 1rem!important;
          }
          
          .mt-1 {
              margin-top: .25rem!important;
          }
          
          .mb-1 {
              margin-bottom: .25rem!important;
          }
          
          .mr-1 {
              margin-right: .25rem!important;
          }
          
          .ml-1 {
              margin-left: .25rem!important;
          }
          
          .-ml-2 {
              margin-left: -.5rem!important;
          }
          
          .ml-6 {
              margin-left: 1.5rem!important;
          }
          
          .ml-05 {
              margin-left: .125rem!important;
          }
          
          .ml-0 {
              margin-left: 0!important;
          }
          
          .mb-16 {
              margin-bottom: 4rem!important;
          }
          
          .mt-05 {
              margin-top: .125rem!important;
          }
          
          .mt-0 {
              margin-top: 0!important;
          }
          
          .mt-5 {
              margin-top: 1.25rem!important;
          }
          
          .mt-5px {
              margin-top: 5px!important;
          }
          
          .mb-auto {
              margin-bottom: auto!important;
          }
          
          .mt-136px {
              margin-top: 136px!important;
          }
          
          .block {
              display: block!important;
          }
          
          .inline-block {
              display: inline-block!important;
          }
          
          .inline {
              display: inline!important;
          }
          
          .flex {
              display: flex!important;
          }
          
          .inline-flex {
              display: inline-flex!important;
          }
          
          .table {
              display: table!important;
          }
          
          .grid {
              display: grid!important;
          }
          
          .hidden {
              display: none!important;
          }
          
          .aspect-video {
              aspect-ratio: 16/9!important;
          }
          
          .h-8 {
              height: 2rem!important;
          }
          
          .h-screen {
              height: 100vh!important;
          }
          
          .h-24 {
              height: 6rem!important;
          }
          
          .h-6 {
              height: 1.5rem!important;
          }
          
          .h-36 {
              height: 9rem!important;
          }
          
          .h-4 {
              height: 1rem!important;
          }
          
          .h-10 {
              height: 2.5rem!important;
          }
          
          .h-7 {
              height: 1.75rem!important;
          }
          
          .h-full {
              height: 100%!important;
          }
          
          .h-5 {
              height: 1.25rem!important;
          }
          
          .h-9 {
              height: 2.25rem!important;
          }
          
          .h-1 {
              height: .25rem!important;
          }
          
          .h-12 {
              height: 3rem!important;
          }
          
          .h-3 {
              height: .75rem!important;
          }
          
          .h-350px {
              height: 350px!important;
          }
          
          .h-20 {
              height: 5rem!important;
          }
          
          .h-185 {
              height: 4.625rem!important;
          }
          
          .h-112 {
              height: 28rem!important;
          }
          
          .h-30px {
              height: 30px!important;
          }
          
          .h-38px {
              height: 38px!important;
          }
          
          .h-20px {
              height: 20px!important;
          }
          
          .h-32px {
              height: 32px!important;
          }
          
          .h-70px {
              height: 70px!important;
          }
          
          .h-40px {
              height: 40px!important;
          }
          
          .max-h-0 {
              max-height: 0!important;
          }
          
          .max-h-screen {
              max-height: 100vh!important;
          }
          
          .min-h-full {
              min-height: 100%!important;
          }
          
          .min-h-screen {
              min-height: 100vh!important;
          }
          
          .min-h-300px {
              min-height: 300px!important;
          }
          
          .min-h-30px {
              min-height: 30px!important;
          }
          
          .w-full {
              width: 100%!important;
          }
          
          .w-auto {
              width: auto!important;
          }
          
          .w-4-6 {
              width: 66.666667%!important;
          }
          
          .w-2-6 {
              width: 33.333333%!important;
          }
          
          .w-6 {
              width: 1.5rem!important;
          }
          
          .w-3-4 {
              width: 75%!important;
          }
          
          .w-24 {
              width: 6rem!important;
          }
          
          .w-60 {
              width: 15rem!important;
          }
          
          .w-4 {
              width: 1rem!important;
          }
          
          .w-44 {
              width: 11rem!important;
          }
          
          .w-8 {
              width: 2rem!important;
          }
          
          .w-5 {
              width: 1.25rem!important;
          }
          
          .w-10 {
              width: 2.5rem!important;
          }
          
          .w-52 {
              width: 13rem!important;
          }
          
          .w-96 {
              width: 24rem!important;
          }
          
          .w-1-4 {
              width: 25%!important;
          }
          
          .w-2-4 {
              width: 50%!important;
          }
          
          .w-9 {
              width: 2.25rem!important;
          }
          
          .w-20 {
              width: 5rem!important;
          }
          
          .w-16 {
              width: 4rem!important;
          }
          
          .w-14 {
              width: 3.5rem!important;
          }
          
          .w-12 {
              width: 3rem!important;
          }
          
          .w-1 {
              width: .25rem!important;
          }
          
          .w-11 {
              width: 2.75rem!important;
          }
          
          .w-56 {
              width: 14rem!important;
          }
          
          .w-48 {
              width: 12rem!important;
          }
          
          .w-3 {
              width: .75rem!important;
          }
          
          .w-1-2 {
              width: 50%!important;
          }
          
          .w-4 {
              width: 1rem!important;
          }
          
          .w-80 {
              width: 20rem!important;
          }
          
          .w-64 {
              width: 16rem!important;
          }
          
          .w-30px {
              width: 30px!important;
          }
          
          .w-38px {
              width: 38px!important;
          }
          
          .w-32px {
              width: 32px!important;
          }
          
          .w-40px {
              width: 40px!important;
          }
          
          .max-w-md {
              max-width: 28rem!important;
          }
          
          .max-w-xl {
              max-width: 36rem!important;
          }
          
          .flex-1 {
              flex: 1 1 0%!important;
          }
          
          .flex-none {
              flex: none!important;
          }
          
          .shrink {
              flex-shrink: 1!important;
          }
          
          .grow {
              flex-grow: 1!important;
          }
          
          .table-auto {
              table-layout: auto!important;
          }
          
          .table-fixed {
              table-layout: fixed!important;
          }
          
          .border-collapse {
              border-collapse: collapse!important;
          }
          
          .origin-center {
              transform-origin: center!important;
          }
          
          .-translate-x-1-2 {
              --tw-translate-x: -50%!important;
          }
          
          .-translate-x-1-2,.-translate-y-1-2 {
              transform: translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))!important;
          }
          
          .-translate-y-1-2 {
              --tw-translate-y: -50%!important;
          }
          
          .translate-y-1 {
              --tw-translate-y: 0.25rem!important;
          }
          
          .translate-y-0,.translate-y-1 {
              transform: translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))!important;
          }
          
          .translate-y-0 {
              --tw-translate-y: 0px!important;
          }
          
          .rotate-180 {
              --tw-rotate: 180deg!important;
          }
          
          .-rotate-90,.rotate-180 {
              transform: translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))!important;
          }
          
          .-rotate-90 {
              --tw-rotate: -90deg!important;
          }
          
          .scale-95 {
              --tw-scale-x: .95!important;
              --tw-scale-y: .95!important;
          }
          
          .scale-100,.scale-95 {
              transform: translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))!important;
          }
          
          .scale-100 {
              --tw-scale-x: 1!important;
              --tw-scale-y: 1!important;
          }
          
          .scale-x-0 {
              --tw-scale-x: 0!important;
          }
          
          .scale-x-0,.scale-x-100 {
              transform: translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))!important;
          }
          
          .scale-x-100 {
              --tw-scale-x: 1!important;
          }
          
          .transform {
              transform: translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))!important;
          }
          
          .transform-gpu {
              transform: translate3d(var(--tw-translate-x),var(--tw-translate-y),0) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))!important;
          }
          
          @keyframes bounce {
              0%,to {
                  animation-timing-function: cubic-bezier(.8,0,1,1);
                  transform: translateY(-25%);
              }
          
              50% {
                  animation-timing-function: cubic-bezier(0,0,.2,1);
                  transform: none;
              }
          }
          
          .animate-bounce {
              animation: bounce 1s infinite!important;
          }
          
          @keyframes ping {
              75%,to {
                  opacity: 0;
                  transform: scale(2);
              }
          }
          
          .animate-ping {
              animation: ping 1s cubic-bezier(0,0,.2,1) infinite!important;
          }
          
          @keyframes pulse {
              50% {
                  opacity: 0.5;
              }
          }
          
          .animate-pulse {
              animation: pulse 2s cubic-bezier(.4,0,.6,1) infinite!important;
          }
          
          .cursor-pointer {
              cursor: pointer!important;
          }
          
          .cursor-default {
              cursor: default!important;
          }
          
          .list-outside {
              list-style-position: outside!important;
          }
          
          .list-disc {
              list-style-type: disc!important;
          }
          
          .list-decimal {
              list-style-type: decimal!important;
          }
          
          .grid-cols-1 {
              grid-template-columns: repeat(1,minmax(0,1fr))!important;
          }
          
          .flex-col {
              flex-direction: column!important;
          }
          
          .flex-col-reverse {
              flex-direction: column-reverse!important;
          }
          
          .flex-wrap {
              flex-wrap: wrap!important;
          }
          
          .items-start {
              align-items: flex-start!important;
          }
          
          .items-end {
              align-items: flex-end!important;
          }
          
          .items-center {
              align-items: center!important;
          }
          
          .items-baseline {
              align-items: baseline!important;
          }
          
          .items-stretch {
              align-items: stretch!important;
          }
          
          .justify-center {
              justify-content: center!important;
          }
          
          .justify-between {
              justify-content: space-between!important;
          }
          
          .gap-4 {
              gap: 1rem!important;
          }
          
          .space-y-4>:not([hidden])~:not([hidden]) {
              --tw-space-y-reverse: 0!important;
              margin-bottom: calc(1rem*var(--tw-space-y-reverse))!important;
              margin-top: calc(1rem*(1 - var(--tw-space-y-reverse)))!important;
          }
          
          .space-x-2>:not([hidden])~:not([hidden]) {
              --tw-space-x-reverse: 0!important;
              margin-left: calc(.5rem*(1 - var(--tw-space-x-reverse)))!important;
              margin-right: calc(.5rem*var(--tw-space-x-reverse))!important;
          }
          
          .space-y-6>:not([hidden])~:not([hidden]) {
              --tw-space-y-reverse: 0!important;
              margin-bottom: calc(1.5rem*var(--tw-space-y-reverse))!important;
              margin-top: calc(1.5rem*(1 - var(--tw-space-y-reverse)))!important;
          }
          
          .space-x-0>:not([hidden])~:not([hidden]) {
              --tw-space-x-reverse: 0!important;
              margin-left: calc(0px*(1 - var(--tw-space-x-reverse)))!important;
              margin-right: calc(0px*var(--tw-space-x-reverse))!important;
          }
          
          .space-x-4>:not([hidden])~:not([hidden]) {
              --tw-space-x-reverse: 0!important;
              margin-left: calc(1rem*(1 - var(--tw-space-x-reverse)))!important;
              margin-right: calc(1rem*var(--tw-space-x-reverse))!important;
          }
          
          .space-x-3>:not([hidden])~:not([hidden]) {
              --tw-space-x-reverse: 0!important;
              margin-left: calc(.75rem*(1 - var(--tw-space-x-reverse)))!important;
              margin-right: calc(.75rem*var(--tw-space-x-reverse))!important;
          }
          
          .space-y-2>:not([hidden])~:not([hidden]) {
              --tw-space-y-reverse: 0!important;
              margin-bottom: calc(.5rem*var(--tw-space-y-reverse))!important;
              margin-top: calc(.5rem*(1 - var(--tw-space-y-reverse)))!important;
          }
          
          .space-y-14>:not([hidden])~:not([hidden]) {
              --tw-space-y-reverse: 0!important;
              margin-bottom: calc(3.5rem*var(--tw-space-y-reverse))!important;
              margin-top: calc(3.5rem*(1 - var(--tw-space-y-reverse)))!important;
          }
          
          .space-y-8>:not([hidden])~:not([hidden]) {
              --tw-space-y-reverse: 0!important;
              margin-bottom: calc(2rem*var(--tw-space-y-reverse))!important;
              margin-top: calc(2rem*(1 - var(--tw-space-y-reverse)))!important;
          }
          
          .space-y-1>:not([hidden])~:not([hidden]) {
              --tw-space-y-reverse: 0!important;
              margin-bottom: calc(.25rem*var(--tw-space-y-reverse))!important;
              margin-top: calc(.25rem*(1 - var(--tw-space-y-reverse)))!important;
          }
          
          .space-x-1>:not([hidden])~:not([hidden]) {
              --tw-space-x-reverse: 0!important;
              margin-left: calc(.25rem*(1 - var(--tw-space-x-reverse)))!important;
              margin-right: calc(.25rem*var(--tw-space-x-reverse))!important;
          }
          
          .space-x-8>:not([hidden])~:not([hidden]) {
              --tw-space-x-reverse: 0!important;
              margin-left: calc(2rem*(1 - var(--tw-space-x-reverse)))!important;
              margin-right: calc(2rem*var(--tw-space-x-reverse))!important;
          }
          
          .space-x-05>:not([hidden])~:not([hidden]) {
              --tw-space-x-reverse: 0!important;
              margin-left: calc(.125rem*(1 - var(--tw-space-x-reverse)))!important;
              margin-right: calc(.125rem*var(--tw-space-x-reverse))!important;
          }
          
          .space-y-05>:not([hidden])~:not([hidden]) {
              --tw-space-y-reverse: 0!important;
              margin-bottom: calc(.125rem*var(--tw-space-y-reverse))!important;
              margin-top: calc(.125rem*(1 - var(--tw-space-y-reverse)))!important;
          }
          
          .space-y-0>:not([hidden])~:not([hidden]) {
              --tw-space-y-reverse: 0!important;
              margin-bottom: calc(0px*var(--tw-space-y-reverse))!important;
              margin-top: calc(0px*(1 - var(--tw-space-y-reverse)))!important;
          }
          
          .space-y-3>:not([hidden])~:not([hidden]) {
              --tw-space-y-reverse: 0!important;
              margin-bottom: calc(.75rem*var(--tw-space-y-reverse))!important;
              margin-top: calc(.75rem*(1 - var(--tw-space-y-reverse)))!important;
          }
          
          .space-y-reverse>:not([hidden])~:not([hidden]) {
              --tw-space-y-reverse: 1!important;
          }
          
          .self-end {
              align-self: flex-end!important;
          }
          
          .self-center {
              align-self: center!important;
          }
          
          .overflow-hidden {
              overflow: hidden!important;
          }
          
          .overflow-x-auto {
              overflow-x: auto!important;
          }
          
          .overflow-y-auto {
              overflow-y: auto!important;
          }
          
          .overflow-y-scroll {
              overflow-y: scroll!important;
          }
          
          .whitespace-nowrap {
              white-space: nowrap!important;
          }
          
          .rounded {
              border-radius: .25rem!important;
          }
          
          .rounded-lg {
              border-radius: .5rem!important;
          }
          
          .rounded-md {
              border-radius: .375rem!important;
          }
          
          .rounded-xl {
              border-radius: .75rem!important;
          }
          
          .rounded-full {
              border-radius: 9999px!important;
          }
          
          .rounded-2xl {
              border-radius: 1rem!important;
          }
          
          .rounded-66rem {
              border-radius: 66rem!important;
          }
          
          .rounded-bl-lg {
              border-bottom-left-radius: .5rem!important;
          }
          
          .border {
              border: solid!important;
              border-width: 1px!important;
          }
          
          .border-2 {
              border: solid!important;
              border-width: 2px!important;
          }
          
          .border-b {
              border-bottom: solid!important;
              border-bottom-width: 1px!important;
          }
          
          .border-r {
              border-right: solid!important;
              border-right-width: 1px!important;
          }
          
          .border-t {
              border-top: solid!important;
              border-top-width: 1px!important;
          }
          
          .border-slate-500 {
              --tw-border-opacity: 1!important;
              border-color: rgb(100 116 139/var(--tw-border-opacity))!important;
          }
          
          .border-slate-600 {
              --tw-border-opacity: 1!important;
              border-color: rgb(71 85 105/var(--tw-border-opacity))!important;
          }
          
          .border-white-a25,.border-white-a25 {
              border-color: hsla(0,0%,100%,.25)!important;
          }
          
          .border-black-a25 {
              border-color: rgba(0,0,0,.25)!important;
          }
          
          .border-buy {
              border-color: rgb(0 233 177/var(--tw-border-opacity))!important;
          }
          
          .border-buy,.border-sell {
              --tw-border-opacity: 1!important;
          }
          
          .border-sell {
              border-color: rgb(255 43 132/var(--tw-border-opacity))!important;
          }
          
          .border-blue-400 {
              border-color: rgb(96 165 250/var(--tw-border-opacity))!important;
          }
          
          .border-blue-400,.border-white {
              --tw-border-opacity: 1!important;
          }
          
          .border-white {
              border-color: rgb(255 255 255/var(--tw-border-opacity))!important;
          }
          
          .border-white-a5 {
              border-color: hsla(0,0%,100%,.5)!important;
          }
          
          .border-cyan-200 {
              --tw-border-opacity: 1!important;
              border-color: rgb(165 243 252/var(--tw-border-opacity))!important;
          }
          
          .bg-sell-50 {
              background-color: rgb(255 43 132/var(--tw-bg-opacity))!important;
          }
          
          .bg-sell-100,.bg-sell-50 {
              --tw-bg-opacity: 1!important;
          }
          
          .bg-sell-100 {
              background-color: rgb(255 64 143/var(--tw-bg-opacity))!important;
          }
          
          .bg-sell-200 {
              background-color: rgb(255 84 154/var(--tw-bg-opacity))!important;
          }
          
          .bg-sell-200,.bg-sell-300 {
              --tw-bg-opacity: 1!important;
          }
          
          .bg-sell-300 {
              background-color: rgb(255 105 165/var(--tw-bg-opacity))!important;
          }
          
          .bg-sell-400 {
              background-color: rgb(255 125 177/var(--tw-bg-opacity))!important;
          }
          
          .bg-sell-400,.bg-sell-500 {
              --tw-bg-opacity: 1!important;
          }
          
          .bg-sell-500 {
              background-color: rgb(255 146 189/var(--tw-bg-opacity))!important;
          }
          
          .bg-sell-600 {
              background-color: rgb(255 166 201/var(--tw-bg-opacity))!important;
          }
          
          .bg-sell-600,.bg-sell-700 {
              --tw-bg-opacity: 1!important;
          }
          
          .bg-sell-700 {
              background-color: rgb(255 187 213/var(--tw-bg-opacity))!important;
          }
          
          .bg-sell-800 {
              background-color: rgb(255 207 225/var(--tw-bg-opacity))!important;
          }
          
          .bg-sell-800,.bg-sell-900 {
              --tw-bg-opacity: 1!important;
          }
          
          .bg-sell-900 {
              background-color: rgb(255 228 238/var(--tw-bg-opacity))!important;
          }
          
          .bg-buy-50 {
              background-color: rgb(0 233 177/var(--tw-bg-opacity))!important;
          }
          
          .bg-buy-100,.bg-buy-50 {
              --tw-bg-opacity: 1!important;
          }
          
          .bg-buy-100 {
              background-color: rgb(23 235 182/var(--tw-bg-opacity))!important;
          }
          
          .bg-buy-200 {
              background-color: rgb(47 237 187/var(--tw-bg-opacity))!important;
          }
          
          .bg-buy-200,.bg-buy-300 {
              --tw-bg-opacity: 1!important;
          }
          
          .bg-buy-300 {
              background-color: rgb(71 239 193/var(--tw-bg-opacity))!important;
          }
          
          .bg-buy-400 {
              background-color: rgb(96 241 200/var(--tw-bg-opacity))!important;
          }
          
          .bg-buy-400,.bg-buy-500 {
              --tw-bg-opacity: 1!important;
          }
          
          .bg-buy-500 {
              background-color: rgb(121 243 207/var(--tw-bg-opacity))!important;
          }
          
          .bg-buy-600 {
              background-color: rgb(147 245 215/var(--tw-bg-opacity))!important;
          }
          
          .bg-buy-600,.bg-buy-700 {
              --tw-bg-opacity: 1!important;
          }
          
          .bg-buy-700 {
              background-color: rgb(172 247 223/var(--tw-bg-opacity))!important;
          }
          
          .bg-buy-800 {
              background-color: rgb(199 249 233/var(--tw-bg-opacity))!important;
          }
          
          .bg-buy-800,.bg-buy-900 {
              --tw-bg-opacity: 1!important;
          }
          
          .bg-buy-900 {
              background-color: rgb(225 252 242/var(--tw-bg-opacity))!important;
          }
          
          .bg-sell-50-0 {
              background-color: rgba(255,43,132,0)!important;
          }
          
          .bg-sell-50-5 {
              background-color: rgba(255,43,132,.05)!important;
          }
          
          .bg-sell-50-10 {
              background-color: rgba(255,43,132,.1)!important;
          }
          
          .bg-sell-50-20 {
              background-color: rgba(255,43,132,.2)!important;
          }
          
          .bg-sell-50-25 {
              background-color: rgba(255,43,132,.25)!important;
          }
          
          .bg-sell-50-30 {
              background-color: rgba(255,43,132,.3)!important;
          }
          
          .bg-sell-50-40 {
              background-color: rgba(255,43,132,.4)!important;
          }
          
          .bg-sell-50-50 {
              background-color: rgba(255,43,132,.5)!important;
          }
          
          .bg-sell-50-60 {
              background-color: rgba(255,43,132,.6)!important;
          }
          
          .bg-sell-50-70 {
              background-color: rgba(255,43,132,.7)!important;
          }
          
          .bg-sell-50-75 {
              background-color: rgba(255,43,132,.75)!important;
          }
          
          .bg-sell-50-80 {
              background-color: rgba(255,43,132,.8)!important;
          }
          
          .bg-sell-50-90 {
              background-color: rgba(255,43,132,.9)!important;
          }
          
          .bg-sell-50-95 {
              background-color: rgba(255,43,132,.95)!important;
          }
          
          .bg-sell-50-100 {
              background-color: #ff2b84!important;
          }
          
          .bg-sell-100-0 {
              background-color: rgba(255,64,143,0)!important;
          }
          
          .bg-sell-100-5 {
              background-color: rgba(255,64,143,.05)!important;
          }
          
          .bg-sell-100-10 {
              background-color: rgba(255,64,143,.1)!important;
          }
          
          .bg-sell-100-20 {
              background-color: rgba(255,64,143,.2)!important;
          }
          
          .bg-sell-100-25 {
              background-color: rgba(255,64,143,.25)!important;
          }
          
          .bg-sell-100-30 {
              background-color: rgba(255,64,143,.3)!important;
          }
          
          .bg-sell-100-40 {
              background-color: rgba(255,64,143,.4)!important;
          }
          
          .bg-sell-100-50 {
              background-color: rgba(255,64,143,.5)!important;
          }
          
          .bg-sell-100-60 {
              background-color: rgba(255,64,143,.6)!important;
          }
          
          .bg-sell-100-70 {
              background-color: rgba(255,64,143,.7)!important;
          }
          
          .bg-sell-100-75 {
              background-color: rgba(255,64,143,.75)!important;
          }
          
          .bg-sell-100-80 {
              background-color: rgba(255,64,143,.8)!important;
          }
          
          .bg-sell-100-90 {
              background-color: rgba(255,64,143,.9)!important;
          }
          
          .bg-sell-100-95 {
              background-color: rgba(255,64,143,.95)!important;
          }
          
          .bg-sell-100-100 {
              background-color: #ff408f!important;
          }
          
          .bg-sell-200-0 {
              background-color: rgba(255,84,154,0)!important;
          }
          
          .bg-sell-200-5 {
              background-color: rgba(255,84,154,.05)!important;
          }
          
          .bg-sell-200-10 {
              background-color: rgba(255,84,154,.1)!important;
          }
          
          .bg-sell-200-20 {
              background-color: rgba(255,84,154,.2)!important;
          }
          
          .bg-sell-200-25 {
              background-color: rgba(255,84,154,.25)!important;
          }
          
          .bg-sell-200-30 {
              background-color: rgba(255,84,154,.3)!important;
          }
          
          .bg-sell-200-40 {
              background-color: rgba(255,84,154,.4)!important;
          }
          
          .bg-sell-200-50 {
              background-color: rgba(255,84,154,.5)!important;
          }
          
          .bg-sell-200-60 {
              background-color: rgba(255,84,154,.6)!important;
          }
          
          .bg-sell-200-70 {
              background-color: rgba(255,84,154,.7)!important;
          }
          
          .bg-sell-200-75 {
              background-color: rgba(255,84,154,.75)!important;
          }
          
          .bg-sell-200-80 {
              background-color: rgba(255,84,154,.8)!important;
          }
          
          .bg-sell-200-90 {
              background-color: rgba(255,84,154,.9)!important;
          }
          
          .bg-sell-200-95 {
              background-color: rgba(255,84,154,.95)!important;
          }
          
          .bg-sell-200-100 {
              background-color: #ff549a!important;
          }
          
          .bg-sell-300-0 {
              background-color: rgba(255,105,165,0)!important;
          }
          
          .bg-sell-300-5 {
              background-color: rgba(255,105,165,.05)!important;
          }
          
          .bg-sell-300-10 {
              background-color: rgba(255,105,165,.1)!important;
          }
          
          .bg-sell-300-20 {
              background-color: rgba(255,105,165,.2)!important;
          }
          
          .bg-sell-300-25 {
              background-color: rgba(255,105,165,.25)!important;
          }
          
          .bg-sell-300-30 {
              background-color: rgba(255,105,165,.3)!important;
          }
          
          .bg-sell-300-40 {
              background-color: rgba(255,105,165,.4)!important;
          }
          
          .bg-sell-300-50 {
              background-color: rgba(255,105,165,.5)!important;
          }
          
          .bg-sell-300-60 {
              background-color: rgba(255,105,165,.6)!important;
          }
          
          .bg-sell-300-70 {
              background-color: rgba(255,105,165,.7)!important;
          }
          
          .bg-sell-300-75 {
              background-color: rgba(255,105,165,.75)!important;
          }
          
          .bg-sell-300-80 {
              background-color: rgba(255,105,165,.8)!important;
          }
          
          .bg-sell-300-90 {
              background-color: rgba(255,105,165,.9)!important;
          }
          
          .bg-sell-300-95 {
              background-color: rgba(255,105,165,.95)!important;
          }
          
          .bg-sell-300-100 {
              background-color: #ff69a5!important;
          }
          
          .bg-sell-400-0 {
              background-color: rgba(255,125,177,0)!important;
          }
          
          .bg-sell-400-5 {
              background-color: rgba(255,125,177,.05)!important;
          }
          
          .bg-sell-400-10 {
              background-color: rgba(255,125,177,.1)!important;
          }
          
          .bg-sell-400-20 {
              background-color: rgba(255,125,177,.2)!important;
          }
          
          .bg-sell-400-25 {
              background-color: rgba(255,125,177,.25)!important;
          }
          
          .bg-sell-400-30 {
              background-color: rgba(255,125,177,.3)!important;
          }
          
          .bg-sell-400-40 {
              background-color: rgba(255,125,177,.4)!important;
          }
          
          .bg-sell-400-50 {
              background-color: rgba(255,125,177,.5)!important;
          }
          
          .bg-sell-400-60 {
              background-color: rgba(255,125,177,.6)!important;
          }
          
          .bg-sell-400-70 {
              background-color: rgba(255,125,177,.7)!important;
          }
          
          .bg-sell-400-75 {
              background-color: rgba(255,125,177,.75)!important;
          }
          
          .bg-sell-400-80 {
              background-color: rgba(255,125,177,.8)!important;
          }
          
          .bg-sell-400-90 {
              background-color: rgba(255,125,177,.9)!important;
          }
          
          .bg-sell-400-95 {
              background-color: rgba(255,125,177,.95)!important;
          }
          
          .bg-sell-400-100 {
              background-color: #ff7db1!important;
          }
          
          .bg-sell-500-0 {
              background-color: rgba(255,146,189,0)!important;
          }
          
          .bg-sell-500-5 {
              background-color: rgba(255,146,189,.05)!important;
          }
          
          .bg-sell-500-10 {
              background-color: rgba(255,146,189,.1)!important;
          }
          
          .bg-sell-500-20 {
              background-color: rgba(255,146,189,.2)!important;
          }
          
          .bg-sell-500-25 {
              background-color: rgba(255,146,189,.25)!important;
          }
          
          .bg-sell-500-30 {
              background-color: rgba(255,146,189,.3)!important;
          }
          
          .bg-sell-500-40 {
              background-color: rgba(255,146,189,.4)!important;
          }
          
          .bg-sell-500-50 {
              background-color: rgba(255,146,189,.5)!important;
          }
          
          .bg-sell-500-60 {
              background-color: rgba(255,146,189,.6)!important;
          }
          
          .bg-sell-500-70 {
              background-color: rgba(255,146,189,.7)!important;
          }
          
          .bg-sell-500-75 {
              background-color: rgba(255,146,189,.75)!important;
          }
          
          .bg-sell-500-80 {
              background-color: rgba(255,146,189,.8)!important;
          }
          
          .bg-sell-500-90 {
              background-color: rgba(255,146,189,.9)!important;
          }
          
          .bg-sell-500-95 {
              background-color: rgba(255,146,189,.95)!important;
          }
          
          .bg-sell-500-100 {
              background-color: #ff92bd!important;
          }
          
          .bg-sell-600-0 {
              background-color: rgba(255,166,201,0)!important;
          }
          
          .bg-sell-600-5 {
              background-color: rgba(255,166,201,.05)!important;
          }
          
          .bg-sell-600-10 {
              background-color: rgba(255,166,201,.1)!important;
          }
          
          .bg-sell-600-20 {
              background-color: rgba(255,166,201,.2)!important;
          }
          
          .bg-sell-600-25 {
              background-color: rgba(255,166,201,.25)!important;
          }
          
          .bg-sell-600-30 {
              background-color: rgba(255,166,201,.3)!important;
          }
          
          .bg-sell-600-40 {
              background-color: rgba(255,166,201,.4)!important;
          }
          
          .bg-sell-600-50 {
              background-color: rgba(255,166,201,.5)!important;
          }
          
          .bg-sell-600-60 {
              background-color: rgba(255,166,201,.6)!important;
          }
          
          .bg-sell-600-70 {
              background-color: rgba(255,166,201,.7)!important;
          }
          
          .bg-sell-600-75 {
              background-color: rgba(255,166,201,.75)!important;
          }
          
          .bg-sell-600-80 {
              background-color: rgba(255,166,201,.8)!important;
          }
          
          .bg-sell-600-90 {
              background-color: rgba(255,166,201,.9)!important;
          }
          
          .bg-sell-600-95 {
              background-color: rgba(255,166,201,.95)!important;
          }
          
          .bg-sell-600-100 {
              background-color: #ffa6c9!important;
          }
          
          .bg-sell-700-0 {
              background-color: rgba(255,187,213,0)!important;
          }
          
          .bg-sell-700-5 {
              background-color: rgba(255,187,213,.05)!important;
          }
          
          .bg-sell-700-10 {
              background-color: rgba(255,187,213,.1)!important;
          }
          
          .bg-sell-700-20 {
              background-color: rgba(255,187,213,.2)!important;
          }
          
          .bg-sell-700-25 {
              background-color: rgba(255,187,213,.25)!important;
          }
          
          .bg-sell-700-30 {
              background-color: rgba(255,187,213,.3)!important;
          }
          
          .bg-sell-700-40 {
              background-color: rgba(255,187,213,.4)!important;
          }
          
          .bg-sell-700-50 {
              background-color: rgba(255,187,213,.5)!important;
          }
          
          .bg-sell-700-60 {
              background-color: rgba(255,187,213,.6)!important;
          }
          
          .bg-sell-700-70 {
              background-color: rgba(255,187,213,.7)!important;
          }
          
          .bg-sell-700-75 {
              background-color: rgba(255,187,213,.75)!important;
          }
          
          .bg-sell-700-80 {
              background-color: rgba(255,187,213,.8)!important;
          }
          
          .bg-sell-700-90 {
              background-color: rgba(255,187,213,.9)!important;
          }
          
          .bg-sell-700-95 {
              background-color: rgba(255,187,213,.95)!important;
          }
          
          .bg-sell-700-100 {
              background-color: #ffbbd5!important;
          }
          
          .bg-sell-800-0 {
              background-color: rgba(255,207,225,0)!important;
          }
          
          .bg-sell-800-5 {
              background-color: rgba(255,207,225,.05)!important;
          }
          
          .bg-sell-800-10 {
              background-color: rgba(255,207,225,.1)!important;
          }
          
          .bg-sell-800-20 {
              background-color: rgba(255,207,225,.2)!important;
          }
          
          .bg-sell-800-25 {
              background-color: rgba(255,207,225,.25)!important;
          }
          
          .bg-sell-800-30 {
              background-color: rgba(255,207,225,.3)!important;
          }
          
          .bg-sell-800-40 {
              background-color: rgba(255,207,225,.4)!important;
          }
          
          .bg-sell-800-50 {
              background-color: rgba(255,207,225,.5)!important;
          }
          
          .bg-sell-800-60 {
              background-color: rgba(255,207,225,.6)!important;
          }
          
          .bg-sell-800-70 {
              background-color: rgba(255,207,225,.7)!important;
          }
          
          .bg-sell-800-75 {
              background-color: rgba(255,207,225,.75)!important;
          }
          
          .bg-sell-800-80 {
              background-color: rgba(255,207,225,.8)!important;
          }
          
          .bg-sell-800-90 {
              background-color: rgba(255,207,225,.9)!important;
          }
          
          .bg-sell-800-95 {
              background-color: rgba(255,207,225,.95)!important;
          }
          
          .bg-sell-800-100 {
              background-color: #ffcfe1!important;
          }
          
          .bg-sell-900-0 {
              background-color: rgba(255,228,238,0)!important;
          }
          
          .bg-sell-900-5 {
              background-color: rgba(255,228,238,.05)!important;
          }
          
          .bg-sell-900-10 {
              background-color: rgba(255,228,238,.1)!important;
          }
          
          .bg-sell-900-20 {
              background-color: rgba(255,228,238,.2)!important;
          }
          
          .bg-sell-900-25 {
              background-color: rgba(255,228,238,.25)!important;
          }
          
          .bg-sell-900-30 {
              background-color: rgba(255,228,238,.3)!important;
          }
          
          .bg-sell-900-40 {
              background-color: rgba(255,228,238,.4)!important;
          }
          
          .bg-sell-900-50 {
              background-color: rgba(255,228,238,.5)!important;
          }
          
          .bg-sell-900-60 {
              background-color: rgba(255,228,238,.6)!important;
          }
          
          .bg-sell-900-70 {
              background-color: rgba(255,228,238,.7)!important;
          }
          
          .bg-sell-900-75 {
              background-color: rgba(255,228,238,.75)!important;
          }
          
          .bg-sell-900-80 {
              background-color: rgba(255,228,238,.8)!important;
          }
          
          .bg-sell-900-90 {
              background-color: rgba(255,228,238,.9)!important;
          }
          
          .bg-sell-900-95 {
              background-color: rgba(255,228,238,.95)!important;
          }
          
          .bg-sell-900-100 {
              background-color: #ffe4ee!important;
          }
          
          .bg-buy-50-0 {
              background-color: rgba(0,233,177,0)!important;
          }
          
          .bg-buy-50-5 {
              background-color: rgba(0,233,177,.05)!important;
          }
          
          .bg-buy-50-10 {
              background-color: rgba(0,233,177,.1)!important;
          }
          
          .bg-buy-50-20 {
              background-color: rgba(0,233,177,.2)!important;
          }
          
          .bg-buy-50-25 {
              background-color: rgba(0,233,177,.25)!important;
          }
          
          .bg-buy-50-30 {
              background-color: rgba(0,233,177,.3)!important;
          }
          
          .bg-buy-50-40 {
              background-color: rgba(0,233,177,.4)!important;
          }
          
          .bg-buy-50-50 {
              background-color: rgba(0,233,177,.5)!important;
          }
          
          .bg-buy-50-60 {
              background-color: rgba(0,233,177,.6)!important;
          }
          
          .bg-buy-50-70 {
              background-color: rgba(0,233,177,.7)!important;
          }
          
          .bg-buy-50-75 {
              background-color: rgba(0,233,177,.75)!important;
          }
          
          .bg-buy-50-80 {
              background-color: rgba(0,233,177,.8)!important;
          }
          
          .bg-buy-50-90 {
              background-color: rgba(0,233,177,.9)!important;
          }
          
          .bg-buy-50-95 {
              background-color: rgba(0,233,177,.95)!important;
          }
          
          .bg-buy-50-100 {
              background-color: #00e9b1!important;
          }
          
          .bg-buy-100-0 {
              background-color: rgba(23,235,182,0)!important;
          }
          
          .bg-buy-100-5 {
              background-color: rgba(23,235,182,.05)!important;
          }
          
          .bg-buy-100-10 {
              background-color: rgba(23,235,182,.1)!important;
          }
          
          .bg-buy-100-20 {
              background-color: rgba(23,235,182,.2)!important;
          }
          
          .bg-buy-100-25 {
              background-color: rgba(23,235,182,.25)!important;
          }
          
          .bg-buy-100-30 {
              background-color: rgba(23,235,182,.3)!important;
          }
          
          .bg-buy-100-40 {
              background-color: rgba(23,235,182,.4)!important;
          }
          
          .bg-buy-100-50 {
              background-color: rgba(23,235,182,.5)!important;
          }
          
          .bg-buy-100-60 {
              background-color: rgba(23,235,182,.6)!important;
          }
          
          .bg-buy-100-70 {
              background-color: rgba(23,235,182,.7)!important;
          }
          
          .bg-buy-100-75 {
              background-color: rgba(23,235,182,.75)!important;
          }
          
          .bg-buy-100-80 {
              background-color: rgba(23,235,182,.8)!important;
          }
          
          .bg-buy-100-90 {
              background-color: rgba(23,235,182,.9)!important;
          }
          
          .bg-buy-100-95 {
              background-color: rgba(23,235,182,.95)!important;
          }
          
          .bg-buy-100-100 {
              background-color: #17ebb6!important;
          }
          
          .bg-buy-200-0 {
              background-color: rgba(47,237,187,0)!important;
          }
          
          .bg-buy-200-5 {
              background-color: rgba(47,237,187,.05)!important;
          }
          
          .bg-buy-200-10 {
              background-color: rgba(47,237,187,.1)!important;
          }
          
          .bg-buy-200-20 {
              background-color: rgba(47,237,187,.2)!important;
          }
          
          .bg-buy-200-25 {
              background-color: rgba(47,237,187,.25)!important;
          }
          
          .bg-buy-200-30 {
              background-color: rgba(47,237,187,.3)!important;
          }
          
          .bg-buy-200-40 {
              background-color: rgba(47,237,187,.4)!important;
          }
          
          .bg-buy-200-50 {
              background-color: rgba(47,237,187,.5)!important;
          }
          
          .bg-buy-200-60 {
              background-color: rgba(47,237,187,.6)!important;
          }
          
          .bg-buy-200-70 {
              background-color: rgba(47,237,187,.7)!important;
          }
          
          .bg-buy-200-75 {
              background-color: rgba(47,237,187,.75)!important;
          }
          
          .bg-buy-200-80 {
              background-color: rgba(47,237,187,.8)!important;
          }
          
          .bg-buy-200-90 {
              background-color: rgba(47,237,187,.9)!important;
          }
          
          .bg-buy-200-95 {
              background-color: rgba(47,237,187,.95)!important;
          }
          
          .bg-buy-200-100 {
              background-color: #2fedbb!important;
          }
          
          .bg-buy-300-0 {
              background-color: rgba(71,239,193,0)!important;
          }
          
          .bg-buy-300-5 {
              background-color: rgba(71,239,193,.05)!important;
          }
          
          .bg-buy-300-10 {
              background-color: rgba(71,239,193,.1)!important;
          }
          
          .bg-buy-300-20 {
              background-color: rgba(71,239,193,.2)!important;
          }
          
          .bg-buy-300-25 {
              background-color: rgba(71,239,193,.25)!important;
          }
          
          .bg-buy-300-30 {
              background-color: rgba(71,239,193,.3)!important;
          }
          
          .bg-buy-300-40 {
              background-color: rgba(71,239,193,.4)!important;
          }
          
          .bg-buy-300-50 {
              background-color: rgba(71,239,193,.5)!important;
          }
          
          .bg-buy-300-60 {
              background-color: rgba(71,239,193,.6)!important;
          }
          
          .bg-buy-300-70 {
              background-color: rgba(71,239,193,.7)!important;
          }
          
          .bg-buy-300-75 {
              background-color: rgba(71,239,193,.75)!important;
          }
          
          .bg-buy-300-80 {
              background-color: rgba(71,239,193,.8)!important;
          }
          
          .bg-buy-300-90 {
              background-color: rgba(71,239,193,.9)!important;
          }
          
          .bg-buy-300-95 {
              background-color: rgba(71,239,193,.95)!important;
          }
          
          .bg-buy-300-100 {
              background-color: #47efc1!important;
          }
          
          .bg-buy-400-0 {
              background-color: rgba(96,241,200,0)!important;
          }
          
          .bg-buy-400-5 {
              background-color: rgba(96,241,200,.05)!important;
          }
          
          .bg-buy-400-10 {
              background-color: rgba(96,241,200,.1)!important;
          }
          
          .bg-buy-400-20 {
              background-color: rgba(96,241,200,.2)!important;
          }
          
          .bg-buy-400-25 {
              background-color: rgba(96,241,200,.25)!important;
          }
          
          .bg-buy-400-30 {
              background-color: rgba(96,241,200,.3)!important;
          }
          
          .bg-buy-400-40 {
              background-color: rgba(96,241,200,.4)!important;
          }
          
          .bg-buy-400-50 {
              background-color: rgba(96,241,200,.5)!important;
          }
          
          .bg-buy-400-60 {
              background-color: rgba(96,241,200,.6)!important;
          }
          
          .bg-buy-400-70 {
              background-color: rgba(96,241,200,.7)!important;
          }
          
          .bg-buy-400-75 {
              background-color: rgba(96,241,200,.75)!important;
          }
          
          .bg-buy-400-80 {
              background-color: rgba(96,241,200,.8)!important;
          }
          
          .bg-buy-400-90 {
              background-color: rgba(96,241,200,.9)!important;
          }
          
          .bg-buy-400-95 {
              background-color: rgba(96,241,200,.95)!important;
          }
          
          .bg-buy-400-100 {
              background-color: #60f1c8!important;
          }
          
          .bg-buy-500-0 {
              background-color: rgba(121,243,207,0)!important;
          }
          
          .bg-buy-500-5 {
              background-color: rgba(121,243,207,.05)!important;
          }
          
          .bg-buy-500-10 {
              background-color: rgba(121,243,207,.1)!important;
          }
          
          .bg-buy-500-20 {
              background-color: rgba(121,243,207,.2)!important;
          }
          
          .bg-buy-500-25 {
              background-color: rgba(121,243,207,.25)!important;
          }
          
          .bg-buy-500-30 {
              background-color: rgba(121,243,207,.3)!important;
          }
          
          .bg-buy-500-40 {
              background-color: rgba(121,243,207,.4)!important;
          }
          
          .bg-buy-500-50 {
              background-color: rgba(121,243,207,.5)!important;
          }
          
          .bg-buy-500-60 {
              background-color: rgba(121,243,207,.6)!important;
          }
          
          .bg-buy-500-70 {
              background-color: rgba(121,243,207,.7)!important;
          }
          
          .bg-buy-500-75 {
              background-color: rgba(121,243,207,.75)!important;
          }
          
          .bg-buy-500-80 {
              background-color: rgba(121,243,207,.8)!important;
          }
          
          .bg-buy-500-90 {
              background-color: rgba(121,243,207,.9)!important;
          }
          
          .bg-buy-500-95 {
              background-color: rgba(121,243,207,.95)!important;
          }
          
          .bg-buy-500-100 {
              background-color: #79f3cf!important;
          }
          
          .bg-buy-600-0 {
              background-color: rgba(147,245,215,0)!important;
          }
          
          .bg-buy-600-5 {
              background-color: rgba(147,245,215,.05)!important;
          }
          
          .bg-buy-600-10 {
              background-color: rgba(147,245,215,.1)!important;
          }
          
          .bg-buy-600-20 {
              background-color: rgba(147,245,215,.2)!important;
          }
          
          .bg-buy-600-25 {
              background-color: rgba(147,245,215,.25)!important;
          }
          
          .bg-buy-600-30 {
              background-color: rgba(147,245,215,.3)!important;
          }
          
          .bg-buy-600-40 {
              background-color: rgba(147,245,215,.4)!important;
          }
          
          .bg-buy-600-50 {
              background-color: rgba(147,245,215,.5)!important;
          }
          
          .bg-buy-600-60 {
              background-color: rgba(147,245,215,.6)!important;
          }
          
          .bg-buy-600-70 {
              background-color: rgba(147,245,215,.7)!important;
          }
          
          .bg-buy-600-75 {
              background-color: rgba(147,245,215,.75)!important;
          }
          
          .bg-buy-600-80 {
              background-color: rgba(147,245,215,.8)!important;
          }
          
          .bg-buy-600-90 {
              background-color: rgba(147,245,215,.9)!important;
          }
          
          .bg-buy-600-95 {
              background-color: rgba(147,245,215,.95)!important;
          }
          
          .bg-buy-600-100 {
              background-color: #93f5d7!important;
          }
          
          .bg-buy-700-0 {
              background-color: rgba(172,247,223,0)!important;
          }
          
          .bg-buy-700-5 {
              background-color: rgba(172,247,223,.05)!important;
          }
          
          .bg-buy-700-10 {
              background-color: rgba(172,247,223,.1)!important;
          }
          
          .bg-buy-700-20 {
              background-color: rgba(172,247,223,.2)!important;
          }
          
          .bg-buy-700-25 {
              background-color: rgba(172,247,223,.25)!important;
          }
          
          .bg-buy-700-30 {
              background-color: rgba(172,247,223,.3)!important;
          }
          
          .bg-buy-700-40 {
              background-color: rgba(172,247,223,.4)!important;
          }
          
          .bg-buy-700-50 {
              background-color: rgba(172,247,223,.5)!important;
          }
          
          .bg-buy-700-60 {
              background-color: rgba(172,247,223,.6)!important;
          }
          
          .bg-buy-700-70 {
              background-color: rgba(172,247,223,.7)!important;
          }
          
          .bg-buy-700-75 {
              background-color: rgba(172,247,223,.75)!important;
          }
          
          .bg-buy-700-80 {
              background-color: rgba(172,247,223,.8)!important;
          }
          
          .bg-buy-700-90 {
              background-color: rgba(172,247,223,.9)!important;
          }
          
          .bg-buy-700-95 {
              background-color: rgba(172,247,223,.95)!important;
          }
          
          .bg-buy-700-100 {
              background-color: #acf7df!important;
          }
          
          .bg-buy-800-0 {
              background-color: rgba(199,249,233,0)!important;
          }
          
          .bg-buy-800-5 {
              background-color: rgba(199,249,233,.05)!important;
          }
          
          .bg-buy-800-10 {
              background-color: rgba(199,249,233,.1)!important;
          }
          
          .bg-buy-800-20 {
              background-color: rgba(199,249,233,.2)!important;
          }
          
          .bg-buy-800-25 {
              background-color: rgba(199,249,233,.25)!important;
          }
          
          .bg-buy-800-30 {
              background-color: rgba(199,249,233,.3)!important;
          }
          
          .bg-buy-800-40 {
              background-color: rgba(199,249,233,.4)!important;
          }
          
          .bg-buy-800-50 {
              background-color: rgba(199,249,233,.5)!important;
          }
          
          .bg-buy-800-60 {
              background-color: rgba(199,249,233,.6)!important;
          }
          
          .bg-buy-800-70 {
              background-color: rgba(199,249,233,.7)!important;
          }
          
          .bg-buy-800-75 {
              background-color: rgba(199,249,233,.75)!important;
          }
          
          .bg-buy-800-80 {
              background-color: rgba(199,249,233,.8)!important;
          }
          
          .bg-buy-800-90 {
              background-color: rgba(199,249,233,.9)!important;
          }
          
          .bg-buy-800-95 {
              background-color: rgba(199,249,233,.95)!important;
          }
          
          .bg-buy-800-100 {
              background-color: #c7f9e9!important;
          }
          
          .bg-buy-900-0 {
              background-color: rgba(225,252,242,0)!important;
          }
          
          .bg-buy-900-5 {
              background-color: rgba(225,252,242,.05)!important;
          }
          
          .bg-buy-900-10 {
              background-color: rgba(225,252,242,.1)!important;
          }
          
          .bg-buy-900-20 {
              background-color: rgba(225,252,242,.2)!important;
          }
          
          .bg-buy-900-25 {
              background-color: rgba(225,252,242,.25)!important;
          }
          
          .bg-buy-900-30 {
              background-color: rgba(225,252,242,.3)!important;
          }
          
          .bg-buy-900-40 {
              background-color: rgba(225,252,242,.4)!important;
          }
          
          .bg-buy-900-50 {
              background-color: rgba(225,252,242,.5)!important;
          }
          
          .bg-buy-900-60 {
              background-color: rgba(225,252,242,.6)!important;
          }
          
          .bg-buy-900-70 {
              background-color: rgba(225,252,242,.7)!important;
          }
          
          .bg-buy-900-75 {
              background-color: rgba(225,252,242,.75)!important;
          }
          
          .bg-buy-900-80 {
              background-color: rgba(225,252,242,.8)!important;
          }
          
          .bg-buy-900-90 {
              background-color: rgba(225,252,242,.9)!important;
          }
          
          .bg-buy-900-95 {
              background-color: rgba(225,252,242,.95)!important;
          }
          
          .bg-buy-900-100 {
              background-color: #e1fcf2!important;
          }
          
          .bg-card {
              background-color: var(--card)!important;
          }
          
          .bg-white-a15 {
              background-color: hsla(0,0%,100%,.15)!important;
          }
          
          .bg-transparent {
              background-color: transparent!important;
          }
          
          .bg-buy {
              background-color: rgb(0 233 177/var(--tw-bg-opacity))!important;
          }
          
          .bg-23353C,.bg-buy {
              --tw-bg-opacity: 1!important;
          }
          
          .bg-23353C {
              background-color: rgb(35 53 60/var(--tw-bg-opacity))!important;
          }
          
          .bg-white {
              --tw-bg-opacity: 1!important;
              background-color: rgb(255 255 255/var(--tw-bg-opacity))!important;
          }
          
          .bg-white-a25 {
              background-color: hsla(0,0%,100%,.25)!important;
          }
          
          .bg-black {
              --tw-bg-opacity: 1!important;
              background-color: rgb(0 0 0/var(--tw-bg-opacity))!important;
          }
          
          .bg-white-a01 {
              background-color: hsla(0,0%,100%,.1)!important;
          }
          
          .bg-black-a75 {
              background-color: rgba(0,0,0,.75)!important;
          }
          
          .bg-black-a5 {
              background-color: rgba(0,0,0,.5)!important;
          }
          
          .bg-sell {
              --tw-bg-opacity: 1!important;
              background-color: rgb(255 43 132/var(--tw-bg-opacity))!important;
          }
          
          .bg-black-a4 {
              background-color: rgba(0,0,0,.4)!important;
          }
          
          .bg-gray-900 {
              --tw-bg-opacity: 1!important;
              background-color: rgb(17 24 39/var(--tw-bg-opacity))!important;
          }
          
          .bg-8c6fdf {
              --tw-bg-opacity: 1!important;
              background-color: rgb(140 111 223/var(--tw-bg-opacity))!important;
          }
          
          .bg-white-a3 {
              background-color: hsla(0,0%,100%,.3)!important;
          }
          
          .bg-black-a5 {
              background-color: rgba(0,0,0,.5)!important;
          }
          
          .bg-card-hover {
              background-color: var(--card-hover)!important;
          }
          
          .bg-blue-400 {
              --tw-bg-opacity: 1!important;
              background-color: rgb(96 165 250/var(--tw-bg-opacity))!important;
          }
          
          .bg-black-a25 {
              background-color: rgba(0,0,0,.25)!important;
          }
          
          .bg-sell-a25 {
              background-color: rgba(255,43,132,.25)!important;
          }
          
          .bg-white-a2 {
              background-color: hsla(0,0%,100%,.2)!important;
          }
          
          .bg-blue-600 {
              --tw-bg-opacity: 1!important;
              background-color: rgb(37 99 235/var(--tw-bg-opacity))!important;
          }
          
          .bg-gradient-to-b {
              background-image: linear-gradient(to bottom,var(--tw-gradient-stops))!important;
          }
          
          .bg-gradient-to-r {
              background-image: linear-gradient(to right,var(--tw-gradient-stops))!important;
          }
          
          .bg-gradient-to-t {
              background-image: linear-gradient(to top,var(--tw-gradient-stops))!important;
          }
          
          .bg-gradient-to-l {
              background-image: linear-gradient(to left,var(--tw-gradient-stops))!important;
          }
          
          .from-black {
              --tw-gradient-from: #000!important;
              --tw-gradient-to: transparent!important;
              --tw-gradient-stops: var(--tw-gradient-from),var(--tw-gradient-to)!important;
          }
          
          .from-white-a15 {
              --tw-gradient-from: hsla(0,0%,100%,.15)!important;
              --tw-gradient-to: hsla(0,0%,100%,0)!important;
              --tw-gradient-stops: var(--tw-gradient-from),var(--tw-gradient-to)!important;
          }
          
          .to-3BC4FF{
              --tw-gradient-to: #3bc4ff!important;
          }
          
          .to-sell {
              --tw-gradient-to: #ff2b84!important;
          }
          
          .to-buy {
              --tw-gradient-to: #00e9b1!important;
          }
          
          .to-blue-400 {
              --tw-gradient-to: #60a5fa!important;
          }
          
          .stroke-white-a25 {
              stroke: hsla(0,0%,100%,.25)!important;
          }
          
          .stroke-buy-500 {
              stroke: #79f3cf!important;
          }
          
          .stroke-3px {
              stroke-width: 3px!important;
          }
          
          .p-15 {
              padding: .375rem!important;
          }
          
          .p-1 {
              padding: .25rem!important;
          }
          
          .p-4 {
              padding: 1rem!important;
          }
          
          .p-6 {
              padding: 1.5rem!important;
          }
          
          .p-10 {
              padding: 2.5rem!important;
          }
          
          .p-2 {
              padding: .5rem!important;
          }
          
          .p-3 {
              padding: .75rem!important;
          }
          
          .p-7 {
              padding: 1.75rem!important;
          }
          
          .p-05 {
              padding: .125rem!important;
          }
          
          .p-0 {
              padding: 0!important;
          }
          
          .px-2 {
              padding-left: .5rem!important;
              padding-right: .5rem!important;
          }
          
          .py-1 {
              padding-bottom: .25rem!important;
              padding-top: .25rem!important;
          }
          
          .px-4 {
              padding-left: 1rem!important;
              padding-right: 1rem!important;
          }
          
          .py-2 {
              padding-bottom: .5rem!important;
              padding-top: .5rem!important;
          }
          
          .py-15 {
              padding-bottom: .375rem!important;
              padding-top: .375rem!important;
          }
          
          .py-6 {
              padding-bottom: 1.5rem!important;
              padding-top: 1.5rem!important;
          }
          
          .px-1 {
              padding-left: .25rem!important;
              padding-right: .25rem!important;
          }
          
          .px-3 {
              padding-left: .75rem!important;
              padding-right: .75rem!important;
          }
          
          .px-6 {
              padding-left: 1.5rem!important;
              padding-right: 1.5rem!important;
          }
          
          .px-15 {
              padding-left: .375rem!important;
              padding-right: .375rem!important;
          }
          
          .py-05 {
              padding-bottom: .125rem!important;
              padding-top: .125rem!important;
          }
          
          .py-0 {
              padding-bottom: 0!important;
              padding-top: 0!important;
          }
          
          .py-4 {
              padding-bottom: 1rem!important;
              padding-top: 1rem!important;
          }
          
          .px-1 {
              padding-left: .25rem!important;
              padding-right: .25rem!important;
          }
          
          .pt-36 {
              padding-top: 9rem!important;
          }
          
          .pl-8 {
              padding-left: 2rem!important;
          }
          
          .pr-2 {
              padding-right: .5rem!important;
          }
          
          .pt-8 {
              padding-top: 2rem!important;
          }
          
          .pr-1 {
              padding-right: .25rem!important;
          }
          
          .pt-4 {
              padding-top: 1rem!important;
          }
          
          .pt-1 {
              padding-top: .25rem!important;
          }
          
          .pl-4 {
              padding-left: 1rem!important;
          }
          
          .pl-40 {
              padding-left: 10rem!important;
          }
          
          .pl-2 {
              padding-left: .5rem!important;
          }
          
          .pr-4 {
              padding-right: 1rem!important;
          }
          
          .pt-6 {
              padding-top: 1.5rem!important;
          }
          
          .pl-1 {
              padding-left: .25rem!important;
          }
          
          .pr-6 {
              padding-right: 1.5rem!important;
          }
          
          .pb-6 {
              padding-bottom: 1.5rem!important;
          }
          
          .pb-5 {
              padding-bottom: 1.25rem!important;
          }
          
          .pl-3 {
              padding-left: .75rem!important;
          }
          
          .pr-8 {
              padding-right: 2rem!important;
          }
          
          .pt-05 {
              padding-top: .125rem!important;
          }
          
          .pt-0 {
              padding-top: 0!important;
          }
          
          .pb-4 {
              padding-bottom: 1rem!important;
          }
          
          .pt-2 {
              padding-top: .5rem!important;
          }
          
          .text-left {
              text-align: left!important;
          }
          
          .text-center {
              text-align: center!important;
          }
          
          .text-right {
              text-align: right!important;
          }
          
          .text-justify {
              text-align: justify!important;
          }
          
          .align-middle {
              vertical-align: middle!important;
          }
          
          .font-actor {
              font-family: Actor,system-ui,sans-serif!important;
          }
          
          .text-2xl {
              font-size: 1.5rem!important;
              line-height: 2rem!important;
          }
          
          .text-sm {
              font-size: .875rem!important;
              line-height: 1.25rem!important;
          }
          
          .text-7xl {
              font-size: 4.5rem!important;
              line-height: 1!important;
          }
          
          .text-25rem {
              font-size: 2.5rem!important;
          }
          
          .text-base {
              font-size: 1rem!important;
              line-height: 1.5rem!important;
          }
          
          .text-4xl {
              font-size: 2.25rem!important;
              line-height: 2.5rem!important;
          }
          
          .text-5xl {
              font-size: 3rem!important;
              line-height: 1!important;
          }
          
          .text-xs {
              font-size: .75rem!important;
              line-height: 1rem!important;
          }
          
          .text-xl {
              font-size: 1.25rem!important;
              line-height: 1.75rem!important;
          }
          
          .text-3xl {
              font-size: 1.875rem!important;
              line-height: 2.25rem!important;
          }
          
          .text-lg {
              font-size: 1.125rem!important;
              line-height: 1.75rem!important;
          }
          
          .text-05rem {
              font-size: .5rem!important;
          }
          
          .font-bold {
              font-weight: 700!important;
          }
          
          .font-semibold {
              font-weight: 600!important;
          }
          
          .font-medium {
              font-weight: 500!important;
          }
          
          .leading-none {
              line-height: 1!important;
          }
          
          .leading-10 {
              line-height: 2.5rem!important;
          }
          
          .leading-8 {
              line-height: 2rem!important;
          }
          
          .text-white-a8 {
              color: hsla(0,0%,100%,.8)!important;
          }
          
          .text-white-a6 {
              color: hsla(0,0%,100%,.6)!important;
          }
          
          .text-buy {
              color: rgb(0 233 177/var(--tw-text-opacity))!important;
          }
          
          .text-blue-400,.text-buy {
              --tw-text-opacity: 1!important;
          }
          
          .text-blue-400 {
              color: rgb(96 165 250/var(--tw-text-opacity))!important;
          }
          
          .text-sell {
              color: rgb(255 43 132/var(--tw-text-opacity))!important;
          }
          
          .text-sell,.text-white {
              --tw-text-opacity: 1!important;
          }
          
          .text-white {
              color: rgb(255 255 255/var(--tw-text-opacity))!important;
          }
          
          .text-white-a5 {
              color: hsla(0,0%,100%,.5)!important;
          }
          
          .text-black {
              --tw-text-opacity: 1!important;
              color: rgb(0 0 0/var(--tw-text-opacity))!important;
          }
          
          .text-black-a6 {
              color: rgba(0,0,0,.6)!important;
          }
          
          .text-white-a75 {
              color: hsla(0,0%,100%,.75)!important;
          }
          
          .text-sell-200 {
              --tw-text-opacity: 1!important;
              color: rgb(255 84 154/var(--tw-text-opacity))!important;
          }
          
          .text-white-a3 {
              color: hsla(0,0%,100%,.3)!important;
          }
          
          .text-14c2e5 {
              --tw-text-opacity: 1!important;
              color: rgb(20 194 229/var(--tw-text-opacity))!important;
          }
          
          .text-buy-500 {
              color: rgb(121 243 207/var(--tw-text-opacity))!important;
          }
          
          .text-buy-500,.text-cyan-300 {
              --tw-text-opacity: 1!important;
          }
          
          .text-cyan-300 {
              color: rgb(103 232 249/var(--tw-text-opacity))!important;
          }
          
          .text-#f7931a {
              --tw-text-opacity: 1!important;
              color: rgb(247 147 26/var(--tw-text-opacity))!important;
          }
          
          .text-white-a6 {
              color: hsla(0,0%,100%,.6)!important;
          }
          
          .underline {
              -webkit-text-decoration-line: underline!important;
              text-decoration-line: underline!important;
          }
          
          .underline-offset-2 {
              text-underline-offset: 2px!important;
          }
          
          .underline-offset-4 {
              text-underline-offset: 4px!important;
          }
          
          .opacity-50 {
              opacity: .5!important;
          }
          
          .opacity-0 {
              opacity: 0!important;
          }
          
          .opacity-100 {
              opacity: 1!important;
          }
          
          .shadow-xl {
              --tw-shadow: 0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.1)!important;
              --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color)!important;
          }
          
          .shadow-2xl,.shadow-xl {
              box-shadow: var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)!important;
          }
          
          .shadow-2xl {
              --tw-shadow: 0 25px 50px -12px rgba(0,0,0,.25)!important;
              --tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color)!important;
          }
          
          .shadow {
              --tw-shadow: 0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1)!important;
              --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color)!important;
          }

          .shadow,.shadow-20px-3px {
            box-shadow: var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)!important
          }
          
          .shadow-20px-3px {
              --tw-shadow: 0 0 20px 3px #00e9b1!important;
              --tw-shadow-colored: 0 0 20px 3px var(--tw-shadow-color)!important
          }
          
          .shadow-3px-1px {
              --tw-shadow: 0 0 3px 1px #00e9b1!important;
              --tw-shadow-colored: 0 0 3px 1px var(--tw-shadow-color)!important;
              box-shadow: var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)!important
          }
                  
          .shadow-black {
              --tw-shadow-color: #000!important;
              --tw-shadow: var(--tw-shadow-colored)!important;
          }
          
          .shadow-buy {
              --tw-shadow-color: #00e9b1!important;
              --tw-shadow: var(--tw-shadow-colored)!important;
          }
          
          .outline {
              outline-style: solid!important;
          }
          
          .ring-1 {
              --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)!important;
              --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color)!important;
          }
          
          .ring-1,.ring-2 {
              box-shadow: var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)!important;
          }
          
          .ring-2 {
              --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)!important;
              --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)!important;
          }
          
          .ring {
              --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)!important;
              --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)!important;
          }
          
          .ring,.ring-0 {
              box-shadow: var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)!important;
          }
          
          .ring-0 {
              --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)!important;
              --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(var(--tw-ring-offset-width)) var(--tw-ring-color)!important;
          }
          
          .ring-white {
              --tw-ring-opacity: 1!important;
              --tw-ring-color: rgb(255 255 255/var(--tw-ring-opacity))!important;
          }

          .ring-white-a25 {
            --tw-ring-color: hsla(0,0%,100%,.25)!important
          }
          
          .ring-white-a4 {
              --tw-ring-color: hsla(0,0%,100%,.4)!important
          }
                  
          .ring-sell {
              --tw-ring-opacity: 1!important;
              --tw-ring-color: rgb(255 43 132/var(--tw-ring-opacity))!important;
          }
          
          .ring-buy {
              --tw-ring-opacity: 1!important;
              --tw-ring-color: rgb(0 233 177/var(--tw-ring-opacity))!important;
          }
          
          .ring-cyan-300 {
              --tw-ring-opacity: 1!important;
              --tw-ring-color: rgb(103 232 249/var(--tw-ring-opacity))!important;
          }
                  
          .blur-sm {
              --tw-blur: blur(4px)!important;
          }
          
          .drop-shadow-2xl {
              --tw-drop-shadow: drop-shadow(0 25px 25px rgba(0,0,0,.15))!important;
          }
                  
          .grayscale {
              --tw-grayscale: grayscale(100%)!important;
          }
          
          .filter,.grayscale {
              filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)!important;
          }
          
          .backdrop-blur {
              --tw-backdrop-blur: blur(8px)!important;
          }
          
          .backdrop-blur,.backdrop-blur-2xl {
              -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)!important;
              backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)!important;
          }
          
          .backdrop-blur-2xl {
              --tw-backdrop-blur: blur(40px)!important;
          }
          
          .backdrop-blur-sm {
              --tw-backdrop-blur: blur(4px)!important;
              -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)!important;
              backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)!important;
          }
          
          .transition {
              transition-duration: .15s!important;
              transition-property: color,background-color,border-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-text-decoration-color,-webkit-backdrop-filter!important;
              transition-property: color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter!important;
              transition-property: color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-text-decoration-color,-webkit-backdrop-filter!important;
              transition-timing-function: cubic-bezier(.4,0,.2,1)!important;
          }
          
          .transition-shadow {
              transition-duration: .15s!important;
              transition-property: box-shadow!important;
              transition-timing-function: cubic-bezier(.4,0,.2,1)!important;
          }
          
          .transition-all {
              transition-duration: .15s!important;
              transition-property: all!important;
              transition-timing-function: cubic-bezier(.4,0,.2,1)!important;
          }
          
          .transition-opacity {
              transition-duration: .15s!important;
              transition-property: opacity!important;
              transition-timing-function: cubic-bezier(.4,0,.2,1)!important;
          }
          
          .transition-transform {
              transition-duration: .15s!important;
              transition-property: transform!important;
              transition-timing-function: cubic-bezier(.4,0,.2,1)!important;
          }
          
          .transition-max-height {
              transition-duration: .15s!important;
              transition-property: max-height!important;
              transition-timing-function: cubic-bezier(.4,0,.2,1)!important;
          }
          
          .delay-100 {
              transition-delay: .1s!important;
          }
          
          .duration-500 {
              transition-duration: .5s!important;
          }
          
          .duration-300 {
              transition-duration: .3s!important;
          }
          
          .duration-150 {
              transition-duration: .15s!important;
          }
          
          .duration-100 {
              transition-duration: .1s!important;
          }
          
          .duration-200 {
              transition-duration: .2s!important;
          }
          
          .ease-out {
              transition-timing-function: cubic-bezier(0,0,.2,1)!important;
          }
          
          .ease-in {
              transition-timing-function: cubic-bezier(.4,0,1,1)!important;
          }
          
          .ease-in-out {
              transition-timing-function: cubic-bezier(.4,0,.2,1)!important;
          }
          
          .text-glow {
              text-shadow: 0 0 12px!important;
          }
          
          .text-glow-sm {
              text-shadow: 0 0 6px!important;
          }
          
          :root {
              --buy: #00e9b1;
              --sell: #ff2b84;
              --card: hsla(0,0%,100%,.1);
              --card-hover: hsla(0,0%,100%,.2);
          }
          
          .placeholder-text-white-a5::-moz-placeholder {
              color: hsla(0,0%,100%,.5)!important;
          }
          
          .placeholder-text-white-a5::placeholder {
              color: hsla(0,0%,100%,.5)!important;
          }
          
          .after-absolute:after {
              content: var(--tw-content)!important;
              position: absolute!important;
          }
          
          .after-top-2px:after {
              content: var(--tw-content)!important;
              top: 2px!important;
          }
          
          .after-left-2px:after {
              content: var(--tw-content)!important;
              left: 2px!important;
          }
          
          .after-h-5:after {
              content: var(--tw-content)!important;
              height: 1.25rem!important;
          }
          
          .after-w-5:after {
              content: var(--tw-content)!important;
              width: 1.25rem!important;
          }
          
          .after-rounded-full:after {
              border-radius: 9999px!important;
              content: var(--tw-content)!important;
          }
          
          .after-bg-white:after {
              --tw-bg-opacity: 1!important;
              background-color: rgb(255 255 255/var(--tw-bg-opacity))!important;
              content: var(--tw-content)!important;
          }          
          .after-transition-all:after {
              content: var(--tw-content)!important;
              transition-duration: .15s!important;
              transition-property: all!important;
              transition-timing-function: cubic-bezier(.4,0,.2,1)!important;
          }
          .hover-shadow-buy:hover {
            --tw-shadow-color: #00e9b1!important;
            --tw-shadow: var(--tw-shadow-colored)!important;
          }
          .hover-text-white:hover {
            --tw-text-opacity: 1!important;
            color: rgb(255 255 255/var(--tw-text-opacity))!important;
          }
          .hover-translate-y-4:hover, .hover-translate-y-1:hover {
            transform: translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))!important;
          }
          .hover-translate-y-4:hover {
            --tw-translate-y: -1rem!important;
          }
          @media (min-width:640px){
            .sm-w-80{
                width:20rem!important;
            }
            .sm-w-1-2{
                width:50%!important;
            }
            .sm-flex-row{
                flex-direction:row!important;
            }
            .sm-space-x-4>:not([hidden])~:not([hidden]){
                --tw-space-x-reverse:0!important;
                margin-left:calc(1rem*(1 - var(--tw-space-x-reverse)))!important;
                margin-right:calc(1rem*var(--tw-space-x-reverse))!important;
            }
        }
            @media (min-width:768px){
                .md:w-1-2{
                    width:50%!important;
                }
            }
          @media (min-width: 1024px) {
            .lg-px-0 {
                padding-left: 0!important;
                padding-right: 0!important;
            }
            .lg-flex {
              display: flex!important;
            }
            .lg-hidden {
              display: none!important;
            }
            .lg-mt-32 {
              margin-top: 8rem!important;
            }
            .lg-text-base {
              font-size: 1rem!important;
              line-height: 1.5rem!important;
            }
            .lg-ml-2 {
              margin-left: 0.5rem!important;
            }
            .lg-mt-0 {
              margin-top: 0!important;
            }
            .lg-flex-row {
              flex-direction: row!important;
            }
            .lg-w-3-5 {
              width: 60%!important;
            }
            .lg-w-2-5 {
              width: 40%!important;
            }
            .lg-space-x-8>:not([hidden])~:not([hidden]) {
              --tw-space-x-reverse: 0!important;
              margin-left: calc(2rem*(1 - var(--tw-space-x-reverse)))!important;
              margin-right: calc(2rem*var(--tw-space-x-reverse))!important;
            }
            .lg-space-y-0>:not([hidden])~:not([hidden]) {
              --tw-space-y-reverse: 0!important;
              margin-bottom: calc(0px*var(--tw-space-y-reverse))!important;
              margin-top: calc(0px*(1 - var(--tw-space-y-reverse)))!important;
            }
            .lg-w-7-12 {
              width: 58.333333%!important;
            }
            .lg-mt-16 {
              margin-top: -4rem!important;
            }
            .lg-float-right {
              float: right!important;
            }
            .lg-mt-80 {
              margin-top: 20rem!important;
            }
            .lg-px-28 {
              padding-left: 7rem!important;
              padding-right: 7rem!important;
            }
            .lg-translate-y-8 {
              --tw-translate-y: -2rem!important;
              transform: translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))!important;
            }
            .lg-hover-translate-y-12:hover {
              --tw-translate-y: -3rem!important;
              transform: translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))!important;
            }
            .lg-text-6xl {
              font-size: 3.75rem!important;
              line-height: 1!important;
            }
            .lg-text-left {
              text-align: left!important;
            }
            .lg-inline {
              display: inline!important;
            }            
          }

          @media (min-width: 1280px) {
            .xl-mt-14 {
                margin-top: 3.5rem!important;
            }
          }
          @media (min-width: 1536px) {
            .dxl-hidden {
                display: none!important;
            }
          }
          svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
            overflow: visible;
            box-sizing: content-box;
          }
          .fa-2xl {
            font-size: 2em;
            line-height: 0.03125em;
            vertical-align: -0.1875em;
          }
          .svg-inline--fa.fa-2xl {
            vertical-align: -0.3125em;
          }
          .svg-inline--fa.fa-lg {
            vertical-align: -0.2em;
          } 
          .svg-inline--fa.fa-fw {
            width: var(--fa-fw-width, 1.25em);
          }
          .fa-lg {
            font-size: 1.25em;
            line-height: 0.05em;
            vertical-align: -0.075em;
          }          
          .svg-inline--fa {
              display: var(--fa-display, inline-block);
              height: 1em;
              overflow: visible;
              vertical-align: -0.125em;
          }
          .fa-fw {
            text-align: center;
            width: 1.25em;
          }
          .fa-2x {
            font-size: 2em;
          }
          
        `}
      </style>
      <div className="container relative mx-auto px-2 pt-36 lg-px-0">
        <div className="-mt-36 hidden h-screen w-auto flex-col justify-center lg-flex">
          <div className="flex items-center space-x-4">
            <div className="w-4-6">
              <h1 className="font-actor text-7xl leading-none text-white">
              <span className="font-bold text-buy text-glow">Most Powerful</span><br />
                DeFi Protocol<br />
                to bring back<br />
                cryptocurrency
              </h1>
              <div className="mt-8 ml-3 flex items-center space-x-3">
                <a href="https://twitter.com/morodex11" target="_blank" rel="noreferrer">
                  <svg aria-hidden="true" focusable="false" data-prefix="fab"
                    data-icon="twitter" className="svg-inline--fa fa-twitter fa-lg text-white-a5 hover-text-white"
                    role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor"
                      d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z">
                    </path>
                  </svg>
                </a>
                <a href="https://t.me/morodex2" target="_blank" rel="noreferrer">
                  <svg aria-hidden="true"
                    focusable="false" data-prefix="fab" data-icon="telegram"
                    className="svg-inline--fa fa-telegram fa-lg text-white-a5 hover-text-white" role="img"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                    <path fill="currentColor"
                      d="M248 8C111 8 0 119 0 256S111 504 248 504 496 392.1 496 256 384.1 8 248 8zM362.1 176.7c-3.732 39.22-19.88 134.4-28.1 178.3-3.476 18.58-10.32 24.82-16.95 25.42-14.4 1.326-25.34-9.517-39.29-18.66-21.83-14.31-34.16-23.22-55.35-37.18-24.49-16.14-8.612-25 5.342-39.5 3.652-3.793 67.11-61.51 68.33-66.75 .153-.655 .3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283 .746-104.6 69.14-14.85 10.19-26.89 9.934c-8.855-.191-25.89-5.006-38.55-9.123-15.53-5.048-27.88-7.717-26.8-16.29q.84-6.7 18.45-13.7 108.4-47.25 144.6-62.3c68.87-28.65 83.18-33.62 92.51-33.79 2.052-.034 6.639 .474 9.61 2.885a10.45 10.45 0 0 1 3.53 6.716A43.76 43.76 0 0 1 362.1 176.7z">
                    </path>
                  </svg>
                </a>
                {/* <a href="https://t.me/morodex2" target="_blank" rel="noreferrer">
                  <svg
                    aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-group"
                    className="svg-inline--fa fa-user-group fa-lg text-white-a5 hover-text-white" role="img"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                    <path fill="currentColor"
                      d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z">
                    </path>
                  </svg>
                </a> */}
                {/* <a href="https://github.com/SmarDex-Dev/smart-contracts" target="_blank"
                  rel="noreferrer">
                  <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github"
                    className="svg-inline--fa fa-github fa-lg text-white-a5 hover-text-white" role="img"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                    <path fill="currentColor"
                      d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z">
                    </path>
                  </svg>
                </a> */}
              </div>
              {/* <div className="mt-8 ml-3 inline-block">
                <a href="#" target="_blank"
                  rel="noreferrer" className="flex items-center space-x-1 rounded bg-8c6fdf px-2 py-1 text-white">
                  <div className="relative"><svg aria-hidden="true" focusable="false" data-prefix="fas"
                    data-icon="shield-halved"
                    className="svg-inline--fa fa-shield-halved fa-fw fa-lg custom-animate-ping absolute inset-0"
                    role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor"
                      d="M256-.0078C260.7-.0081 265.2 1.008 269.4 2.913L457.7 82.79C479.7 92.12 496.2 113.8 496 139.1C495.5 239.2 454.7 420.7 282.4 503.2C265.7 511.1 246.3 511.1 229.6 503.2C57.25 420.7 16.49 239.2 15.1 139.1C15.87 113.8 32.32 92.12 54.3 82.79L242.7 2.913C246.8 1.008 251.4-.0081 256-.0078V-.0078zM256 444.8C393.1 378 431.1 230.1 432 141.4L256 66.77L256 444.8z">
                    </path>
                  </svg><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="shield-halved"
                    className="svg-inline--fa fa-shield-halved fa-fw fa-lg " role="img"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="currentColor"
                        d="M256-.0078C260.7-.0081 265.2 1.008 269.4 2.913L457.7 82.79C479.7 92.12 496.2 113.8 496 139.1C495.5 239.2 454.7 420.7 282.4 503.2C265.7 511.1 246.3 511.1 229.6 503.2C57.25 420.7 16.49 239.2 15.1 139.1C15.87 113.8 32.32 92.12 54.3 82.79L242.7 2.913C246.8 1.008 251.4-.0081 256-.0078V-.0078zM256 444.8C393.1 378 431.1 230.1 432 141.4L256 66.77L256 444.8z">
                      </path>
                    </svg>
                    </div>
                    <span className="font-semibold">Audit by Paladin</span>
                </a>
              </div> */}
            </div>
            <div className="flex w-2-6 flex-col">
              {/* <iframe
                className="mb-8 aspect-video rounded-lg bg-buy shadow-xl shadow-buy xl-mt-14 2xl-mt-24"
                src="https://www.youtube.com/embed/Ueo2GszRzSc?rel=0" title="MoroDex Teaser"
                allow="accelerometer; autoplay; gyroscope; web-share">
              </iframe> */}
              <div className='text-white-a8 text-xl text-justify' style={{marginBottom: '25px', textJustify:'inter-word'}}>
                MoroDex is a crypto project that is released by USDFI and is a live implementation of a cutting-edge DeFi banking protocol. The protocol is designed as a universal banking layer that enables users to access several services on a single platform. From core services like staking to trading tokens to lending and borrowing a MoroDex
              </div>
              <div className="flex items-center space-x-4">
                <div
                  className="relative flex h-24 flex-1 flex-col justify-center space-y-2 rounded-xl bg-23353C px-2 text-center shadow-xl shadow-black">
                  <div className="text-25rem font-bold text-white">$0.03</div>
                  <div className="absolute inset-x-1 bottom-1 text-base text-white-a6">MDEX Value</div>
                </div>
                <div
                  className="relative flex h-24 flex-1 flex-col justify-center space-y-2 rounded-xl bg-white px-2 text-center shadow-xl shadow-black">
                  <div className="text-25rem font-bold text-black">37M</div>
                  <div className="absolute inset-x-1 bottom-1 text-base text-black-a6">Total Value Locked</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="-mt-36 flex h-screen w-auto flex-col justify-center lg-hidden">
          <div>
            <h1 className="font-actor text-4xl leading-none text-white">
            <span className="font-bold text-buy text-glow">Most Powerful</span><br />
                DeFi Protocol<br />
                to bring back<br />
                cryptocurrency
            </h1>
            <div className="mt-3 ml-2 flex items-center space-x-3">
              <a href="https://twitter.com/morodex11"
                target="_blank" rel="noreferrer">
                <svg aria-hidden="true" focusable="false" data-prefix="fab"
                  data-icon="twitter" className="svg-inline--fa fa-twitter fa-lg text-white-a5 hover-text-white"
                  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z">
                  </path>
                </svg>
              </a>
              <a href="https://t.me/morodex2" target="_blank" rel="noreferrer">
                <svg aria-hidden="true"
                  focusable="false" data-prefix="fab" data-icon="telegram"
                  className="svg-inline--fa fa-telegram fa-lg text-white-a5 hover-text-white" role="img"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                  <path fill="currentColor"
                    d="M248 8C111 8 0 119 0 256S111 504 248 504 496 392.1 496 256 384.1 8 248 8zM362.1 176.7c-3.732 39.22-19.88 134.4-28.1 178.3-3.476 18.58-10.32 24.82-16.95 25.42-14.4 1.326-25.34-9.517-39.29-18.66-21.83-14.31-34.16-23.22-55.35-37.18-24.49-16.14-8.612-25 5.342-39.5 3.652-3.793 67.11-61.51 68.33-66.75 .153-.655 .3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283 .746-104.6 69.14-14.85 10.19-26.89 9.934c-8.855-.191-25.89-5.006-38.55-9.123-15.53-5.048-27.88-7.717-26.8-16.29q.84-6.7 18.45-13.7 108.4-47.25 144.6-62.3c68.87-28.65 83.18-33.62 92.51-33.79 2.052-.034 6.639 .474 9.61 2.885a10.45 10.45 0 0 1 3.53 6.716A43.76 43.76 0 0 1 362.1 176.7z">
                  </path>
                </svg>
              </a>
              {/* <a href="https://t.me/morodex2" target="_blank" rel="noreferrer">
                <svg
                  aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-group"
                  className="svg-inline--fa fa-user-group fa-lg text-white-a5 hover-text-white" role="img"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path fill="currentColor"
                    d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z">
                  </path>
                </svg>
              </a> */}
              {/* <a href="https://github.com/SmarDex-Dev/smart-contracts" target="_blank" rel="noreferrer">
                <svg
                  aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github"
                  className="svg-inline--fa fa-github fa-lg text-white-a5 hover-text-white" role="img"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                  <path fill="currentColor"
                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z">
                  </path>
                </svg>
              </a> */}
            </div>
            {/* <div className="mt-6 ml-2 inline-block text-sm">
              <a href="https://paladinsec.co/projects/smardex/"
                target="_blank" rel="noreferrer"
                className="flex items-center space-x-1 rounded bg-8c6fdf px-2 py-1 text-white">
                <div className="relative">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas"
                    data-icon="shield-halved"
                    className="svg-inline--fa fa-shield-halved fa-fw fa-lg custom-animate-ping absolute inset-0"
                    role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor"
                      d="M256-.0078C260.7-.0081 265.2 1.008 269.4 2.913L457.7 82.79C479.7 92.12 496.2 113.8 496 139.1C495.5 239.2 454.7 420.7 282.4 503.2C265.7 511.1 246.3 511.1 229.6 503.2C57.25 420.7 16.49 239.2 15.1 139.1C15.87 113.8 32.32 92.12 54.3 82.79L242.7 2.913C246.8 1.008 251.4-.0081 256-.0078V-.0078zM256 444.8C393.1 378 431.1 230.1 432 141.4L256 66.77L256 444.8z">
                    </path>
                  </svg>
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="shield-halved"
                    className="svg-inline--fa fa-shield-halved fa-fw fa-lg " role="img"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor"
                      d="M256-.0078C260.7-.0081 265.2 1.008 269.4 2.913L457.7 82.79C479.7 92.12 496.2 113.8 496 139.1C495.5 239.2 454.7 420.7 282.4 503.2C265.7 511.1 246.3 511.1 229.6 503.2C57.25 420.7 16.49 239.2 15.1 139.1C15.87 113.8 32.32 92.12 54.3 82.79L242.7 2.913C246.8 1.008 251.4-.0081 256-.0078V-.0078zM256 444.8C393.1 378 431.1 230.1 432 141.4L256 66.77L256 444.8z">
                    </path>
                  </svg>
                </div>
                <span className="font-semibold">Audit by Paladin</span>
              </a>
            </div> */}
            <div className="mt-10 mb-8 flex justify-center text-white-a8 text-lg text-justify" style={{overflowWrap:'break-word'}}>
              {/* <iframe
                className="aspect-video rounded-lg bg-buy shadow-xl shadow-buy"
                src="https://www.youtube.com/embed/Ueo2GszRzSc?rel=0" title="MoroDex Teaser"
                allow="accelerometer; autoplay; gyroscope; web-share">
              </iframe> */}
              MoroDex is a crypto project that is released by USDFI and is a live implementation of a cutting-edge DeFi banking protocol. The protocol is designed as a universal banking layer that enables users to access several services on a single platform. From core services like staking to trading tokens to lending and borrowing a MoroDex
            </div>
          </div>
        </div>
        <div className="-mt-14 text-center dxl-hidden">
          <svg aria-hidden="true" focusable="false" data-prefix="fas"
            data-icon="chevron-down" className="svg-inline--fa fa-chevron-down h-6 w-6 animate-bounce text-buy"
            role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path fill="currentColor"
              d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z">
            </path>
          </svg>
        </div>
        <div className="mt-32 lg-hidden">
          <div>
            <div
              className="relative flex h-36 w-3-4 flex-col justify-center space-y-2 rounded-xl bg-23353C px-2 text-center shadow-xl shadow-black">
              <div className="text-5xl font-bold text-white">$0.03</div>
              <div className="absolute inset-x-1 top-2 text-base text-white-a6">MDEX Value</div>
            </div>
          </div>
          <div className="-mt-8">
            <div
              className="relative float-right flex h-36 w-3-4 flex-col justify-center space-y-2 rounded-xl bg-white px-2 text-center shadow-xl shadow-black">
              <div className="text-5xl font-bold text-black">37M</div>
              <div className="absolute inset-x-1 top-2 text-base text-black-a6">Total Value Locked</div>
            </div>
          </div>
        </div>
        <div className="mt-72 lg-mt-32 2xl-mt-0">
          <h3 className="inline rounded-full bg-white-a15 px-4 py-2 font-actor text-xs text-white lg-text-base">Our
            core brings competitive advantage</h3>
          <h2 className="my-10 text-left font-actor text-4xl text-white">
            MORODEX sophisticated fine tuned algorithm
            transforms<br />
            <span className="text-sell">impermanent loss</span> to <span className="font-semibold text-buy">impermanent gain</span>
            {/* <div className="mt-4 inline-block text-base lg-mt-0 lg-ml-2">
              <a className="flex items-center space-x-1 rounded bg-buy px-2 py-1 text-black ring-white-a4 transition-shadow hover-ring"
                href="/simulator">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chart-line"
                  className="svg-inline--fa fa-chart-line fa-fw fa-lg " role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M64 400C64 408.8 71.16 416 80 416H480C497.7 416 512 430.3 512 448C512 465.7 497.7 480 480 480H80C35.82 480 0 444.2 0 400V64C0 46.33 14.33 32 32 32C49.67 32 64 46.33 64 64V400zM342.6 278.6C330.1 291.1 309.9 291.1 297.4 278.6L240 221.3L150.6 310.6C138.1 323.1 117.9 323.1 105.4 310.6C92.88 298.1 92.88 277.9 105.4 265.4L217.4 153.4C229.9 140.9 250.1 140.9 262.6 153.4L320 210.7L425.4 105.4C437.9 92.88 458.1 92.88 470.6 105.4C483.1 117.9 483.1 138.1 470.6 150.6L342.6 278.6z">
                  </path>
                </svg>
                <span>Simulate Our Algorithm Now</span>
              </a>
            </div> */}
          </h2>
          <div className="flex flex-col items-center space-y-14 lg-flex-row lg-space-y-0 lg-space-x-8">
            <div className="w-full shrink lg-w-3-5">
              <div className="overflow-hidden rounded-xl border border-white-a5 bg-transparent shadow-xl shadow-black">
                {/* <LogChart
                  chartData={chartData}
                  protocolData={protocolData}
                  currentDate={currentDate}
                  valueProperty="liquidityUSD"
                  title={'Liquidity'}
                  ChartComponent={LineChart}
                /> */}
                <div className="recharts-responsive-container" style={{ width: "100%", height: "350px" }}>
                  <div className="recharts-wrapper" role="region"
                    style={{ position: "relative", cursor: "default", width: "747px", height: "350px" }}>
                    <svg className="recharts-surface" width="747" height="350" viewBox="0 0 747 350">
                      <title></title>
                      <desc></desc>
                      <defs>
                        <clipPath id="recharts1-clip">
                          <rect x="75" y="0" height="320" width="587"></rect>
                        </clipPath>
                      </defs>
                      <g className="recharts-cartesian-grid">
                        <g className="recharts-cartesian-grid-horizontal">
                          <line stroke="#fff" stroke-opacity="0.2" fill="none" x="75" y="0" width="587" height="320"
                            offset="[object Object]" x1="75" y1="167.61904761904762" x2="662" y2="167.61904761904762">
                          </line>
                          <line stroke="#fff" stroke-opacity="0.2" fill="none" x="75" y="0" width="587" height="320"
                            offset="[object Object]" x1="75" y1="129.52380952380952" x2="662" y2="129.52380952380952">
                          </line>
                          <line stroke="#fff" stroke-opacity="0.2" fill="none" x="75" y="0" width="587" height="320"
                            offset="[object Object]" x1="75" y1="91.42857142857142" x2="662" y2="91.42857142857142">
                          </line>
                          <line stroke="#fff" stroke-opacity="0.2" fill="none" x="75" y="0" width="587" height="320"
                            offset="[object Object]" x1="75" y1="53.33333333333332" x2="662" y2="53.33333333333332">
                          </line>
                          <line stroke="#fff" stroke-opacity="0.2" fill="none" x="75" y="0" width="587" height="320"
                            offset="[object Object]" x1="75" y1="15.238095238095255" x2="662" y2="15.238095238095255">
                          </line>
                          <line stroke="#fff" stroke-opacity="0.2" fill="none" x="75" y="0" width="587" height="320"
                            offset="[object Object]" x1="75" y1="0" x2="662" y2="0"></line>
                          <line stroke="#fff" stroke-opacity="0.2" fill="none" x="75" y="0" width="587" height="320"
                            offset="[object Object]" x1="75" y1="320" x2="662" y2="320"></line>
                        </g>
                        <g className="recharts-cartesian-grid-vertical">
                          <line stroke="#fff" stroke-opacity="0.2" fill="none" x="75" y="0" width="587" height="320"
                            offset="[object Object]" x1="75" y1="0" x2="75" y2="320"></line>
                          <line stroke="#fff" stroke-opacity="0.2" fill="none" x="75" y="0" width="587" height="320"
                            offset="[object Object]" x1="192.4" y1="0" x2="192.4" y2="320"></line>
                          <line stroke="#fff" stroke-opacity="0.2" fill="none" x="75" y="0" width="587" height="320"
                            offset="[object Object]" x1="309.8" y1="0" x2="309.8" y2="320"></line>
                          <line stroke="#fff" stroke-opacity="0.2" fill="none" x="75" y="0" width="587" height="320"
                            offset="[object Object]" x1="427.20000000000005" y1="0" x2="427.20000000000005" y2="320">
                          </line>
                          <line stroke="#fff" stroke-opacity="0.2" fill="none" x="75" y="0" width="587" height="320"
                            offset="[object Object]" x1="544.6" y1="0" x2="544.6" y2="320"></line>
                          <line stroke="#fff" stroke-opacity="0.2" fill="none" x="75" y="0" width="587" height="320"
                            offset="[object Object]" x1="662" y1="0" x2="662" y2="320"></line>
                        </g>
                      </g>
                      <g className="recharts-layer recharts-reference-line">
                        <line y="0" stroke-width="1" fill="#fff" stroke="#ccc" fill-opacity="1" x1="75"
                          y1="91.42857142857142" x2="662" y2="91.42857142857142"
                          className="recharts-reference-line-line"></line>
                      </g>
                      <g className="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis">
                        <line orientation="bottom" width="587" height="30" type="category" x="75" y="320"
                          className="recharts-cartesian-axis-line" stroke="#666" fill="none" x1="75" y1="320" x2="662"
                          y2="320"></line>
                        <g className="recharts-cartesian-axis-ticks">
                          <g className="recharts-layer recharts-cartesian-axis-tick">
                            <line orientation="bottom" width="587" height="30" type="category" x="75" y="320"
                              className="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="75" y1="326"
                              x2="75" y2="320"></line><text orientation="bottom" width="587" height="30" type="category"
                                x="75" y="328" stroke="none" fill="#666" font-size="12"
                                className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="middle">
                              <tspan x="75" dy="0.71em">2018</tspan>
                            </text>
                          </g>
                          <g className="recharts-layer recharts-cartesian-axis-tick">
                            <line orientation="bottom" width="587" height="30" type="category" x="75" y="320"
                              className="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="192.4"
                              y1="326" x2="192.4" y2="320"></line><text orientation="bottom" width="587" height="30"
                                type="category" x="192.4" y="328" stroke="none" fill="#666" font-size="12"
                                className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="middle">
                              <tspan x="192.4" dy="0.71em">2019</tspan>
                            </text>
                          </g>
                          <g className="recharts-layer recharts-cartesian-axis-tick">
                            <line orientation="bottom" width="587" height="30" type="category" x="75" y="320"
                              className="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="309.8"
                              y1="326" x2="309.8" y2="320"></line><text orientation="bottom" width="587" height="30"
                                type="category" x="309.8" y="328" stroke="none" fill="#666" font-size="12"
                                className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="middle">
                              <tspan x="309.8" dy="0.71em">2020</tspan>
                            </text>
                          </g>
                          <g className="recharts-layer recharts-cartesian-axis-tick">
                            <line orientation="bottom" width="587" height="30" type="category" x="75" y="320"
                              className="recharts-cartesian-axis-tick-line" stroke="#666" fill="none"
                              x1="427.20000000000005" y1="326" x2="427.20000000000005" y2="320"></line><text
                                orientation="bottom" width="587" height="30" type="category" x="427.20000000000005"
                                y="328" stroke="none" fill="#666" font-size="12"
                                className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="middle">
                              <tspan x="427.20000000000005" dy="0.71em">2021</tspan>
                            </text>
                          </g>
                          <g className="recharts-layer recharts-cartesian-axis-tick">
                            <line orientation="bottom" width="587" height="30" type="category" x="75" y="320"
                              className="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="544.6"
                              y1="326" x2="544.6" y2="320"></line><text orientation="bottom" width="587" height="30"
                                type="category" x="544.6" y="328" stroke="none" fill="#666" font-size="12"
                                className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="middle">
                              <tspan x="544.6" dy="0.71em">2022</tspan>
                            </text>
                          </g>
                        </g>
                      </g>
                      <g className="recharts-layer recharts-cartesian-axis recharts-yAxis yAxis">
                        <line type="number" width="75" orientation="left" height="320" x="0" y="0"
                          className="recharts-cartesian-axis-line" stroke="#666" fill="none" x1="75" y1="0" x2="75"
                          y2="320"></line>
                        <g className="recharts-cartesian-axis-ticks">
                          <g className="recharts-layer recharts-cartesian-axis-tick">
                            <line type="number" width="75" orientation="left" height="320" x="0" y="0"
                              className="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="69"
                              y1="167.61904761904762" x2="75" y2="167.61904761904762"></line><text type="number"
                                width="75" orientation="left" height="320" x="67" y="167.61904761904762" stroke="none"
                                fill="#666" font-size="12" className="recharts-text recharts-cartesian-axis-tick-value"
                                text-anchor="end">
                              <tspan x="67" dy="0.355em">-50%</tspan>
                            </text>
                          </g>
                          <g className="recharts-layer recharts-cartesian-axis-tick">
                            <line type="number" width="75" orientation="left" height="320" x="0" y="0"
                              className="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="69"
                              y1="129.52380952380952" x2="75" y2="129.52380952380952"></line><text type="number"
                                width="75" orientation="left" height="320" x="67" y="129.52380952380952" stroke="none"
                                fill="#666" font-size="12" className="recharts-text recharts-cartesian-axis-tick-value"
                                text-anchor="end">
                              <tspan x="67" dy="0.355em">-25%</tspan>
                            </text>
                          </g>
                          <g className="recharts-layer recharts-cartesian-axis-tick">
                            <line type="number" width="75" orientation="left" height="320" x="0" y="0"
                              className="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="69"
                              y1="91.42857142857142" x2="75" y2="91.42857142857142"></line><text type="number"
                                width="75" orientation="left" height="320" x="67" y="91.42857142857142" stroke="none"
                                fill="#666" font-size="12" className="recharts-text recharts-cartesian-axis-tick-value"
                                text-anchor="end">
                              <tspan x="67" dy="0.355em">0%</tspan>
                            </text>
                          </g>
                          <g className="recharts-layer recharts-cartesian-axis-tick">
                            <line type="number" width="75" orientation="left" height="320" x="0" y="0"
                              className="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="69"
                              y1="53.33333333333332" x2="75" y2="53.33333333333332"></line><text type="number"
                                width="75" orientation="left" height="320" x="67" y="53.33333333333332" stroke="none"
                                fill="#666" font-size="12" className="recharts-text recharts-cartesian-axis-tick-value"
                                text-anchor="end">
                              <tspan x="67" dy="0.355em">25%</tspan>
                            </text>
                          </g>
                          <g className="recharts-layer recharts-cartesian-axis-tick">
                            <line type="number" width="75" orientation="left" height="320" x="0" y="0"
                              className="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="69"
                              y1="15.238095238095255" x2="75" y2="15.238095238095255"></line><text type="number"
                                width="75" orientation="left" height="320" x="67" y="15.238095238095255" stroke="none"
                                fill="#666" font-size="12" className="recharts-text recharts-cartesian-axis-tick-value"
                                text-anchor="end">
                              <tspan x="67" dy="0.355em">50%</tspan>
                            </text>
                          </g>
                        </g>
                      </g>
                      <g className="recharts-layer recharts-cartesian-axis recharts-yAxis yAxis">
                        <line type="number" orientation="right" width="85" height="320" x="662" y="0"
                          className="recharts-cartesian-axis-line" stroke="#666" fill="none" x1="662" y1="0" x2="662"
                          y2="320"></line>
                        <g className="recharts-cartesian-axis-ticks">
                          <g className="recharts-layer recharts-cartesian-axis-tick">
                            <line type="number" orientation="right" width="85" height="320" x="662" y="0"
                              className="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="668" y1="320"
                              x2="662" y2="320"></line><text type="number" orientation="right" width="85" height="320"
                                x="670" y="320" stroke="none" fill="#666" font-size="12"
                                className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="start">
                              <tspan x="670" dy="0.355em">$0.00</tspan>
                            </text>
                          </g>
                          <g className="recharts-layer recharts-cartesian-axis-tick">
                            <line type="number" orientation="right" width="85" height="320" x="662" y="0"
                              className="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="668"
                              y1="289.5238095238095" x2="662" y2="289.5238095238095"></line><text type="number"
                                orientation="right" width="85" height="320" x="670" y="289.5238095238095" stroke="none"
                                fill="#666" font-size="12" className="recharts-text recharts-cartesian-axis-tick-value"
                                text-anchor="start">
                              <tspan x="670" dy="0.355em">$1,000.00</tspan>
                            </text>
                          </g>
                          <g className="recharts-layer recharts-cartesian-axis-tick">
                            <line type="number" orientation="right" width="85" height="320" x="662" y="0"
                              className="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="668"
                              y1="259.04761904761904" x2="662" y2="259.04761904761904"></line><text type="number"
                                orientation="right" width="85" height="320" x="670" y="259.04761904761904" stroke="none"
                                fill="#666" font-size="12" className="recharts-text recharts-cartesian-axis-tick-value"
                                text-anchor="start">
                              <tspan x="670" dy="0.355em">$2,000.00</tspan>
                            </text>
                          </g>
                          <g className="recharts-layer recharts-cartesian-axis-tick">
                            <line type="number" orientation="right" width="85" height="320" x="662" y="0"
                              className="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="668"
                              y1="228.57142857142858" x2="662" y2="228.57142857142858"></line><text type="number"
                                orientation="right" width="85" height="320" x="670" y="228.57142857142858" stroke="none"
                                fill="#666" font-size="12" className="recharts-text recharts-cartesian-axis-tick-value"
                                text-anchor="start">
                              <tspan x="670" dy="0.355em">$3,000.00</tspan>
                            </text>
                          </g>
                          <g className="recharts-layer recharts-cartesian-axis-tick">
                            <line type="number" orientation="right" width="85" height="320" x="662" y="0"
                              className="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="668"
                              y1="198.0952380952381" x2="662" y2="198.0952380952381"></line><text type="number"
                                orientation="right" width="85" height="320" x="670" y="198.0952380952381" stroke="none"
                                fill="#666" font-size="12" className="recharts-text recharts-cartesian-axis-tick-value"
                                text-anchor="start">
                              <tspan x="670" dy="0.355em">$4,000.00</tspan>
                            </text>
                          </g>
                          <g className="recharts-layer recharts-cartesian-axis-tick">
                            <line type="number" orientation="right" width="85" height="320" x="662" y="0"
                              className="recharts-cartesian-axis-tick-line" stroke="#666" fill="none" x1="668"
                              y1="167.61904761904762" x2="662" y2="167.61904761904762"></line><text type="number"
                                orientation="right" width="85" height="320" x="670" y="167.61904761904762" stroke="none"
                                fill="#666" font-size="12" className="recharts-text recharts-cartesian-axis-tick-value"
                                text-anchor="start">
                              <tspan x="670" dy="0.355em">$5,000.00</tspan>
                            </text>
                          </g>
                        </g>
                      </g>
                      <g className="recharts-layer recharts-line blur-sm">
                        <path className="recharts-curve recharts-line-curve" stroke="#00e2b6" stroke-width="2"
                          fill="none" width="587" height="320" type="monotone"
                          d="M75,91.429C75.652,91.688,76.304,91.947,76.957,92.509C77.609,93.07,78.261,94.796,78.913,94.796C79.566,94.796,80.218,91.137,80.87,91.137C81.522,91.137,82.174,91.493,82.827,91.659C83.479,91.826,84.131,92.135,84.783,92.135C85.436,92.135,86.088,87.22,86.74,87.22C87.392,87.22,88.044,87.948,88.697,88.26C89.349,88.572,90.001,89.094,90.653,89.094C91.306,89.094,91.958,88.172,92.61,88.147C93.262,88.123,93.914,88.135,94.567,88.111C95.219,88.087,95.871,87.39,96.523,87.33C97.176,87.27,97.828,87.24,98.48,87.24C99.132,87.24,99.784,87.352,100.437,87.576C101.089,87.799,101.741,88.426,102.393,88.892C103.046,89.357,103.698,90.311,104.35,90.369C105.002,90.428,105.654,90.457,106.307,90.457C106.959,90.457,107.611,87.08,108.263,86.043C108.916,85.006,109.568,84.658,110.22,84.235C110.872,83.812,111.524,83.828,112.177,83.506C112.829,83.184,113.481,82.304,114.133,82.304C114.786,82.304,115.438,82.315,116.09,82.336C116.742,82.357,117.394,82.646,118.047,82.646C118.699,82.646,119.351,82.535,120.003,82.535C120.656,82.535,121.308,84.122,121.96,84.122C122.612,84.122,123.264,82.856,123.917,82.856C124.569,82.856,125.221,82.917,125.873,83.04C126.526,83.162,127.178,84.565,127.83,84.565C128.482,84.565,129.134,84.063,129.787,84.063C130.439,84.063,131.091,86.521,131.743,86.521C132.396,86.521,133.048,85.112,133.7,85.112C134.352,85.112,135.004,86.402,135.657,86.402C136.309,86.402,136.961,84.807,137.613,84.807C138.266,84.807,138.918,85.509,139.57,85.509C140.222,85.509,140.874,85.026,141.527,85.026C142.179,85.026,142.831,86.1,143.483,86.899C144.136,87.698,144.788,88.46,145.44,89.821C146.092,91.182,146.744,95.023,147.397,95.066C148.049,95.108,148.701,95.129,149.353,95.129C150.006,95.129,150.658,94.9,151.31,94.816C151.962,94.732,152.614,94.624,153.267,94.624C153.919,94.624,154.571,104.45,155.223,104.45C155.876,104.45,156.528,101.825,157.18,101.315C157.832,100.805,158.484,100.626,159.137,100.55C159.789,100.473,160.441,100.435,161.093,100.435C161.746,100.435,162.398,102.251,163.05,102.251C163.702,102.251,164.354,100.362,165.007,100.362C165.659,100.362,166.311,102.492,166.963,102.889C167.616,103.285,168.268,103.263,168.92,103.484C169.572,103.705,170.224,103.985,170.877,104.216C171.529,104.446,172.181,104.865,172.833,104.865C173.486,104.865,174.138,102.766,174.79,102.766C175.442,102.766,176.094,105.965,176.747,108.53C177.399,111.095,178.051,115.313,178.703,118.155C179.356,120.997,180.008,124.761,180.66,125.581C181.312,126.402,181.964,125.991,182.617,126.812C183.269,127.632,183.921,131.203,184.573,132.577C185.226,133.951,185.878,135.057,186.53,135.057C187.182,135.057,187.834,125.268,188.487,124.172C189.139,123.077,189.791,123.625,190.443,122.529C191.096,121.434,191.748,112.161,192.4,112.126C193.052,112.091,193.704,112.074,194.357,112.074C195.009,112.074,195.661,117.669,196.313,119.398C196.966,121.127,197.618,121.768,198.27,122.449C198.922,123.13,199.574,123.149,200.227,123.486C200.879,123.824,201.531,124.472,202.183,124.472C202.836,124.472,203.488,122.268,204.14,121.558C204.792,120.847,205.444,121.108,206.097,120.21C206.749,119.311,207.401,111.415,208.053,111.415C208.706,111.415,209.358,113.47,210.01,114.508C210.662,115.545,211.314,117.639,211.967,117.639C212.619,117.639,213.271,116.939,213.923,116.329C214.576,115.72,215.228,113.981,215.88,113.981C216.532,113.981,217.184,114.777,217.837,114.777C218.489,114.777,219.141,113.741,219.793,112.657C220.446,111.573,221.098,109.527,221.75,108.271C222.402,107.014,223.054,105.117,223.707,105.117C224.359,105.117,225.011,106.001,225.663,106.001C226.316,106.001,226.968,103.562,227.62,103.562C228.272,103.562,228.924,108.103,229.577,108.103C230.229,108.103,230.881,107.589,231.533,106.562C232.186,105.535,232.838,102.239,233.49,99.357C234.142,96.474,234.794,89.989,235.447,89.268C236.099,88.547,236.751,88.907,237.403,88.186C238.056,87.465,238.708,82.051,239.36,82.051C240.012,82.051,240.664,87.578,241.317,87.694C241.969,87.811,242.621,87.869,243.273,87.869C243.926,87.869,244.578,85.287,245.23,83.712C245.882,82.136,246.534,78.417,247.187,78.417C247.839,78.417,248.491,78.514,249.143,78.708C249.796,78.902,250.448,79.887,251.1,80.58C251.752,81.273,252.404,81.343,253.057,82.868C253.709,84.393,254.361,91.433,255.013,91.585C255.666,91.738,256.318,91.662,256.97,91.814C257.622,91.967,258.274,92.58,258.927,92.58C259.579,92.58,260.231,88.791,260.883,88.791C261.536,88.791,262.188,90.697,262.84,92.088C263.492,93.478,264.144,97.136,264.797,97.136C265.449,97.136,266.101,95.048,266.753,95.048C267.406,95.048,268.058,100.36,268.71,100.36C269.362,100.36,270.014,99.103,270.667,98.686C271.319,98.268,271.971,98.409,272.623,97.857C273.276,97.305,273.928,95.031,274.58,94.014C275.232,92.998,275.884,91.756,276.537,91.756C277.189,91.756,277.841,99.63,278.493,99.63C279.146,99.63,279.798,99.181,280.45,98.611C281.102,98.041,281.754,96.21,282.407,96.21C283.059,96.21,283.711,97.291,284.363,98.325C285.016,99.359,285.668,102.413,286.32,102.413C286.972,102.413,287.624,96.206,288.277,95.996C288.929,95.787,289.581,95.861,290.233,95.682C290.886,95.503,291.538,94.922,292.19,94.922C292.842,94.922,293.494,95.483,294.147,96.606C294.799,97.728,295.451,104.981,296.103,104.981C296.756,104.981,297.408,104.122,298.06,104.122C298.712,104.122,299.364,105.761,300.017,105.761C300.669,105.761,301.321,105.659,301.973,105.659C302.626,105.659,303.278,109.65,303.93,109.65C304.582,109.65,305.234,109.354,305.887,109.354C306.539,109.354,307.191,109.595,307.843,109.595C308.496,109.595,309.148,109.3,309.8,108.709C310.452,108.119,311.104,107.365,311.757,105.926C312.409,104.487,313.061,100.961,313.713,100.074C314.366,99.187,315.018,99.358,315.67,98.743C316.322,98.128,316.974,97.252,317.627,96.385C318.279,95.518,318.931,95.34,319.583,93.541C320.236,91.742,320.888,88.418,321.54,85.591C322.192,82.764,322.844,76.579,323.497,76.579C324.149,76.579,324.801,77.12,325.453,78.203C326.106,79.285,326.758,84.833,327.41,84.833C328.062,84.833,328.714,83.265,329.367,83.265C330.019,83.265,330.671,85.881,331.323,90.373C331.976,94.864,332.628,110.214,333.28,110.214C333.932,110.214,334.584,103.597,335.237,103.597C335.889,103.597,336.541,106.484,337.193,106.484C337.846,106.484,338.498,102.951,339.15,101.256C339.802,99.562,340.454,97.731,341.107,96.317C341.759,94.903,342.411,93.957,343.063,92.773C343.716,91.589,344.368,91.012,345.02,89.214C345.672,87.416,346.324,81.986,346.977,81.986C347.629,81.986,348.281,83.332,348.933,84.377C349.586,85.422,350.238,88.255,350.89,88.255C351.542,88.255,352.194,83.396,352.847,83.388C353.499,83.38,354.151,83.384,354.803,83.377C355.456,83.369,356.108,81.935,356.76,80.711C357.412,79.486,358.064,76.495,358.717,76.027C359.369,75.559,360.021,75.325,360.673,75.325C361.326,75.325,361.978,77.631,362.63,77.631C363.282,77.631,363.934,76.128,364.587,76.128C365.239,76.128,365.891,79.452,366.543,79.452C367.196,79.452,367.848,79.358,368.5,79.171C369.152,78.984,369.804,76.746,370.457,76.746C371.109,76.746,371.761,77.632,372.413,77.632C373.066,77.632,373.718,72.613,374.37,70.428C375.022,68.242,375.674,66.878,376.327,64.517C376.979,62.156,377.631,56.646,378.283,56.262C378.936,55.879,379.588,56.071,380.24,55.687C380.892,55.304,381.544,53.256,382.197,53.256C382.849,53.256,383.501,55.923,384.153,55.923C384.806,55.923,385.458,55.23,386.11,55.23C386.762,55.23,387.414,55.333,388.067,55.537C388.719,55.742,389.371,57.052,390.023,57.101C390.676,57.151,391.328,57.126,391.98,57.175C392.632,57.224,393.284,59.355,393.937,59.355C394.589,59.355,395.241,57.54,395.893,57.54C396.546,57.54,397.198,58.46,397.85,58.46C398.502,58.46,399.154,56.683,399.807,56.683C400.459,56.683,401.111,56.986,401.763,56.986C402.416,56.986,403.068,53.298,403.72,53.298C404.372,53.298,405.024,55.069,405.677,55.362C406.329,55.655,406.981,55.801,407.633,55.801C408.286,55.801,408.938,51.591,409.59,51.236C410.242,50.881,410.894,51.058,411.547,50.703C412.199,50.348,412.851,47.225,413.503,46.955C414.156,46.686,414.808,46.821,415.46,46.551C416.112,46.282,416.764,44.975,417.417,44.975C418.069,44.975,418.721,45.621,419.373,45.621C420.026,45.621,420.678,43.695,421.33,43.695C421.982,43.695,422.634,44.196,423.287,44.196C423.939,44.196,424.591,43.011,425.243,42.598C425.896,42.185,426.548,41.717,427.2,41.717C427.852,41.717,428.504,43.913,429.157,43.953C429.809,43.993,430.461,44.013,431.113,44.013C431.766,44.013,432.418,43.268,433.07,43.268C433.722,43.268,434.374,43.778,435.027,44.796C435.679,45.815,436.331,48.658,436.983,49.895C437.636,51.133,438.288,51.905,438.94,52.22C439.592,52.534,440.244,52.437,440.897,52.691C441.549,52.946,442.201,53.747,442.853,53.747C443.506,53.747,444.158,42.819,444.81,42.819C445.462,42.819,446.114,46.262,446.767,47.781C447.419,49.301,448.071,51.752,448.723,51.936C449.376,52.121,450.028,52.213,450.68,52.213C451.332,52.213,451.984,50.742,452.637,50.742C453.289,50.742,453.941,51.782,454.593,52.988C455.246,54.193,455.898,57.638,456.55,57.977C457.202,58.317,457.854,58.147,458.507,58.487C459.159,58.826,459.811,61.569,460.463,61.569C461.116,61.569,461.768,61.158,462.42,61.158C463.072,61.158,463.724,66.214,464.377,69.117C465.029,72.02,465.681,75.526,466.333,78.578C466.986,81.63,467.638,87.429,468.29,87.429C468.942,87.429,469.594,80.026,470.247,75.544C470.899,71.062,471.551,60.735,472.203,60.534C472.856,60.334,473.508,60.233,474.16,60.233C474.812,60.233,475.464,63.483,476.117,63.483C476.769,63.483,477.421,58.357,478.073,58.173C478.726,57.988,479.378,58.081,480.03,57.896C480.682,57.711,481.334,47.524,481.987,47.524C482.639,47.524,483.291,50.57,483.943,52.077C484.596,53.585,485.248,56.57,485.9,56.57C486.552,56.57,487.204,54.26,487.857,52.986C488.509,51.713,489.161,48.931,489.813,48.931C490.466,48.931,491.118,51.77,491.77,53.042C492.422,54.313,493.074,54.693,493.727,56.559C494.379,58.425,495.031,61.882,495.683,64.24C496.336,66.598,496.988,70.705,497.64,70.705C498.292,70.705,498.944,67.608,499.597,67.608C500.249,67.608,500.901,71.744,501.553,71.744C502.206,71.744,502.858,69.636,503.51,69.636C504.162,69.636,504.814,79.075,505.467,79.075C506.119,79.075,506.771,70.63,507.423,70.63C508.076,70.63,508.728,73.62,509.38,73.62C510.032,73.62,510.684,69.198,511.337,67.526C511.989,65.855,512.641,63.59,513.293,63.59C513.946,63.59,514.598,73.057,515.25,73.344C515.902,73.631,516.554,73.488,517.207,73.775C517.859,74.062,518.511,76.856,519.163,78.232C519.816,79.608,520.468,80.987,521.12,82.03C521.772,83.073,522.424,83.78,523.077,84.49C523.729,85.199,524.381,85.753,525.033,86.288C525.686,86.823,526.338,87.702,526.99,87.702C527.642,87.702,528.294,82.662,528.947,82.305C529.599,81.947,530.251,81.768,530.903,81.768C531.556,81.768,532.208,83.569,532.86,83.569C533.512,83.569,534.164,81.925,534.817,81.419C535.469,80.912,536.121,81.067,536.773,80.528C537.426,79.988,538.078,78.182,538.73,78.182C539.382,78.182,540.034,81.002,540.687,81.002C541.339,81.002,541.991,75.554,542.643,75.554C543.296,75.554,543.948,76.746,544.6,76.746C545.252,76.746,545.904,65.666,546.557,65.666C547.209,65.666,547.861,68.02,548.513,68.02C549.166,68.02,549.818,52.406,550.47,52.406C551.122,52.406,551.774,53.11,552.427,54.319C553.079,55.528,553.731,57.619,554.383,59.661C555.036,61.702,555.688,66.566,556.34,66.566C556.992,66.566,557.644,65.477,558.297,63.561C558.949,61.644,559.601,55.066,560.253,55.066C560.906,55.066,561.558,58.903,562.21,58.903C562.862,58.903,563.514,55.678,564.167,55.245C564.819,54.812,565.471,54.596,566.123,54.596C566.776,54.596,567.428,59.869,568.08,61.424C568.732,62.98,569.384,62.844,570.037,63.929C570.689,65.013,571.341,67.929,571.993,67.929C572.646,67.929,573.298,67.8,573.95,67.543C574.602,67.286,575.254,63.344,575.907,62.086C576.559,60.827,577.211,59.992,577.863,59.992C578.516,59.992,579.168,60.413,579.82,60.413C580.472,60.413,581.124,58.333,581.777,57.63C582.429,56.928,583.081,57.153,583.733,56.2C584.386,55.246,585.038,37.922,585.69,37.922C586.342,37.922,586.994,39.187,587.647,39.418C588.299,39.648,588.951,39.711,589.603,39.764C590.256,39.816,590.908,39.843,591.56,39.843C592.212,39.843,592.864,38.793,593.517,36.694C594.169,34.594,594.821,29.532,595.473,25.342C596.126,21.152,596.778,11.554,597.43,11.554C598.082,11.554,598.734,15.388,599.387,15.388C600.039,15.388,600.691,11.83,601.343,11.83C601.996,11.83,602.648,14.625,603.3,14.625C603.952,14.625,604.604,13.165,605.257,13.165C605.909,13.165,606.561,21.044,607.213,22.432C607.866,23.82,608.518,23.81,609.17,24.514C609.822,25.217,610.474,26.485,611.127,26.653C611.779,26.821,612.431,26.737,613.083,26.904C613.736,27.072,614.388,30.372,615.04,30.372C615.692,30.372,616.344,30.116,616.997,29.604C617.649,29.091,618.301,25.248,618.953,24.47C619.606,23.692,620.258,23.528,620.91,23.303C621.562,23.077,622.214,22.964,622.867,22.964C623.519,22.964,624.171,27.448,624.823,27.448C625.476,27.448,626.128,21.295,626.78,19.315C627.432,17.336,628.084,15.571,628.737,15.571C629.389,15.571,630.041,16.62,630.693,16.915C631.346,17.209,631.998,17.357,632.65,17.357C633.302,17.357,633.954,15.405,634.607,15.405C635.259,15.405,635.911,16.275,636.563,16.583C637.216,16.891,637.868,16.806,638.52,17.251C639.172,17.697,639.824,22.72,640.477,23.091C641.129,23.461,641.781,23.646,642.433,23.646C643.086,23.646,643.738,15.504,644.39,14.458C645.042,13.413,645.694,13.283,646.347,12.89C646.999,12.496,647.651,12.096,648.303,12.096C648.956,12.096,649.608,12.629,650.26,13.051C650.912,13.473,651.564,14.626,652.217,14.626C652.869,14.626,653.521,14.52,654.173,14.31C654.826,14.1,655.478,11.981,656.13,11.981C656.782,11.981,657.434,12.935,658.087,12.935C658.739,12.935,659.391,12.406,660.043,12.369C660.696,12.332,661.348,12.323,662,12.314">
                        </path>
                      </g>
                      <g className="recharts-layer recharts-line blur-sm">
                        <path className="recharts-curve recharts-line-curve" stroke="#00e2b6" stroke-width="2"
                          fill="none" width="587" height="320" type="monotone"
                          d="M75,91.429C75.652,91.688,76.304,91.947,76.957,92.509C77.609,93.07,78.261,94.796,78.913,94.796C79.566,94.796,80.218,91.137,80.87,91.137C81.522,91.137,82.174,91.493,82.827,91.659C83.479,91.826,84.131,92.135,84.783,92.135C85.436,92.135,86.088,87.22,86.74,87.22C87.392,87.22,88.044,87.948,88.697,88.26C89.349,88.572,90.001,89.094,90.653,89.094C91.306,89.094,91.958,88.172,92.61,88.147C93.262,88.123,93.914,88.135,94.567,88.111C95.219,88.087,95.871,87.39,96.523,87.33C97.176,87.27,97.828,87.24,98.48,87.24C99.132,87.24,99.784,87.352,100.437,87.576C101.089,87.799,101.741,88.426,102.393,88.892C103.046,89.357,103.698,90.311,104.35,90.369C105.002,90.428,105.654,90.457,106.307,90.457C106.959,90.457,107.611,87.08,108.263,86.043C108.916,85.006,109.568,84.658,110.22,84.235C110.872,83.812,111.524,83.828,112.177,83.506C112.829,83.184,113.481,82.304,114.133,82.304C114.786,82.304,115.438,82.315,116.09,82.336C116.742,82.357,117.394,82.646,118.047,82.646C118.699,82.646,119.351,82.535,120.003,82.535C120.656,82.535,121.308,84.122,121.96,84.122C122.612,84.122,123.264,82.856,123.917,82.856C124.569,82.856,125.221,82.917,125.873,83.04C126.526,83.162,127.178,84.565,127.83,84.565C128.482,84.565,129.134,84.063,129.787,84.063C130.439,84.063,131.091,86.521,131.743,86.521C132.396,86.521,133.048,85.112,133.7,85.112C134.352,85.112,135.004,86.402,135.657,86.402C136.309,86.402,136.961,84.807,137.613,84.807C138.266,84.807,138.918,85.509,139.57,85.509C140.222,85.509,140.874,85.026,141.527,85.026C142.179,85.026,142.831,86.1,143.483,86.899C144.136,87.698,144.788,88.46,145.44,89.821C146.092,91.182,146.744,95.023,147.397,95.066C148.049,95.108,148.701,95.129,149.353,95.129C150.006,95.129,150.658,94.9,151.31,94.816C151.962,94.732,152.614,94.624,153.267,94.624C153.919,94.624,154.571,104.45,155.223,104.45C155.876,104.45,156.528,101.825,157.18,101.315C157.832,100.805,158.484,100.626,159.137,100.55C159.789,100.473,160.441,100.435,161.093,100.435C161.746,100.435,162.398,102.251,163.05,102.251C163.702,102.251,164.354,100.362,165.007,100.362C165.659,100.362,166.311,102.492,166.963,102.889C167.616,103.285,168.268,103.263,168.92,103.484C169.572,103.705,170.224,103.985,170.877,104.216C171.529,104.446,172.181,104.865,172.833,104.865C173.486,104.865,174.138,102.766,174.79,102.766C175.442,102.766,176.094,105.965,176.747,108.53C177.399,111.095,178.051,115.313,178.703,118.155C179.356,120.997,180.008,124.761,180.66,125.581C181.312,126.402,181.964,125.991,182.617,126.812C183.269,127.632,183.921,131.203,184.573,132.577C185.226,133.951,185.878,135.057,186.53,135.057C187.182,135.057,187.834,125.268,188.487,124.172C189.139,123.077,189.791,123.625,190.443,122.529C191.096,121.434,191.748,112.161,192.4,112.126C193.052,112.091,193.704,112.074,194.357,112.074C195.009,112.074,195.661,117.669,196.313,119.398C196.966,121.127,197.618,121.768,198.27,122.449C198.922,123.13,199.574,123.149,200.227,123.486C200.879,123.824,201.531,124.472,202.183,124.472C202.836,124.472,203.488,122.268,204.14,121.558C204.792,120.847,205.444,121.108,206.097,120.21C206.749,119.311,207.401,111.415,208.053,111.415C208.706,111.415,209.358,113.47,210.01,114.508C210.662,115.545,211.314,117.639,211.967,117.639C212.619,117.639,213.271,116.939,213.923,116.329C214.576,115.72,215.228,113.981,215.88,113.981C216.532,113.981,217.184,114.777,217.837,114.777C218.489,114.777,219.141,113.741,219.793,112.657C220.446,111.573,221.098,109.527,221.75,108.271C222.402,107.014,223.054,105.117,223.707,105.117C224.359,105.117,225.011,106.001,225.663,106.001C226.316,106.001,226.968,103.562,227.62,103.562C228.272,103.562,228.924,108.103,229.577,108.103C230.229,108.103,230.881,107.589,231.533,106.562C232.186,105.535,232.838,102.239,233.49,99.357C234.142,96.474,234.794,89.989,235.447,89.268C236.099,88.547,236.751,88.907,237.403,88.186C238.056,87.465,238.708,82.051,239.36,82.051C240.012,82.051,240.664,87.578,241.317,87.694C241.969,87.811,242.621,87.869,243.273,87.869C243.926,87.869,244.578,85.287,245.23,83.712C245.882,82.136,246.534,78.417,247.187,78.417C247.839,78.417,248.491,78.514,249.143,78.708C249.796,78.902,250.448,79.887,251.1,80.58C251.752,81.273,252.404,81.343,253.057,82.868C253.709,84.393,254.361,91.433,255.013,91.585C255.666,91.738,256.318,91.662,256.97,91.814C257.622,91.967,258.274,92.58,258.927,92.58C259.579,92.58,260.231,88.791,260.883,88.791C261.536,88.791,262.188,90.697,262.84,92.088C263.492,93.478,264.144,97.136,264.797,97.136C265.449,97.136,266.101,95.048,266.753,95.048C267.406,95.048,268.058,100.36,268.71,100.36C269.362,100.36,270.014,99.103,270.667,98.686C271.319,98.268,271.971,98.409,272.623,97.857C273.276,97.305,273.928,95.031,274.58,94.014C275.232,92.998,275.884,91.756,276.537,91.756C277.189,91.756,277.841,99.63,278.493,99.63C279.146,99.63,279.798,99.181,280.45,98.611C281.102,98.041,281.754,96.21,282.407,96.21C283.059,96.21,283.711,97.291,284.363,98.325C285.016,99.359,285.668,102.413,286.32,102.413C286.972,102.413,287.624,96.206,288.277,95.996C288.929,95.787,289.581,95.861,290.233,95.682C290.886,95.503,291.538,94.922,292.19,94.922C292.842,94.922,293.494,95.483,294.147,96.606C294.799,97.728,295.451,104.981,296.103,104.981C296.756,104.981,297.408,104.122,298.06,104.122C298.712,104.122,299.364,105.761,300.017,105.761C300.669,105.761,301.321,105.659,301.973,105.659C302.626,105.659,303.278,109.65,303.93,109.65C304.582,109.65,305.234,109.354,305.887,109.354C306.539,109.354,307.191,109.595,307.843,109.595C308.496,109.595,309.148,109.3,309.8,108.709C310.452,108.119,311.104,107.365,311.757,105.926C312.409,104.487,313.061,100.961,313.713,100.074C314.366,99.187,315.018,99.358,315.67,98.743C316.322,98.128,316.974,97.252,317.627,96.385C318.279,95.518,318.931,95.34,319.583,93.541C320.236,91.742,320.888,88.418,321.54,85.591C322.192,82.764,322.844,76.579,323.497,76.579C324.149,76.579,324.801,77.12,325.453,78.203C326.106,79.285,326.758,84.833,327.41,84.833C328.062,84.833,328.714,83.265,329.367,83.265C330.019,83.265,330.671,85.881,331.323,90.373C331.976,94.864,332.628,110.214,333.28,110.214C333.932,110.214,334.584,103.597,335.237,103.597C335.889,103.597,336.541,106.484,337.193,106.484C337.846,106.484,338.498,102.951,339.15,101.256C339.802,99.562,340.454,97.731,341.107,96.317C341.759,94.903,342.411,93.957,343.063,92.773C343.716,91.589,344.368,91.012,345.02,89.214C345.672,87.416,346.324,81.986,346.977,81.986C347.629,81.986,348.281,83.332,348.933,84.377C349.586,85.422,350.238,88.255,350.89,88.255C351.542,88.255,352.194,83.396,352.847,83.388C353.499,83.38,354.151,83.384,354.803,83.377C355.456,83.369,356.108,81.935,356.76,80.711C357.412,79.486,358.064,76.495,358.717,76.027C359.369,75.559,360.021,75.325,360.673,75.325C361.326,75.325,361.978,77.631,362.63,77.631C363.282,77.631,363.934,76.128,364.587,76.128C365.239,76.128,365.891,79.452,366.543,79.452C367.196,79.452,367.848,79.358,368.5,79.171C369.152,78.984,369.804,76.746,370.457,76.746C371.109,76.746,371.761,77.632,372.413,77.632C373.066,77.632,373.718,72.613,374.37,70.428C375.022,68.242,375.674,66.878,376.327,64.517C376.979,62.156,377.631,56.646,378.283,56.262C378.936,55.879,379.588,56.071,380.24,55.687C380.892,55.304,381.544,53.256,382.197,53.256C382.849,53.256,383.501,55.923,384.153,55.923C384.806,55.923,385.458,55.23,386.11,55.23C386.762,55.23,387.414,55.333,388.067,55.537C388.719,55.742,389.371,57.052,390.023,57.101C390.676,57.151,391.328,57.126,391.98,57.175C392.632,57.224,393.284,59.355,393.937,59.355C394.589,59.355,395.241,57.54,395.893,57.54C396.546,57.54,397.198,58.46,397.85,58.46C398.502,58.46,399.154,56.683,399.807,56.683C400.459,56.683,401.111,56.986,401.763,56.986C402.416,56.986,403.068,53.298,403.72,53.298C404.372,53.298,405.024,55.069,405.677,55.362C406.329,55.655,406.981,55.801,407.633,55.801C408.286,55.801,408.938,51.591,409.59,51.236C410.242,50.881,410.894,51.058,411.547,50.703C412.199,50.348,412.851,47.225,413.503,46.955C414.156,46.686,414.808,46.821,415.46,46.551C416.112,46.282,416.764,44.975,417.417,44.975C418.069,44.975,418.721,45.621,419.373,45.621C420.026,45.621,420.678,43.695,421.33,43.695C421.982,43.695,422.634,44.196,423.287,44.196C423.939,44.196,424.591,43.011,425.243,42.598C425.896,42.185,426.548,41.717,427.2,41.717C427.852,41.717,428.504,43.913,429.157,43.953C429.809,43.993,430.461,44.013,431.113,44.013C431.766,44.013,432.418,43.268,433.07,43.268C433.722,43.268,434.374,43.778,435.027,44.796C435.679,45.815,436.331,48.658,436.983,49.895C437.636,51.133,438.288,51.905,438.94,52.22C439.592,52.534,440.244,52.437,440.897,52.691C441.549,52.946,442.201,53.747,442.853,53.747C443.506,53.747,444.158,42.819,444.81,42.819C445.462,42.819,446.114,46.262,446.767,47.781C447.419,49.301,448.071,51.752,448.723,51.936C449.376,52.121,450.028,52.213,450.68,52.213C451.332,52.213,451.984,50.742,452.637,50.742C453.289,50.742,453.941,51.782,454.593,52.988C455.246,54.193,455.898,57.638,456.55,57.977C457.202,58.317,457.854,58.147,458.507,58.487C459.159,58.826,459.811,61.569,460.463,61.569C461.116,61.569,461.768,61.158,462.42,61.158C463.072,61.158,463.724,66.214,464.377,69.117C465.029,72.02,465.681,75.526,466.333,78.578C466.986,81.63,467.638,87.429,468.29,87.429C468.942,87.429,469.594,80.026,470.247,75.544C470.899,71.062,471.551,60.735,472.203,60.534C472.856,60.334,473.508,60.233,474.16,60.233C474.812,60.233,475.464,63.483,476.117,63.483C476.769,63.483,477.421,58.357,478.073,58.173C478.726,57.988,479.378,58.081,480.03,57.896C480.682,57.711,481.334,47.524,481.987,47.524C482.639,47.524,483.291,50.57,483.943,52.077C484.596,53.585,485.248,56.57,485.9,56.57C486.552,56.57,487.204,54.26,487.857,52.986C488.509,51.713,489.161,48.931,489.813,48.931C490.466,48.931,491.118,51.77,491.77,53.042C492.422,54.313,493.074,54.693,493.727,56.559C494.379,58.425,495.031,61.882,495.683,64.24C496.336,66.598,496.988,70.705,497.64,70.705C498.292,70.705,498.944,67.608,499.597,67.608C500.249,67.608,500.901,71.744,501.553,71.744C502.206,71.744,502.858,69.636,503.51,69.636C504.162,69.636,504.814,79.075,505.467,79.075C506.119,79.075,506.771,70.63,507.423,70.63C508.076,70.63,508.728,73.62,509.38,73.62C510.032,73.62,510.684,69.198,511.337,67.526C511.989,65.855,512.641,63.59,513.293,63.59C513.946,63.59,514.598,73.057,515.25,73.344C515.902,73.631,516.554,73.488,517.207,73.775C517.859,74.062,518.511,76.856,519.163,78.232C519.816,79.608,520.468,80.987,521.12,82.03C521.772,83.073,522.424,83.78,523.077,84.49C523.729,85.199,524.381,85.753,525.033,86.288C525.686,86.823,526.338,87.702,526.99,87.702C527.642,87.702,528.294,82.662,528.947,82.305C529.599,81.947,530.251,81.768,530.903,81.768C531.556,81.768,532.208,83.569,532.86,83.569C533.512,83.569,534.164,81.925,534.817,81.419C535.469,80.912,536.121,81.067,536.773,80.528C537.426,79.988,538.078,78.182,538.73,78.182C539.382,78.182,540.034,81.002,540.687,81.002C541.339,81.002,541.991,75.554,542.643,75.554C543.296,75.554,543.948,76.746,544.6,76.746C545.252,76.746,545.904,65.666,546.557,65.666C547.209,65.666,547.861,68.02,548.513,68.02C549.166,68.02,549.818,52.406,550.47,52.406C551.122,52.406,551.774,53.11,552.427,54.319C553.079,55.528,553.731,57.619,554.383,59.661C555.036,61.702,555.688,66.566,556.34,66.566C556.992,66.566,557.644,65.477,558.297,63.561C558.949,61.644,559.601,55.066,560.253,55.066C560.906,55.066,561.558,58.903,562.21,58.903C562.862,58.903,563.514,55.678,564.167,55.245C564.819,54.812,565.471,54.596,566.123,54.596C566.776,54.596,567.428,59.869,568.08,61.424C568.732,62.98,569.384,62.844,570.037,63.929C570.689,65.013,571.341,67.929,571.993,67.929C572.646,67.929,573.298,67.8,573.95,67.543C574.602,67.286,575.254,63.344,575.907,62.086C576.559,60.827,577.211,59.992,577.863,59.992C578.516,59.992,579.168,60.413,579.82,60.413C580.472,60.413,581.124,58.333,581.777,57.63C582.429,56.928,583.081,57.153,583.733,56.2C584.386,55.246,585.038,37.922,585.69,37.922C586.342,37.922,586.994,39.187,587.647,39.418C588.299,39.648,588.951,39.711,589.603,39.764C590.256,39.816,590.908,39.843,591.56,39.843C592.212,39.843,592.864,38.793,593.517,36.694C594.169,34.594,594.821,29.532,595.473,25.342C596.126,21.152,596.778,11.554,597.43,11.554C598.082,11.554,598.734,15.388,599.387,15.388C600.039,15.388,600.691,11.83,601.343,11.83C601.996,11.83,602.648,14.625,603.3,14.625C603.952,14.625,604.604,13.165,605.257,13.165C605.909,13.165,606.561,21.044,607.213,22.432C607.866,23.82,608.518,23.81,609.17,24.514C609.822,25.217,610.474,26.485,611.127,26.653C611.779,26.821,612.431,26.737,613.083,26.904C613.736,27.072,614.388,30.372,615.04,30.372C615.692,30.372,616.344,30.116,616.997,29.604C617.649,29.091,618.301,25.248,618.953,24.47C619.606,23.692,620.258,23.528,620.91,23.303C621.562,23.077,622.214,22.964,622.867,22.964C623.519,22.964,624.171,27.448,624.823,27.448C625.476,27.448,626.128,21.295,626.78,19.315C627.432,17.336,628.084,15.571,628.737,15.571C629.389,15.571,630.041,16.62,630.693,16.915C631.346,17.209,631.998,17.357,632.65,17.357C633.302,17.357,633.954,15.405,634.607,15.405C635.259,15.405,635.911,16.275,636.563,16.583C637.216,16.891,637.868,16.806,638.52,17.251C639.172,17.697,639.824,22.72,640.477,23.091C641.129,23.461,641.781,23.646,642.433,23.646C643.086,23.646,643.738,15.504,644.39,14.458C645.042,13.413,645.694,13.283,646.347,12.89C646.999,12.496,647.651,12.096,648.303,12.096C648.956,12.096,649.608,12.629,650.26,13.051C650.912,13.473,651.564,14.626,652.217,14.626C652.869,14.626,653.521,14.52,654.173,14.31C654.826,14.1,655.478,11.981,656.13,11.981C656.782,11.981,657.434,12.935,658.087,12.935C658.739,12.935,659.391,12.406,660.043,12.369C660.696,12.332,661.348,12.323,662,12.314">
                        </path>
                      </g>
                      <g className="recharts-layer recharts-line">
                        <path stroke="#00e2b6" stroke-width="2" fill="none" width="587" height="320"
                          className="recharts-curve recharts-line-curve" type="monotone"
                          d="M75,91.429C75.652,91.688,76.304,91.947,76.957,92.509C77.609,93.07,78.261,94.796,78.913,94.796C79.566,94.796,80.218,91.137,80.87,91.137C81.522,91.137,82.174,91.493,82.827,91.659C83.479,91.826,84.131,92.135,84.783,92.135C85.436,92.135,86.088,87.22,86.74,87.22C87.392,87.22,88.044,87.948,88.697,88.26C89.349,88.572,90.001,89.094,90.653,89.094C91.306,89.094,91.958,88.172,92.61,88.147C93.262,88.123,93.914,88.135,94.567,88.111C95.219,88.087,95.871,87.39,96.523,87.33C97.176,87.27,97.828,87.24,98.48,87.24C99.132,87.24,99.784,87.352,100.437,87.576C101.089,87.799,101.741,88.426,102.393,88.892C103.046,89.357,103.698,90.311,104.35,90.369C105.002,90.428,105.654,90.457,106.307,90.457C106.959,90.457,107.611,87.08,108.263,86.043C108.916,85.006,109.568,84.658,110.22,84.235C110.872,83.812,111.524,83.828,112.177,83.506C112.829,83.184,113.481,82.304,114.133,82.304C114.786,82.304,115.438,82.315,116.09,82.336C116.742,82.357,117.394,82.646,118.047,82.646C118.699,82.646,119.351,82.535,120.003,82.535C120.656,82.535,121.308,84.122,121.96,84.122C122.612,84.122,123.264,82.856,123.917,82.856C124.569,82.856,125.221,82.917,125.873,83.04C126.526,83.162,127.178,84.565,127.83,84.565C128.482,84.565,129.134,84.063,129.787,84.063C130.439,84.063,131.091,86.521,131.743,86.521C132.396,86.521,133.048,85.112,133.7,85.112C134.352,85.112,135.004,86.402,135.657,86.402C136.309,86.402,136.961,84.807,137.613,84.807C138.266,84.807,138.918,85.509,139.57,85.509C140.222,85.509,140.874,85.026,141.527,85.026C142.179,85.026,142.831,86.1,143.483,86.899C144.136,87.698,144.788,88.46,145.44,89.821C146.092,91.182,146.744,95.023,147.397,95.066C148.049,95.108,148.701,95.129,149.353,95.129C150.006,95.129,150.658,94.9,151.31,94.816C151.962,94.732,152.614,94.624,153.267,94.624C153.919,94.624,154.571,104.45,155.223,104.45C155.876,104.45,156.528,101.825,157.18,101.315C157.832,100.805,158.484,100.626,159.137,100.55C159.789,100.473,160.441,100.435,161.093,100.435C161.746,100.435,162.398,102.251,163.05,102.251C163.702,102.251,164.354,100.362,165.007,100.362C165.659,100.362,166.311,102.492,166.963,102.889C167.616,103.285,168.268,103.263,168.92,103.484C169.572,103.705,170.224,103.985,170.877,104.216C171.529,104.446,172.181,104.865,172.833,104.865C173.486,104.865,174.138,102.766,174.79,102.766C175.442,102.766,176.094,105.965,176.747,108.53C177.399,111.095,178.051,115.313,178.703,118.155C179.356,120.997,180.008,124.761,180.66,125.581C181.312,126.402,181.964,125.991,182.617,126.812C183.269,127.632,183.921,131.203,184.573,132.577C185.226,133.951,185.878,135.057,186.53,135.057C187.182,135.057,187.834,125.268,188.487,124.172C189.139,123.077,189.791,123.625,190.443,122.529C191.096,121.434,191.748,112.161,192.4,112.126C193.052,112.091,193.704,112.074,194.357,112.074C195.009,112.074,195.661,117.669,196.313,119.398C196.966,121.127,197.618,121.768,198.27,122.449C198.922,123.13,199.574,123.149,200.227,123.486C200.879,123.824,201.531,124.472,202.183,124.472C202.836,124.472,203.488,122.268,204.14,121.558C204.792,120.847,205.444,121.108,206.097,120.21C206.749,119.311,207.401,111.415,208.053,111.415C208.706,111.415,209.358,113.47,210.01,114.508C210.662,115.545,211.314,117.639,211.967,117.639C212.619,117.639,213.271,116.939,213.923,116.329C214.576,115.72,215.228,113.981,215.88,113.981C216.532,113.981,217.184,114.777,217.837,114.777C218.489,114.777,219.141,113.741,219.793,112.657C220.446,111.573,221.098,109.527,221.75,108.271C222.402,107.014,223.054,105.117,223.707,105.117C224.359,105.117,225.011,106.001,225.663,106.001C226.316,106.001,226.968,103.562,227.62,103.562C228.272,103.562,228.924,108.103,229.577,108.103C230.229,108.103,230.881,107.589,231.533,106.562C232.186,105.535,232.838,102.239,233.49,99.357C234.142,96.474,234.794,89.989,235.447,89.268C236.099,88.547,236.751,88.907,237.403,88.186C238.056,87.465,238.708,82.051,239.36,82.051C240.012,82.051,240.664,87.578,241.317,87.694C241.969,87.811,242.621,87.869,243.273,87.869C243.926,87.869,244.578,85.287,245.23,83.712C245.882,82.136,246.534,78.417,247.187,78.417C247.839,78.417,248.491,78.514,249.143,78.708C249.796,78.902,250.448,79.887,251.1,80.58C251.752,81.273,252.404,81.343,253.057,82.868C253.709,84.393,254.361,91.433,255.013,91.585C255.666,91.738,256.318,91.662,256.97,91.814C257.622,91.967,258.274,92.58,258.927,92.58C259.579,92.58,260.231,88.791,260.883,88.791C261.536,88.791,262.188,90.697,262.84,92.088C263.492,93.478,264.144,97.136,264.797,97.136C265.449,97.136,266.101,95.048,266.753,95.048C267.406,95.048,268.058,100.36,268.71,100.36C269.362,100.36,270.014,99.103,270.667,98.686C271.319,98.268,271.971,98.409,272.623,97.857C273.276,97.305,273.928,95.031,274.58,94.014C275.232,92.998,275.884,91.756,276.537,91.756C277.189,91.756,277.841,99.63,278.493,99.63C279.146,99.63,279.798,99.181,280.45,98.611C281.102,98.041,281.754,96.21,282.407,96.21C283.059,96.21,283.711,97.291,284.363,98.325C285.016,99.359,285.668,102.413,286.32,102.413C286.972,102.413,287.624,96.206,288.277,95.996C288.929,95.787,289.581,95.861,290.233,95.682C290.886,95.503,291.538,94.922,292.19,94.922C292.842,94.922,293.494,95.483,294.147,96.606C294.799,97.728,295.451,104.981,296.103,104.981C296.756,104.981,297.408,104.122,298.06,104.122C298.712,104.122,299.364,105.761,300.017,105.761C300.669,105.761,301.321,105.659,301.973,105.659C302.626,105.659,303.278,109.65,303.93,109.65C304.582,109.65,305.234,109.354,305.887,109.354C306.539,109.354,307.191,109.595,307.843,109.595C308.496,109.595,309.148,109.3,309.8,108.709C310.452,108.119,311.104,107.365,311.757,105.926C312.409,104.487,313.061,100.961,313.713,100.074C314.366,99.187,315.018,99.358,315.67,98.743C316.322,98.128,316.974,97.252,317.627,96.385C318.279,95.518,318.931,95.34,319.583,93.541C320.236,91.742,320.888,88.418,321.54,85.591C322.192,82.764,322.844,76.579,323.497,76.579C324.149,76.579,324.801,77.12,325.453,78.203C326.106,79.285,326.758,84.833,327.41,84.833C328.062,84.833,328.714,83.265,329.367,83.265C330.019,83.265,330.671,85.881,331.323,90.373C331.976,94.864,332.628,110.214,333.28,110.214C333.932,110.214,334.584,103.597,335.237,103.597C335.889,103.597,336.541,106.484,337.193,106.484C337.846,106.484,338.498,102.951,339.15,101.256C339.802,99.562,340.454,97.731,341.107,96.317C341.759,94.903,342.411,93.957,343.063,92.773C343.716,91.589,344.368,91.012,345.02,89.214C345.672,87.416,346.324,81.986,346.977,81.986C347.629,81.986,348.281,83.332,348.933,84.377C349.586,85.422,350.238,88.255,350.89,88.255C351.542,88.255,352.194,83.396,352.847,83.388C353.499,83.38,354.151,83.384,354.803,83.377C355.456,83.369,356.108,81.935,356.76,80.711C357.412,79.486,358.064,76.495,358.717,76.027C359.369,75.559,360.021,75.325,360.673,75.325C361.326,75.325,361.978,77.631,362.63,77.631C363.282,77.631,363.934,76.128,364.587,76.128C365.239,76.128,365.891,79.452,366.543,79.452C367.196,79.452,367.848,79.358,368.5,79.171C369.152,78.984,369.804,76.746,370.457,76.746C371.109,76.746,371.761,77.632,372.413,77.632C373.066,77.632,373.718,72.613,374.37,70.428C375.022,68.242,375.674,66.878,376.327,64.517C376.979,62.156,377.631,56.646,378.283,56.262C378.936,55.879,379.588,56.071,380.24,55.687C380.892,55.304,381.544,53.256,382.197,53.256C382.849,53.256,383.501,55.923,384.153,55.923C384.806,55.923,385.458,55.23,386.11,55.23C386.762,55.23,387.414,55.333,388.067,55.537C388.719,55.742,389.371,57.052,390.023,57.101C390.676,57.151,391.328,57.126,391.98,57.175C392.632,57.224,393.284,59.355,393.937,59.355C394.589,59.355,395.241,57.54,395.893,57.54C396.546,57.54,397.198,58.46,397.85,58.46C398.502,58.46,399.154,56.683,399.807,56.683C400.459,56.683,401.111,56.986,401.763,56.986C402.416,56.986,403.068,53.298,403.72,53.298C404.372,53.298,405.024,55.069,405.677,55.362C406.329,55.655,406.981,55.801,407.633,55.801C408.286,55.801,408.938,51.591,409.59,51.236C410.242,50.881,410.894,51.058,411.547,50.703C412.199,50.348,412.851,47.225,413.503,46.955C414.156,46.686,414.808,46.821,415.46,46.551C416.112,46.282,416.764,44.975,417.417,44.975C418.069,44.975,418.721,45.621,419.373,45.621C420.026,45.621,420.678,43.695,421.33,43.695C421.982,43.695,422.634,44.196,423.287,44.196C423.939,44.196,424.591,43.011,425.243,42.598C425.896,42.185,426.548,41.717,427.2,41.717C427.852,41.717,428.504,43.913,429.157,43.953C429.809,43.993,430.461,44.013,431.113,44.013C431.766,44.013,432.418,43.268,433.07,43.268C433.722,43.268,434.374,43.778,435.027,44.796C435.679,45.815,436.331,48.658,436.983,49.895C437.636,51.133,438.288,51.905,438.94,52.22C439.592,52.534,440.244,52.437,440.897,52.691C441.549,52.946,442.201,53.747,442.853,53.747C443.506,53.747,444.158,42.819,444.81,42.819C445.462,42.819,446.114,46.262,446.767,47.781C447.419,49.301,448.071,51.752,448.723,51.936C449.376,52.121,450.028,52.213,450.68,52.213C451.332,52.213,451.984,50.742,452.637,50.742C453.289,50.742,453.941,51.782,454.593,52.988C455.246,54.193,455.898,57.638,456.55,57.977C457.202,58.317,457.854,58.147,458.507,58.487C459.159,58.826,459.811,61.569,460.463,61.569C461.116,61.569,461.768,61.158,462.42,61.158C463.072,61.158,463.724,66.214,464.377,69.117C465.029,72.02,465.681,75.526,466.333,78.578C466.986,81.63,467.638,87.429,468.29,87.429C468.942,87.429,469.594,80.026,470.247,75.544C470.899,71.062,471.551,60.735,472.203,60.534C472.856,60.334,473.508,60.233,474.16,60.233C474.812,60.233,475.464,63.483,476.117,63.483C476.769,63.483,477.421,58.357,478.073,58.173C478.726,57.988,479.378,58.081,480.03,57.896C480.682,57.711,481.334,47.524,481.987,47.524C482.639,47.524,483.291,50.57,483.943,52.077C484.596,53.585,485.248,56.57,485.9,56.57C486.552,56.57,487.204,54.26,487.857,52.986C488.509,51.713,489.161,48.931,489.813,48.931C490.466,48.931,491.118,51.77,491.77,53.042C492.422,54.313,493.074,54.693,493.727,56.559C494.379,58.425,495.031,61.882,495.683,64.24C496.336,66.598,496.988,70.705,497.64,70.705C498.292,70.705,498.944,67.608,499.597,67.608C500.249,67.608,500.901,71.744,501.553,71.744C502.206,71.744,502.858,69.636,503.51,69.636C504.162,69.636,504.814,79.075,505.467,79.075C506.119,79.075,506.771,70.63,507.423,70.63C508.076,70.63,508.728,73.62,509.38,73.62C510.032,73.62,510.684,69.198,511.337,67.526C511.989,65.855,512.641,63.59,513.293,63.59C513.946,63.59,514.598,73.057,515.25,73.344C515.902,73.631,516.554,73.488,517.207,73.775C517.859,74.062,518.511,76.856,519.163,78.232C519.816,79.608,520.468,80.987,521.12,82.03C521.772,83.073,522.424,83.78,523.077,84.49C523.729,85.199,524.381,85.753,525.033,86.288C525.686,86.823,526.338,87.702,526.99,87.702C527.642,87.702,528.294,82.662,528.947,82.305C529.599,81.947,530.251,81.768,530.903,81.768C531.556,81.768,532.208,83.569,532.86,83.569C533.512,83.569,534.164,81.925,534.817,81.419C535.469,80.912,536.121,81.067,536.773,80.528C537.426,79.988,538.078,78.182,538.73,78.182C539.382,78.182,540.034,81.002,540.687,81.002C541.339,81.002,541.991,75.554,542.643,75.554C543.296,75.554,543.948,76.746,544.6,76.746C545.252,76.746,545.904,65.666,546.557,65.666C547.209,65.666,547.861,68.02,548.513,68.02C549.166,68.02,549.818,52.406,550.47,52.406C551.122,52.406,551.774,53.11,552.427,54.319C553.079,55.528,553.731,57.619,554.383,59.661C555.036,61.702,555.688,66.566,556.34,66.566C556.992,66.566,557.644,65.477,558.297,63.561C558.949,61.644,559.601,55.066,560.253,55.066C560.906,55.066,561.558,58.903,562.21,58.903C562.862,58.903,563.514,55.678,564.167,55.245C564.819,54.812,565.471,54.596,566.123,54.596C566.776,54.596,567.428,59.869,568.08,61.424C568.732,62.98,569.384,62.844,570.037,63.929C570.689,65.013,571.341,67.929,571.993,67.929C572.646,67.929,573.298,67.8,573.95,67.543C574.602,67.286,575.254,63.344,575.907,62.086C576.559,60.827,577.211,59.992,577.863,59.992C578.516,59.992,579.168,60.413,579.82,60.413C580.472,60.413,581.124,58.333,581.777,57.63C582.429,56.928,583.081,57.153,583.733,56.2C584.386,55.246,585.038,37.922,585.69,37.922C586.342,37.922,586.994,39.187,587.647,39.418C588.299,39.648,588.951,39.711,589.603,39.764C590.256,39.816,590.908,39.843,591.56,39.843C592.212,39.843,592.864,38.793,593.517,36.694C594.169,34.594,594.821,29.532,595.473,25.342C596.126,21.152,596.778,11.554,597.43,11.554C598.082,11.554,598.734,15.388,599.387,15.388C600.039,15.388,600.691,11.83,601.343,11.83C601.996,11.83,602.648,14.625,603.3,14.625C603.952,14.625,604.604,13.165,605.257,13.165C605.909,13.165,606.561,21.044,607.213,22.432C607.866,23.82,608.518,23.81,609.17,24.514C609.822,25.217,610.474,26.485,611.127,26.653C611.779,26.821,612.431,26.737,613.083,26.904C613.736,27.072,614.388,30.372,615.04,30.372C615.692,30.372,616.344,30.116,616.997,29.604C617.649,29.091,618.301,25.248,618.953,24.47C619.606,23.692,620.258,23.528,620.91,23.303C621.562,23.077,622.214,22.964,622.867,22.964C623.519,22.964,624.171,27.448,624.823,27.448C625.476,27.448,626.128,21.295,626.78,19.315C627.432,17.336,628.084,15.571,628.737,15.571C629.389,15.571,630.041,16.62,630.693,16.915C631.346,17.209,631.998,17.357,632.65,17.357C633.302,17.357,633.954,15.405,634.607,15.405C635.259,15.405,635.911,16.275,636.563,16.583C637.216,16.891,637.868,16.806,638.52,17.251C639.172,17.697,639.824,22.72,640.477,23.091C641.129,23.461,641.781,23.646,642.433,23.646C643.086,23.646,643.738,15.504,644.39,14.458C645.042,13.413,645.694,13.283,646.347,12.89C646.999,12.496,647.651,12.096,648.303,12.096C648.956,12.096,649.608,12.629,650.26,13.051C650.912,13.473,651.564,14.626,652.217,14.626C652.869,14.626,653.521,14.52,654.173,14.31C654.826,14.1,655.478,11.981,656.13,11.981C656.782,11.981,657.434,12.935,658.087,12.935C658.739,12.935,659.391,12.406,660.043,12.369C660.696,12.332,661.348,12.323,662,12.314">
                        </path>
                      </g>
                      <g className="recharts-layer recharts-line">
                        <path stroke="#ff3194" stroke-width="2" fill="none" width="587" height="320"
                          className="recharts-curve recharts-line-curve" type="monotone"
                          d="M75,91.429C75.652,91.986,76.304,92.543,76.957,93.504C77.609,94.465,78.261,97.196,78.913,97.196C79.566,97.196,80.218,93.377,80.87,93.377C81.522,93.377,82.174,93.794,82.827,93.997C83.479,94.2,84.131,94.597,84.783,94.597C85.436,94.597,86.088,91.639,86.74,91.639C87.392,91.639,88.044,91.69,88.697,91.791C89.349,91.893,90.001,92.711,90.653,92.711C91.306,92.711,91.958,91.813,92.61,91.813C93.262,91.813,93.914,91.826,94.567,91.826C95.219,91.826,95.871,91.429,96.523,91.429C97.176,91.429,97.828,91.87,98.48,92.177C99.132,92.483,99.784,92.723,100.437,93.268C101.089,93.812,101.741,94.661,102.393,95.442C103.046,96.224,103.698,97.793,104.35,97.958C105.002,98.123,105.654,98.205,106.307,98.205C106.959,98.205,107.611,94.466,108.263,93.538C108.916,92.609,109.568,92.406,110.22,92.145C110.872,91.883,111.524,91.86,112.177,91.752C112.829,91.644,113.481,91.528,114.133,91.496C114.786,91.464,115.438,91.448,116.09,91.448C116.742,91.448,117.394,91.52,118.047,91.52C118.699,91.52,119.351,91.485,120.003,91.485C120.656,91.485,121.308,93.342,121.96,93.342C122.612,93.342,123.264,91.961,123.917,91.961C124.569,91.961,125.221,92.038,125.873,92.193C126.526,92.348,127.178,94.067,127.83,94.067C128.482,94.067,129.134,93.557,129.787,93.557C130.439,93.557,131.091,96.545,131.743,96.545C132.396,96.545,133.048,95.005,133.7,95.005C134.352,95.005,135.004,96.48,135.657,96.48C136.309,96.48,136.961,94.838,137.613,94.838C138.266,94.838,138.918,95.612,139.57,95.612C140.222,95.612,140.874,95.169,141.527,95.169C142.179,95.169,142.831,96.301,143.483,97.204C144.136,98.107,144.788,98.937,145.44,100.589C146.092,102.241,146.744,107.066,147.397,107.117C148.049,107.168,148.701,107.194,149.353,107.194C150.006,107.194,150.658,107.001,151.31,106.932C151.962,106.862,152.614,106.778,153.267,106.778C153.919,106.778,154.571,117.834,155.223,117.834C155.876,117.834,156.528,115.174,157.18,114.752C157.832,114.329,158.484,114.149,159.137,114.118C159.789,114.088,160.441,114.072,161.093,114.072C161.746,114.072,162.398,115.874,163.05,115.874C163.702,115.874,164.354,114.105,165.007,114.105C165.659,114.105,166.311,116.193,166.963,116.609C167.616,117.025,168.268,117.002,168.92,117.233C169.572,117.463,170.224,117.751,170.877,117.992C171.529,118.232,172.181,118.676,172.833,118.676C173.486,118.676,174.138,116.705,174.79,116.705C175.442,116.705,176.094,119.764,176.747,122.384C177.399,125.004,178.051,129.42,178.703,132.427C179.356,135.434,180.008,139.588,180.66,140.427C181.312,141.266,181.964,140.846,182.617,141.686C183.269,142.525,183.921,146.326,184.573,147.767C185.226,149.209,185.878,150.335,186.53,150.335C187.182,150.335,187.834,140.952,188.487,140.063C189.139,139.174,189.791,139.618,190.443,138.729C191.096,137.841,191.748,129.798,192.4,129.798C193.052,129.798,193.704,129.801,194.357,129.806C195.009,129.811,195.661,134.697,196.313,136.237C196.966,137.777,197.618,138.411,198.27,139.046C198.922,139.68,199.574,139.715,200.227,140.043C200.879,140.371,201.531,141.014,202.183,141.014C202.836,141.014,203.488,139.054,204.14,138.432C204.792,137.81,205.444,138.048,206.097,137.28C206.749,136.512,207.401,129.816,208.053,129.816C208.706,129.816,209.358,131.58,210.01,132.49C210.662,133.4,211.314,135.276,211.967,135.276C212.619,135.276,213.271,134.687,213.923,134.168C214.576,133.649,215.228,132.164,215.88,132.164C216.532,132.164,217.184,132.899,217.837,132.899C218.489,132.899,219.141,132.012,219.793,131.108C220.446,130.204,221.098,128.503,221.75,127.474C222.402,126.444,223.054,124.931,223.707,124.931C224.359,124.931,225.011,125.707,225.663,125.707C226.316,125.707,226.968,123.713,227.62,123.713C228.272,123.713,228.924,127.608,229.577,127.608C230.229,127.608,230.881,127.179,231.533,126.322C232.186,125.465,232.838,122.63,233.49,120.347C234.142,118.064,234.794,113.133,235.447,112.622C236.099,112.112,236.751,112.367,237.403,111.857C238.056,111.346,238.708,107.265,239.36,107.265C240.012,107.265,240.664,111.536,241.317,111.658C241.969,111.78,242.621,111.841,243.273,111.841C243.926,111.841,244.578,109.749,245.23,108.533C245.882,107.317,246.534,104.543,247.187,104.543C247.839,104.543,248.491,104.645,249.143,104.848C249.796,105.052,250.448,105.786,251.1,106.37C251.752,106.953,252.404,107.03,253.057,108.35C253.709,109.671,254.361,116.176,255.013,116.341C255.666,116.507,256.318,116.424,256.97,116.589C257.622,116.754,258.274,117.339,258.927,117.339C259.579,117.339,260.231,113.974,260.883,113.974C261.536,113.974,262.188,115.679,262.84,116.969C263.492,118.259,264.144,121.714,264.797,121.714C265.449,121.714,266.101,119.813,266.753,119.813C267.406,119.813,268.058,124.826,268.71,124.826C269.362,124.826,270.014,123.671,270.667,123.298C271.319,122.925,271.971,123.061,272.623,122.588C273.276,122.114,273.928,120.092,274.58,119.214C275.232,118.336,275.884,117.317,276.537,117.317C277.189,117.317,277.841,124.383,278.493,124.383C279.146,124.383,279.798,123.999,280.45,123.508C281.102,123.017,281.754,121.438,282.407,121.438C283.059,121.438,283.711,122.403,284.363,123.342C285.016,124.281,285.668,127.074,286.32,127.074C286.972,127.074,287.624,121.572,288.277,121.422C288.929,121.272,289.581,121.336,290.233,121.197C290.886,121.059,291.538,120.592,292.19,120.592C292.842,120.592,293.494,121.088,294.147,122.081C294.799,123.074,295.451,129.661,296.103,129.661C296.756,129.661,297.408,128.942,298.06,128.942C298.712,128.942,299.364,130.476,300.017,130.476C300.669,130.476,301.321,130.426,301.973,130.426C302.626,130.426,303.278,134.139,303.93,134.139C304.582,134.139,305.234,133.941,305.887,133.941C306.539,133.941,307.191,134.223,307.843,134.223C308.496,134.223,309.148,133.973,309.8,133.474C310.452,132.976,311.104,132.284,311.757,131.063C312.409,129.842,313.061,126.849,313.713,126.148C314.366,125.447,315.018,125.588,315.67,125.097C316.322,124.606,316.974,123.892,317.627,123.202C318.279,122.512,318.931,122.342,319.583,120.957C320.236,119.571,320.888,116.961,321.54,114.888C322.192,112.815,322.844,108.518,323.497,108.518C324.149,108.518,324.801,108.912,325.453,109.698C326.106,110.485,326.758,114.941,327.41,114.941C328.062,114.941,328.714,113.699,329.367,113.699C330.019,113.699,330.671,115.73,331.323,119.792C331.976,123.855,332.628,138.882,333.28,138.882C333.932,138.882,334.584,133.025,335.237,133.025C335.889,133.025,336.541,135.556,337.193,135.556C337.846,135.556,338.498,132.553,339.15,131.161C339.802,129.769,340.454,128.329,341.107,127.206C341.759,126.082,342.411,125.339,343.063,124.42C343.716,123.5,344.368,123.042,345.02,121.689C345.672,120.335,346.324,116.299,346.977,116.299C347.629,116.299,348.281,117.305,348.933,118.127C349.586,118.95,350.238,121.236,350.89,121.236C351.542,121.236,352.194,117.433,352.847,117.433C353.499,117.433,354.151,117.465,354.803,117.465C355.456,117.465,356.108,116.352,356.76,115.438C357.412,114.523,358.064,112.301,358.717,111.979C359.369,111.656,360.021,111.495,360.673,111.495C361.326,111.495,361.978,113.262,362.63,113.262C363.282,113.262,363.934,112.148,364.587,112.148C365.239,112.148,365.891,114.776,366.543,114.776C367.196,114.776,367.848,114.715,368.5,114.594C369.152,114.473,369.804,112.729,370.457,112.729C371.109,112.729,371.761,113.468,372.413,113.468C373.066,113.468,373.718,109.619,374.37,108.032C375.022,106.445,375.674,105.496,376.327,103.948C376.979,102.401,377.631,98.959,378.283,98.745C378.936,98.532,379.588,98.639,380.24,98.425C380.892,98.212,381.544,96.982,382.197,96.982C382.849,96.982,383.501,98.721,384.153,98.721C384.806,98.721,385.458,98.28,386.11,98.28C386.762,98.28,387.414,98.4,388.067,98.64C388.719,98.88,389.371,99.791,390.023,99.856C390.676,99.921,391.328,99.889,391.98,99.953C392.632,100.018,393.284,101.749,393.937,101.749C394.589,101.749,395.241,100.333,395.893,100.333C396.546,100.333,397.198,101.109,397.85,101.109C398.502,101.109,399.154,99.749,399.807,99.749C400.459,99.749,401.111,100.028,401.763,100.028C402.416,100.028,403.068,97.307,403.72,97.307C404.372,97.307,405.024,98.617,405.677,98.871C406.329,99.125,406.981,99.253,407.633,99.253C408.286,99.253,408.938,96.169,409.59,95.953C410.242,95.737,410.894,95.845,411.547,95.63C412.199,95.414,412.851,93.413,413.503,93.312C414.156,93.211,414.808,93.262,415.46,93.161C416.112,93.06,416.764,92.338,417.417,92.338C418.069,92.338,418.721,92.743,419.373,92.743C420.026,92.743,420.678,91.742,421.33,91.742C421.982,91.742,422.634,92.016,423.287,92.016C423.939,92.016,424.591,91.433,425.243,91.433C425.896,91.433,426.548,91.955,427.2,92.987C427.852,94.02,428.504,97.628,429.157,97.628C429.809,97.628,430.461,97.3,431.113,97.104C431.766,96.909,432.418,96.456,433.07,96.456C433.722,96.456,434.374,96.966,435.027,97.986C435.679,99.005,436.331,101.663,436.983,102.85C437.636,104.037,438.288,104.782,438.94,105.107C439.592,105.433,440.244,105.34,440.897,105.596C441.549,105.851,442.201,106.641,442.853,106.641C443.506,106.641,444.158,98.02,444.81,98.02C445.462,98.02,446.114,100.558,446.767,101.753C447.419,102.947,448.071,104.998,448.723,105.185C449.376,105.372,450.028,105.465,450.68,105.465C451.332,105.465,451.984,104.329,452.637,104.329C453.289,104.329,453.941,105.161,454.593,106.174C455.246,107.188,455.898,110.1,456.55,110.411C457.202,110.722,457.854,110.566,458.507,110.877C459.159,111.188,459.811,113.599,460.463,113.599C461.116,113.599,461.768,113.294,462.42,113.294C463.072,113.294,463.724,117.476,464.377,119.98C465.029,122.484,465.681,125.609,466.333,128.317C466.986,131.025,467.638,136.226,468.29,136.226C468.942,136.226,469.594,129.829,470.247,126.416C470.899,123.004,471.551,115.857,472.203,115.753C472.856,115.649,473.508,115.598,474.16,115.598C474.812,115.598,475.464,118.027,476.117,118.027C476.769,118.027,477.421,114.334,478.073,114.225C478.726,114.117,479.378,114.171,480.03,114.063C480.682,113.955,481.334,107.099,481.987,107.099C482.639,107.099,483.291,109.195,483.943,110.28C484.596,111.365,485.248,113.61,485.9,113.61C486.552,113.61,487.204,111.916,487.857,111.013C488.509,110.11,489.161,108.192,489.813,108.192C490.466,108.192,491.118,110.282,491.77,111.242C492.422,112.201,493.074,112.477,493.727,113.949C494.379,115.421,495.031,118.156,495.683,120.073C496.336,121.99,496.988,125.454,497.64,125.454C498.292,125.454,498.944,123.002,499.597,123.002C500.249,123.002,500.901,126.346,501.553,126.346C502.206,126.346,502.858,124.711,503.51,124.711C504.162,124.711,504.814,132.352,505.467,132.352C506.119,132.352,506.771,125.747,507.423,125.747C508.076,125.747,508.728,128.064,509.38,128.064C510.032,128.064,510.684,124.794,511.337,123.583C511.989,122.372,512.641,120.797,513.293,120.797C513.946,120.797,514.598,127.777,515.25,128.026C515.902,128.276,516.554,128.151,517.207,128.401C517.859,128.651,518.511,130.785,519.163,131.863C519.816,132.941,520.468,134.041,521.12,134.87C521.772,135.699,522.424,136.266,523.077,136.835C523.729,137.405,524.381,137.853,525.033,138.288C525.686,138.722,526.338,139.442,526.99,139.442C527.642,139.442,528.294,135.604,528.947,135.365C529.599,135.127,530.251,135.008,530.903,135.008C531.556,135.008,532.208,136.384,532.86,136.384C533.512,136.384,534.164,135.217,534.817,134.862C535.469,134.508,536.121,134.632,536.773,134.258C537.426,133.883,538.078,132.614,538.73,132.614C539.382,132.614,540.034,134.691,540.687,134.691C541.339,134.691,541.991,130.822,542.643,130.822C543.296,130.822,543.948,131.703,544.6,131.703C545.252,131.703,545.904,124.14,546.557,124.14C547.209,124.14,547.861,125.758,548.513,125.758C549.166,125.758,549.818,115.682,550.47,115.682C551.122,115.682,551.774,116.16,552.427,116.988C553.079,117.815,553.731,119.205,554.383,120.649C555.036,122.093,555.688,125.649,556.34,125.649C556.992,125.649,557.644,124.839,558.297,123.5C558.949,122.161,559.601,117.612,560.253,117.612C560.906,117.612,561.558,120.336,562.21,120.336C562.862,120.336,563.514,118.089,564.167,117.816C564.819,117.542,565.471,117.406,566.123,117.406C566.776,117.406,567.428,121.192,568.08,122.328C568.732,123.464,569.384,123.394,570.037,124.222C570.689,125.05,571.341,127.296,571.993,127.296C572.646,127.296,573.298,127.213,573.95,127.048C574.602,126.883,575.254,123.969,575.907,123.062C576.559,122.155,577.211,121.605,577.863,121.605C578.516,121.605,579.168,121.942,579.82,121.942C580.472,121.942,581.124,120.502,581.777,120.022C582.429,119.542,583.081,119.703,583.733,119.064C584.386,118.425,585.038,107.382,585.69,107.382C586.342,107.382,586.994,108.11,587.647,108.276C588.299,108.441,588.951,108.456,589.603,108.524C590.256,108.591,590.908,108.68,591.56,108.68C592.212,108.68,592.864,108.016,593.517,106.689C594.169,105.361,594.821,102.13,595.473,99.928C596.126,97.727,596.778,93.481,597.43,93.481C598.082,93.481,598.734,95.346,599.387,95.346C600.039,95.346,600.691,93.508,601.343,93.508C601.996,93.508,602.648,95.013,603.3,95.013C603.952,95.013,604.604,94.193,605.257,94.193C605.909,94.193,606.561,99.513,607.213,100.631C607.866,101.748,608.518,101.742,609.17,102.307C609.822,102.871,610.474,103.874,611.127,104.017C611.779,104.161,612.431,104.089,613.083,104.233C613.736,104.376,614.388,106.984,615.04,106.984C615.692,106.984,616.344,106.806,616.997,106.45C617.649,106.095,618.301,103.233,618.953,102.725C619.606,102.217,620.258,102.093,620.91,101.963C621.562,101.832,622.214,101.767,622.867,101.767C623.519,101.767,624.171,104.993,624.823,104.993C625.476,104.993,626.128,100.766,626.78,99.47C627.432,98.174,628.084,97.219,628.737,97.219C629.389,97.219,630.041,97.872,630.693,98.067C631.346,98.261,631.998,98.385,632.65,98.385C633.302,98.385,633.954,97.188,634.607,97.188C635.259,97.188,635.911,97.757,636.563,97.966C637.216,98.175,637.868,98.124,638.52,98.442C639.172,98.759,639.824,102.319,640.477,102.615C641.129,102.91,641.781,103.058,642.433,103.058C643.086,103.058,643.738,97.538,644.39,96.921C645.042,96.303,645.694,96.22,646.347,95.995C646.999,95.769,647.651,95.567,648.303,95.567C648.956,95.567,649.608,95.907,650.26,96.186C650.912,96.465,651.564,97.241,652.217,97.241C652.869,97.241,653.521,97.183,654.173,97.066C654.826,96.949,655.478,95.605,656.13,95.605C656.782,95.605,657.434,96.239,658.087,96.239C658.739,96.239,659.391,95.926,660.043,95.91C660.696,95.894,661.348,95.889,662,95.885">
                        </path>
                      </g>
                      <g className="recharts-layer recharts-line">
                        <path stroke="#14c2e5" stroke-width="2" fill="none" width="587" height="320"
                          className="recharts-curve recharts-line-curve" type="monotone"
                          d="M75,297.661C75.652,294.658,76.304,291.655,76.957,288.865C77.609,286.076,78.261,280.924,78.913,280.924C79.566,280.924,80.218,289.188,80.87,289.188C81.522,289.188,82.174,288.148,82.827,287.665C83.479,287.182,84.131,286.291,84.783,286.291C85.436,286.291,86.088,299.89,86.74,299.89C87.392,299.89,88.044,295.831,88.697,294.352C89.349,292.873,90.001,291.017,90.653,291.017C91.306,291.017,91.958,294.247,92.61,294.247C93.262,294.247,93.914,294.187,94.567,294.187C95.219,294.187,95.871,296.525,96.523,297.775C97.176,299.025,97.828,300.704,98.48,301.684C99.132,302.664,99.784,302.941,100.437,303.653C101.089,304.365,101.741,305.283,102.393,305.956C103.046,306.63,103.698,307.599,104.35,307.694C105.002,307.788,105.654,307.836,106.307,307.836C106.959,307.836,107.611,305.053,108.263,304.015C108.916,302.976,109.568,302.209,110.22,301.605C110.872,301.001,111.524,301.2,112.177,300.391C112.829,299.582,113.481,296.29,114.133,296.29C114.786,296.29,115.438,296.503,116.09,296.929C116.742,297.356,117.394,299.154,118.047,299.154C118.699,299.154,119.351,298.841,120.003,298.841C120.656,298.841,121.308,303.756,121.96,303.756C122.612,303.756,123.264,301.105,123.917,301.105C124.569,301.105,125.221,301.311,125.873,301.725C126.526,302.138,127.178,304.645,127.83,304.645C128.482,304.645,129.134,304.039,129.787,304.039C130.439,304.039,131.091,306.794,131.743,306.794C132.396,306.794,133.048,305.578,133.7,305.578C134.352,305.578,135.004,306.749,135.657,306.749C136.309,306.749,136.961,305.426,137.613,305.426C138.266,305.426,138.918,306.095,139.57,306.095C140.222,306.095,140.874,305.724,141.527,305.724C142.179,305.724,142.831,306.682,143.483,307.234C144.136,307.786,144.788,308.347,145.44,309.034C146.092,309.721,146.744,311.34,147.397,311.354C148.049,311.369,148.701,311.376,149.353,311.376C150.006,311.376,150.658,311.321,151.31,311.301C151.962,311.281,152.614,311.256,153.267,311.256C153.919,311.256,154.571,313.747,155.223,313.747C155.876,313.747,156.528,313.255,157.18,313.17C157.832,313.085,158.484,313.048,159.137,313.042C159.789,313.036,160.441,313.033,161.093,313.033C161.746,313.033,162.398,313.388,163.05,313.388C163.702,313.388,164.354,313.039,165.007,313.039C165.659,313.039,166.311,313.45,166.963,313.526C167.616,313.602,168.268,313.598,168.92,313.64C169.572,313.681,170.224,313.733,170.877,313.775C171.529,313.817,172.181,313.893,172.833,313.893C173.486,313.893,174.138,313.544,174.79,313.544C175.442,313.544,176.094,314.114,176.747,314.488C177.399,314.861,178.051,315.434,178.703,315.783C179.356,316.132,180.008,316.508,180.66,316.583C181.312,316.657,181.964,316.62,182.617,316.694C183.269,316.769,183.921,317.074,184.573,317.188C185.226,317.301,185.878,317.376,186.53,317.376C187.182,317.376,187.834,316.632,188.487,316.55C189.139,316.468,189.791,316.509,190.443,316.427C191.096,316.345,191.748,315.481,192.4,315.481C193.052,315.481,193.704,315.481,194.357,315.482C195.009,315.482,195.661,316.023,196.313,316.185C196.966,316.347,197.618,316.396,198.27,316.456C198.922,316.517,199.574,316.518,200.227,316.548C200.879,316.578,201.531,316.635,202.183,316.635C202.836,316.635,203.488,316.456,204.14,316.399C204.792,316.341,205.444,316.362,206.097,316.288C206.749,316.214,207.401,315.483,208.053,315.483C208.706,315.483,209.358,315.69,210.01,315.79C210.662,315.891,211.314,316.087,211.967,316.087C212.619,316.087,213.271,316.028,213.923,315.972C214.576,315.916,215.228,315.754,215.88,315.754C216.532,315.754,217.184,315.835,217.837,315.835C218.489,315.835,219.141,315.741,219.793,315.634C220.446,315.527,221.098,315.323,221.75,315.193C222.402,315.063,223.054,314.855,223.707,314.855C224.359,314.855,225.011,314.961,225.663,314.961C226.316,314.961,226.968,314.683,227.62,314.683C228.272,314.683,228.924,315.21,229.577,315.21C230.229,315.21,230.881,315.155,231.533,315.043C232.186,314.932,232.838,314.557,233.49,314.171C234.142,313.785,234.794,312.839,235.447,312.726C236.099,312.613,236.751,312.67,237.403,312.556C238.056,312.443,238.708,311.396,239.36,311.396C240.012,311.396,240.664,312.484,241.317,312.511C241.969,312.539,242.621,312.553,243.273,312.553C243.926,312.553,244.578,312.077,245.23,311.744C245.882,311.412,246.534,310.559,247.187,310.559C247.839,310.559,248.491,310.593,249.143,310.66C249.796,310.727,250.448,310.963,251.1,311.136C251.752,311.308,252.404,311.322,253.057,311.696C253.709,312.069,254.361,313.446,255.013,313.476C255.666,313.507,256.318,313.492,256.97,313.522C257.622,313.553,258.274,313.659,258.927,313.659C259.579,313.659,260.231,313.012,260.883,313.012C261.536,313.012,262.188,313.363,262.84,313.592C263.492,313.821,264.144,314.386,264.797,314.386C265.449,314.386,266.101,314.084,266.753,314.084C267.406,314.084,268.058,314.84,268.71,314.84C269.362,314.84,270.014,314.677,270.667,314.623C271.319,314.569,271.971,314.588,272.623,314.518C273.276,314.448,273.928,314.128,274.58,313.985C275.232,313.841,275.884,313.655,276.537,313.655C277.189,313.655,277.841,314.779,278.493,314.779C279.146,314.779,279.798,314.726,280.45,314.654C281.102,314.581,281.754,314.343,282.407,314.343C283.059,314.343,283.711,314.496,284.363,314.629C285.016,314.763,285.668,315.142,286.32,315.142C286.972,315.142,287.624,314.364,288.277,314.341C288.929,314.318,289.581,314.328,290.233,314.306C290.886,314.284,291.538,314.21,292.19,314.21C292.842,314.21,293.494,314.287,294.147,314.442C294.799,314.597,295.451,315.464,296.103,315.464C296.756,315.464,297.408,315.377,298.06,315.377C298.712,315.377,299.364,315.561,300.017,315.561C300.669,315.561,301.321,315.555,301.973,315.555C302.626,315.555,303.278,315.969,303.93,315.969C304.582,315.969,305.234,315.948,305.887,315.948C306.539,315.948,307.191,315.978,307.843,315.978C308.496,315.978,309.148,315.951,309.8,315.898C310.452,315.845,311.104,315.775,311.757,315.629C312.409,315.483,313.061,315.115,313.713,315.02C314.366,314.925,315.018,314.946,315.67,314.878C316.322,314.809,316.974,314.711,317.627,314.609C318.279,314.507,318.931,314.495,319.583,314.268C320.236,314.041,320.888,313.618,321.54,313.197C322.192,312.776,322.844,311.74,323.497,311.74C324.149,311.74,324.801,311.842,325.453,312.044C326.106,312.247,326.758,313.207,327.41,313.207C328.062,313.207,328.714,312.955,329.367,312.955C330.019,312.955,330.671,313.5,331.323,314.081C331.976,314.662,332.628,316.441,333.28,316.441C333.932,316.441,334.584,315.849,335.237,315.849C335.889,315.849,336.541,316.116,337.193,316.116C337.846,316.116,338.498,315.8,339.15,315.64C339.802,315.481,340.454,315.302,341.107,315.159C341.759,315.016,342.411,314.913,343.063,314.784C343.716,314.654,344.368,314.601,345.02,314.382C345.672,314.163,346.324,313.468,346.977,313.468C347.629,313.468,348.281,313.658,348.933,313.799C349.586,313.939,350.238,314.312,350.89,314.312C351.542,314.312,352.194,313.676,352.847,313.676C353.499,313.676,354.151,313.682,354.803,313.682C355.456,313.682,356.108,313.487,356.76,313.304C357.412,313.121,358.064,312.657,358.717,312.584C359.369,312.511,360.021,312.474,360.673,312.474C361.326,312.474,361.978,312.864,362.63,312.864C363.282,312.864,363.934,312.622,364.587,312.622C365.239,312.622,365.891,313.175,366.543,313.175C367.196,313.175,367.848,313.162,368.5,313.138C369.152,313.114,369.804,312.749,370.457,312.749C371.109,312.749,371.761,312.907,372.413,312.907C373.066,312.907,373.718,312.035,374.37,311.61C375.022,311.184,375.674,310.936,376.327,310.356C376.979,309.777,377.631,308.249,378.283,308.133C378.936,308.017,379.588,308.075,380.24,307.959C380.892,307.843,381.544,307.09,382.197,307.09C382.849,307.09,383.501,308.12,384.153,308.12C384.806,308.12,385.458,307.878,386.11,307.878C386.762,307.878,387.414,307.944,388.067,308.076C388.719,308.208,389.371,308.664,390.023,308.695C390.676,308.725,391.328,308.71,391.98,308.741C392.632,308.772,393.284,309.53,393.937,309.53C394.589,309.53,395.241,308.918,395.893,308.918C396.546,308.918,397.198,309.262,397.85,309.262C398.502,309.262,399.154,308.643,399.807,308.643C400.459,308.643,401.111,308.776,401.763,308.776C402.416,308.776,403.068,307.299,403.72,307.299C404.372,307.299,405.024,308.068,405.677,308.2C406.329,308.331,406.981,308.397,407.633,308.397C408.286,308.397,408.938,306.531,409.59,306.363C410.242,306.194,410.894,306.278,411.547,306.109C412.199,305.94,412.851,303.858,413.503,303.715C414.156,303.572,414.808,303.643,415.46,303.5C416.112,303.358,416.764,302.055,417.417,302.055C418.069,302.055,418.721,302.839,419.373,302.839C420.026,302.839,420.678,300.353,421.33,300.353C421.982,300.353,422.634,301.264,423.287,301.264C423.939,301.264,424.591,299.827,425.243,297.987C425.896,296.147,426.548,293.21,427.2,290.226C427.852,287.242,428.504,280.083,429.157,280.083C429.809,280.083,430.461,280.719,431.113,281.104C431.766,281.488,432.418,282.388,433.07,282.388C433.722,282.388,434.374,281.39,435.027,279.395C435.679,277.4,436.331,272.512,436.983,270.293C437.636,268.075,438.288,266.696,438.94,266.083C439.592,265.471,440.244,265.647,440.897,265.164C441.549,264.682,442.201,263.186,442.853,263.186C443.506,263.186,444.158,279.329,444.81,279.329C445.462,279.329,446.114,274.562,446.767,272.33C447.419,270.098,448.071,266.289,448.723,265.938C449.376,265.586,450.028,265.41,450.68,265.41C451.332,265.41,451.984,267.54,452.637,267.54C453.289,267.54,453.941,266.018,454.593,264.072C455.246,262.126,455.898,256.483,456.55,255.863C457.202,255.242,457.854,255.552,458.507,254.932C459.159,254.311,459.811,249.367,460.463,249.367C461.116,249.367,461.768,250.002,462.42,250.002C463.072,250.002,463.724,241.283,464.377,235.254C465.029,229.224,465.681,221.494,466.333,213.823C466.986,206.152,467.638,189.226,468.29,189.226C468.942,189.226,469.594,209.804,470.247,219.064C470.899,228.324,471.551,244.561,472.203,244.785C472.856,245.009,473.508,245.121,474.16,245.121C474.812,245.121,475.464,239.753,476.117,239.753C476.769,239.753,477.421,247.823,478.073,248.052C478.726,248.28,479.378,248.166,480.03,248.394C480.682,248.623,481.334,262.313,481.987,262.313C482.639,262.313,483.291,258.284,483.943,256.122C484.596,253.961,485.248,249.345,485.9,249.345C486.552,249.345,487.204,252.847,487.857,254.659C488.509,256.47,489.161,260.212,489.813,260.212C490.466,260.212,491.118,256.129,491.77,254.2C492.422,252.27,493.074,251.829,493.727,248.635C494.379,245.44,495.031,239.535,495.683,235.035C496.336,230.534,496.988,221.633,497.64,221.633C498.292,221.633,498.944,227.931,499.597,227.931C500.249,227.931,500.901,219.254,501.553,219.254C502.206,219.254,502.858,223.575,503.51,223.575C504.162,223.575,504.814,201.883,505.467,201.883C506.119,201.883,506.771,220.855,507.423,220.855C508.076,220.855,508.728,214.535,509.38,214.535C510.032,214.535,510.684,223.339,511.337,226.469C511.989,229.599,512.641,233.317,513.293,233.317C513.946,233.317,514.598,215.343,515.25,214.64C515.902,213.938,516.554,214.289,517.207,213.586C517.859,212.884,518.511,206.691,519.163,203.393C519.816,200.096,520.468,196.513,521.12,193.801C521.772,191.088,522.424,189.094,523.077,187.119C523.729,185.144,524.381,183.522,525.033,181.952C525.686,180.382,526.338,177.699,526.99,177.699C527.642,177.699,528.294,191.353,528.947,192.15C529.599,192.946,530.251,193.344,530.903,193.344C531.556,193.344,532.208,188.684,532.86,188.684C533.512,188.684,534.164,192.638,534.817,193.826C535.469,195.015,536.121,194.608,536.773,195.814C537.426,197.021,538.078,201.065,538.73,201.065C539.382,201.065,540.034,194.392,540.687,194.392C541.339,194.392,541.991,206.548,542.643,206.548C543.296,206.548,543.948,203.882,544.6,203.882C545.252,203.882,545.904,225.048,546.557,225.048C547.209,225.048,547.861,220.827,548.513,220.827C549.166,220.827,549.818,244.939,550.47,244.939C551.122,244.939,551.774,243.957,552.427,242.079C553.079,240.201,553.731,237.165,554.383,233.671C555.036,230.177,555.688,221.115,556.34,221.115C556.992,221.115,557.644,223.416,558.297,226.678C558.949,229.94,559.601,240.686,560.253,240.686C560.906,240.686,561.558,234.415,562.21,234.415C562.862,234.415,563.514,239.616,564.167,240.229C564.819,240.843,565.471,241.149,566.123,241.149C566.776,241.149,567.428,232.322,568.08,229.603C568.732,226.885,569.384,226.995,570.037,224.839C570.689,222.683,571.341,216.668,571.993,216.668C572.646,216.668,573.298,216.895,573.95,217.348C574.602,217.802,575.254,225.442,575.907,227.78C576.559,230.117,577.211,231.372,577.863,231.372C578.516,231.372,579.168,230.551,579.82,230.551C580.472,230.551,581.124,234.015,581.777,235.154C582.429,236.293,583.081,235.898,583.733,237.385C584.386,238.872,585.038,261.772,585.69,261.772C586.342,261.772,586.994,260.371,587.647,260.05C588.299,259.73,588.951,259.7,589.603,259.569C590.256,259.439,590.908,259.266,591.56,259.266C592.212,259.266,592.864,260.542,593.517,263.095C594.169,265.648,594.821,271.418,595.473,275.723C596.126,280.028,596.778,288.923,597.43,288.923C598.082,288.923,598.734,284.667,599.387,284.667C600.039,284.667,600.691,288.854,601.343,288.854C601.996,288.854,602.648,285.378,603.3,285.378C603.952,285.378,604.604,287.207,605.257,287.207C605.909,287.207,606.561,276.488,607.213,274.413C607.866,272.339,608.518,272.35,609.17,271.302C609.822,270.253,610.474,268.39,611.127,268.122C611.779,267.854,612.431,267.988,613.083,267.721C613.736,267.453,614.388,262.533,615.04,262.533C615.692,262.533,616.344,262.872,616.997,263.549C617.649,264.225,618.301,269.584,618.953,270.526C619.606,271.469,620.258,271.698,620.91,271.941C621.562,272.183,622.214,272.304,622.867,272.304C623.519,272.304,624.171,266.297,624.823,266.297C625.476,266.297,626.128,274.151,626.78,276.581C627.432,279.012,628.084,280.878,628.737,280.878C629.389,280.878,630.041,279.614,630.693,279.24C631.346,278.865,631.998,278.632,632.65,278.632C633.302,278.632,633.954,280.939,634.607,280.939C635.259,280.939,635.911,279.835,636.563,279.433C637.216,279.03,637.868,279.13,638.52,278.524C639.172,277.918,639.824,271.279,640.477,270.73C641.129,270.182,641.781,269.907,642.433,269.907C643.086,269.907,643.738,280.227,644.39,281.465C645.042,282.703,645.694,282.865,646.347,283.322C646.999,283.778,647.651,284.203,648.303,284.203C648.956,284.203,649.608,283.494,650.26,282.933C650.912,282.372,651.564,280.835,652.217,280.835C652.869,280.835,653.521,280.949,654.173,281.178C654.826,281.407,655.478,284.124,656.13,284.124C656.782,284.124,657.434,282.825,658.087,282.825C658.739,282.825,659.391,283.462,660.043,283.495C660.696,283.528,661.348,283.537,662,283.545">
                        </path>
                      </g>
                      <g className="recharts-layer recharts-reference-line">
                        <line y="51.92" stroke-width="0" fill="none" stroke="#ccc" fill-opacity="1" x1="75"
                          y1="12.312380952380941" x2="662" y2="12.312380952380941"
                          className="recharts-reference-line-line"></line>
                        <g className="text-buy text-glow-sm" fill="#00e2b6"><text x="75" y="12.312380952380941"
                          dx="592">
                          <tspan font-size="12">MORODEX</tspan>
                        </text><text x="75" y="12.312380952380941" dx="592" dy="12">
                            <tspan font-size="12">Impermanent</tspan>
                          </text><text x="75" y="12.312380952380941" dx="592" dy="24">
                            <tspan font-size="12">Gain</tspan>
                          </text></g>
                      </g>
                      <g className="recharts-layer recharts-reference-line">
                        <line y="-2.92" stroke-width="0" fill="none" stroke="#ccc" fill-opacity="1" x1="75"
                          y1="95.87809523809523" x2="662" y2="95.87809523809523"
                          className="recharts-reference-line-line"></line>
                        <g fill="#ff3194"><text x="75" y="95.87809523809523" dx="592">
                          <tspan font-size="12">UNISWAP</tspan>
                        </text><text x="75" y="95.87809523809523" dx="592" dy="12">
                            <tspan font-size="12">Impermanent</tspan>
                          </text><text x="75" y="95.87809523809523" dx="592" dy="24">
                            <tspan font-size="12">Loss</tspan>
                          </text></g>
                      </g>
                      <g className="recharts-layer recharts-reference-line">
                        <line y="733.01" stroke-width="0" fill="none" stroke="#ccc" fill-opacity="1" x1="662"
                          y1="297.6606476190476" x2="75" y2="297.6606476190476"
                          className="recharts-reference-line-line"></line>
                        <g fill="#14c2e5"><text x="12" y="297.6606476190476" dx="5">
                          <tspan font-size="12">ETH Price</tspan>
                        </text></g>
                      </g>
                    </svg>
                    <div tabIndex={-1} role="dialog" className="recharts-tooltip-wrapper"
                      style={{ pointerEvents: "none", visibility: "hidden", position: "absolute", top: "0px", left: "0px", outline: "none", transform: "translate(267.43px, 234px)" }}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full shrink lg-w-2-5">
              <div className="h-[350px] rounded-xl bg-black-a25 p-4 shadow-xl shadow-black">
                <h3 className="text-center font-actor text-2xl font-bold text-white">Save Money On Every Swap</h3>
                <div className="mt-8 flex items-center justify-center"><a
                  className="flex-1 border-2 border-buy p-4 text-buy shadow-20px-3px backdrop-blur-sm"
                  href="/swap?in=eth&amp;out=sdex">
                  <div className="text-5xl">0.07<span className="text-xl">%</span></div>
                  <div className="font-actor text-base">MORODEX</div>
                </a>
                  <div className="-ml-2 flex-1 border-2 border-sell p-2 pl-3 text-right text-sell">
                    <div className="text-2xl">0.3<span className="text-sm">%</span></div>
                    <div className="font-actor text-sm">Others Swap DEX</div>
                  </div>
                </div>
                <div className="relative mt-8 flex border border-white p-2 text-white">
                  <input placeholder="0.00"
                    className="w-full bg-transparent pr-8 pt-1 pb-5 text-right text-4xl placeholder:text-white-a5 animate-pulse"
                    type="text" value={usdAmount} inputMode="numeric" onChange={handleUsdAmountChange} />
                  <div className="absolute bottom-8 right-2 inline-flex items-center space-x-1 text-center text-sm">USD
                  </div>
                  <div className="absolute inset-x-2 bottom-2 text-right text-sm">
                    { gainAmount > 0? <span className="text-buy-500 text-glow-sm">MORODEX protocol saves you ${gainAmount}</span> : "Enter an amount to calculate your gain"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-32">
          <h3 className="inline rounded-full bg-white-a15 px-4 py-2 font-actor text-xs text-white lg-text-base">
            Compare MORODEX with others protocols</h3>
          <div className="mt-10 w-full rounded-xl bg-white-a25 p-4 shadow-xl shadow-black lg-w-7-12">
            <div className="font-actor text-xl leading-10 text-white">MORODEX is revolutionizing the DeFi space by
              tackling the persistent issue of impermanent loss. Our groundbreaking technology allows liquidity
              providers to earn smart returns, while giving users access to the best opportunities in the market.</div>
            <div className="mt-10 flex space-x-2">
              <a className="shrink" href="/swap">
                <button type="button"
                  className="rounded bg-black px-4 py-15 text-base text-white ring-2 ring-white-a25 transition-all hover-bg-buy hover-ring-white">Swap
                  Now</button>
              </a>
              <a className="shrink" href="/liquidity">
                <button type="button"
                  className="rounded px-4 py-15 text-base text-white underline transition-all hover-ring-2 hover-ring-white">Provide
                  Liquidity<svg aria-hidden="true" focusable="false" data-prefix="fas"
                    data-icon="arrow-up-right-from-square"
                    className="svg-inline--fa fa-arrow-up-right-from-square fa-lg ml-2" role="img"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor"
                      d="M256 64C256 46.33 270.3 32 288 32H415.1C415.1 32 415.1 32 415.1 32C420.3 32 424.5 32.86 428.2 34.43C431.1 35.98 435.5 38.27 438.6 41.3C438.6 41.35 438.6 41.4 438.7 41.44C444.9 47.66 447.1 55.78 448 63.9C448 63.94 448 63.97 448 64V192C448 209.7 433.7 224 416 224C398.3 224 384 209.7 384 192V141.3L214.6 310.6C202.1 323.1 181.9 323.1 169.4 310.6C156.9 298.1 156.9 277.9 169.4 265.4L338.7 96H288C270.3 96 256 81.67 256 64V64zM0 128C0 92.65 28.65 64 64 64H160C177.7 64 192 78.33 192 96C192 113.7 177.7 128 160 128H64V416H352V320C352 302.3 366.3 288 384 288C401.7 288 416 302.3 416 320V416C416 451.3 387.3 480 352 480H64C28.65 480 0 451.3 0 416V128z">
                    </path>
                  </svg>
                </button>
              </a>
            </div>
          </div>
          <div className="mt-14 w-full lg-float-right lg-mt-16 lg-w-7-12">
            <div
              className="flex flex-col space-y-2 overflow-hidden rounded-xl border border-white-05 bg-transparent py-2 shadow-xl shadow-black backdrop-blur">
              <div className="inline-flex flex-none items-center justify-center space-x-2">
                <img
                  className="h-10 w-10 rounded-full bg-white-a25 p-1" src="/images/moro.svg"
                  alt="MORODEX logo" />
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bolt"
                    className="svg-inline--fa fa-bolt fa-lg animate-pulse text-white" role="img"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path fill="currentColor"
                    d="M240.5 224H352C365.3 224 377.3 232.3 381.1 244.7C386.6 257.2 383.1 271.3 373.1 280.1L117.1 504.1C105.8 513.9 89.27 514.7 77.19 505.9C65.1 497.1 60.7 481.1 66.59 467.4L143.5 288H31.1C18.67 288 6.733 279.7 2.044 267.3C-2.645 254.8 .8944 240.7 10.93 231.9L266.9 7.918C278.2-1.92 294.7-2.669 306.8 6.114C318.9 14.9 323.3 30.87 317.4 44.61L240.5 224z">
                  </path>
                </svg>
                <img className="h-10 w-10 rounded-full bg-white-a25 p-1" src="/images/uni.svg"
                  alt="Uniswap logo" /></div>
              <div className="grow">
                {/* <LogChart
                  chartData={chartData}
                  protocolData={protocolData}
                  currentDate={currentDate}
                  valueProperty="liquidityUSD"
                  title={'Liquidity'}
                  ChartComponent={BeamChart}
                /> */}
                <div className="recharts-responsive-container" style={{ width: "100%", height: "200px" }}>
                  <div className="recharts-wrapper" role="region"
                    style={{ position: "relative", cursor: "default", width: "745px", height: "200px" }}>
                    <svg
                      className="recharts-surface" width="745" height="200" viewBox="0 0 745 200">
                      <title></title>
                      <desc></desc>
                      <defs>
                        <clipPath id="recharts12-clip">
                          <rect x="0" y="0" height="170" width="745"></rect>
                        </clipPath>
                      </defs>
                      <defs>
                        <linearGradient id="colorSdex" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stop-color="#00e2b6" stop-opacity="1"></stop>
                          <stop offset="100%" stop-color="#00e2b6" stop-opacity="0"></stop>
                        </linearGradient>
                        <linearGradient id="colorUni" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stop-color="#ff3194" stop-opacity="1"></stop>
                          <stop offset="100%" stop-color="#ff3194" stop-opacity="0"></stop>
                        </linearGradient>
                      </defs>
                      <g className="recharts-cartesian-grid">
                        <g className="recharts-cartesian-grid-horizontal">
                          <line stroke="#fff" stroke-opacity="0.2" fill="none" x="0" y="0" width="745" height="170"
                            offset="[object Object]" x1="0" y1="170" x2="745" y2="170"></line>
                          <line stroke="#fff" stroke-opacity="0.2" fill="none" x="0" y="0" width="745" height="170"
                            offset="[object Object]" x1="0" y1="127.5" x2="745" y2="127.5"></line>
                          <line stroke="#fff" stroke-opacity="0.2" fill="none" x="0" y="0" width="745" height="170"
                            offset="[object Object]" x1="0" y1="85" x2="745" y2="85"></line>
                          <line stroke="#fff" stroke-opacity="0.2" fill="none" x="0" y="0" width="745" height="170"
                            offset="[object Object]" x1="0" y1="42.5" x2="745" y2="42.5"></line>
                          <line stroke="#fff" stroke-opacity="0.2" fill="none" x="0" y="0" width="745" height="170"
                            offset="[object Object]" x1="0" y1="0" x2="745" y2="0"></line>
                        </g>
                        <g className="recharts-cartesian-grid-vertical">
                          <line stroke="#fff" stroke-opacity="0.2" fill="none" x="0" y="0" width="745" height="170"
                            offset="[object Object]" x1="0" y1="0" x2="0" y2="170"></line>
                          <line stroke="#fff" stroke-opacity="0.2" fill="none" x="0" y="0" width="745" height="170"
                            offset="[object Object]" x1="745" y1="0" x2="745" y2="170"></line>
                        </g>
                      </g>
                      <g className="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis">
                        <line orientation="bottom" width="745" height="30" type="category" x="0" y="170"
                          className="recharts-cartesian-axis-line" stroke="#666" fill="none" x1="0" y1="170" x2="745"
                          y2="170"></line>
                        <g className="recharts-cartesian-axis-ticks"></g>
                      </g>
                      <g className="recharts-layer recharts-line blur-sm">
                        <path className="recharts-curve recharts-line-curve" stroke="#00e2b6" stroke-width="1"
                          fill="none" width="745" height="170" type="monotone"
                          d="M0,127.5C0.822,124.812,1.645,122.124,2.467,119.68C3.289,117.235,4.111,112.833,4.934,112.833C5.756,112.833,6.578,120.106,7.401,120.106C8.223,120.106,9.045,117.303,9.868,117.303C10.69,117.303,11.512,117.429,12.334,117.68C13.157,117.932,13.979,130.436,14.801,130.436C15.624,130.436,16.446,125.116,17.268,123.526C18.091,121.936,18.913,120.894,19.735,120.894C20.557,120.894,21.38,123.819,22.202,123.819C23.024,123.819,23.847,122.948,24.669,122.948C25.491,122.948,26.313,126.458,27.136,127.664C27.958,128.871,28.78,129.491,29.603,130.188C30.425,130.885,31.247,130.975,32.07,131.845C32.892,132.715,33.714,134.418,34.536,135.407C35.359,136.395,36.181,137.777,37.003,137.777C37.826,137.777,38.648,137.416,39.47,136.694C40.292,135.971,41.115,134.113,41.937,132.911C42.759,131.71,43.582,130.327,44.404,129.485C45.226,128.643,46.049,128.452,46.871,127.86C47.693,127.268,48.515,126.192,49.338,125.934C50.16,125.676,50.982,125.664,51.805,125.546C52.627,125.429,53.449,125.231,54.272,125.231C55.094,125.231,55.916,125.41,56.738,125.767C57.561,126.125,58.383,130.353,59.205,130.353C60.028,130.353,60.85,130.012,61.672,129.9C62.494,129.787,63.317,129.678,64.139,129.678C64.961,129.678,65.784,133.577,66.606,133.577C67.428,133.577,68.251,131.852,69.073,131.852C69.895,131.852,70.717,135.43,71.54,135.43C72.362,135.43,73.184,133.86,74.007,133.776C74.829,133.693,75.651,133.651,76.474,133.651C77.296,133.651,78.118,134.911,78.94,134.911C79.763,134.911,80.585,134.567,81.407,134.49C82.23,134.412,83.052,134.374,83.874,134.374C84.696,134.374,85.519,135.628,86.341,136.244C87.163,136.861,87.986,136.98,88.808,138.071C89.63,139.163,90.453,142.792,91.275,142.792C92.097,142.792,92.919,141.331,93.742,141.331C94.564,141.331,95.386,142.059,96.209,142.059C97.031,142.059,97.853,140.766,98.675,140.766C99.498,140.766,100.32,144.369,101.142,144.816C101.965,145.262,102.787,145.486,103.609,145.486C104.432,145.486,105.254,145.385,106.076,145.252C106.898,145.119,107.721,144.882,108.543,144.686C109.365,144.491,110.188,144.077,111.01,144.077C111.832,144.077,112.655,144.169,113.477,144.353C114.299,144.537,115.121,145.738,115.944,145.738C116.766,145.738,117.588,145.275,118.411,145.275C119.233,145.275,120.055,145.494,120.877,145.596C121.7,145.697,122.522,145.883,123.344,145.883C124.167,145.883,124.989,144.499,125.811,144.499C126.634,144.499,127.456,144.721,128.278,145.165C129.1,145.609,129.923,147.566,130.745,148.599C131.567,149.632,132.39,151.364,133.212,151.364C134.034,151.364,134.857,151.009,135.679,151.009C136.501,151.009,137.323,152.453,138.146,152.878C138.968,153.303,139.79,153.558,140.613,153.558C141.435,153.558,142.257,153.023,143.079,152.424C143.902,151.825,144.724,150.103,145.546,149.964C146.369,149.824,147.191,149.894,148.013,149.754C148.836,149.614,149.658,148.09,150.48,148.09C151.302,148.09,152.125,150.153,152.947,150.341C153.769,150.529,154.592,150.527,155.414,150.623C156.236,150.719,157.058,150.772,157.881,150.917C158.703,151.063,159.525,151.325,160.348,151.495C161.17,151.664,161.992,151.934,162.815,151.934C163.637,151.934,164.459,151.041,165.281,150.571C166.104,150.101,166.926,149.667,167.748,149.112C168.571,148.557,169.393,147.24,170.215,147.24C171.038,147.24,171.86,149.502,172.682,149.502C173.504,149.502,174.327,149.29,175.149,149.29C175.971,149.29,176.794,149.616,177.616,149.616C178.438,149.616,179.26,149.153,180.083,149.153C180.905,149.153,181.727,149.514,182.55,149.514C183.372,149.514,184.194,149.302,185.017,148.879C185.839,148.456,186.661,146.482,187.483,146.482C188.306,146.482,189.128,147.257,189.95,147.257C190.773,147.257,191.595,146.518,192.417,146.518C193.24,146.518,194.062,147.647,194.884,147.647C195.706,147.647,196.529,147.584,197.351,147.458C198.173,147.332,198.996,147.214,199.818,146.727C200.64,146.24,201.462,145.102,202.285,144.268C203.107,143.434,203.929,141.81,204.752,141.723C205.574,141.636,206.396,141.679,207.219,141.592C208.041,141.505,208.863,140.722,209.685,140.722C210.508,140.722,211.33,141.611,212.152,141.611C212.975,141.611,213.797,141.192,214.619,140.994C215.442,140.795,216.264,140.803,217.086,140.42C217.908,140.038,218.731,137.659,219.553,137.659C220.375,137.659,221.198,138.869,222.02,138.869C222.842,138.869,223.664,138.498,224.487,138.498C225.309,138.498,226.131,139.602,226.954,140.314C227.776,141.026,228.598,142.369,229.421,142.771C230.243,143.173,231.065,143.319,231.887,143.374C232.71,143.43,233.532,143.457,234.354,143.457C235.177,143.457,235.999,142.637,236.821,142.637C237.643,142.637,238.466,143.419,239.288,143.678C240.11,143.937,240.933,143.967,241.755,144.194C242.577,144.422,243.4,144.695,244.222,145.043C245.044,145.391,245.866,146.284,246.689,146.284C247.511,146.284,248.333,146.235,249.156,146.136C249.978,146.037,250.8,145.949,251.623,145.577C252.445,145.204,253.267,143.531,254.089,143.531C254.912,143.531,255.734,146.387,256.556,146.387C257.379,146.387,258.201,145.721,259.023,145.721C259.845,145.721,260.668,146.191,261.49,146.191C262.312,146.191,263.135,145.481,263.957,145.481C264.779,145.481,265.602,145.845,266.424,146.063C267.246,146.28,268.068,146.787,268.891,146.787C269.713,146.787,270.535,145.685,271.358,145.344C272.18,145.004,273.002,144.742,273.825,144.742C274.647,144.742,275.469,145.019,276.291,145.111C277.114,145.204,277.936,145.173,278.758,145.295C279.581,145.418,280.403,147.528,281.225,147.528C282.047,147.528,282.87,147.353,283.692,147.353C284.514,147.353,285.337,147.733,286.159,147.855C286.981,147.978,287.804,147.933,288.626,148.088C289.448,148.242,290.27,149.265,291.093,149.265C291.915,149.265,292.737,149.239,293.56,149.186C294.382,149.134,295.204,149.068,296.026,148.947C296.849,148.827,297.671,148.652,298.493,148.464C299.316,148.276,300.138,148.21,300.96,147.821C301.783,147.433,302.605,146.132,303.427,146.132C304.249,146.132,305.072,146.612,305.894,146.612C306.716,146.612,307.539,145.961,308.361,145.647C309.183,145.332,310.006,145.239,310.828,144.725C311.65,144.211,312.472,143.276,313.295,142.565C314.117,141.854,314.939,141,315.762,140.458C316.584,139.916,317.406,139.313,318.228,139.313C319.051,139.313,319.873,142.118,320.695,142.118C321.518,142.118,322.34,141.214,323.162,141.214C323.985,141.214,324.807,146.965,325.629,148.014C326.451,149.063,327.274,149.587,328.096,149.587C328.918,149.587,329.741,147.838,330.563,147.838C331.385,147.838,332.208,148.256,333.03,148.256C333.852,148.256,334.674,147.72,335.497,147.409C336.319,147.099,337.141,146.744,337.964,146.394C338.786,146.045,339.608,145.728,340.43,145.311C341.253,144.894,342.075,144.43,342.897,143.892C343.72,143.354,344.542,142.082,345.364,142.082C346.187,142.082,347.009,142.414,347.831,142.738C348.653,143.061,349.476,144.024,350.298,144.024C351.12,144.024,351.943,142.118,352.765,142.118C353.587,142.118,354.409,142.493,355.232,142.493C356.054,142.493,356.876,141.948,357.699,141.567C358.521,141.186,359.343,140.396,360.166,140.206C360.988,140.016,361.81,139.921,362.632,139.921C363.455,139.921,364.277,140.775,365.099,140.775C365.922,140.775,366.744,140.16,367.566,140.16C368.389,140.16,369.211,141.476,370.033,141.476C370.855,141.476,371.678,141.435,372.5,141.353C373.322,141.271,374.145,140.488,374.967,140.488C375.789,140.488,376.611,140.851,377.434,140.851C378.256,140.851,379.078,139.569,379.901,138.666C380.723,137.763,381.545,136.61,382.368,135.436C383.19,134.261,384.012,131.822,384.834,131.618C385.657,131.414,386.479,131.516,387.301,131.311C388.124,131.107,388.946,129.535,389.768,129.535C390.591,129.535,391.413,131.627,392.235,131.627C393.057,131.627,393.88,131.421,394.702,131.355C395.524,131.289,396.347,131.232,397.169,131.232C397.991,131.232,398.813,133.55,399.636,133.55C400.458,133.55,401.28,133.218,402.103,133.218C402.925,133.218,403.747,133.99,404.57,133.99C405.392,133.99,406.214,133.149,407.036,133.149C407.859,133.149,408.681,133.801,409.503,133.801C410.326,133.801,411.148,132.26,411.97,132.26C412.792,132.26,413.615,132.545,414.437,132.545C415.259,132.545,416.082,131.279,416.904,131.242C417.726,131.204,418.549,131.186,419.371,131.186C420.193,131.186,421.015,132.139,421.838,132.139C422.66,132.139,423.482,128.82,424.305,128.578C425.127,128.335,425.949,128.457,426.772,128.214C427.594,127.972,428.416,125.973,429.238,125.804C430.061,125.635,430.883,125.72,431.705,125.551C432.528,125.382,433.35,121.306,434.172,121.306C434.994,121.306,435.817,123.142,436.639,123.142C437.461,123.142,438.284,122.733,439.106,122.375C439.928,122.017,440.751,121.677,441.573,120.996C442.395,120.315,443.217,119.333,444.04,118.29C444.862,117.248,445.684,117.107,446.507,114.74C447.329,112.373,448.151,100.379,448.974,99.547C449.796,98.716,450.618,98.951,451.44,98.3C452.263,97.649,453.085,95.643,453.907,95.643C454.73,95.643,455.552,96.144,456.374,96.144C457.196,96.144,458.019,95.385,458.841,93.867C459.663,92.35,460.486,88.999,461.308,86.976C462.13,84.952,462.953,83.338,463.775,81.727C464.597,80.116,465.419,77.31,466.242,77.31C467.064,77.31,467.886,90.613,468.709,90.613C469.531,90.613,470.353,89.95,471.175,88.624C471.998,87.298,472.82,81.352,473.642,81.352C474.465,81.352,475.287,82.296,476.109,82.57C476.932,82.844,477.754,82.711,478.576,82.994C479.398,83.277,480.221,84.861,481.043,84.861C481.865,84.861,482.688,77.507,483.51,76.775C484.332,76.044,485.155,76.409,485.977,75.678C486.799,74.946,487.621,66.405,488.444,66.405C489.266,66.405,490.088,69.051,490.911,69.051C491.733,69.051,492.555,65.77,493.377,62.701C494.2,59.631,495.022,55.428,495.844,50.632C496.667,45.835,497.489,33.921,498.311,33.921C499.134,33.921,499.956,35.837,500.778,39.669C501.6,43.5,502.423,69.345,503.245,69.345C504.067,69.345,504.89,64.664,505.712,62.614C506.534,60.564,507.357,57.046,508.179,57.046C509.001,57.046,509.823,64.461,510.646,64.461C511.468,64.461,512.29,62.322,513.113,62.322C513.935,62.322,514.757,73.77,515.579,75.494C516.402,77.217,517.224,78.079,518.046,78.079C518.869,78.079,519.691,69.355,520.513,69.355C521.336,69.355,522.158,69.761,522.98,70.573C523.802,71.385,524.625,76.752,525.447,76.752C526.269,76.752,527.092,76.239,527.914,75.213C528.736,74.186,529.558,71.925,530.381,69.392C531.203,66.858,532.025,62.767,532.848,60.013C533.67,57.258,534.492,55.047,535.315,52.866C536.137,50.685,536.959,46.928,537.781,46.928C538.604,46.928,539.426,46.998,540.248,47.138C541.071,47.278,541.893,50.231,542.715,50.231C543.538,50.231,544.36,37.506,545.182,37.506C546.004,37.506,546.827,42.136,547.649,43.639C548.471,45.143,549.294,45.72,550.116,46.527C550.938,47.335,551.76,47.18,552.583,48.485C553.405,49.79,554.227,56.524,555.05,56.524C555.872,56.524,556.694,49.214,557.517,46.52C558.339,43.826,559.161,41.768,559.983,40.361C560.806,38.954,561.628,39.259,562.45,38.077C563.273,36.895,564.095,34.52,564.917,33.269C565.74,32.018,566.562,31.597,567.384,30.569C568.206,29.541,569.029,28.37,569.851,27.101C570.673,25.831,571.496,23.907,572.318,22.952C573.14,21.997,573.962,21.371,574.785,21.371C575.607,21.371,576.429,28.464,577.252,28.464C578.074,28.464,578.896,25.189,579.719,24.479C580.541,23.769,581.363,23.414,582.185,23.414C583.008,23.414,583.83,25.852,584.652,28.028C585.475,30.204,586.297,36.469,587.119,36.469C587.942,36.469,588.764,35.028,589.586,34.201C590.408,33.375,591.231,31.511,592.053,31.511C592.875,31.511,593.698,35.553,594.52,37.648C595.342,39.743,596.164,43.826,596.987,44.082C597.809,44.337,598.631,44.209,599.454,44.465C600.276,44.72,601.098,45.92,601.921,48.832C602.743,51.743,603.565,62.532,604.387,62.532C605.21,62.532,606.032,61.764,606.854,60.228C607.677,58.693,608.499,49.97,609.321,49.97C610.143,49.97,610.966,51.425,611.788,51.481C612.61,51.538,613.433,51.509,614.255,51.566C615.077,51.622,615.9,63.299,616.722,63.299C617.544,63.299,618.366,49.969,619.189,49.969C620.011,49.969,620.833,58.771,621.656,58.771C622.478,58.771,623.3,58.763,624.123,58.749C624.945,58.734,625.767,54.657,626.589,52.803C627.412,50.95,628.234,49.462,629.056,47.628C629.879,45.794,630.701,41.799,631.523,41.799C632.345,41.799,633.168,44.41,633.99,45.404C634.812,46.397,635.635,47.76,636.457,47.76C637.279,47.76,638.102,47.674,638.924,47.674C639.746,47.674,640.568,48.876,641.391,49.888C642.213,50.9,643.035,52.396,643.858,53.746C644.68,55.097,645.502,55.161,646.325,57.991C647.147,60.821,647.969,70.857,648.791,70.857C649.614,70.857,650.436,70.717,651.258,70.717C652.081,70.717,652.903,72.365,653.725,72.4C654.547,72.435,655.37,72.418,656.192,72.453C657.014,72.488,657.837,74.433,658.659,76.95C659.481,79.468,660.304,83.818,661.126,87.558C661.948,91.298,662.77,99.391,663.593,99.391C664.415,99.391,665.237,90.791,666.06,90.791C666.882,90.791,667.704,95.651,668.526,95.651C669.349,95.651,670.171,91.785,670.993,91.785C671.816,91.785,672.638,95.44,673.46,95.44C674.283,95.44,675.105,80.6,675.927,80.6C676.749,80.6,677.572,80.722,678.394,80.722C679.216,80.722,680.039,75.388,680.861,75.388C681.683,75.388,682.506,75.623,683.328,75.623C684.15,75.623,684.972,70.792,685.795,70.792C686.617,70.792,687.439,70.862,688.262,71.002C689.084,71.143,689.906,74.643,690.728,76.456C691.551,78.269,692.373,81.88,693.195,81.88C694.018,81.88,694.84,80.347,695.662,79.042C696.485,77.736,697.307,74.046,698.129,74.046C698.951,74.046,699.774,80.533,700.596,82.637C701.418,84.742,702.241,86.673,703.063,86.673C703.885,86.673,704.708,86.639,705.53,86.57C706.352,86.501,707.174,85.87,707.997,85.87C708.819,85.87,709.641,87.886,710.464,87.886C711.286,87.886,712.108,86.794,712.93,86.454C713.753,86.115,714.575,86.253,715.397,85.849C716.22,85.446,717.042,78.164,717.864,77.749C718.687,77.334,719.509,77.127,720.331,77.127C721.153,77.127,721.976,87.077,722.798,88.432C723.62,89.787,724.443,89.941,725.265,90.465C726.087,90.989,726.909,91.576,727.732,91.576C728.554,91.576,729.376,90.696,730.199,90.014C731.021,89.331,731.843,87.48,732.666,87.48C733.488,87.48,734.31,87.708,735.132,88.164C735.955,88.62,736.777,91.153,737.599,91.153C738.422,91.153,739.244,89.702,740.066,89.702C740.889,89.702,741.711,90.394,742.533,90.488C743.355,90.582,744.178,90.605,745,90.629">
                        </path>
                      </g>
                      <g className="recharts-layer recharts-line blur-sm">
                        <path className="recharts-curve recharts-line-curve" stroke="#00e2b6" stroke-width="1"
                          fill="none" width="745" height="170" type="monotone"
                          d="M0,127.5C0.822,124.812,1.645,122.124,2.467,119.68C3.289,117.235,4.111,112.833,4.934,112.833C5.756,112.833,6.578,120.106,7.401,120.106C8.223,120.106,9.045,117.303,9.868,117.303C10.69,117.303,11.512,117.429,12.334,117.68C13.157,117.932,13.979,130.436,14.801,130.436C15.624,130.436,16.446,125.116,17.268,123.526C18.091,121.936,18.913,120.894,19.735,120.894C20.557,120.894,21.38,123.819,22.202,123.819C23.024,123.819,23.847,122.948,24.669,122.948C25.491,122.948,26.313,126.458,27.136,127.664C27.958,128.871,28.78,129.491,29.603,130.188C30.425,130.885,31.247,130.975,32.07,131.845C32.892,132.715,33.714,134.418,34.536,135.407C35.359,136.395,36.181,137.777,37.003,137.777C37.826,137.777,38.648,137.416,39.47,136.694C40.292,135.971,41.115,134.113,41.937,132.911C42.759,131.71,43.582,130.327,44.404,129.485C45.226,128.643,46.049,128.452,46.871,127.86C47.693,127.268,48.515,126.192,49.338,125.934C50.16,125.676,50.982,125.664,51.805,125.546C52.627,125.429,53.449,125.231,54.272,125.231C55.094,125.231,55.916,125.41,56.738,125.767C57.561,126.125,58.383,130.353,59.205,130.353C60.028,130.353,60.85,130.012,61.672,129.9C62.494,129.787,63.317,129.678,64.139,129.678C64.961,129.678,65.784,133.577,66.606,133.577C67.428,133.577,68.251,131.852,69.073,131.852C69.895,131.852,70.717,135.43,71.54,135.43C72.362,135.43,73.184,133.86,74.007,133.776C74.829,133.693,75.651,133.651,76.474,133.651C77.296,133.651,78.118,134.911,78.94,134.911C79.763,134.911,80.585,134.567,81.407,134.49C82.23,134.412,83.052,134.374,83.874,134.374C84.696,134.374,85.519,135.628,86.341,136.244C87.163,136.861,87.986,136.98,88.808,138.071C89.63,139.163,90.453,142.792,91.275,142.792C92.097,142.792,92.919,141.331,93.742,141.331C94.564,141.331,95.386,142.059,96.209,142.059C97.031,142.059,97.853,140.766,98.675,140.766C99.498,140.766,100.32,144.369,101.142,144.816C101.965,145.262,102.787,145.486,103.609,145.486C104.432,145.486,105.254,145.385,106.076,145.252C106.898,145.119,107.721,144.882,108.543,144.686C109.365,144.491,110.188,144.077,111.01,144.077C111.832,144.077,112.655,144.169,113.477,144.353C114.299,144.537,115.121,145.738,115.944,145.738C116.766,145.738,117.588,145.275,118.411,145.275C119.233,145.275,120.055,145.494,120.877,145.596C121.7,145.697,122.522,145.883,123.344,145.883C124.167,145.883,124.989,144.499,125.811,144.499C126.634,144.499,127.456,144.721,128.278,145.165C129.1,145.609,129.923,147.566,130.745,148.599C131.567,149.632,132.39,151.364,133.212,151.364C134.034,151.364,134.857,151.009,135.679,151.009C136.501,151.009,137.323,152.453,138.146,152.878C138.968,153.303,139.79,153.558,140.613,153.558C141.435,153.558,142.257,153.023,143.079,152.424C143.902,151.825,144.724,150.103,145.546,149.964C146.369,149.824,147.191,149.894,148.013,149.754C148.836,149.614,149.658,148.09,150.48,148.09C151.302,148.09,152.125,150.153,152.947,150.341C153.769,150.529,154.592,150.527,155.414,150.623C156.236,150.719,157.058,150.772,157.881,150.917C158.703,151.063,159.525,151.325,160.348,151.495C161.17,151.664,161.992,151.934,162.815,151.934C163.637,151.934,164.459,151.041,165.281,150.571C166.104,150.101,166.926,149.667,167.748,149.112C168.571,148.557,169.393,147.24,170.215,147.24C171.038,147.24,171.86,149.502,172.682,149.502C173.504,149.502,174.327,149.29,175.149,149.29C175.971,149.29,176.794,149.616,177.616,149.616C178.438,149.616,179.26,149.153,180.083,149.153C180.905,149.153,181.727,149.514,182.55,149.514C183.372,149.514,184.194,149.302,185.017,148.879C185.839,148.456,186.661,146.482,187.483,146.482C188.306,146.482,189.128,147.257,189.95,147.257C190.773,147.257,191.595,146.518,192.417,146.518C193.24,146.518,194.062,147.647,194.884,147.647C195.706,147.647,196.529,147.584,197.351,147.458C198.173,147.332,198.996,147.214,199.818,146.727C200.64,146.24,201.462,145.102,202.285,144.268C203.107,143.434,203.929,141.81,204.752,141.723C205.574,141.636,206.396,141.679,207.219,141.592C208.041,141.505,208.863,140.722,209.685,140.722C210.508,140.722,211.33,141.611,212.152,141.611C212.975,141.611,213.797,141.192,214.619,140.994C215.442,140.795,216.264,140.803,217.086,140.42C217.908,140.038,218.731,137.659,219.553,137.659C220.375,137.659,221.198,138.869,222.02,138.869C222.842,138.869,223.664,138.498,224.487,138.498C225.309,138.498,226.131,139.602,226.954,140.314C227.776,141.026,228.598,142.369,229.421,142.771C230.243,143.173,231.065,143.319,231.887,143.374C232.71,143.43,233.532,143.457,234.354,143.457C235.177,143.457,235.999,142.637,236.821,142.637C237.643,142.637,238.466,143.419,239.288,143.678C240.11,143.937,240.933,143.967,241.755,144.194C242.577,144.422,243.4,144.695,244.222,145.043C245.044,145.391,245.866,146.284,246.689,146.284C247.511,146.284,248.333,146.235,249.156,146.136C249.978,146.037,250.8,145.949,251.623,145.577C252.445,145.204,253.267,143.531,254.089,143.531C254.912,143.531,255.734,146.387,256.556,146.387C257.379,146.387,258.201,145.721,259.023,145.721C259.845,145.721,260.668,146.191,261.49,146.191C262.312,146.191,263.135,145.481,263.957,145.481C264.779,145.481,265.602,145.845,266.424,146.063C267.246,146.28,268.068,146.787,268.891,146.787C269.713,146.787,270.535,145.685,271.358,145.344C272.18,145.004,273.002,144.742,273.825,144.742C274.647,144.742,275.469,145.019,276.291,145.111C277.114,145.204,277.936,145.173,278.758,145.295C279.581,145.418,280.403,147.528,281.225,147.528C282.047,147.528,282.87,147.353,283.692,147.353C284.514,147.353,285.337,147.733,286.159,147.855C286.981,147.978,287.804,147.933,288.626,148.088C289.448,148.242,290.27,149.265,291.093,149.265C291.915,149.265,292.737,149.239,293.56,149.186C294.382,149.134,295.204,149.068,296.026,148.947C296.849,148.827,297.671,148.652,298.493,148.464C299.316,148.276,300.138,148.21,300.96,147.821C301.783,147.433,302.605,146.132,303.427,146.132C304.249,146.132,305.072,146.612,305.894,146.612C306.716,146.612,307.539,145.961,308.361,145.647C309.183,145.332,310.006,145.239,310.828,144.725C311.65,144.211,312.472,143.276,313.295,142.565C314.117,141.854,314.939,141,315.762,140.458C316.584,139.916,317.406,139.313,318.228,139.313C319.051,139.313,319.873,142.118,320.695,142.118C321.518,142.118,322.34,141.214,323.162,141.214C323.985,141.214,324.807,146.965,325.629,148.014C326.451,149.063,327.274,149.587,328.096,149.587C328.918,149.587,329.741,147.838,330.563,147.838C331.385,147.838,332.208,148.256,333.03,148.256C333.852,148.256,334.674,147.72,335.497,147.409C336.319,147.099,337.141,146.744,337.964,146.394C338.786,146.045,339.608,145.728,340.43,145.311C341.253,144.894,342.075,144.43,342.897,143.892C343.72,143.354,344.542,142.082,345.364,142.082C346.187,142.082,347.009,142.414,347.831,142.738C348.653,143.061,349.476,144.024,350.298,144.024C351.12,144.024,351.943,142.118,352.765,142.118C353.587,142.118,354.409,142.493,355.232,142.493C356.054,142.493,356.876,141.948,357.699,141.567C358.521,141.186,359.343,140.396,360.166,140.206C360.988,140.016,361.81,139.921,362.632,139.921C363.455,139.921,364.277,140.775,365.099,140.775C365.922,140.775,366.744,140.16,367.566,140.16C368.389,140.16,369.211,141.476,370.033,141.476C370.855,141.476,371.678,141.435,372.5,141.353C373.322,141.271,374.145,140.488,374.967,140.488C375.789,140.488,376.611,140.851,377.434,140.851C378.256,140.851,379.078,139.569,379.901,138.666C380.723,137.763,381.545,136.61,382.368,135.436C383.19,134.261,384.012,131.822,384.834,131.618C385.657,131.414,386.479,131.516,387.301,131.311C388.124,131.107,388.946,129.535,389.768,129.535C390.591,129.535,391.413,131.627,392.235,131.627C393.057,131.627,393.88,131.421,394.702,131.355C395.524,131.289,396.347,131.232,397.169,131.232C397.991,131.232,398.813,133.55,399.636,133.55C400.458,133.55,401.28,133.218,402.103,133.218C402.925,133.218,403.747,133.99,404.57,133.99C405.392,133.99,406.214,133.149,407.036,133.149C407.859,133.149,408.681,133.801,409.503,133.801C410.326,133.801,411.148,132.26,411.97,132.26C412.792,132.26,413.615,132.545,414.437,132.545C415.259,132.545,416.082,131.279,416.904,131.242C417.726,131.204,418.549,131.186,419.371,131.186C420.193,131.186,421.015,132.139,421.838,132.139C422.66,132.139,423.482,128.82,424.305,128.578C425.127,128.335,425.949,128.457,426.772,128.214C427.594,127.972,428.416,125.973,429.238,125.804C430.061,125.635,430.883,125.72,431.705,125.551C432.528,125.382,433.35,121.306,434.172,121.306C434.994,121.306,435.817,123.142,436.639,123.142C437.461,123.142,438.284,122.733,439.106,122.375C439.928,122.017,440.751,121.677,441.573,120.996C442.395,120.315,443.217,119.333,444.04,118.29C444.862,117.248,445.684,117.107,446.507,114.74C447.329,112.373,448.151,100.379,448.974,99.547C449.796,98.716,450.618,98.951,451.44,98.3C452.263,97.649,453.085,95.643,453.907,95.643C454.73,95.643,455.552,96.144,456.374,96.144C457.196,96.144,458.019,95.385,458.841,93.867C459.663,92.35,460.486,88.999,461.308,86.976C462.13,84.952,462.953,83.338,463.775,81.727C464.597,80.116,465.419,77.31,466.242,77.31C467.064,77.31,467.886,90.613,468.709,90.613C469.531,90.613,470.353,89.95,471.175,88.624C471.998,87.298,472.82,81.352,473.642,81.352C474.465,81.352,475.287,82.296,476.109,82.57C476.932,82.844,477.754,82.711,478.576,82.994C479.398,83.277,480.221,84.861,481.043,84.861C481.865,84.861,482.688,77.507,483.51,76.775C484.332,76.044,485.155,76.409,485.977,75.678C486.799,74.946,487.621,66.405,488.444,66.405C489.266,66.405,490.088,69.051,490.911,69.051C491.733,69.051,492.555,65.77,493.377,62.701C494.2,59.631,495.022,55.428,495.844,50.632C496.667,45.835,497.489,33.921,498.311,33.921C499.134,33.921,499.956,35.837,500.778,39.669C501.6,43.5,502.423,69.345,503.245,69.345C504.067,69.345,504.89,64.664,505.712,62.614C506.534,60.564,507.357,57.046,508.179,57.046C509.001,57.046,509.823,64.461,510.646,64.461C511.468,64.461,512.29,62.322,513.113,62.322C513.935,62.322,514.757,73.77,515.579,75.494C516.402,77.217,517.224,78.079,518.046,78.079C518.869,78.079,519.691,69.355,520.513,69.355C521.336,69.355,522.158,69.761,522.98,70.573C523.802,71.385,524.625,76.752,525.447,76.752C526.269,76.752,527.092,76.239,527.914,75.213C528.736,74.186,529.558,71.925,530.381,69.392C531.203,66.858,532.025,62.767,532.848,60.013C533.67,57.258,534.492,55.047,535.315,52.866C536.137,50.685,536.959,46.928,537.781,46.928C538.604,46.928,539.426,46.998,540.248,47.138C541.071,47.278,541.893,50.231,542.715,50.231C543.538,50.231,544.36,37.506,545.182,37.506C546.004,37.506,546.827,42.136,547.649,43.639C548.471,45.143,549.294,45.72,550.116,46.527C550.938,47.335,551.76,47.18,552.583,48.485C553.405,49.79,554.227,56.524,555.05,56.524C555.872,56.524,556.694,49.214,557.517,46.52C558.339,43.826,559.161,41.768,559.983,40.361C560.806,38.954,561.628,39.259,562.45,38.077C563.273,36.895,564.095,34.52,564.917,33.269C565.74,32.018,566.562,31.597,567.384,30.569C568.206,29.541,569.029,28.37,569.851,27.101C570.673,25.831,571.496,23.907,572.318,22.952C573.14,21.997,573.962,21.371,574.785,21.371C575.607,21.371,576.429,28.464,577.252,28.464C578.074,28.464,578.896,25.189,579.719,24.479C580.541,23.769,581.363,23.414,582.185,23.414C583.008,23.414,583.83,25.852,584.652,28.028C585.475,30.204,586.297,36.469,587.119,36.469C587.942,36.469,588.764,35.028,589.586,34.201C590.408,33.375,591.231,31.511,592.053,31.511C592.875,31.511,593.698,35.553,594.52,37.648C595.342,39.743,596.164,43.826,596.987,44.082C597.809,44.337,598.631,44.209,599.454,44.465C600.276,44.72,601.098,45.92,601.921,48.832C602.743,51.743,603.565,62.532,604.387,62.532C605.21,62.532,606.032,61.764,606.854,60.228C607.677,58.693,608.499,49.97,609.321,49.97C610.143,49.97,610.966,51.425,611.788,51.481C612.61,51.538,613.433,51.509,614.255,51.566C615.077,51.622,615.9,63.299,616.722,63.299C617.544,63.299,618.366,49.969,619.189,49.969C620.011,49.969,620.833,58.771,621.656,58.771C622.478,58.771,623.3,58.763,624.123,58.749C624.945,58.734,625.767,54.657,626.589,52.803C627.412,50.95,628.234,49.462,629.056,47.628C629.879,45.794,630.701,41.799,631.523,41.799C632.345,41.799,633.168,44.41,633.99,45.404C634.812,46.397,635.635,47.76,636.457,47.76C637.279,47.76,638.102,47.674,638.924,47.674C639.746,47.674,640.568,48.876,641.391,49.888C642.213,50.9,643.035,52.396,643.858,53.746C644.68,55.097,645.502,55.161,646.325,57.991C647.147,60.821,647.969,70.857,648.791,70.857C649.614,70.857,650.436,70.717,651.258,70.717C652.081,70.717,652.903,72.365,653.725,72.4C654.547,72.435,655.37,72.418,656.192,72.453C657.014,72.488,657.837,74.433,658.659,76.95C659.481,79.468,660.304,83.818,661.126,87.558C661.948,91.298,662.77,99.391,663.593,99.391C664.415,99.391,665.237,90.791,666.06,90.791C666.882,90.791,667.704,95.651,668.526,95.651C669.349,95.651,670.171,91.785,670.993,91.785C671.816,91.785,672.638,95.44,673.46,95.44C674.283,95.44,675.105,80.6,675.927,80.6C676.749,80.6,677.572,80.722,678.394,80.722C679.216,80.722,680.039,75.388,680.861,75.388C681.683,75.388,682.506,75.623,683.328,75.623C684.15,75.623,684.972,70.792,685.795,70.792C686.617,70.792,687.439,70.862,688.262,71.002C689.084,71.143,689.906,74.643,690.728,76.456C691.551,78.269,692.373,81.88,693.195,81.88C694.018,81.88,694.84,80.347,695.662,79.042C696.485,77.736,697.307,74.046,698.129,74.046C698.951,74.046,699.774,80.533,700.596,82.637C701.418,84.742,702.241,86.673,703.063,86.673C703.885,86.673,704.708,86.639,705.53,86.57C706.352,86.501,707.174,85.87,707.997,85.87C708.819,85.87,709.641,87.886,710.464,87.886C711.286,87.886,712.108,86.794,712.93,86.454C713.753,86.115,714.575,86.253,715.397,85.849C716.22,85.446,717.042,78.164,717.864,77.749C718.687,77.334,719.509,77.127,720.331,77.127C721.153,77.127,721.976,87.077,722.798,88.432C723.62,89.787,724.443,89.941,725.265,90.465C726.087,90.989,726.909,91.576,727.732,91.576C728.554,91.576,729.376,90.696,730.199,90.014C731.021,89.331,731.843,87.48,732.666,87.48C733.488,87.48,734.31,87.708,735.132,88.164C735.955,88.62,736.777,91.153,737.599,91.153C738.422,91.153,739.244,89.702,740.066,89.702C740.889,89.702,741.711,90.394,742.533,90.488C743.355,90.582,744.178,90.605,745,90.629">
                        </path>
                      </g>
                      <g className="recharts-layer recharts-area">
                        <g className="recharts-layer">
                          <path fill-opacity="1" fill="url(#colorSdex)" width="745" height="170" type="monotone"
                            stroke="none" className="recharts-curve recharts-area-area"
                            d="M0,127.5C0.822,124.812,1.645,122.124,2.467,119.68C3.289,117.235,4.111,112.833,4.934,112.833C5.756,112.833,6.578,120.106,7.401,120.106C8.223,120.106,9.045,117.303,9.868,117.303C10.69,117.303,11.512,117.429,12.334,117.68C13.157,117.932,13.979,130.436,14.801,130.436C15.624,130.436,16.446,125.116,17.268,123.526C18.091,121.936,18.913,120.894,19.735,120.894C20.557,120.894,21.38,123.819,22.202,123.819C23.024,123.819,23.847,122.948,24.669,122.948C25.491,122.948,26.313,126.458,27.136,127.664C27.958,128.871,28.78,129.491,29.603,130.188C30.425,130.885,31.247,130.975,32.07,131.845C32.892,132.715,33.714,134.418,34.536,135.407C35.359,136.395,36.181,137.777,37.003,137.777C37.826,137.777,38.648,137.416,39.47,136.694C40.292,135.971,41.115,134.113,41.937,132.911C42.759,131.71,43.582,130.327,44.404,129.485C45.226,128.643,46.049,128.452,46.871,127.86C47.693,127.268,48.515,126.192,49.338,125.934C50.16,125.676,50.982,125.664,51.805,125.546C52.627,125.429,53.449,125.231,54.272,125.231C55.094,125.231,55.916,125.41,56.738,125.767C57.561,126.125,58.383,130.353,59.205,130.353C60.028,130.353,60.85,130.012,61.672,129.9C62.494,129.787,63.317,129.678,64.139,129.678C64.961,129.678,65.784,133.577,66.606,133.577C67.428,133.577,68.251,131.852,69.073,131.852C69.895,131.852,70.717,135.43,71.54,135.43C72.362,135.43,73.184,133.86,74.007,133.776C74.829,133.693,75.651,133.651,76.474,133.651C77.296,133.651,78.118,134.911,78.94,134.911C79.763,134.911,80.585,134.567,81.407,134.49C82.23,134.412,83.052,134.374,83.874,134.374C84.696,134.374,85.519,135.628,86.341,136.244C87.163,136.861,87.986,136.98,88.808,138.071C89.63,139.163,90.453,142.792,91.275,142.792C92.097,142.792,92.919,141.331,93.742,141.331C94.564,141.331,95.386,142.059,96.209,142.059C97.031,142.059,97.853,140.766,98.675,140.766C99.498,140.766,100.32,144.369,101.142,144.816C101.965,145.262,102.787,145.486,103.609,145.486C104.432,145.486,105.254,145.385,106.076,145.252C106.898,145.119,107.721,144.882,108.543,144.686C109.365,144.491,110.188,144.077,111.01,144.077C111.832,144.077,112.655,144.169,113.477,144.353C114.299,144.537,115.121,145.738,115.944,145.738C116.766,145.738,117.588,145.275,118.411,145.275C119.233,145.275,120.055,145.494,120.877,145.596C121.7,145.697,122.522,145.883,123.344,145.883C124.167,145.883,124.989,144.499,125.811,144.499C126.634,144.499,127.456,144.721,128.278,145.165C129.1,145.609,129.923,147.566,130.745,148.599C131.567,149.632,132.39,151.364,133.212,151.364C134.034,151.364,134.857,151.009,135.679,151.009C136.501,151.009,137.323,152.453,138.146,152.878C138.968,153.303,139.79,153.558,140.613,153.558C141.435,153.558,142.257,153.023,143.079,152.424C143.902,151.825,144.724,150.103,145.546,149.964C146.369,149.824,147.191,149.894,148.013,149.754C148.836,149.614,149.658,148.09,150.48,148.09C151.302,148.09,152.125,150.153,152.947,150.341C153.769,150.529,154.592,150.527,155.414,150.623C156.236,150.719,157.058,150.772,157.881,150.917C158.703,151.063,159.525,151.325,160.348,151.495C161.17,151.664,161.992,151.934,162.815,151.934C163.637,151.934,164.459,151.041,165.281,150.571C166.104,150.101,166.926,149.667,167.748,149.112C168.571,148.557,169.393,147.24,170.215,147.24C171.038,147.24,171.86,149.502,172.682,149.502C173.504,149.502,174.327,149.29,175.149,149.29C175.971,149.29,176.794,149.616,177.616,149.616C178.438,149.616,179.26,149.153,180.083,149.153C180.905,149.153,181.727,149.514,182.55,149.514C183.372,149.514,184.194,149.302,185.017,148.879C185.839,148.456,186.661,146.482,187.483,146.482C188.306,146.482,189.128,147.257,189.95,147.257C190.773,147.257,191.595,146.518,192.417,146.518C193.24,146.518,194.062,147.647,194.884,147.647C195.706,147.647,196.529,147.584,197.351,147.458C198.173,147.332,198.996,147.214,199.818,146.727C200.64,146.24,201.462,145.102,202.285,144.268C203.107,143.434,203.929,141.81,204.752,141.723C205.574,141.636,206.396,141.679,207.219,141.592C208.041,141.505,208.863,140.722,209.685,140.722C210.508,140.722,211.33,141.611,212.152,141.611C212.975,141.611,213.797,141.192,214.619,140.994C215.442,140.795,216.264,140.803,217.086,140.42C217.908,140.038,218.731,137.659,219.553,137.659C220.375,137.659,221.198,138.869,222.02,138.869C222.842,138.869,223.664,138.498,224.487,138.498C225.309,138.498,226.131,139.602,226.954,140.314C227.776,141.026,228.598,142.369,229.421,142.771C230.243,143.173,231.065,143.319,231.887,143.374C232.71,143.43,233.532,143.457,234.354,143.457C235.177,143.457,235.999,142.637,236.821,142.637C237.643,142.637,238.466,143.419,239.288,143.678C240.11,143.937,240.933,143.967,241.755,144.194C242.577,144.422,243.4,144.695,244.222,145.043C245.044,145.391,245.866,146.284,246.689,146.284C247.511,146.284,248.333,146.235,249.156,146.136C249.978,146.037,250.8,145.949,251.623,145.577C252.445,145.204,253.267,143.531,254.089,143.531C254.912,143.531,255.734,146.387,256.556,146.387C257.379,146.387,258.201,145.721,259.023,145.721C259.845,145.721,260.668,146.191,261.49,146.191C262.312,146.191,263.135,145.481,263.957,145.481C264.779,145.481,265.602,145.845,266.424,146.063C267.246,146.28,268.068,146.787,268.891,146.787C269.713,146.787,270.535,145.685,271.358,145.344C272.18,145.004,273.002,144.742,273.825,144.742C274.647,144.742,275.469,145.019,276.291,145.111C277.114,145.204,277.936,145.173,278.758,145.295C279.581,145.418,280.403,147.528,281.225,147.528C282.047,147.528,282.87,147.353,283.692,147.353C284.514,147.353,285.337,147.733,286.159,147.855C286.981,147.978,287.804,147.933,288.626,148.088C289.448,148.242,290.27,149.265,291.093,149.265C291.915,149.265,292.737,149.239,293.56,149.186C294.382,149.134,295.204,149.068,296.026,148.947C296.849,148.827,297.671,148.652,298.493,148.464C299.316,148.276,300.138,148.21,300.96,147.821C301.783,147.433,302.605,146.132,303.427,146.132C304.249,146.132,305.072,146.612,305.894,146.612C306.716,146.612,307.539,145.961,308.361,145.647C309.183,145.332,310.006,145.239,310.828,144.725C311.65,144.211,312.472,143.276,313.295,142.565C314.117,141.854,314.939,141,315.762,140.458C316.584,139.916,317.406,139.313,318.228,139.313C319.051,139.313,319.873,142.118,320.695,142.118C321.518,142.118,322.34,141.214,323.162,141.214C323.985,141.214,324.807,146.965,325.629,148.014C326.451,149.063,327.274,149.587,328.096,149.587C328.918,149.587,329.741,147.838,330.563,147.838C331.385,147.838,332.208,148.256,333.03,148.256C333.852,148.256,334.674,147.72,335.497,147.409C336.319,147.099,337.141,146.744,337.964,146.394C338.786,146.045,339.608,145.728,340.43,145.311C341.253,144.894,342.075,144.43,342.897,143.892C343.72,143.354,344.542,142.082,345.364,142.082C346.187,142.082,347.009,142.414,347.831,142.738C348.653,143.061,349.476,144.024,350.298,144.024C351.12,144.024,351.943,142.118,352.765,142.118C353.587,142.118,354.409,142.493,355.232,142.493C356.054,142.493,356.876,141.948,357.699,141.567C358.521,141.186,359.343,140.396,360.166,140.206C360.988,140.016,361.81,139.921,362.632,139.921C363.455,139.921,364.277,140.775,365.099,140.775C365.922,140.775,366.744,140.16,367.566,140.16C368.389,140.16,369.211,141.476,370.033,141.476C370.855,141.476,371.678,141.435,372.5,141.353C373.322,141.271,374.145,140.488,374.967,140.488C375.789,140.488,376.611,140.851,377.434,140.851C378.256,140.851,379.078,139.569,379.901,138.666C380.723,137.763,381.545,136.61,382.368,135.436C383.19,134.261,384.012,131.822,384.834,131.618C385.657,131.414,386.479,131.516,387.301,131.311C388.124,131.107,388.946,129.535,389.768,129.535C390.591,129.535,391.413,131.627,392.235,131.627C393.057,131.627,393.88,131.421,394.702,131.355C395.524,131.289,396.347,131.232,397.169,131.232C397.991,131.232,398.813,133.55,399.636,133.55C400.458,133.55,401.28,133.218,402.103,133.218C402.925,133.218,403.747,133.99,404.57,133.99C405.392,133.99,406.214,133.149,407.036,133.149C407.859,133.149,408.681,133.801,409.503,133.801C410.326,133.801,411.148,132.26,411.97,132.26C412.792,132.26,413.615,132.545,414.437,132.545C415.259,132.545,416.082,131.279,416.904,131.242C417.726,131.204,418.549,131.186,419.371,131.186C420.193,131.186,421.015,132.139,421.838,132.139C422.66,132.139,423.482,128.82,424.305,128.578C425.127,128.335,425.949,128.457,426.772,128.214C427.594,127.972,428.416,125.973,429.238,125.804C430.061,125.635,430.883,125.72,431.705,125.551C432.528,125.382,433.35,121.306,434.172,121.306C434.994,121.306,435.817,123.142,436.639,123.142C437.461,123.142,438.284,122.733,439.106,122.375C439.928,122.017,440.751,121.677,441.573,120.996C442.395,120.315,443.217,119.333,444.04,118.29C444.862,117.248,445.684,117.107,446.507,114.74C447.329,112.373,448.151,100.379,448.974,99.547C449.796,98.716,450.618,98.951,451.44,98.3C452.263,97.649,453.085,95.643,453.907,95.643C454.73,95.643,455.552,96.144,456.374,96.144C457.196,96.144,458.019,95.385,458.841,93.867C459.663,92.35,460.486,88.999,461.308,86.976C462.13,84.952,462.953,83.338,463.775,81.727C464.597,80.116,465.419,77.31,466.242,77.31C467.064,77.31,467.886,90.613,468.709,90.613C469.531,90.613,470.353,89.95,471.175,88.624C471.998,87.298,472.82,81.352,473.642,81.352C474.465,81.352,475.287,82.296,476.109,82.57C476.932,82.844,477.754,82.711,478.576,82.994C479.398,83.277,480.221,84.861,481.043,84.861C481.865,84.861,482.688,77.507,483.51,76.775C484.332,76.044,485.155,76.409,485.977,75.678C486.799,74.946,487.621,66.405,488.444,66.405C489.266,66.405,490.088,69.051,490.911,69.051C491.733,69.051,492.555,65.77,493.377,62.701C494.2,59.631,495.022,55.428,495.844,50.632C496.667,45.835,497.489,33.921,498.311,33.921C499.134,33.921,499.956,35.837,500.778,39.669C501.6,43.5,502.423,69.345,503.245,69.345C504.067,69.345,504.89,64.664,505.712,62.614C506.534,60.564,507.357,57.046,508.179,57.046C509.001,57.046,509.823,64.461,510.646,64.461C511.468,64.461,512.29,62.322,513.113,62.322C513.935,62.322,514.757,73.77,515.579,75.494C516.402,77.217,517.224,78.079,518.046,78.079C518.869,78.079,519.691,69.355,520.513,69.355C521.336,69.355,522.158,69.761,522.98,70.573C523.802,71.385,524.625,76.752,525.447,76.752C526.269,76.752,527.092,76.239,527.914,75.213C528.736,74.186,529.558,71.925,530.381,69.392C531.203,66.858,532.025,62.767,532.848,60.013C533.67,57.258,534.492,55.047,535.315,52.866C536.137,50.685,536.959,46.928,537.781,46.928C538.604,46.928,539.426,46.998,540.248,47.138C541.071,47.278,541.893,50.231,542.715,50.231C543.538,50.231,544.36,37.506,545.182,37.506C546.004,37.506,546.827,42.136,547.649,43.639C548.471,45.143,549.294,45.72,550.116,46.527C550.938,47.335,551.76,47.18,552.583,48.485C553.405,49.79,554.227,56.524,555.05,56.524C555.872,56.524,556.694,49.214,557.517,46.52C558.339,43.826,559.161,41.768,559.983,40.361C560.806,38.954,561.628,39.259,562.45,38.077C563.273,36.895,564.095,34.52,564.917,33.269C565.74,32.018,566.562,31.597,567.384,30.569C568.206,29.541,569.029,28.37,569.851,27.101C570.673,25.831,571.496,23.907,572.318,22.952C573.14,21.997,573.962,21.371,574.785,21.371C575.607,21.371,576.429,28.464,577.252,28.464C578.074,28.464,578.896,25.189,579.719,24.479C580.541,23.769,581.363,23.414,582.185,23.414C583.008,23.414,583.83,25.852,584.652,28.028C585.475,30.204,586.297,36.469,587.119,36.469C587.942,36.469,588.764,35.028,589.586,34.201C590.408,33.375,591.231,31.511,592.053,31.511C592.875,31.511,593.698,35.553,594.52,37.648C595.342,39.743,596.164,43.826,596.987,44.082C597.809,44.337,598.631,44.209,599.454,44.465C600.276,44.72,601.098,45.92,601.921,48.832C602.743,51.743,603.565,62.532,604.387,62.532C605.21,62.532,606.032,61.764,606.854,60.228C607.677,58.693,608.499,49.97,609.321,49.97C610.143,49.97,610.966,51.425,611.788,51.481C612.61,51.538,613.433,51.509,614.255,51.566C615.077,51.622,615.9,63.299,616.722,63.299C617.544,63.299,618.366,49.969,619.189,49.969C620.011,49.969,620.833,58.771,621.656,58.771C622.478,58.771,623.3,58.763,624.123,58.749C624.945,58.734,625.767,54.657,626.589,52.803C627.412,50.95,628.234,49.462,629.056,47.628C629.879,45.794,630.701,41.799,631.523,41.799C632.345,41.799,633.168,44.41,633.99,45.404C634.812,46.397,635.635,47.76,636.457,47.76C637.279,47.76,638.102,47.674,638.924,47.674C639.746,47.674,640.568,48.876,641.391,49.888C642.213,50.9,643.035,52.396,643.858,53.746C644.68,55.097,645.502,55.161,646.325,57.991C647.147,60.821,647.969,70.857,648.791,70.857C649.614,70.857,650.436,70.717,651.258,70.717C652.081,70.717,652.903,72.365,653.725,72.4C654.547,72.435,655.37,72.418,656.192,72.453C657.014,72.488,657.837,74.433,658.659,76.95C659.481,79.468,660.304,83.818,661.126,87.558C661.948,91.298,662.77,99.391,663.593,99.391C664.415,99.391,665.237,90.791,666.06,90.791C666.882,90.791,667.704,95.651,668.526,95.651C669.349,95.651,670.171,91.785,670.993,91.785C671.816,91.785,672.638,95.44,673.46,95.44C674.283,95.44,675.105,80.6,675.927,80.6C676.749,80.6,677.572,80.722,678.394,80.722C679.216,80.722,680.039,75.388,680.861,75.388C681.683,75.388,682.506,75.623,683.328,75.623C684.15,75.623,684.972,70.792,685.795,70.792C686.617,70.792,687.439,70.862,688.262,71.002C689.084,71.143,689.906,74.643,690.728,76.456C691.551,78.269,692.373,81.88,693.195,81.88C694.018,81.88,694.84,80.347,695.662,79.042C696.485,77.736,697.307,74.046,698.129,74.046C698.951,74.046,699.774,80.533,700.596,82.637C701.418,84.742,702.241,86.673,703.063,86.673C703.885,86.673,704.708,86.639,705.53,86.57C706.352,86.501,707.174,85.87,707.997,85.87C708.819,85.87,709.641,87.886,710.464,87.886C711.286,87.886,712.108,86.794,712.93,86.454C713.753,86.115,714.575,86.253,715.397,85.849C716.22,85.446,717.042,78.164,717.864,77.749C718.687,77.334,719.509,77.127,720.331,77.127C721.153,77.127,721.976,87.077,722.798,88.432C723.62,89.787,724.443,89.941,725.265,90.465C726.087,90.989,726.909,91.576,727.732,91.576C728.554,91.576,729.376,90.696,730.199,90.014C731.021,89.331,731.843,87.48,732.666,87.48C733.488,87.48,734.31,87.708,735.132,88.164C735.955,88.62,736.777,91.153,737.599,91.153C738.422,91.153,739.244,89.702,740.066,89.702C740.889,89.702,741.711,90.394,742.533,90.488C743.355,90.582,744.178,90.605,745,90.629L745,170C744.178,170,743.355,170,742.533,170C741.711,170,740.889,170,740.066,170C739.244,170,738.422,170,737.599,170C736.777,170,735.955,170,735.132,170C734.31,170,733.488,170,732.666,170C731.843,170,731.021,170,730.199,170C729.376,170,728.554,170,727.732,170C726.909,170,726.087,170,725.265,170C724.443,170,723.62,170,722.798,170C721.976,170,721.153,170,720.331,170C719.509,170,718.687,170,717.864,170C717.042,170,716.22,170,715.397,170C714.575,170,713.753,170,712.93,170C712.108,170,711.286,170,710.464,170C709.641,170,708.819,170,707.997,170C707.174,170,706.352,170,705.53,170C704.708,170,703.885,170,703.063,170C702.241,170,701.418,170,700.596,170C699.774,170,698.951,170,698.129,170C697.307,170,696.485,170,695.662,170C694.84,170,694.018,170,693.195,170C692.373,170,691.551,170,690.728,170C689.906,170,689.084,170,688.262,170C687.439,170,686.617,170,685.795,170C684.972,170,684.15,170,683.328,170C682.506,170,681.683,170,680.861,170C680.039,170,679.216,170,678.394,170C677.572,170,676.749,170,675.927,170C675.105,170,674.283,170,673.46,170C672.638,170,671.816,170,670.993,170C670.171,170,669.349,170,668.526,170C667.704,170,666.882,170,666.06,170C665.237,170,664.415,170,663.593,170C662.77,170,661.948,170,661.126,170C660.304,170,659.481,170,658.659,170C657.837,170,657.014,170,656.192,170C655.37,170,654.547,170,653.725,170C652.903,170,652.081,170,651.258,170C650.436,170,649.614,170,648.791,170C647.969,170,647.147,170,646.325,170C645.502,170,644.68,170,643.858,170C643.035,170,642.213,170,641.391,170C640.568,170,639.746,170,638.924,170C638.102,170,637.279,170,636.457,170C635.635,170,634.812,170,633.99,170C633.168,170,632.345,170,631.523,170C630.701,170,629.879,170,629.056,170C628.234,170,627.412,170,626.589,170C625.767,170,624.945,170,624.123,170C623.3,170,622.478,170,621.656,170C620.833,170,620.011,170,619.189,170C618.366,170,617.544,170,616.722,170C615.9,170,615.077,170,614.255,170C613.433,170,612.61,170,611.788,170C610.966,170,610.143,170,609.321,170C608.499,170,607.677,170,606.854,170C606.032,170,605.21,170,604.387,170C603.565,170,602.743,170,601.921,170C601.098,170,600.276,170,599.454,170C598.631,170,597.809,170,596.987,170C596.164,170,595.342,170,594.52,170C593.698,170,592.875,170,592.053,170C591.231,170,590.408,170,589.586,170C588.764,170,587.942,170,587.119,170C586.297,170,585.475,170,584.652,170C583.83,170,583.008,170,582.185,170C581.363,170,580.541,170,579.719,170C578.896,170,578.074,170,577.252,170C576.429,170,575.607,170,574.785,170C573.962,170,573.14,170,572.318,170C571.496,170,570.673,170,569.851,170C569.029,170,568.206,170,567.384,170C566.562,170,565.74,170,564.917,170C564.095,170,563.273,170,562.45,170C561.628,170,560.806,170,559.983,170C559.161,170,558.339,170,557.517,170C556.694,170,555.872,170,555.05,170C554.227,170,553.405,170,552.583,170C551.76,170,550.938,170,550.116,170C549.294,170,548.471,170,547.649,170C546.827,170,546.004,170,545.182,170C544.36,170,543.538,170,542.715,170C541.893,170,541.071,170,540.248,170C539.426,170,538.604,170,537.781,170C536.959,170,536.137,170,535.315,170C534.492,170,533.67,170,532.848,170C532.025,170,531.203,170,530.381,170C529.558,170,528.736,170,527.914,170C527.092,170,526.269,170,525.447,170C524.625,170,523.802,170,522.98,170C522.158,170,521.336,170,520.513,170C519.691,170,518.869,170,518.046,170C517.224,170,516.402,170,515.579,170C514.757,170,513.935,170,513.113,170C512.29,170,511.468,170,510.646,170C509.823,170,509.001,170,508.179,170C507.357,170,506.534,170,505.712,170C504.89,170,504.067,170,503.245,170C502.423,170,501.6,170,500.778,170C499.956,170,499.134,170,498.311,170C497.489,170,496.667,170,495.844,170C495.022,170,494.2,170,493.377,170C492.555,170,491.733,170,490.911,170C490.088,170,489.266,170,488.444,170C487.621,170,486.799,170,485.977,170C485.155,170,484.332,170,483.51,170C482.688,170,481.865,170,481.043,170C480.221,170,479.398,170,478.576,170C477.754,170,476.932,170,476.109,170C475.287,170,474.465,170,473.642,170C472.82,170,471.998,170,471.175,170C470.353,170,469.531,170,468.709,170C467.886,170,467.064,170,466.242,170C465.419,170,464.597,170,463.775,170C462.953,170,462.13,170,461.308,170C460.486,170,459.663,170,458.841,170C458.019,170,457.196,170,456.374,170C455.552,170,454.73,170,453.907,170C453.085,170,452.263,170,451.44,170C450.618,170,449.796,170,448.974,170C448.151,170,447.329,170,446.507,170C445.684,170,444.862,170,444.04,170C443.217,170,442.395,170,441.573,170C440.751,170,439.928,170,439.106,170C438.284,170,437.461,170,436.639,170C435.817,170,434.994,170,434.172,170C433.35,170,432.528,170,431.705,170C430.883,170,430.061,170,429.238,170C428.416,170,427.594,170,426.772,170C425.949,170,425.127,170,424.305,170C423.482,170,422.66,170,421.838,170C421.015,170,420.193,170,419.371,170C418.549,170,417.726,170,416.904,170C416.082,170,415.259,170,414.437,170C413.615,170,412.792,170,411.97,170C411.148,170,410.326,170,409.503,170C408.681,170,407.859,170,407.036,170C406.214,170,405.392,170,404.57,170C403.747,170,402.925,170,402.103,170C401.28,170,400.458,170,399.636,170C398.813,170,397.991,170,397.169,170C396.347,170,395.524,170,394.702,170C393.88,170,393.057,170,392.235,170C391.413,170,390.591,170,389.768,170C388.946,170,388.124,170,387.301,170C386.479,170,385.657,170,384.834,170C384.012,170,383.19,170,382.368,170C381.545,170,380.723,170,379.901,170C379.078,170,378.256,170,377.434,170C376.611,170,375.789,170,374.967,170C374.145,170,373.322,170,372.5,170C371.678,170,370.855,170,370.033,170C369.211,170,368.389,170,367.566,170C366.744,170,365.922,170,365.099,170C364.277,170,363.455,170,362.632,170C361.81,170,360.988,170,360.166,170C359.343,170,358.521,170,357.699,170C356.876,170,356.054,170,355.232,170C354.409,170,353.587,170,352.765,170C351.943,170,351.12,170,350.298,170C349.476,170,348.653,170,347.831,170C347.009,170,346.187,170,345.364,170C344.542,170,343.72,170,342.897,170C342.075,170,341.253,170,340.43,170C339.608,170,338.786,170,337.964,170C337.141,170,336.319,170,335.497,170C334.674,170,333.852,170,333.03,170C332.208,170,331.385,170,330.563,170C329.741,170,328.918,170,328.096,170C327.274,170,326.451,170,325.629,170C324.807,170,323.985,170,323.162,170C322.34,170,321.518,170,320.695,170C319.873,170,319.051,170,318.228,170C317.406,170,316.584,170,315.762,170C314.939,170,314.117,170,313.295,170C312.472,170,311.65,170,310.828,170C310.006,170,309.183,170,308.361,170C307.539,170,306.716,170,305.894,170C305.072,170,304.249,170,303.427,170C302.605,170,301.783,170,300.96,170C300.138,170,299.316,170,298.493,170C297.671,170,296.849,170,296.026,170C295.204,170,294.382,170,293.56,170C292.737,170,291.915,170,291.093,170C290.27,170,289.448,170,288.626,170C287.804,170,286.981,170,286.159,170C285.337,170,284.514,170,283.692,170C282.87,170,282.047,170,281.225,170C280.403,170,279.581,170,278.758,170C277.936,170,277.114,170,276.291,170C275.469,170,274.647,170,273.825,170C273.002,170,272.18,170,271.358,170C270.535,170,269.713,170,268.891,170C268.068,170,267.246,170,266.424,170C265.602,170,264.779,170,263.957,170C263.135,170,262.312,170,261.49,170C260.668,170,259.845,170,259.023,170C258.201,170,257.379,170,256.556,170C255.734,170,254.912,170,254.089,170C253.267,170,252.445,170,251.623,170C250.8,170,249.978,170,249.156,170C248.333,170,247.511,170,246.689,170C245.866,170,245.044,170,244.222,170C243.4,170,242.577,170,241.755,170C240.933,170,240.11,170,239.288,170C238.466,170,237.643,170,236.821,170C235.999,170,235.177,170,234.354,170C233.532,170,232.71,170,231.887,170C231.065,170,230.243,170,229.421,170C228.598,170,227.776,170,226.954,170C226.131,170,225.309,170,224.487,170C223.664,170,222.842,170,222.02,170C221.198,170,220.375,170,219.553,170C218.731,170,217.908,170,217.086,170C216.264,170,215.442,170,214.619,170C213.797,170,212.975,170,212.152,170C211.33,170,210.508,170,209.685,170C208.863,170,208.041,170,207.219,170C206.396,170,205.574,170,204.752,170C203.929,170,203.107,170,202.285,170C201.462,170,200.64,170,199.818,170C198.996,170,198.173,170,197.351,170C196.529,170,195.706,170,194.884,170C194.062,170,193.24,170,192.417,170C191.595,170,190.773,170,189.95,170C189.128,170,188.306,170,187.483,170C186.661,170,185.839,170,185.017,170C184.194,170,183.372,170,182.55,170C181.727,170,180.905,170,180.083,170C179.26,170,178.438,170,177.616,170C176.794,170,175.971,170,175.149,170C174.327,170,173.504,170,172.682,170C171.86,170,171.038,170,170.215,170C169.393,170,168.571,170,167.748,170C166.926,170,166.104,170,165.281,170C164.459,170,163.637,170,162.815,170C161.992,170,161.17,170,160.348,170C159.525,170,158.703,170,157.881,170C157.058,170,156.236,170,155.414,170C154.592,170,153.769,170,152.947,170C152.125,170,151.302,170,150.48,170C149.658,170,148.836,170,148.013,170C147.191,170,146.369,170,145.546,170C144.724,170,143.902,170,143.079,170C142.257,170,141.435,170,140.613,170C139.79,170,138.968,170,138.146,170C137.323,170,136.501,170,135.679,170C134.857,170,134.034,170,133.212,170C132.39,170,131.567,170,130.745,170C129.923,170,129.1,170,128.278,170C127.456,170,126.634,170,125.811,170C124.989,170,124.167,170,123.344,170C122.522,170,121.7,170,120.877,170C120.055,170,119.233,170,118.411,170C117.588,170,116.766,170,115.944,170C115.121,170,114.299,170,113.477,170C112.655,170,111.832,170,111.01,170C110.188,170,109.365,170,108.543,170C107.721,170,106.898,170,106.076,170C105.254,170,104.432,170,103.609,170C102.787,170,101.965,170,101.142,170C100.32,170,99.498,170,98.675,170C97.853,170,97.031,170,96.209,170C95.386,170,94.564,170,93.742,170C92.919,170,92.097,170,91.275,170C90.453,170,89.63,170,88.808,170C87.986,170,87.163,170,86.341,170C85.519,170,84.696,170,83.874,170C83.052,170,82.23,170,81.407,170C80.585,170,79.763,170,78.94,170C78.118,170,77.296,170,76.474,170C75.651,170,74.829,170,74.007,170C73.184,170,72.362,170,71.54,170C70.717,170,69.895,170,69.073,170C68.251,170,67.428,170,66.606,170C65.784,170,64.961,170,64.139,170C63.317,170,62.494,170,61.672,170C60.85,170,60.028,170,59.205,170C58.383,170,57.561,170,56.738,170C55.916,170,55.094,170,54.272,170C53.449,170,52.627,170,51.805,170C50.982,170,50.16,170,49.338,170C48.515,170,47.693,170,46.871,170C46.049,170,45.226,170,44.404,170C43.582,170,42.759,170,41.937,170C41.115,170,40.292,170,39.47,170C38.648,170,37.826,170,37.003,170C36.181,170,35.359,170,34.536,170C33.714,170,32.892,170,32.07,170C31.247,170,30.425,170,29.603,170C28.78,170,27.958,170,27.136,170C26.313,170,25.491,170,24.669,170C23.847,170,23.024,170,22.202,170C21.38,170,20.557,170,19.735,170C18.913,170,18.091,170,17.268,170C16.446,170,15.624,170,14.801,170C13.979,170,13.157,170,12.334,170C11.512,170,10.69,170,9.868,170C9.045,170,8.223,170,7.401,170C6.578,170,5.756,170,4.934,170C4.111,170,3.289,170,2.467,170C1.645,170,0.822,170,0,170Z">
                          </path>
                          <path type="monotone" stroke="#00e2b6" fill-opacity="1" fill="none" width="745" height="170"
                            className="recharts-curve recharts-area-curve"
                            d="M0,127.5C0.822,124.812,1.645,122.124,2.467,119.68C3.289,117.235,4.111,112.833,4.934,112.833C5.756,112.833,6.578,120.106,7.401,120.106C8.223,120.106,9.045,117.303,9.868,117.303C10.69,117.303,11.512,117.429,12.334,117.68C13.157,117.932,13.979,130.436,14.801,130.436C15.624,130.436,16.446,125.116,17.268,123.526C18.091,121.936,18.913,120.894,19.735,120.894C20.557,120.894,21.38,123.819,22.202,123.819C23.024,123.819,23.847,122.948,24.669,122.948C25.491,122.948,26.313,126.458,27.136,127.664C27.958,128.871,28.78,129.491,29.603,130.188C30.425,130.885,31.247,130.975,32.07,131.845C32.892,132.715,33.714,134.418,34.536,135.407C35.359,136.395,36.181,137.777,37.003,137.777C37.826,137.777,38.648,137.416,39.47,136.694C40.292,135.971,41.115,134.113,41.937,132.911C42.759,131.71,43.582,130.327,44.404,129.485C45.226,128.643,46.049,128.452,46.871,127.86C47.693,127.268,48.515,126.192,49.338,125.934C50.16,125.676,50.982,125.664,51.805,125.546C52.627,125.429,53.449,125.231,54.272,125.231C55.094,125.231,55.916,125.41,56.738,125.767C57.561,126.125,58.383,130.353,59.205,130.353C60.028,130.353,60.85,130.012,61.672,129.9C62.494,129.787,63.317,129.678,64.139,129.678C64.961,129.678,65.784,133.577,66.606,133.577C67.428,133.577,68.251,131.852,69.073,131.852C69.895,131.852,70.717,135.43,71.54,135.43C72.362,135.43,73.184,133.86,74.007,133.776C74.829,133.693,75.651,133.651,76.474,133.651C77.296,133.651,78.118,134.911,78.94,134.911C79.763,134.911,80.585,134.567,81.407,134.49C82.23,134.412,83.052,134.374,83.874,134.374C84.696,134.374,85.519,135.628,86.341,136.244C87.163,136.861,87.986,136.98,88.808,138.071C89.63,139.163,90.453,142.792,91.275,142.792C92.097,142.792,92.919,141.331,93.742,141.331C94.564,141.331,95.386,142.059,96.209,142.059C97.031,142.059,97.853,140.766,98.675,140.766C99.498,140.766,100.32,144.369,101.142,144.816C101.965,145.262,102.787,145.486,103.609,145.486C104.432,145.486,105.254,145.385,106.076,145.252C106.898,145.119,107.721,144.882,108.543,144.686C109.365,144.491,110.188,144.077,111.01,144.077C111.832,144.077,112.655,144.169,113.477,144.353C114.299,144.537,115.121,145.738,115.944,145.738C116.766,145.738,117.588,145.275,118.411,145.275C119.233,145.275,120.055,145.494,120.877,145.596C121.7,145.697,122.522,145.883,123.344,145.883C124.167,145.883,124.989,144.499,125.811,144.499C126.634,144.499,127.456,144.721,128.278,145.165C129.1,145.609,129.923,147.566,130.745,148.599C131.567,149.632,132.39,151.364,133.212,151.364C134.034,151.364,134.857,151.009,135.679,151.009C136.501,151.009,137.323,152.453,138.146,152.878C138.968,153.303,139.79,153.558,140.613,153.558C141.435,153.558,142.257,153.023,143.079,152.424C143.902,151.825,144.724,150.103,145.546,149.964C146.369,149.824,147.191,149.894,148.013,149.754C148.836,149.614,149.658,148.09,150.48,148.09C151.302,148.09,152.125,150.153,152.947,150.341C153.769,150.529,154.592,150.527,155.414,150.623C156.236,150.719,157.058,150.772,157.881,150.917C158.703,151.063,159.525,151.325,160.348,151.495C161.17,151.664,161.992,151.934,162.815,151.934C163.637,151.934,164.459,151.041,165.281,150.571C166.104,150.101,166.926,149.667,167.748,149.112C168.571,148.557,169.393,147.24,170.215,147.24C171.038,147.24,171.86,149.502,172.682,149.502C173.504,149.502,174.327,149.29,175.149,149.29C175.971,149.29,176.794,149.616,177.616,149.616C178.438,149.616,179.26,149.153,180.083,149.153C180.905,149.153,181.727,149.514,182.55,149.514C183.372,149.514,184.194,149.302,185.017,148.879C185.839,148.456,186.661,146.482,187.483,146.482C188.306,146.482,189.128,147.257,189.95,147.257C190.773,147.257,191.595,146.518,192.417,146.518C193.24,146.518,194.062,147.647,194.884,147.647C195.706,147.647,196.529,147.584,197.351,147.458C198.173,147.332,198.996,147.214,199.818,146.727C200.64,146.24,201.462,145.102,202.285,144.268C203.107,143.434,203.929,141.81,204.752,141.723C205.574,141.636,206.396,141.679,207.219,141.592C208.041,141.505,208.863,140.722,209.685,140.722C210.508,140.722,211.33,141.611,212.152,141.611C212.975,141.611,213.797,141.192,214.619,140.994C215.442,140.795,216.264,140.803,217.086,140.42C217.908,140.038,218.731,137.659,219.553,137.659C220.375,137.659,221.198,138.869,222.02,138.869C222.842,138.869,223.664,138.498,224.487,138.498C225.309,138.498,226.131,139.602,226.954,140.314C227.776,141.026,228.598,142.369,229.421,142.771C230.243,143.173,231.065,143.319,231.887,143.374C232.71,143.43,233.532,143.457,234.354,143.457C235.177,143.457,235.999,142.637,236.821,142.637C237.643,142.637,238.466,143.419,239.288,143.678C240.11,143.937,240.933,143.967,241.755,144.194C242.577,144.422,243.4,144.695,244.222,145.043C245.044,145.391,245.866,146.284,246.689,146.284C247.511,146.284,248.333,146.235,249.156,146.136C249.978,146.037,250.8,145.949,251.623,145.577C252.445,145.204,253.267,143.531,254.089,143.531C254.912,143.531,255.734,146.387,256.556,146.387C257.379,146.387,258.201,145.721,259.023,145.721C259.845,145.721,260.668,146.191,261.49,146.191C262.312,146.191,263.135,145.481,263.957,145.481C264.779,145.481,265.602,145.845,266.424,146.063C267.246,146.28,268.068,146.787,268.891,146.787C269.713,146.787,270.535,145.685,271.358,145.344C272.18,145.004,273.002,144.742,273.825,144.742C274.647,144.742,275.469,145.019,276.291,145.111C277.114,145.204,277.936,145.173,278.758,145.295C279.581,145.418,280.403,147.528,281.225,147.528C282.047,147.528,282.87,147.353,283.692,147.353C284.514,147.353,285.337,147.733,286.159,147.855C286.981,147.978,287.804,147.933,288.626,148.088C289.448,148.242,290.27,149.265,291.093,149.265C291.915,149.265,292.737,149.239,293.56,149.186C294.382,149.134,295.204,149.068,296.026,148.947C296.849,148.827,297.671,148.652,298.493,148.464C299.316,148.276,300.138,148.21,300.96,147.821C301.783,147.433,302.605,146.132,303.427,146.132C304.249,146.132,305.072,146.612,305.894,146.612C306.716,146.612,307.539,145.961,308.361,145.647C309.183,145.332,310.006,145.239,310.828,144.725C311.65,144.211,312.472,143.276,313.295,142.565C314.117,141.854,314.939,141,315.762,140.458C316.584,139.916,317.406,139.313,318.228,139.313C319.051,139.313,319.873,142.118,320.695,142.118C321.518,142.118,322.34,141.214,323.162,141.214C323.985,141.214,324.807,146.965,325.629,148.014C326.451,149.063,327.274,149.587,328.096,149.587C328.918,149.587,329.741,147.838,330.563,147.838C331.385,147.838,332.208,148.256,333.03,148.256C333.852,148.256,334.674,147.72,335.497,147.409C336.319,147.099,337.141,146.744,337.964,146.394C338.786,146.045,339.608,145.728,340.43,145.311C341.253,144.894,342.075,144.43,342.897,143.892C343.72,143.354,344.542,142.082,345.364,142.082C346.187,142.082,347.009,142.414,347.831,142.738C348.653,143.061,349.476,144.024,350.298,144.024C351.12,144.024,351.943,142.118,352.765,142.118C353.587,142.118,354.409,142.493,355.232,142.493C356.054,142.493,356.876,141.948,357.699,141.567C358.521,141.186,359.343,140.396,360.166,140.206C360.988,140.016,361.81,139.921,362.632,139.921C363.455,139.921,364.277,140.775,365.099,140.775C365.922,140.775,366.744,140.16,367.566,140.16C368.389,140.16,369.211,141.476,370.033,141.476C370.855,141.476,371.678,141.435,372.5,141.353C373.322,141.271,374.145,140.488,374.967,140.488C375.789,140.488,376.611,140.851,377.434,140.851C378.256,140.851,379.078,139.569,379.901,138.666C380.723,137.763,381.545,136.61,382.368,135.436C383.19,134.261,384.012,131.822,384.834,131.618C385.657,131.414,386.479,131.516,387.301,131.311C388.124,131.107,388.946,129.535,389.768,129.535C390.591,129.535,391.413,131.627,392.235,131.627C393.057,131.627,393.88,131.421,394.702,131.355C395.524,131.289,396.347,131.232,397.169,131.232C397.991,131.232,398.813,133.55,399.636,133.55C400.458,133.55,401.28,133.218,402.103,133.218C402.925,133.218,403.747,133.99,404.57,133.99C405.392,133.99,406.214,133.149,407.036,133.149C407.859,133.149,408.681,133.801,409.503,133.801C410.326,133.801,411.148,132.26,411.97,132.26C412.792,132.26,413.615,132.545,414.437,132.545C415.259,132.545,416.082,131.279,416.904,131.242C417.726,131.204,418.549,131.186,419.371,131.186C420.193,131.186,421.015,132.139,421.838,132.139C422.66,132.139,423.482,128.82,424.305,128.578C425.127,128.335,425.949,128.457,426.772,128.214C427.594,127.972,428.416,125.973,429.238,125.804C430.061,125.635,430.883,125.72,431.705,125.551C432.528,125.382,433.35,121.306,434.172,121.306C434.994,121.306,435.817,123.142,436.639,123.142C437.461,123.142,438.284,122.733,439.106,122.375C439.928,122.017,440.751,121.677,441.573,120.996C442.395,120.315,443.217,119.333,444.04,118.29C444.862,117.248,445.684,117.107,446.507,114.74C447.329,112.373,448.151,100.379,448.974,99.547C449.796,98.716,450.618,98.951,451.44,98.3C452.263,97.649,453.085,95.643,453.907,95.643C454.73,95.643,455.552,96.144,456.374,96.144C457.196,96.144,458.019,95.385,458.841,93.867C459.663,92.35,460.486,88.999,461.308,86.976C462.13,84.952,462.953,83.338,463.775,81.727C464.597,80.116,465.419,77.31,466.242,77.31C467.064,77.31,467.886,90.613,468.709,90.613C469.531,90.613,470.353,89.95,471.175,88.624C471.998,87.298,472.82,81.352,473.642,81.352C474.465,81.352,475.287,82.296,476.109,82.57C476.932,82.844,477.754,82.711,478.576,82.994C479.398,83.277,480.221,84.861,481.043,84.861C481.865,84.861,482.688,77.507,483.51,76.775C484.332,76.044,485.155,76.409,485.977,75.678C486.799,74.946,487.621,66.405,488.444,66.405C489.266,66.405,490.088,69.051,490.911,69.051C491.733,69.051,492.555,65.77,493.377,62.701C494.2,59.631,495.022,55.428,495.844,50.632C496.667,45.835,497.489,33.921,498.311,33.921C499.134,33.921,499.956,35.837,500.778,39.669C501.6,43.5,502.423,69.345,503.245,69.345C504.067,69.345,504.89,64.664,505.712,62.614C506.534,60.564,507.357,57.046,508.179,57.046C509.001,57.046,509.823,64.461,510.646,64.461C511.468,64.461,512.29,62.322,513.113,62.322C513.935,62.322,514.757,73.77,515.579,75.494C516.402,77.217,517.224,78.079,518.046,78.079C518.869,78.079,519.691,69.355,520.513,69.355C521.336,69.355,522.158,69.761,522.98,70.573C523.802,71.385,524.625,76.752,525.447,76.752C526.269,76.752,527.092,76.239,527.914,75.213C528.736,74.186,529.558,71.925,530.381,69.392C531.203,66.858,532.025,62.767,532.848,60.013C533.67,57.258,534.492,55.047,535.315,52.866C536.137,50.685,536.959,46.928,537.781,46.928C538.604,46.928,539.426,46.998,540.248,47.138C541.071,47.278,541.893,50.231,542.715,50.231C543.538,50.231,544.36,37.506,545.182,37.506C546.004,37.506,546.827,42.136,547.649,43.639C548.471,45.143,549.294,45.72,550.116,46.527C550.938,47.335,551.76,47.18,552.583,48.485C553.405,49.79,554.227,56.524,555.05,56.524C555.872,56.524,556.694,49.214,557.517,46.52C558.339,43.826,559.161,41.768,559.983,40.361C560.806,38.954,561.628,39.259,562.45,38.077C563.273,36.895,564.095,34.52,564.917,33.269C565.74,32.018,566.562,31.597,567.384,30.569C568.206,29.541,569.029,28.37,569.851,27.101C570.673,25.831,571.496,23.907,572.318,22.952C573.14,21.997,573.962,21.371,574.785,21.371C575.607,21.371,576.429,28.464,577.252,28.464C578.074,28.464,578.896,25.189,579.719,24.479C580.541,23.769,581.363,23.414,582.185,23.414C583.008,23.414,583.83,25.852,584.652,28.028C585.475,30.204,586.297,36.469,587.119,36.469C587.942,36.469,588.764,35.028,589.586,34.201C590.408,33.375,591.231,31.511,592.053,31.511C592.875,31.511,593.698,35.553,594.52,37.648C595.342,39.743,596.164,43.826,596.987,44.082C597.809,44.337,598.631,44.209,599.454,44.465C600.276,44.72,601.098,45.92,601.921,48.832C602.743,51.743,603.565,62.532,604.387,62.532C605.21,62.532,606.032,61.764,606.854,60.228C607.677,58.693,608.499,49.97,609.321,49.97C610.143,49.97,610.966,51.425,611.788,51.481C612.61,51.538,613.433,51.509,614.255,51.566C615.077,51.622,615.9,63.299,616.722,63.299C617.544,63.299,618.366,49.969,619.189,49.969C620.011,49.969,620.833,58.771,621.656,58.771C622.478,58.771,623.3,58.763,624.123,58.749C624.945,58.734,625.767,54.657,626.589,52.803C627.412,50.95,628.234,49.462,629.056,47.628C629.879,45.794,630.701,41.799,631.523,41.799C632.345,41.799,633.168,44.41,633.99,45.404C634.812,46.397,635.635,47.76,636.457,47.76C637.279,47.76,638.102,47.674,638.924,47.674C639.746,47.674,640.568,48.876,641.391,49.888C642.213,50.9,643.035,52.396,643.858,53.746C644.68,55.097,645.502,55.161,646.325,57.991C647.147,60.821,647.969,70.857,648.791,70.857C649.614,70.857,650.436,70.717,651.258,70.717C652.081,70.717,652.903,72.365,653.725,72.4C654.547,72.435,655.37,72.418,656.192,72.453C657.014,72.488,657.837,74.433,658.659,76.95C659.481,79.468,660.304,83.818,661.126,87.558C661.948,91.298,662.77,99.391,663.593,99.391C664.415,99.391,665.237,90.791,666.06,90.791C666.882,90.791,667.704,95.651,668.526,95.651C669.349,95.651,670.171,91.785,670.993,91.785C671.816,91.785,672.638,95.44,673.46,95.44C674.283,95.44,675.105,80.6,675.927,80.6C676.749,80.6,677.572,80.722,678.394,80.722C679.216,80.722,680.039,75.388,680.861,75.388C681.683,75.388,682.506,75.623,683.328,75.623C684.15,75.623,684.972,70.792,685.795,70.792C686.617,70.792,687.439,70.862,688.262,71.002C689.084,71.143,689.906,74.643,690.728,76.456C691.551,78.269,692.373,81.88,693.195,81.88C694.018,81.88,694.84,80.347,695.662,79.042C696.485,77.736,697.307,74.046,698.129,74.046C698.951,74.046,699.774,80.533,700.596,82.637C701.418,84.742,702.241,86.673,703.063,86.673C703.885,86.673,704.708,86.639,705.53,86.57C706.352,86.501,707.174,85.87,707.997,85.87C708.819,85.87,709.641,87.886,710.464,87.886C711.286,87.886,712.108,86.794,712.93,86.454C713.753,86.115,714.575,86.253,715.397,85.849C716.22,85.446,717.042,78.164,717.864,77.749C718.687,77.334,719.509,77.127,720.331,77.127C721.153,77.127,721.976,87.077,722.798,88.432C723.62,89.787,724.443,89.941,725.265,90.465C726.087,90.989,726.909,91.576,727.732,91.576C728.554,91.576,729.376,90.696,730.199,90.014C731.021,89.331,731.843,87.48,732.666,87.48C733.488,87.48,734.31,87.708,735.132,88.164C735.955,88.62,736.777,91.153,737.599,91.153C738.422,91.153,739.244,89.702,740.066,89.702C740.889,89.702,741.711,90.394,742.533,90.488C743.355,90.582,744.178,90.605,745,90.629">
                          </path>
                        </g>
                      </g>
                      <g className="recharts-layer recharts-area">
                        <g className="recharts-layer">
                          <path fill-opacity="1" fill="url(#colorUni)" width="745" height="170" type="monotone"
                            stroke="none" className="recharts-curve recharts-area-area"
                            d="M0,127.5C0.822,124.89,1.645,122.28,2.467,119.983C3.289,117.687,4.111,113.72,4.934,113.72C5.756,113.72,6.578,120.79,7.401,120.79C8.223,120.79,9.045,118.055,9.868,118.055C10.69,118.055,11.512,118.182,12.334,118.436C13.157,118.69,13.979,131.677,14.801,131.677C15.624,131.677,16.446,126.105,17.268,124.477C18.091,122.849,18.913,121.91,19.735,121.91C20.557,121.91,21.38,124.778,22.202,124.778C23.024,124.778,23.847,123.917,24.669,123.917C25.491,123.917,26.313,127.444,27.136,128.67C27.958,129.897,28.78,130.547,29.603,131.276C30.425,132.004,31.247,132.128,32.07,133.042C32.892,133.955,33.714,135.714,34.536,136.756C35.359,137.797,36.181,139.292,37.003,139.292C37.826,139.292,38.648,138.921,39.47,138.179C40.292,137.437,41.115,135.625,41.937,134.475C42.759,133.325,43.582,132.057,44.404,131.278C45.226,130.499,46.049,130.338,46.871,129.801C47.693,129.264,48.515,128.271,49.338,128.056C50.16,127.84,50.982,127.835,51.805,127.733C52.627,127.63,53.449,127.44,54.272,127.44C55.094,127.44,55.916,127.604,56.738,127.932C57.561,128.259,58.383,132.302,59.205,132.302C60.028,132.302,60.85,131.979,61.672,131.872C62.494,131.765,63.317,131.659,64.139,131.659C64.961,131.659,65.784,135.484,66.606,135.484C67.428,135.484,68.251,133.791,69.073,133.791C69.895,133.791,70.717,137.327,71.54,137.327C72.362,137.327,73.184,135.78,74.007,135.7C74.829,135.621,75.651,135.581,76.474,135.581C77.296,135.581,78.118,136.809,78.94,136.809C79.763,136.809,80.585,136.473,81.407,136.398C82.23,136.323,83.052,136.286,83.874,136.286C84.696,136.286,85.519,137.501,86.341,138.108C87.163,138.715,87.986,138.807,88.808,139.926C89.63,141.045,90.453,144.822,91.275,144.822C92.097,144.822,92.919,143.285,93.742,143.285C94.564,143.285,95.386,144.021,96.209,144.021C97.031,144.021,97.853,142.746,98.675,142.746C99.498,142.746,100.32,146.321,101.142,146.804C101.965,147.286,102.787,147.528,103.609,147.528C104.432,147.528,105.254,147.423,106.076,147.293C106.898,147.162,107.721,146.93,108.543,146.743C109.365,146.556,110.188,146.169,111.01,146.169C111.832,146.169,112.655,146.255,113.477,146.428C114.299,146.601,115.121,147.745,115.944,147.745C116.766,147.745,117.588,147.301,118.411,147.301C119.233,147.301,120.055,147.509,120.877,147.605C121.7,147.701,122.522,147.879,123.344,147.879C124.167,147.879,124.989,146.582,125.811,146.582C126.634,146.582,127.456,146.788,128.278,147.2C129.1,147.612,129.923,149.493,130.745,150.511C131.567,151.529,132.39,153.307,133.212,153.307C134.034,153.307,134.857,152.955,135.679,152.955C136.501,152.955,137.323,154.393,138.146,154.815C138.968,155.236,139.79,155.485,140.613,155.485C141.435,155.485,142.257,154.95,143.079,154.402C143.902,153.855,144.724,152.322,145.546,152.201C146.369,152.081,147.191,152.141,148.013,152.02C148.836,151.899,149.658,150.593,150.48,150.593C151.302,150.593,152.125,152.391,152.947,152.56C153.769,152.729,154.592,152.727,155.414,152.814C156.236,152.901,157.058,152.948,157.881,153.08C158.703,153.212,159.525,153.452,160.348,153.607C161.17,153.763,161.992,154.012,162.815,154.012C163.637,154.012,164.459,153.196,165.281,152.779C166.104,152.362,166.926,151.982,167.748,151.507C168.571,151.033,169.393,149.931,170.215,149.931C171.038,149.931,171.86,151.856,172.682,151.856C173.504,151.856,174.327,151.67,175.149,151.67C175.971,151.67,176.794,151.957,177.616,151.957C178.438,151.957,179.26,151.551,180.083,151.551C180.905,151.551,181.727,151.867,182.55,151.867C183.372,151.867,184.194,151.682,185.017,151.312C185.839,150.942,186.661,149.276,187.483,149.276C188.306,149.276,189.128,149.935,189.95,149.935C190.773,149.935,191.595,149.305,192.417,149.305C193.24,149.305,194.062,150.276,194.884,150.276C195.706,150.276,196.529,150.221,197.351,150.111C198.173,150.001,198.996,149.901,199.818,149.48C200.64,149.06,201.462,148.097,202.285,147.41C203.107,146.723,203.929,145.431,204.752,145.36C205.574,145.29,206.396,145.325,207.219,145.254C208.041,145.184,208.863,144.548,209.685,144.548C210.508,144.548,211.33,145.287,212.152,145.287C212.975,145.287,213.797,144.934,214.619,144.767C215.442,144.601,216.264,144.608,217.086,144.289C217.908,143.971,218.731,142.034,219.553,142.034C220.375,142.034,221.198,143.037,222.02,143.037C222.842,143.037,223.664,142.724,224.487,142.724C225.309,142.724,226.131,143.651,226.954,144.273C227.776,144.895,228.598,146.097,229.421,146.456C230.243,146.814,231.065,146.944,231.887,146.993C232.71,147.043,233.532,147.068,234.354,147.068C235.177,147.068,235.999,146.345,236.821,146.345C237.643,146.345,238.466,147.032,239.288,147.263C240.11,147.493,240.933,147.525,241.755,147.729C242.577,147.934,243.4,148.175,244.222,148.489C245.044,148.803,245.866,149.615,246.689,149.615C247.511,149.615,248.333,149.569,249.156,149.478C249.978,149.387,250.8,149.31,251.623,148.975C252.445,148.64,253.267,147.195,254.089,147.195C254.912,147.195,255.734,149.706,256.556,149.706C257.379,149.706,258.201,149.113,259.023,149.113C259.845,149.113,260.668,149.528,261.49,149.528C262.312,149.528,263.135,148.904,263.957,148.904C264.779,148.904,265.602,149.221,266.424,149.413C267.246,149.605,268.068,150.055,268.891,150.055C269.713,150.055,270.535,149.087,271.358,148.79C272.18,148.492,273.002,148.273,273.825,148.273C274.647,148.273,275.469,148.51,276.291,148.589C277.114,148.668,277.936,148.642,278.758,148.747C279.581,148.853,280.403,150.717,281.225,150.717C282.047,150.717,282.87,150.566,283.692,150.566C284.514,150.566,285.337,150.904,286.159,151.013C286.981,151.122,287.804,151.082,288.626,151.22C289.448,151.358,290.27,152.284,291.093,152.284C291.915,152.284,292.737,152.26,293.56,152.212C294.382,152.165,295.204,152.106,296.026,151.999C296.849,151.892,297.671,151.737,298.493,151.573C299.316,151.409,300.138,151.346,300.96,151.015C301.783,150.684,302.605,149.588,303.427,149.588C304.249,149.588,305.072,149.991,305.894,149.991C306.716,149.991,307.539,149.445,308.361,149.184C309.183,148.922,310.006,148.84,310.828,148.424C311.65,148.009,312.472,147.251,313.295,146.69C314.117,146.129,314.939,145.48,315.762,145.059C316.584,144.638,317.406,144.165,318.228,144.165C319.051,144.165,319.873,146.427,320.695,146.427C321.518,146.427,322.34,145.679,323.162,145.679C323.985,145.679,324.807,150.64,325.629,151.634C326.451,152.629,327.274,153.126,328.096,153.126C328.918,153.126,329.741,151.6,330.563,151.6C331.385,151.6,332.208,151.955,333.03,151.955C333.852,151.955,334.674,151.501,335.497,151.244C336.319,150.988,337.141,150.7,337.964,150.416C338.786,150.131,339.608,149.872,340.43,149.537C341.253,149.202,342.075,148.831,342.897,148.407C343.72,147.984,344.542,146.998,345.364,146.998C346.187,146.998,347.009,147.251,347.831,147.508C348.653,147.765,349.476,148.542,350.298,148.542C351.12,148.542,351.943,147.014,352.765,147.014C353.587,147.014,354.409,147.311,355.232,147.311C356.054,147.311,356.876,146.874,357.699,146.575C358.521,146.275,359.343,145.661,360.166,145.513C360.988,145.365,361.81,145.291,362.632,145.291C363.455,145.291,364.277,145.959,365.099,145.959C365.922,145.959,366.744,145.472,367.566,145.472C368.389,145.472,369.211,146.523,370.033,146.523C370.855,146.523,371.678,146.49,372.5,146.423C373.322,146.357,374.145,145.729,374.967,145.729C375.789,145.729,376.611,146.021,377.434,146.021C378.256,146.021,379.078,144.988,379.901,144.289C380.723,143.59,381.545,142.705,382.368,141.825C383.19,140.945,384.012,139.16,384.834,139.01C385.657,138.859,386.479,138.934,387.301,138.784C388.124,138.634,388.946,137.477,389.768,137.477C390.591,137.477,391.413,139.041,392.235,139.041C393.057,139.041,393.88,138.878,394.702,138.832C395.524,138.786,396.347,138.762,397.169,138.762C397.991,138.762,398.813,140.597,399.636,140.597C400.458,140.597,401.28,140.334,402.103,140.334C402.925,140.334,403.747,140.961,404.57,140.961C405.392,140.961,406.214,140.282,407.036,140.282C407.859,140.282,408.681,140.807,409.503,140.807C410.326,140.807,411.148,139.574,411.97,139.574C412.792,139.574,413.615,139.801,414.437,139.801C415.259,139.801,416.082,138.797,416.904,138.768C417.726,138.74,418.549,138.726,419.371,138.726C420.193,138.726,421.015,139.484,421.838,139.484C422.66,139.484,423.482,136.881,424.305,136.695C425.127,136.509,425.949,136.602,426.772,136.416C427.594,136.23,428.416,134.677,429.238,134.573C430.061,134.469,430.883,134.521,431.705,134.417C432.528,134.313,433.35,131.208,434.172,131.208C434.994,131.208,435.817,132.597,436.639,132.597C437.461,132.597,438.284,132.279,439.106,132.008C439.928,131.736,440.751,131.484,441.573,130.968C442.395,130.452,443.217,129.694,444.04,128.912C444.862,128.13,445.684,128.034,446.507,126.276C447.329,124.518,448.151,116.281,448.974,115.661C449.796,115.041,450.618,115.202,451.44,114.731C452.263,114.261,453.085,112.838,453.907,112.838C454.73,112.838,455.552,113.191,456.374,113.191C457.196,113.191,458.019,112.618,458.841,111.515C459.663,110.413,460.486,108.018,461.308,106.576C462.13,105.133,462.953,103.997,463.775,102.859C464.597,101.721,465.419,99.746,466.242,99.746C467.064,99.746,467.886,109.469,468.709,109.469C469.531,109.469,470.353,108.968,471.175,107.967C471.998,106.966,472.82,102.586,473.642,102.586C474.465,102.586,475.287,103.278,476.109,103.479C476.932,103.68,477.754,103.584,478.576,103.794C479.398,104.004,480.221,105.19,481.043,105.19C481.865,105.19,482.688,99.767,483.51,99.238C484.332,98.708,485.155,98.973,485.977,98.444C486.799,97.915,487.621,91.849,488.444,91.849C489.266,91.849,490.088,93.693,490.911,93.693C491.733,93.693,492.555,91.29,493.377,89.133C494.2,86.977,495.022,84.015,495.844,80.752C496.667,77.49,497.489,69.556,498.311,69.556C499.134,69.556,499.956,70.853,500.778,73.446C501.6,76.038,502.423,95.54,503.245,95.54C504.067,95.54,504.89,91.995,505.712,90.472C506.534,88.949,507.357,86.404,508.179,86.404C509.001,86.404,509.823,91.882,510.646,91.882C511.468,91.882,512.29,90.296,513.113,90.296C513.935,90.296,514.757,98.98,515.579,100.335C516.402,101.691,517.224,102.369,518.046,102.369C518.869,102.369,519.691,95.77,520.513,95.77C521.336,95.77,522.158,96.072,522.98,96.674C523.802,97.277,524.625,101.327,525.447,101.327C526.269,101.327,527.092,100.944,527.914,100.178C528.736,99.412,529.558,97.716,530.381,95.885C531.203,94.054,532.025,91.132,532.848,89.191C533.67,87.25,534.492,85.74,535.315,84.239C536.137,82.738,536.959,80.185,537.781,80.185C538.604,80.185,539.426,80.227,540.248,80.311C541.071,80.395,541.893,82.47,542.715,82.47C543.538,82.47,544.36,73.701,545.182,73.701C546.004,73.701,546.827,76.897,547.649,77.944C548.471,78.992,549.294,79.409,550.116,79.988C550.938,80.567,551.76,80.464,552.583,81.417C553.405,82.369,554.227,87.337,555.05,87.337C555.872,87.337,556.694,81.976,557.517,80.032C558.339,78.088,559.161,76.667,559.983,75.673C560.806,74.678,561.628,74.89,562.45,74.065C563.273,73.239,564.095,71.587,564.917,70.72C565.74,69.852,566.562,69.567,567.384,68.859C568.206,68.15,569.029,67.34,569.851,66.467C570.673,65.595,571.496,64.277,572.318,63.624C573.14,62.971,573.962,62.549,574.785,62.549C575.607,62.549,576.429,67.484,577.252,67.484C578.074,67.484,578.896,65.174,579.719,64.673C580.541,64.172,581.363,63.922,582.185,63.922C583.008,63.922,583.83,65.626,584.652,67.193C585.475,68.761,586.297,73.327,587.119,73.327C587.942,73.327,588.764,72.267,589.586,71.665C590.408,71.063,591.231,69.715,592.053,69.715C592.875,69.715,593.698,72.649,594.52,74.195C595.342,75.74,596.164,78.773,596.987,78.986C597.809,79.199,598.631,79.093,599.454,79.306C600.276,79.519,601.098,80.397,601.921,82.58C602.743,84.763,603.565,93.193,604.387,93.193C605.21,93.193,606.032,92.601,606.854,91.417C607.677,90.233,608.499,83.869,609.321,83.869C610.143,83.869,610.966,84.921,611.788,84.963C612.61,85.005,613.433,84.984,614.255,85.026C615.077,85.068,615.9,93.702,616.722,93.702C617.544,93.702,618.366,83.959,619.189,83.959C620.011,83.959,620.833,90.316,621.656,90.316C622.478,90.316,623.3,90.311,624.123,90.3C624.945,90.288,625.767,87.337,626.589,86.016C627.412,84.694,628.234,83.648,629.056,82.369C629.879,81.09,630.701,78.342,631.523,78.342C632.345,78.342,633.168,80.154,633.99,80.849C634.812,81.544,635.635,82.51,636.457,82.51C637.279,82.51,638.102,82.449,638.924,82.449C639.746,82.449,640.568,83.3,641.391,84.027C642.213,84.754,643.035,85.828,643.858,86.808C644.68,87.789,645.502,87.843,646.325,89.912C647.147,91.981,647.969,99.628,648.791,99.628C649.614,99.628,650.436,99.521,651.258,99.521C652.081,99.521,652.903,100.734,653.725,100.781C654.547,100.828,655.37,100.804,656.192,100.851C657.014,100.898,657.837,102.292,658.659,104.205C659.481,106.119,660.304,109.413,661.126,112.33C661.948,115.247,662.77,121.708,663.593,121.708C664.415,121.708,665.237,115.177,666.06,115.177C666.882,115.177,667.704,118.728,668.526,118.728C669.349,118.728,670.171,115.943,670.993,115.943C671.816,115.943,672.638,118.56,673.46,118.56C674.283,118.56,675.105,108.363,675.927,108.363C676.749,108.363,677.572,108.448,678.394,108.448C679.216,108.448,680.039,104.93,680.861,104.93C681.683,104.93,682.506,105.075,683.328,105.075C684.15,105.075,684.972,101.915,685.795,101.915C686.617,101.915,687.439,101.964,688.262,102.061C689.084,102.159,689.906,104.465,690.728,105.692C691.551,106.919,692.373,109.423,693.195,109.423C694.018,109.423,694.84,108.352,695.662,107.461C696.485,106.571,697.307,104.078,698.129,104.078C698.951,104.078,699.774,108.513,700.596,109.973C701.418,111.433,702.241,112.839,703.063,112.839C703.885,112.839,704.708,112.815,705.53,112.768C706.352,112.72,707.174,112.276,707.997,112.276C708.819,112.276,709.641,113.696,710.464,113.696C711.286,113.696,712.108,112.929,712.93,112.691C713.753,112.454,714.575,112.552,715.397,112.272C716.22,111.992,717.042,107.054,717.864,106.776C718.687,106.497,719.509,106.358,720.331,106.358C721.153,106.358,721.976,113.194,722.798,114.151C723.62,115.108,724.443,115.215,725.265,115.587C726.087,115.959,726.909,116.381,727.732,116.381C728.554,116.381,729.376,115.758,730.199,115.282C731.021,114.806,731.843,113.525,732.666,113.525C733.488,113.525,734.31,113.683,735.132,113.997C735.955,114.311,736.777,116.076,737.599,116.076C738.422,116.076,739.244,115.064,740.066,115.064C740.889,115.064,741.711,115.545,742.533,115.611C743.355,115.676,744.178,115.692,745,115.708L745,170C744.178,170,743.355,170,742.533,170C741.711,170,740.889,170,740.066,170C739.244,170,738.422,170,737.599,170C736.777,170,735.955,170,735.132,170C734.31,170,733.488,170,732.666,170C731.843,170,731.021,170,730.199,170C729.376,170,728.554,170,727.732,170C726.909,170,726.087,170,725.265,170C724.443,170,723.62,170,722.798,170C721.976,170,721.153,170,720.331,170C719.509,170,718.687,170,717.864,170C717.042,170,716.22,170,715.397,170C714.575,170,713.753,170,712.93,170C712.108,170,711.286,170,710.464,170C709.641,170,708.819,170,707.997,170C707.174,170,706.352,170,705.53,170C704.708,170,703.885,170,703.063,170C702.241,170,701.418,170,700.596,170C699.774,170,698.951,170,698.129,170C697.307,170,696.485,170,695.662,170C694.84,170,694.018,170,693.195,170C692.373,170,691.551,170,690.728,170C689.906,170,689.084,170,688.262,170C687.439,170,686.617,170,685.795,170C684.972,170,684.15,170,683.328,170C682.506,170,681.683,170,680.861,170C680.039,170,679.216,170,678.394,170C677.572,170,676.749,170,675.927,170C675.105,170,674.283,170,673.46,170C672.638,170,671.816,170,670.993,170C670.171,170,669.349,170,668.526,170C667.704,170,666.882,170,666.06,170C665.237,170,664.415,170,663.593,170C662.77,170,661.948,170,661.126,170C660.304,170,659.481,170,658.659,170C657.837,170,657.014,170,656.192,170C655.37,170,654.547,170,653.725,170C652.903,170,652.081,170,651.258,170C650.436,170,649.614,170,648.791,170C647.969,170,647.147,170,646.325,170C645.502,170,644.68,170,643.858,170C643.035,170,642.213,170,641.391,170C640.568,170,639.746,170,638.924,170C638.102,170,637.279,170,636.457,170C635.635,170,634.812,170,633.99,170C633.168,170,632.345,170,631.523,170C630.701,170,629.879,170,629.056,170C628.234,170,627.412,170,626.589,170C625.767,170,624.945,170,624.123,170C623.3,170,622.478,170,621.656,170C620.833,170,620.011,170,619.189,170C618.366,170,617.544,170,616.722,170C615.9,170,615.077,170,614.255,170C613.433,170,612.61,170,611.788,170C610.966,170,610.143,170,609.321,170C608.499,170,607.677,170,606.854,170C606.032,170,605.21,170,604.387,170C603.565,170,602.743,170,601.921,170C601.098,170,600.276,170,599.454,170C598.631,170,597.809,170,596.987,170C596.164,170,595.342,170,594.52,170C593.698,170,592.875,170,592.053,170C591.231,170,590.408,170,589.586,170C588.764,170,587.942,170,587.119,170C586.297,170,585.475,170,584.652,170C583.83,170,583.008,170,582.185,170C581.363,170,580.541,170,579.719,170C578.896,170,578.074,170,577.252,170C576.429,170,575.607,170,574.785,170C573.962,170,573.14,170,572.318,170C571.496,170,570.673,170,569.851,170C569.029,170,568.206,170,567.384,170C566.562,170,565.74,170,564.917,170C564.095,170,563.273,170,562.45,170C561.628,170,560.806,170,559.983,170C559.161,170,558.339,170,557.517,170C556.694,170,555.872,170,555.05,170C554.227,170,553.405,170,552.583,170C551.76,170,550.938,170,550.116,170C549.294,170,548.471,170,547.649,170C546.827,170,546.004,170,545.182,170C544.36,170,543.538,170,542.715,170C541.893,170,541.071,170,540.248,170C539.426,170,538.604,170,537.781,170C536.959,170,536.137,170,535.315,170C534.492,170,533.67,170,532.848,170C532.025,170,531.203,170,530.381,170C529.558,170,528.736,170,527.914,170C527.092,170,526.269,170,525.447,170C524.625,170,523.802,170,522.98,170C522.158,170,521.336,170,520.513,170C519.691,170,518.869,170,518.046,170C517.224,170,516.402,170,515.579,170C514.757,170,513.935,170,513.113,170C512.29,170,511.468,170,510.646,170C509.823,170,509.001,170,508.179,170C507.357,170,506.534,170,505.712,170C504.89,170,504.067,170,503.245,170C502.423,170,501.6,170,500.778,170C499.956,170,499.134,170,498.311,170C497.489,170,496.667,170,495.844,170C495.022,170,494.2,170,493.377,170C492.555,170,491.733,170,490.911,170C490.088,170,489.266,170,488.444,170C487.621,170,486.799,170,485.977,170C485.155,170,484.332,170,483.51,170C482.688,170,481.865,170,481.043,170C480.221,170,479.398,170,478.576,170C477.754,170,476.932,170,476.109,170C475.287,170,474.465,170,473.642,170C472.82,170,471.998,170,471.175,170C470.353,170,469.531,170,468.709,170C467.886,170,467.064,170,466.242,170C465.419,170,464.597,170,463.775,170C462.953,170,462.13,170,461.308,170C460.486,170,459.663,170,458.841,170C458.019,170,457.196,170,456.374,170C455.552,170,454.73,170,453.907,170C453.085,170,452.263,170,451.44,170C450.618,170,449.796,170,448.974,170C448.151,170,447.329,170,446.507,170C445.684,170,444.862,170,444.04,170C443.217,170,442.395,170,441.573,170C440.751,170,439.928,170,439.106,170C438.284,170,437.461,170,436.639,170C435.817,170,434.994,170,434.172,170C433.35,170,432.528,170,431.705,170C430.883,170,430.061,170,429.238,170C428.416,170,427.594,170,426.772,170C425.949,170,425.127,170,424.305,170C423.482,170,422.66,170,421.838,170C421.015,170,420.193,170,419.371,170C418.549,170,417.726,170,416.904,170C416.082,170,415.259,170,414.437,170C413.615,170,412.792,170,411.97,170C411.148,170,410.326,170,409.503,170C408.681,170,407.859,170,407.036,170C406.214,170,405.392,170,404.57,170C403.747,170,402.925,170,402.103,170C401.28,170,400.458,170,399.636,170C398.813,170,397.991,170,397.169,170C396.347,170,395.524,170,394.702,170C393.88,170,393.057,170,392.235,170C391.413,170,390.591,170,389.768,170C388.946,170,388.124,170,387.301,170C386.479,170,385.657,170,384.834,170C384.012,170,383.19,170,382.368,170C381.545,170,380.723,170,379.901,170C379.078,170,378.256,170,377.434,170C376.611,170,375.789,170,374.967,170C374.145,170,373.322,170,372.5,170C371.678,170,370.855,170,370.033,170C369.211,170,368.389,170,367.566,170C366.744,170,365.922,170,365.099,170C364.277,170,363.455,170,362.632,170C361.81,170,360.988,170,360.166,170C359.343,170,358.521,170,357.699,170C356.876,170,356.054,170,355.232,170C354.409,170,353.587,170,352.765,170C351.943,170,351.12,170,350.298,170C349.476,170,348.653,170,347.831,170C347.009,170,346.187,170,345.364,170C344.542,170,343.72,170,342.897,170C342.075,170,341.253,170,340.43,170C339.608,170,338.786,170,337.964,170C337.141,170,336.319,170,335.497,170C334.674,170,333.852,170,333.03,170C332.208,170,331.385,170,330.563,170C329.741,170,328.918,170,328.096,170C327.274,170,326.451,170,325.629,170C324.807,170,323.985,170,323.162,170C322.34,170,321.518,170,320.695,170C319.873,170,319.051,170,318.228,170C317.406,170,316.584,170,315.762,170C314.939,170,314.117,170,313.295,170C312.472,170,311.65,170,310.828,170C310.006,170,309.183,170,308.361,170C307.539,170,306.716,170,305.894,170C305.072,170,304.249,170,303.427,170C302.605,170,301.783,170,300.96,170C300.138,170,299.316,170,298.493,170C297.671,170,296.849,170,296.026,170C295.204,170,294.382,170,293.56,170C292.737,170,291.915,170,291.093,170C290.27,170,289.448,170,288.626,170C287.804,170,286.981,170,286.159,170C285.337,170,284.514,170,283.692,170C282.87,170,282.047,170,281.225,170C280.403,170,279.581,170,278.758,170C277.936,170,277.114,170,276.291,170C275.469,170,274.647,170,273.825,170C273.002,170,272.18,170,271.358,170C270.535,170,269.713,170,268.891,170C268.068,170,267.246,170,266.424,170C265.602,170,264.779,170,263.957,170C263.135,170,262.312,170,261.49,170C260.668,170,259.845,170,259.023,170C258.201,170,257.379,170,256.556,170C255.734,170,254.912,170,254.089,170C253.267,170,252.445,170,251.623,170C250.8,170,249.978,170,249.156,170C248.333,170,247.511,170,246.689,170C245.866,170,245.044,170,244.222,170C243.4,170,242.577,170,241.755,170C240.933,170,240.11,170,239.288,170C238.466,170,237.643,170,236.821,170C235.999,170,235.177,170,234.354,170C233.532,170,232.71,170,231.887,170C231.065,170,230.243,170,229.421,170C228.598,170,227.776,170,226.954,170C226.131,170,225.309,170,224.487,170C223.664,170,222.842,170,222.02,170C221.198,170,220.375,170,219.553,170C218.731,170,217.908,170,217.086,170C216.264,170,215.442,170,214.619,170C213.797,170,212.975,170,212.152,170C211.33,170,210.508,170,209.685,170C208.863,170,208.041,170,207.219,170C206.396,170,205.574,170,204.752,170C203.929,170,203.107,170,202.285,170C201.462,170,200.64,170,199.818,170C198.996,170,198.173,170,197.351,170C196.529,170,195.706,170,194.884,170C194.062,170,193.24,170,192.417,170C191.595,170,190.773,170,189.95,170C189.128,170,188.306,170,187.483,170C186.661,170,185.839,170,185.017,170C184.194,170,183.372,170,182.55,170C181.727,170,180.905,170,180.083,170C179.26,170,178.438,170,177.616,170C176.794,170,175.971,170,175.149,170C174.327,170,173.504,170,172.682,170C171.86,170,171.038,170,170.215,170C169.393,170,168.571,170,167.748,170C166.926,170,166.104,170,165.281,170C164.459,170,163.637,170,162.815,170C161.992,170,161.17,170,160.348,170C159.525,170,158.703,170,157.881,170C157.058,170,156.236,170,155.414,170C154.592,170,153.769,170,152.947,170C152.125,170,151.302,170,150.48,170C149.658,170,148.836,170,148.013,170C147.191,170,146.369,170,145.546,170C144.724,170,143.902,170,143.079,170C142.257,170,141.435,170,140.613,170C139.79,170,138.968,170,138.146,170C137.323,170,136.501,170,135.679,170C134.857,170,134.034,170,133.212,170C132.39,170,131.567,170,130.745,170C129.923,170,129.1,170,128.278,170C127.456,170,126.634,170,125.811,170C124.989,170,124.167,170,123.344,170C122.522,170,121.7,170,120.877,170C120.055,170,119.233,170,118.411,170C117.588,170,116.766,170,115.944,170C115.121,170,114.299,170,113.477,170C112.655,170,111.832,170,111.01,170C110.188,170,109.365,170,108.543,170C107.721,170,106.898,170,106.076,170C105.254,170,104.432,170,103.609,170C102.787,170,101.965,170,101.142,170C100.32,170,99.498,170,98.675,170C97.853,170,97.031,170,96.209,170C95.386,170,94.564,170,93.742,170C92.919,170,92.097,170,91.275,170C90.453,170,89.63,170,88.808,170C87.986,170,87.163,170,86.341,170C85.519,170,84.696,170,83.874,170C83.052,170,82.23,170,81.407,170C80.585,170,79.763,170,78.94,170C78.118,170,77.296,170,76.474,170C75.651,170,74.829,170,74.007,170C73.184,170,72.362,170,71.54,170C70.717,170,69.895,170,69.073,170C68.251,170,67.428,170,66.606,170C65.784,170,64.961,170,64.139,170C63.317,170,62.494,170,61.672,170C60.85,170,60.028,170,59.205,170C58.383,170,57.561,170,56.738,170C55.916,170,55.094,170,54.272,170C53.449,170,52.627,170,51.805,170C50.982,170,50.16,170,49.338,170C48.515,170,47.693,170,46.871,170C46.049,170,45.226,170,44.404,170C43.582,170,42.759,170,41.937,170C41.115,170,40.292,170,39.47,170C38.648,170,37.826,170,37.003,170C36.181,170,35.359,170,34.536,170C33.714,170,32.892,170,32.07,170C31.247,170,30.425,170,29.603,170C28.78,170,27.958,170,27.136,170C26.313,170,25.491,170,24.669,170C23.847,170,23.024,170,22.202,170C21.38,170,20.557,170,19.735,170C18.913,170,18.091,170,17.268,170C16.446,170,15.624,170,14.801,170C13.979,170,13.157,170,12.334,170C11.512,170,10.69,170,9.868,170C9.045,170,8.223,170,7.401,170C6.578,170,5.756,170,4.934,170C4.111,170,3.289,170,2.467,170C1.645,170,0.822,170,0,170Z">
                          </path>
                          <path type="monotone" stroke="#ff3194" fill-opacity="1" fill="none" width="745" height="170"
                            className="recharts-curve recharts-area-curve"
                            d="M0,127.5C0.822,124.89,1.645,122.28,2.467,119.983C3.289,117.687,4.111,113.72,4.934,113.72C5.756,113.72,6.578,120.79,7.401,120.79C8.223,120.79,9.045,118.055,9.868,118.055C10.69,118.055,11.512,118.182,12.334,118.436C13.157,118.69,13.979,131.677,14.801,131.677C15.624,131.677,16.446,126.105,17.268,124.477C18.091,122.849,18.913,121.91,19.735,121.91C20.557,121.91,21.38,124.778,22.202,124.778C23.024,124.778,23.847,123.917,24.669,123.917C25.491,123.917,26.313,127.444,27.136,128.67C27.958,129.897,28.78,130.547,29.603,131.276C30.425,132.004,31.247,132.128,32.07,133.042C32.892,133.955,33.714,135.714,34.536,136.756C35.359,137.797,36.181,139.292,37.003,139.292C37.826,139.292,38.648,138.921,39.47,138.179C40.292,137.437,41.115,135.625,41.937,134.475C42.759,133.325,43.582,132.057,44.404,131.278C45.226,130.499,46.049,130.338,46.871,129.801C47.693,129.264,48.515,128.271,49.338,128.056C50.16,127.84,50.982,127.835,51.805,127.733C52.627,127.63,53.449,127.44,54.272,127.44C55.094,127.44,55.916,127.604,56.738,127.932C57.561,128.259,58.383,132.302,59.205,132.302C60.028,132.302,60.85,131.979,61.672,131.872C62.494,131.765,63.317,131.659,64.139,131.659C64.961,131.659,65.784,135.484,66.606,135.484C67.428,135.484,68.251,133.791,69.073,133.791C69.895,133.791,70.717,137.327,71.54,137.327C72.362,137.327,73.184,135.78,74.007,135.7C74.829,135.621,75.651,135.581,76.474,135.581C77.296,135.581,78.118,136.809,78.94,136.809C79.763,136.809,80.585,136.473,81.407,136.398C82.23,136.323,83.052,136.286,83.874,136.286C84.696,136.286,85.519,137.501,86.341,138.108C87.163,138.715,87.986,138.807,88.808,139.926C89.63,141.045,90.453,144.822,91.275,144.822C92.097,144.822,92.919,143.285,93.742,143.285C94.564,143.285,95.386,144.021,96.209,144.021C97.031,144.021,97.853,142.746,98.675,142.746C99.498,142.746,100.32,146.321,101.142,146.804C101.965,147.286,102.787,147.528,103.609,147.528C104.432,147.528,105.254,147.423,106.076,147.293C106.898,147.162,107.721,146.93,108.543,146.743C109.365,146.556,110.188,146.169,111.01,146.169C111.832,146.169,112.655,146.255,113.477,146.428C114.299,146.601,115.121,147.745,115.944,147.745C116.766,147.745,117.588,147.301,118.411,147.301C119.233,147.301,120.055,147.509,120.877,147.605C121.7,147.701,122.522,147.879,123.344,147.879C124.167,147.879,124.989,146.582,125.811,146.582C126.634,146.582,127.456,146.788,128.278,147.2C129.1,147.612,129.923,149.493,130.745,150.511C131.567,151.529,132.39,153.307,133.212,153.307C134.034,153.307,134.857,152.955,135.679,152.955C136.501,152.955,137.323,154.393,138.146,154.815C138.968,155.236,139.79,155.485,140.613,155.485C141.435,155.485,142.257,154.95,143.079,154.402C143.902,153.855,144.724,152.322,145.546,152.201C146.369,152.081,147.191,152.141,148.013,152.02C148.836,151.899,149.658,150.593,150.48,150.593C151.302,150.593,152.125,152.391,152.947,152.56C153.769,152.729,154.592,152.727,155.414,152.814C156.236,152.901,157.058,152.948,157.881,153.08C158.703,153.212,159.525,153.452,160.348,153.607C161.17,153.763,161.992,154.012,162.815,154.012C163.637,154.012,164.459,153.196,165.281,152.779C166.104,152.362,166.926,151.982,167.748,151.507C168.571,151.033,169.393,149.931,170.215,149.931C171.038,149.931,171.86,151.856,172.682,151.856C173.504,151.856,174.327,151.67,175.149,151.67C175.971,151.67,176.794,151.957,177.616,151.957C178.438,151.957,179.26,151.551,180.083,151.551C180.905,151.551,181.727,151.867,182.55,151.867C183.372,151.867,184.194,151.682,185.017,151.312C185.839,150.942,186.661,149.276,187.483,149.276C188.306,149.276,189.128,149.935,189.95,149.935C190.773,149.935,191.595,149.305,192.417,149.305C193.24,149.305,194.062,150.276,194.884,150.276C195.706,150.276,196.529,150.221,197.351,150.111C198.173,150.001,198.996,149.901,199.818,149.48C200.64,149.06,201.462,148.097,202.285,147.41C203.107,146.723,203.929,145.431,204.752,145.36C205.574,145.29,206.396,145.325,207.219,145.254C208.041,145.184,208.863,144.548,209.685,144.548C210.508,144.548,211.33,145.287,212.152,145.287C212.975,145.287,213.797,144.934,214.619,144.767C215.442,144.601,216.264,144.608,217.086,144.289C217.908,143.971,218.731,142.034,219.553,142.034C220.375,142.034,221.198,143.037,222.02,143.037C222.842,143.037,223.664,142.724,224.487,142.724C225.309,142.724,226.131,143.651,226.954,144.273C227.776,144.895,228.598,146.097,229.421,146.456C230.243,146.814,231.065,146.944,231.887,146.993C232.71,147.043,233.532,147.068,234.354,147.068C235.177,147.068,235.999,146.345,236.821,146.345C237.643,146.345,238.466,147.032,239.288,147.263C240.11,147.493,240.933,147.525,241.755,147.729C242.577,147.934,243.4,148.175,244.222,148.489C245.044,148.803,245.866,149.615,246.689,149.615C247.511,149.615,248.333,149.569,249.156,149.478C249.978,149.387,250.8,149.31,251.623,148.975C252.445,148.64,253.267,147.195,254.089,147.195C254.912,147.195,255.734,149.706,256.556,149.706C257.379,149.706,258.201,149.113,259.023,149.113C259.845,149.113,260.668,149.528,261.49,149.528C262.312,149.528,263.135,148.904,263.957,148.904C264.779,148.904,265.602,149.221,266.424,149.413C267.246,149.605,268.068,150.055,268.891,150.055C269.713,150.055,270.535,149.087,271.358,148.79C272.18,148.492,273.002,148.273,273.825,148.273C274.647,148.273,275.469,148.51,276.291,148.589C277.114,148.668,277.936,148.642,278.758,148.747C279.581,148.853,280.403,150.717,281.225,150.717C282.047,150.717,282.87,150.566,283.692,150.566C284.514,150.566,285.337,150.904,286.159,151.013C286.981,151.122,287.804,151.082,288.626,151.22C289.448,151.358,290.27,152.284,291.093,152.284C291.915,152.284,292.737,152.26,293.56,152.212C294.382,152.165,295.204,152.106,296.026,151.999C296.849,151.892,297.671,151.737,298.493,151.573C299.316,151.409,300.138,151.346,300.96,151.015C301.783,150.684,302.605,149.588,303.427,149.588C304.249,149.588,305.072,149.991,305.894,149.991C306.716,149.991,307.539,149.445,308.361,149.184C309.183,148.922,310.006,148.84,310.828,148.424C311.65,148.009,312.472,147.251,313.295,146.69C314.117,146.129,314.939,145.48,315.762,145.059C316.584,144.638,317.406,144.165,318.228,144.165C319.051,144.165,319.873,146.427,320.695,146.427C321.518,146.427,322.34,145.679,323.162,145.679C323.985,145.679,324.807,150.64,325.629,151.634C326.451,152.629,327.274,153.126,328.096,153.126C328.918,153.126,329.741,151.6,330.563,151.6C331.385,151.6,332.208,151.955,333.03,151.955C333.852,151.955,334.674,151.501,335.497,151.244C336.319,150.988,337.141,150.7,337.964,150.416C338.786,150.131,339.608,149.872,340.43,149.537C341.253,149.202,342.075,148.831,342.897,148.407C343.72,147.984,344.542,146.998,345.364,146.998C346.187,146.998,347.009,147.251,347.831,147.508C348.653,147.765,349.476,148.542,350.298,148.542C351.12,148.542,351.943,147.014,352.765,147.014C353.587,147.014,354.409,147.311,355.232,147.311C356.054,147.311,356.876,146.874,357.699,146.575C358.521,146.275,359.343,145.661,360.166,145.513C360.988,145.365,361.81,145.291,362.632,145.291C363.455,145.291,364.277,145.959,365.099,145.959C365.922,145.959,366.744,145.472,367.566,145.472C368.389,145.472,369.211,146.523,370.033,146.523C370.855,146.523,371.678,146.49,372.5,146.423C373.322,146.357,374.145,145.729,374.967,145.729C375.789,145.729,376.611,146.021,377.434,146.021C378.256,146.021,379.078,144.988,379.901,144.289C380.723,143.59,381.545,142.705,382.368,141.825C383.19,140.945,384.012,139.16,384.834,139.01C385.657,138.859,386.479,138.934,387.301,138.784C388.124,138.634,388.946,137.477,389.768,137.477C390.591,137.477,391.413,139.041,392.235,139.041C393.057,139.041,393.88,138.878,394.702,138.832C395.524,138.786,396.347,138.762,397.169,138.762C397.991,138.762,398.813,140.597,399.636,140.597C400.458,140.597,401.28,140.334,402.103,140.334C402.925,140.334,403.747,140.961,404.57,140.961C405.392,140.961,406.214,140.282,407.036,140.282C407.859,140.282,408.681,140.807,409.503,140.807C410.326,140.807,411.148,139.574,411.97,139.574C412.792,139.574,413.615,139.801,414.437,139.801C415.259,139.801,416.082,138.797,416.904,138.768C417.726,138.74,418.549,138.726,419.371,138.726C420.193,138.726,421.015,139.484,421.838,139.484C422.66,139.484,423.482,136.881,424.305,136.695C425.127,136.509,425.949,136.602,426.772,136.416C427.594,136.23,428.416,134.677,429.238,134.573C430.061,134.469,430.883,134.521,431.705,134.417C432.528,134.313,433.35,131.208,434.172,131.208C434.994,131.208,435.817,132.597,436.639,132.597C437.461,132.597,438.284,132.279,439.106,132.008C439.928,131.736,440.751,131.484,441.573,130.968C442.395,130.452,443.217,129.694,444.04,128.912C444.862,128.13,445.684,128.034,446.507,126.276C447.329,124.518,448.151,116.281,448.974,115.661C449.796,115.041,450.618,115.202,451.44,114.731C452.263,114.261,453.085,112.838,453.907,112.838C454.73,112.838,455.552,113.191,456.374,113.191C457.196,113.191,458.019,112.618,458.841,111.515C459.663,110.413,460.486,108.018,461.308,106.576C462.13,105.133,462.953,103.997,463.775,102.859C464.597,101.721,465.419,99.746,466.242,99.746C467.064,99.746,467.886,109.469,468.709,109.469C469.531,109.469,470.353,108.968,471.175,107.967C471.998,106.966,472.82,102.586,473.642,102.586C474.465,102.586,475.287,103.278,476.109,103.479C476.932,103.68,477.754,103.584,478.576,103.794C479.398,104.004,480.221,105.19,481.043,105.19C481.865,105.19,482.688,99.767,483.51,99.238C484.332,98.708,485.155,98.973,485.977,98.444C486.799,97.915,487.621,91.849,488.444,91.849C489.266,91.849,490.088,93.693,490.911,93.693C491.733,93.693,492.555,91.29,493.377,89.133C494.2,86.977,495.022,84.015,495.844,80.752C496.667,77.49,497.489,69.556,498.311,69.556C499.134,69.556,499.956,70.853,500.778,73.446C501.6,76.038,502.423,95.54,503.245,95.54C504.067,95.54,504.89,91.995,505.712,90.472C506.534,88.949,507.357,86.404,508.179,86.404C509.001,86.404,509.823,91.882,510.646,91.882C511.468,91.882,512.29,90.296,513.113,90.296C513.935,90.296,514.757,98.98,515.579,100.335C516.402,101.691,517.224,102.369,518.046,102.369C518.869,102.369,519.691,95.77,520.513,95.77C521.336,95.77,522.158,96.072,522.98,96.674C523.802,97.277,524.625,101.327,525.447,101.327C526.269,101.327,527.092,100.944,527.914,100.178C528.736,99.412,529.558,97.716,530.381,95.885C531.203,94.054,532.025,91.132,532.848,89.191C533.67,87.25,534.492,85.74,535.315,84.239C536.137,82.738,536.959,80.185,537.781,80.185C538.604,80.185,539.426,80.227,540.248,80.311C541.071,80.395,541.893,82.47,542.715,82.47C543.538,82.47,544.36,73.701,545.182,73.701C546.004,73.701,546.827,76.897,547.649,77.944C548.471,78.992,549.294,79.409,550.116,79.988C550.938,80.567,551.76,80.464,552.583,81.417C553.405,82.369,554.227,87.337,555.05,87.337C555.872,87.337,556.694,81.976,557.517,80.032C558.339,78.088,559.161,76.667,559.983,75.673C560.806,74.678,561.628,74.89,562.45,74.065C563.273,73.239,564.095,71.587,564.917,70.72C565.74,69.852,566.562,69.567,567.384,68.859C568.206,68.15,569.029,67.34,569.851,66.467C570.673,65.595,571.496,64.277,572.318,63.624C573.14,62.971,573.962,62.549,574.785,62.549C575.607,62.549,576.429,67.484,577.252,67.484C578.074,67.484,578.896,65.174,579.719,64.673C580.541,64.172,581.363,63.922,582.185,63.922C583.008,63.922,583.83,65.626,584.652,67.193C585.475,68.761,586.297,73.327,587.119,73.327C587.942,73.327,588.764,72.267,589.586,71.665C590.408,71.063,591.231,69.715,592.053,69.715C592.875,69.715,593.698,72.649,594.52,74.195C595.342,75.74,596.164,78.773,596.987,78.986C597.809,79.199,598.631,79.093,599.454,79.306C600.276,79.519,601.098,80.397,601.921,82.58C602.743,84.763,603.565,93.193,604.387,93.193C605.21,93.193,606.032,92.601,606.854,91.417C607.677,90.233,608.499,83.869,609.321,83.869C610.143,83.869,610.966,84.921,611.788,84.963C612.61,85.005,613.433,84.984,614.255,85.026C615.077,85.068,615.9,93.702,616.722,93.702C617.544,93.702,618.366,83.959,619.189,83.959C620.011,83.959,620.833,90.316,621.656,90.316C622.478,90.316,623.3,90.311,624.123,90.3C624.945,90.288,625.767,87.337,626.589,86.016C627.412,84.694,628.234,83.648,629.056,82.369C629.879,81.09,630.701,78.342,631.523,78.342C632.345,78.342,633.168,80.154,633.99,80.849C634.812,81.544,635.635,82.51,636.457,82.51C637.279,82.51,638.102,82.449,638.924,82.449C639.746,82.449,640.568,83.3,641.391,84.027C642.213,84.754,643.035,85.828,643.858,86.808C644.68,87.789,645.502,87.843,646.325,89.912C647.147,91.981,647.969,99.628,648.791,99.628C649.614,99.628,650.436,99.521,651.258,99.521C652.081,99.521,652.903,100.734,653.725,100.781C654.547,100.828,655.37,100.804,656.192,100.851C657.014,100.898,657.837,102.292,658.659,104.205C659.481,106.119,660.304,109.413,661.126,112.33C661.948,115.247,662.77,121.708,663.593,121.708C664.415,121.708,665.237,115.177,666.06,115.177C666.882,115.177,667.704,118.728,668.526,118.728C669.349,118.728,670.171,115.943,670.993,115.943C671.816,115.943,672.638,118.56,673.46,118.56C674.283,118.56,675.105,108.363,675.927,108.363C676.749,108.363,677.572,108.448,678.394,108.448C679.216,108.448,680.039,104.93,680.861,104.93C681.683,104.93,682.506,105.075,683.328,105.075C684.15,105.075,684.972,101.915,685.795,101.915C686.617,101.915,687.439,101.964,688.262,102.061C689.084,102.159,689.906,104.465,690.728,105.692C691.551,106.919,692.373,109.423,693.195,109.423C694.018,109.423,694.84,108.352,695.662,107.461C696.485,106.571,697.307,104.078,698.129,104.078C698.951,104.078,699.774,108.513,700.596,109.973C701.418,111.433,702.241,112.839,703.063,112.839C703.885,112.839,704.708,112.815,705.53,112.768C706.352,112.72,707.174,112.276,707.997,112.276C708.819,112.276,709.641,113.696,710.464,113.696C711.286,113.696,712.108,112.929,712.93,112.691C713.753,112.454,714.575,112.552,715.397,112.272C716.22,111.992,717.042,107.054,717.864,106.776C718.687,106.497,719.509,106.358,720.331,106.358C721.153,106.358,721.976,113.194,722.798,114.151C723.62,115.108,724.443,115.215,725.265,115.587C726.087,115.959,726.909,116.381,727.732,116.381C728.554,116.381,729.376,115.758,730.199,115.282C731.021,114.806,731.843,113.525,732.666,113.525C733.488,113.525,734.31,113.683,735.132,113.997C735.955,114.311,736.777,116.076,737.599,116.076C738.422,116.076,739.244,115.064,740.066,115.064C740.889,115.064,741.711,115.545,742.533,115.611C743.355,115.676,744.178,115.692,745,115.708">
                          </path>
                        </g>
                      </g>
                    </svg>
                    <div tabIndex={-1} role="dialog" className="recharts-tooltip-wrapper"
                      style={{ pointerEvents: "none", visibility: "hidden", position: "absolute", top: "0px", left: "0px", outline: "none", transform: "translate(286.583px, 76px)" }}>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-none text-center font-actor text-2xl text-buy text-glow-sm">Your earnings are
                optimized on MoroDex compared to UniSwap</div>
            </div>
          </div>
        </div>
        <div className="mt-32 font-actor lg-mt-80">
          <h3 className="inline rounded-full bg-white-a15 px-4 py-2 text-xs text-white lg-text-base">Our services</h3>
          <h2 className="mt-10 mb-20 text-left text-4xl text-white">One protocol to rule them all: that is the goal of
            MORODEX, the pioneering DeFi platform that is transforming the way we approach trading and liquidity.</h2>
          <div className="flex flex-col space-y-8 lg-flex-row lg-space-y-0 lg-space-x-8 lg-px-28">
            <a className="flex-1 rounded-xl bg-white-a01 p-6 text-white-a5 shadow-xl shadow-black transition-all duration-500 hover-translate-y-4 hover-text-white hover-shadow-buy"
            href="/liquidity">
            <div className="flex items-center py-6">
              <div className="grow text-5xl">Liquidity Providing</div>
              <svg aria-hidden="true" focusable="false"
                data-prefix="fas" data-icon="arrow-right" className="svg-inline--fa fa-arrow-right fa-2x flex-none"
                role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{ transformOrigin: "0.4375em 0.5em" }}>
                <g transform="translate(224 256)">
                  <g transform="translate(0, 0)  scale(1, 1)  rotate(-45 0 0)">
                    <path fill="currentColor"
                      d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z"
                      transform="translate(-224 -256)"></path>
                  </g>
                </g>
              </svg>
            </div>
            <p className="py-2 text-xl font-bold leading-8 text-white-a75">No more market conditions that kill you
              slowly with impermanent losses. MORODEX takes care of optimizing your profits. Automatically.</p>
          </a><a
            className="flex-1 rounded-xl bg-white-a01 p-6 text-white-a5 shadow-xl shadow-black transition-all duration-500 hover-translate-y-4 hover-text-white hover-shadow-buy lg-translate-y-8 lg-hover-translate-y-12"
            href="/farming">
              <div className="flex items-center py-6">
                <div className="grow text-5xl">Farming</div>
                <svg aria-hidden="true" focusable="false" data-prefix="fas"
                  data-icon="arrow-right" className="svg-inline--fa fa-arrow-right fa-2x flex-none" role="img"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{ transformOrigin: "0.4375em 0.5em" }}>
                  <g transform="translate(224 256)">
                    <g transform="translate(0, 0)  scale(1, 1)  rotate(-45 0 0)">
                      <path fill="currentColor"
                        d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z"
                        transform="translate(-224 -256)"></path>
                    </g>
                  </g>
                </svg>
              </div>
              <p className="py-2 text-xl font-bold leading-8 text-white-a75">The key to realizing your financial
                goals. Unlock financial growth through crypto farming. Plant your seeds and watch your crypto grow!</p>
            </a><a
              className="flex-1 rounded-xl bg-white-a01 p-6 text-white-a5 shadow-xl shadow-black transition-all duration-500 hover-translate-y-4 hover-text-white hover-shadow-buy"
              href="/staking">
              <div className="flex items-center py-6">
                <div className="grow text-5xl">Staking</div>
                <svg aria-hidden="true" focusable="false" data-prefix="fas"
                  data-icon="arrow-right" className="svg-inline--fa fa-arrow-right fa-2x flex-none" role="img"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{ transformOrigin: "0.4375em 0.5em" }}>
                  <g transform="translate(224 256)">
                    <g transform="translate(0, 0)  scale(1, 1)  rotate(-45 0 0)">
                      <path fill="currentColor"
                        d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z"
                        transform="translate(-224 -256)"></path>
                    </g>
                  </g>
                </svg>
              </div>
              <p className="py-2 text-xl font-bold leading-8 text-white-a75">Benefit from a dynamic market and
                unmatched swap power with minimal fees and liquidity providers always ready to provide you with the
                smallest possible slippage.</p>
            </a></div>
        </div>
        <div
          className="my-28 flex flex-col items-center justify-between space-y-4 rounded-xl bg-white-a25 p-10 font-actor shadow-xl shadow-black lg-flex-row lg-space-y-0">
          <div className="shrink text-center text-4xl text-white lg-text-left lg-text-6xl">Start Exchanging Smartly
          </div>
          <div className="shrink text-center text-white">
            <svg aria-hidden="true" focusable="false" data-prefix="fas"
              data-icon="arrow-right" className="svg-inline--fa fa-arrow-right fa-2xl hidden lg-inline" role="img"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path fill="currentColor"
                d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z">
              </path>
            </svg><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
              className="svg-inline--fa fa-arrow-down fa-2xl block lg-hidden" role="img"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path fill="currentColor"
                d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
              </path>
            </svg>
          </div>
          <a className="flex-none" href="/swap">
            <button type="button"
              className="rounded bg-black px-4 py-15 text-xl text-white ring-2 ring-white-a25 transition-all hover-bg-buy hover-ring-white">Get
              Started</button>
          </a>
        </div>
        <div className="my-6 flex flex-col space-y-6 px-6 lg-px-0">
          <div
            className="flex flex-col space-y-4 text-sm text-white hover-text-white lg-flex-row lg-space-y-0 lg-space-x-8">
            <a href="/home">Home</a>
            <a href="/swap">Swap</a>
            <a href="/liquidity">Liquidity</a>
            {/* <a href="/farming">Farming</a>
            <a href="/staking">Staking</a>
            <a href="/simulator">Simulator</a>
            <a href="/jobs">Jobs</a> */}
            {/* <a href="#"
              target="_blank">Whitepaper</a>
            <a href="#" target="_blank">Documentation</a>
            <a href="#">Terms of service</a>
            <a href="#">Privacy policy</a> */}
          </div>
          <div className="flex flex-col items-center justify-between space-y-4 lg-flex-row lg-space-y-0">
            <div className="text-sm text-white-a5">All rights reserved © 2023 MORODEX</div>
            <div className="flex items-center space-x-3">
              <a href="https://twitter.com/morodex11" target="_blank"
                rel="noreferrer"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter"
                  className="svg-inline--fa fa-twitter fa-lg text-white-a5 hover-text-white" role="img"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z">
                  </path>
                </svg>
              </a>
              <a href="https://t.me/morodex2" target="_blank" rel="noreferrer">
                <svg aria-hidden="true"
                  focusable="false" data-prefix="fab" data-icon="telegram"
                  className="svg-inline--fa fa-telegram fa-lg text-white-a5 hover-text-white" role="img"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                  <path fill="currentColor"
                    d="M248 8C111 8 0 119 0 256S111 504 248 504 496 392.1 496 256 384.1 8 248 8zM362.1 176.7c-3.732 39.22-19.88 134.4-28.1 178.3-3.476 18.58-10.32 24.82-16.95 25.42-14.4 1.326-25.34-9.517-39.29-18.66-21.83-14.31-34.16-23.22-55.35-37.18-24.49-16.14-8.612-25 5.342-39.5 3.652-3.793 67.11-61.51 68.33-66.75 .153-.655 .3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283 .746-104.6 69.14-14.85 10.19-26.89 9.934c-8.855-.191-25.89-5.006-38.55-9.123-15.53-5.048-27.88-7.717-26.8-16.29q.84-6.7 18.45-13.7 108.4-47.25 144.6-62.3c68.87-28.65 83.18-33.62 92.51-33.79 2.052-.034 6.639 .474 9.61 2.885a10.45 10.45 0 0 1 3.53 6.716A43.76 43.76 0 0 1 362.1 176.7z">
                  </path>
                </svg>
              </a>
              {/* <a href="https://t.me/morodex2" target="_blank" rel="noreferrer">
                <svg
                  aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-group"
                  className="svg-inline--fa fa-user-group fa-lg text-white-a5 hover-text-white" role="img"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path fill="currentColor"
                    d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z">
                  </path>
                </svg>
              </a> */}
              {/* <a href="https://github.com/SmarDex-Dev/smart-contracts" target="_blank" rel="noreferrer">
                <svg
                  aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github"
                  className="svg-inline--fa fa-github fa-lg text-white-a5 hover-text-white" role="img"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                  <path fill="currentColor"
                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z">
                  </path>
                </svg>
              </a> */}
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: "fixed", zIndex: "9999", inset: "16px", pointerEvents: "none" }}></div>
    </>
  )
}

export default Home