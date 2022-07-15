import { createContext, useState, useEffect, useRef } from 'react'
import { useMoralis, useMoralisQuery } from 'react-moralis'
import { requestPrayerCoinAddress, requestPrayerAbi } from '../lib/constants'
import { ethers } from 'ethers'
import toast, { Toaster } from 'react-hot-toast'

export const PrayerRequestContext = createContext()

export const PrayerRequestProvider = ( { children } ) => {
    const { isAuthenticated, enableWeb3, user, isWeb3Enabled,Moralis } = useMoralis()
    const [formattedAddress, setFormattedAddrress] = useState('')
    const [userAddress, setUserAddress] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [balance, setBalance] = useState('')
    const [isBuyModalLoading, setIsBuyModalLoading] = useState(false)
    const [ethersScanlink, setEthersScanLink] = useState('')
    const [tokenAmount, setTokenAmount] = useState('')
  

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


    //get balance
    const getBalance = async () => {
      try {
        if(!isAuthenticated || !userAddress ) return
        const web3 =  Moralis.web3;
        const options = {
          contractAddress: requestPrayerCoinAddress,
          functionName: 'balanceOf',
          abi: requestPrayerAbi,
          params: {
            account: userAddress
          },
        }
        const response = await Moralis.executeFunction(options)
        setBalance(response.toString())
        
      } catch(error) {
        console.log(error)
      }
  }

    useEffect( () => {
      if(isAuthenticated) {
        getBalance()
      }
    },[getBalance, userAddress, isAuthenticated])

 
    // buy RPC tokens
    const buyTokens = async () => {
      try {    
        if(!isAuthenticated) return  
        const web3 = Moralis.web3;           
        const amount = ethers.BigNumber.from(tokenAmount)
        const price = ethers.BigNumber.from('100000000000000')
        const calPrice = amount.mul(price)
        const options = {
          contractAddress: requestPrayerCoinAddress,
          functionName: 'mint',
          abi: requestPrayerAbi,
          msgValue: calPrice,
          params: {
          amount,
          }  
        }
        const transaction = await Moralis.executeFunction(options)
        const receipt = await transaction.wait()
        setIsBuyModalLoading(false)
        console.log(receipt)
        toast.success('Transaction sucessfull!',{style: {background: '#04111d',color: '#fff',},}) 
        setEthersScanLink(`https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`)
        
      } 
      catch(error) {
        console.log(error)
        setIsBuyModalLoading(false)
        toast.error(error.message,{duration: 6000,style: {background: '#04111d',color: '#fff',}})
      }
    
    }
     

    


        
    return (
        <PrayerRequestContext.Provider
            value={{
              userAddress,
              formattedAddress,
              modalOpen,
              setModalOpen,
              balance,
              buyTokens,
              ethersScanlink,
              setEthersScanLink,
              isBuyModalLoading,
              setIsBuyModalLoading,
              tokenAmount, 
              setTokenAmount
                             
                              
            }}>

                {children}
             
            </PrayerRequestContext.Provider>
    )


}