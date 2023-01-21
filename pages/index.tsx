import Head from 'next/head'
import  Router  from 'next/router'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { SigninForm } from '../components/SigninForm'
import { useSession } from '../utils/hooks/useSession'

export default function Home() {
  const session = useSession()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, []);
  
  useEffect(() => {
    if (session) {
      Router.push('/profile')
    }
  })

  if (loading) {
      return (
        <Loading/>
      );
  }

  return (
    <>
      <Head>
        <title>SupaBase</title>
        <link rel='icon' href="https://raw.githubusercontent.com/praveenpuglia/tailwind-breeze/master/assets/logo.svg" />
      </Head>
      <SigninForm />
    </>
  )
}
