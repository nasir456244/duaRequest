import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import toast from "react-hot-toast";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import { createUser } from '@/lib/db'
export const PrayerRequestContext = createContext()

export const PrayerRequestProvider = ({ children }) => {
  const router = useRouter()
  const auth = getAuth()
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
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
    const loading = toast.loading('authenticating', {
      style: { background: "#04111d", color: "#fff" },
    });
    signInWithPopup(auth, googleProvider)
      .then(response => {
        toast.dismiss(loading)
        handleUser(response.user)
        toast.success('success', {
          style: { background: "#04111d", color: "#fff" },
        })        
        router.push('/dashboard')
      })
      .catch(error => {
        toast.dismiss(loading)
        toast.error(error.message, {
          style: { background: "#04111d", color: "#fff" },
        });
      })
  }

  const SignInWithFacebook = () => {
    if(user) return;
    const loading = toast.loading('authenticating', {
      style: { background: "#04111d", color: "#fff" },
    });
    signInWithPopup(auth, facebookProvider)
      .then(response => {
        toast.dismiss(loading)
        handleUser(response.user)
        toast.success('success', {
          style: { background: "#04111d", color: "#fff" },
        })
        router.push('/dashboard')
      })
      .catch(error => {
        toast.dismiss(loading)
        toast.error(error.message, {
          style: { background: "#04111d", color: "#fff" },
        });
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
    return () => unsubscribe();
  }, [])

  return (
    <PrayerRequestContext.Provider
      value={{
        user,
        SignInWithGoogle,
        SignInWithFacebook,
        logout
      }}
    >
      {children}
    </PrayerRequestContext.Provider>
  )
}
