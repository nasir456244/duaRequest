import '../styles/globals.css'
import React, { useEffect } from 'react'
import { PrayerRequestProvider } from '../context/PrayerRequest'
import Script from 'next/script'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'
import { DefaultSeo } from 'next-seo'
import SEO from 'next-seo.config'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast'


function MyApp({ Component, pageProps }) {
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


  const queryClient = new QueryClient({
    defaultOptions:{
      queries:{
        retry: false,
      }
    }
  });

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
      <QueryClientProvider client={queryClient}>
        <PrayerRequestProvider>
            <DefaultSeo {...SEO} />
            <Toaster position="bottom-center" reverseOrder={false} />
            <Component {...pageProps} />
        </PrayerRequestProvider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp