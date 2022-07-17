import { createContext, useState } from 'react'

export const PrayerRequestContext = createContext()

export const PrayerRequestProvider = ( { children } ) => {
    const [modalOpen, setModalOpen] = useState(false)
  
  




 
   
     

    


        
    return (
        <PrayerRequestContext.Provider
            value={{
              modalOpen,
              setModalOpen,
              
              
              
                             
                              
            }}>

                {children}
             
            </PrayerRequestContext.Provider>
    )


}