import { AuthSession } from '@supabase/supabase-js'
import Head from 'next/head'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

export interface Props {
  session: AuthSession | null
}

export function Layout({ session, children }: PropsWithChildren<Props>) {
  return (
    <>
      <Head>
        <title>SupaBase</title>
      </Head>
      <div className="flex flex-col h-screen bg-black">
        <header className="p-4 flex justify-between items-center bg-zinc-900 h-28 z-20">
          <h1 className='flex flex-row justify-end space-x-4'>
            <img className="h-12 w-12" src="https://raw.githubusercontent.com/praveenpuglia/tailwind-breeze/master/assets/logo.svg" alt="My Image"/>
            <Link href="/">
              <p className=" text-3xl font-black text-white">
                Supabase Vercel Deployment
              </p>
            </Link>
          </h1>
        </header>
        <main className="flex-1 p-6">{children}</main>
        <footer className="bg-zinc-900 text-gray-600 p-4 font-light text-xs h-12 z-20">
          2023 Demo
        </footer>
      </div>
    </>
  )
}
