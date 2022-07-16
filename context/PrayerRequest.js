import { createContext, useState, useEffect } from 'react'
import { useMoralis } from 'react-moralis'

export const PrayerRequestContext = createContext()

export const PrayerRequestProvider = ( { children } ) => {
    const { isAuthenticated, enableWeb3, user, isWeb3Enabled } = useMoralis()
    const [formattedAddress, setFormattedAddrress] = useState('')
    const [userAddress, setUserAddress] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
  
  

    useEffect( () => {
      ;(async() => {
        if(!isWeb3Enabled) {
          await enableWeb3()
        }
        if(isAuthenticated) {
          const address = user?.get("ethAddress")
          setUserAddress(address)
          const formatAddress = address.slice(0, 5) + '...' + address.slice(-5)
          setFormattedAddrress(formatAddress)
        } else {
          setUserAddress('')
          setFormattedAddrress('')
        }
      })()
    },[isWeb3Enabled, isAuthenticated, user,])



 
   
     

    


        
    return (
        <PrayerRequestContext.Provider
            value={{
              userAddress,
              formattedAddress,
              modalOpen,
              setModalOpen,
              
              
                             
                              
            }}>

                {children}
             
            </PrayerRequestContext.Provider>
    )


}