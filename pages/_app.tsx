import { AppProps } from 'next/app'
import { Layout } from '../components/Layout'
import '../styles/globals.css'
import { useSession } from '../utils/hooks/useSession'

function MyApp({ Component, pageProps }: AppProps) {
  const session = useSession()

  return (
    <Layout session={session}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
