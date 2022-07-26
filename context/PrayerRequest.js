import { createContext, useState } from 'react'

export const PrayerRequestContext = createContext()

export const PrayerRequestProvider = ( { children } ) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [deleteDua, setDeleteDua] = useState()
  




 
   
     

    


        
    return (
        <PrayerRequestContext.Provider
            value={{
              modalOpen,
              setModalOpen,
              isDeleteModalOpen,
              setIsDeleteModalOpen,
              deleteDua,
              setDeleteDua
              
              
                             
                              
            }}>

                {children}
             
            </PrayerRequestContext.Provider>
    )


}