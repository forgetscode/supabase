import Head from 'next/head';
import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import { ProfileForm } from '../components/ProfileForm'
import { useSession } from '../utils/hooks/useSession'

export default function ProfilePage() {
  const session = useSession()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, []);

  if (!session) return null
  
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
    <ProfileForm session={session} />
    </>
  )
}
