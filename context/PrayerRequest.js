import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import { createUser } from '@/lib/db'
export const PrayerRequestContext = createContext()

export const PrayerRequestProvider = ({ children }) => {
  const router = useRouter()
  const auth = getAuth()
  const googleProvider = new GoogleAuthProvider()
  const [user, setUser] = useState(null)

  const handleUser = async rawUser => {
    if (rawUser) {
      const user = await formatUser(rawUser)
      const { token, stripeRole, ...userWithoutToken } = user
      createUser(user?.uid, userWithoutToken)
      setUser(user)
      return user
    } else {
      setUser(false)
      return false
    }
  }

  const SignInWithGoogle = () => {
    if(user) return
    signInWithPopup(auth, googleProvider)
      .then(response => {
        handleUser(response.user)
        router.push('/')
      })
      .catch(error => {
        console.error(error)
      })
  }

  const logout = () => {
    if(!user) return
    signOut(auth).then(() => {
      router.push('/login')
      handleUser(false)
    })
  }

  const getStripeRole = async () => {
    await auth?.currentUser?.getIdToken(true)
    const decodedToken = await auth?.currentUser?.getIdTokenResult()

    return decodedToken?.claims?.stripeRole || 'free';
  }

  const formatUser = async user => {
    const token = await user?.getIdToken()
    return {
      uid: user?.uid,
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
      token,
      stripeRole: await getStripeRole()
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(handleUser)

    return () => unsubscribe()
  }, [])

  return (
    <PrayerRequestContext.Provider
      value={{
        user,
        SignInWithGoogle,
        logout
      }}
    >
      {children}
    </PrayerRequestContext.Provider>
  )
}
