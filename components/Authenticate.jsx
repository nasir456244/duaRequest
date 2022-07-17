import React, { useEffect } from 'react'
import { useMoralis } from 'react-moralis'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'



const styles = {
  connectButton: `text-white bg-[#6810f5f2] p-4 rounded-2xl hover:bg-[#fff821f2] hover:text-[#000] w-full h-[45px] hover:shadow-2xl font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-between items-center `,
}


const Authenticate = () => {
  const { isAuthenticated, authenticate } = useMoralis()
  const router = useRouter()
  
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
            router.replace('/')
          })
          .catch(function (error) {
            console.log(error);
          });
        }
        else {
          await authenticate()
          .then( (user) => {
            user !== undefined && toast.success('Authenticated!',{style: {background: '#04111d',color: '#fff',},})
            router.replace('/') 
          })
          .catch(function (error) {
           console.log(error)
          });
        }
      }      
    }
    

  return (
     
      <button onClick={connect} className={styles.connectButton} type="button">
        <img className='h-[30px] w-[30px] mr-1' src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png' alt='metamask logo' />
        <p>
          <b>
             Connect with MetaMask
          </b>
        </p>
      </button>
 
  )
}

export default Authenticate