import { db, app } from '../lib/firebaseConfig'
import { collection, addDoc, onSnapshot } from 'firebase/firestore'
import getStripe from "./stripe";
import { getAuth  } from 'firebase/auth'
import { getFunctions, httpsCallable } from "firebase/functions";

export async function createCheckoutSession(uid) {
    const auth = getAuth()



    const checkoutSessionRef = await addDoc(collection(db, 'users', auth.currentUser.uid, 'checkout_sessions'),{
        price: `${process.env.NEXT_PUBLIC_PRICE_ID}`,
        success_url: `${window.location.origin}/dashboard`,
        cancel_url: `${window.location.origin}/dashboard`,
    })
    onSnapshot(checkoutSessionRef, async (snap) => {
        const { sessionId } = snap.data()

        if(sessionId) {
            console.log(sessionId, 'sessionid')
            const stripe = await getStripe()

            stripe.redirectToCheckout({ sessionId })
        }
    })
}


export async function goToBillingPortal() {


  // after initializing Firebase
  const functions = getFunctions(app, 'australia-southeast1');
  
  const functionRef = httpsCallable(functions, 'ext-firestore-stripe-payments-createPortalLink');
  
  const { data } = await functionRef({
    returnUrl: `${window.location.origin}/dashboard`,
  });

  window.location.assign(data?.url)

}

