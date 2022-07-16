import React, { useEffect } from 'react'
import { useMoralis } from 'react-moralis'
import toast, { Toaster } from 'react-hot-toast'


const styles = {
  connectButton: `w-fit text-white text-lg bg-[#6810f5f2] shadow-2xl p-4 rounded-2xl hover:bg-[#fff821f2] hover:text-[#000]`,
}


const Authenticate = () => {
  const { isAuthenticated, authenticate } = useMoralis()
  
  const connect = async () => {
    if (!isAuthenticated) {
      if (typeof screen.orientation === 'undefined') {      
        await authenticate({ 
          provider: "walletconnect", 
          signingMessage: "Moralis metamask phone connect",
          mobileLinks: [
            "rainbow",
            "metamask",
            "argent",
            "trust",
            "imtoken",
            "pillar",
            ] 
          }).then(function (user) {
            user !== undefined && toast.success('Authenticated!',{style: {background: '#04111d',color: '#fff',},})
          })
          .catch(function (error) {
            console.log(error);
          });
        }
        else {
          await authenticate()
          .then( (user) => {
            user !== undefined && toast.success('Authenticated!',{style: {background: '#04111d',color: '#fff',},}) 
          })
          .catch(function (error) {
           console.log(error)
          });
        }
      }      
    }
    

  return (
      
      <button className={styles.connectButton} onClick={connect}>Connect Wallet</button>   
  )
}

export default Authenticate