import { createContext, useState } from 'react'
import { useRouter } from 'next/router';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { createUser } from '../lib/db'
export const PrayerRequestContext = createContext()

export const PrayerRequestProvider = ( { children } ) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [deleteDua, setDeleteDua] = useState()
    const router = useRouter()
    const auth = getAuth()
    const googleProvider = new GoogleAuthProvider()
    const [user, setUser] = useState(null)


    const handleUser = (rawUser) => {
        if(rawUser) {
            const user = formatUser(rawUser)
            const { token, ...userWithoutToken } = user;
            createUser(user?.uid, userWithoutToken)
            setUser(user)
            return user
        } else {
            setUser(false)
            return false
        }
    }

    

    const SignInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
         .then((response) => {
            handleUser(response?.user)
            alert('You logged in')
            sessionStorage.setItem('Token', response?.user?.accessToken)
            router.push('/')
           })
           .catch((error) => {
            console.error(error)
           })
    }

    const formatUser = async (user) => {
        const token = await user?.getIdToken()
        return {
            uid: user?.uid,
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
            token
        }
    }

 
   
     

    


        
    return (
        <PrayerRequestContext.Provider
            value={{
              modalOpen,
              setModalOpen,
              isDeleteModalOpen,
              setIsDeleteModalOpen,
              deleteDua,
              setDeleteDua,
              user,
              SignInWithGoogle,                     
            }}>

                {children}
             
            </PrayerRequestContext.Provider>
    )


}