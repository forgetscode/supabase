import { AuthSession } from '@supabase/supabase-js'
import Router from 'next/router'
import { useState, useEffect } from 'react'
import { useProfile } from '../utils/hooks/useProfile'
import { supabase } from '../utils/supabaseClient'
import { EditAvatar } from './EditAvatar'
import { Blob } from './Blob'
const Fade = require("react-reveal/Fade")

export interface Props {
  session: AuthSession
}

export function ProfileForm({ session }: Props) {
  const [updating, setUpdating] = useState(false)
  const [username, setUsername] = useState<string>('')
  const [website, setWebsite] = useState<string>('')
  const [avatar_url, setAvatarUrl] = useState<string>('')
  const { loading, error, profile } = useProfile(session)

  useEffect(() => {
    if (profile) {
      setUsername(profile.username)
      setWebsite(profile.website)
      setAvatarUrl(profile.avatarUrl)
    }
  }, [profile])

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string
    website: string
    avatar_url: string
  }) {
    try {
      setUpdating(true)
      const user = supabase.auth.user()!

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        console.log(error)
        throw error
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return <p>Loading…</p>
  }

  if (error) {
    return <p>An error occured when fetching your profile information.</p>
  }

  return (
    <Fade>
      <div className='flex h-full w-full justify-center items-center'>
      <div className='w-[540px] bg-gray-900 relative flex flex-col space-y-8 p-12 rounded-lg px-16 border border-teal-400 shadow-lg shadow-teal-600'>
          <Blob/>
          <p className="text-3xl font-black text-white">Profile</p>
          <form className="flex flex-col space-y-8">
            <div className="form-group">
              <div className="pb-8">
                <EditAvatar url={avatar_url} onUpload={(url) => setAvatarUrl(url)} />
              </div>
              <label className="label text-white" htmlFor="email">
                Email
              </label>
              <input
                className="input"
                id="email"
                type="text"
                value={session.user!.email}
                disabled
              />
            </div>
            <div className="form-group">
              <label className="label text-white" htmlFor="username">
                Name
              </label>
              <input
                className="input"
                disabled={updating}
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="label text-white" htmlFor="website">
                Website
              </label>
              <input
                className="input"
                disabled={updating}
                id="website"
                type="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <div>
              <button
                className="btn"
                onClick={() => updateProfile({ username, website, avatar_url })}
                disabled={updating}
              >
                {updating ? 'Updating…' : 'Update'}
              </button>
            </div>
              <button
                className="btn"
                onClick={() => {
                  supabase.auth.signOut()
                  Router.push('/')
                }}
              >
                Sign out
              </button>
          </form>
        </div>
      </div>
    </Fade>
  )
}
