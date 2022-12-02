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
      const { token, ...userWithoutToken } = user
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
        handleUser(response.user)
        toast.success('success', {
          style: { background: "#04111d", color: "#fff" },
        })        
        router.push('/community')
      })
      .catch(error => {
        toast.error(error.message, {
          style: { background: "#04111d", color: "#fff" },
        });
      })
      .finally(() => {
        toast.dismiss(loading)
      })
  }

  const SignInWithFacebook = () => {
    if(user) return;
    const loading = toast.loading('authenticating', {
      style: { background: "#04111d", color: "#fff" },
    });
    signInWithPopup(auth, facebookProvider)
      .then(response => {
        handleUser(response.user)
        toast.success('success', {
          style: { background: "#04111d", color: "#fff" },
        })
        router.push('/dashboard')
      })
      .catch(error => {
        toast.error(error.message, {
          style: { background: "#04111d", color: "#fff" },
        });
      })
      .finally(() => {
        toast.dismiss(loading)  
      })
  }

  const logout = async () => {
    if(!user) return
    await signOut(auth)
    handleUser(false)
    router.push('/login')
  }


  const formatUser = async user => {
    const token = await user?.getIdToken()
    return {
      uid: user?.uid,
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
      token,
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
