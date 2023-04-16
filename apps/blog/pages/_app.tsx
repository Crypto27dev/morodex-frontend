import '@pancakeswap/ui/css/reset.css'
import { PancakeTheme, ResetCSS, dark, light, ModalProvider, UIKitProvider } from '@pancakeswap/uikit'
import { AppProps } from 'next/app'
import Script from 'next/script'
import { LanguageProvider } from '@pancakeswap/localization'
import { createGlobalStyle } from 'styled-components'
import { ThemeProvider as NextThemeProvider, useTheme as useNextTheme } from 'next-themes'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { SEO } from 'next-seo.config'
import Menu from '../components/Menu'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const StyledThemeProvider: React.FC<React.PropsWithChildren> = (props) => {
  const { resolvedTheme } = useNextTheme()
  return (
    <UIKitProvider theme={resolvedTheme === 'dark' ? dark : light} {...props}>
      {props.children}
    </UIKitProvider>
  )
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  html, body {
    height: 100%;
  }
  #__next {
    display: flex;
    flex-direction: column;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
  .swiper-grid-column .swiper-wrapper {
    flex-direction: unset !important;
  }
`

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#1FC7D4" />
      </Head>
      <DefaultSeo {...SEO} />
      <NextThemeProvider>
        <StyledThemeProvider>
          <LanguageProvider>
            <ModalProvider>
              <ResetCSS />
              <GlobalStyle />
              <Menu />
              <Component {...pageProps} />
            </ModalProvider>
          </LanguageProvider>
        </StyledThemeProvider>
      </NextThemeProvider>
      <Script
        strategy="afterInteractive"
        id="google-tag"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GTAG}');
          `,
        }}
      />
    </>
  )
}

export default MyApp
