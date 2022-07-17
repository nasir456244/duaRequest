import '../styles/globals.css'
import React, { useEffect } from 'react'
import { MoralisProvider } from 'react-moralis'
import { PrayerRequestProvider } from '../context/PrayerRequest'
import Script from 'next/script'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps, session }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });`,
            }}
          />
          <MoralisProvider 
            serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL} 
            appId={process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID}
          >
            <SessionProvider session={session} >
              <PrayerRequestProvider>
                <Component {...pageProps} />
              </PrayerRequestProvider>
            </SessionProvider>
          
          </MoralisProvider>
         
    </>
  )
}

export default MyApp