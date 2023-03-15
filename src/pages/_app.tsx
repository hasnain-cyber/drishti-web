import type { AppProps } from 'next/app';
import '../global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from '@/components/NavbarComponent/NavbarComponent';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NavbarComponent/>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
