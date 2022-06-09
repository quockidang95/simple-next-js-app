import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import axiosClient from '@/api/axios-client'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher: (url) => axiosClient, shouldRetryOnError: false}}>
      <Component {...pageProps} />
    </SWRConfig>
  )
  
  
}

export default MyApp
