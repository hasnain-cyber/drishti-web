import type { AppProps } from 'next/app';
import '../global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from '@/components/NavbarComponent/NavbarComponent';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavbarComponent/>
      <Component {...pageProps} />
    </>
  )
}
