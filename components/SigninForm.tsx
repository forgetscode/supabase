import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import { Blob } from './Blob'
const Fade = require("react-reveal/Fade")

export function SigninForm() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  const handleLogin = async (email: string) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      setEmailSent(true)
    } catch (error: any) {
      console.error(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Fade>
      <div className='flex flex-col h-full w-full justify-center items-center'>
        <div className='w-full flex flex-col items-center -mt-20 py-12 pb-16 space-y-4'>
          <img className="h-48 w-48 " src="https://raw.githubusercontent.com/praveenpuglia/tailwind-breeze/master/assets/logo.svg" alt="My Image"/>
          <p className='text-5xl font-black text-white p-6 shadow shadow-white rounded-xl'>Website</p>
        </div>
        <div className='w-[540px] bg-gray-900 relative flex flex-col space-y-8 p-12 rounded-lg px-16 border border-teal-400 shadow-lg shadow-teal-600'>
          <Blob />
          <p className="text-3xl font-black text-white">Sign in to your account</p>
          {emailSent ? (
            <div className="text-white">
              <p>An e-mail has been sent to your e-mail address.</p>
              <p>Please click the link in this mail to sign in.</p>
              <p>
                <button className="text-white w-full bg-teal-500 p-3 mt-8 rounded" onClick={() => setEmailSent(false)}>
                  Retry
                </button>
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleLogin(email)
              }}
              className="flex flex-col"
            >
              <div className="form-group">
                <label className="label text-white" htmlFor="email">
                  E-mail
                </label>
                <div>
                  <input
                    id="email"
                    className="input "
                    type="email"
                    placeholder="Your email"
                    value={email}
                    required
                    disabled={loading}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button type="submit" className="text-white w-full mt-6 bg-teal-500 p-3 rounded" disabled={loading}>
                  <span>{loading ? 'Processing…' : 'Send magic link'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Fade>
  )
}
