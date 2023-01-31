import { CssBaseline } from '@mui/material'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline/>
      <Component {...pageProps} />
    </>
  )
}
