import {
  collection,
  setDoc,
  doc,
  addDoc,
  deleteDoc
} from 'firebase/firestore'
import { db } from './firebaseConfig'

export const createUser = (uid, data) => {
  setDoc(
    doc(db, 'users', uid),
    {
      uid,
      ...data
    },
    { merge: true }
  )
}

export const createPrayer = async newPrayer => {
  try {

    const doc =  await addDoc(collection(db, 'Prayers'), {
      ...newPrayer
    });
    return {
      id: doc.id,
      ...newPrayer
    }

  }
  catch (error) {
    return {
      success: false,
      error: error
    }
  }

};

export const likePrayer = async (id, uid) => {
  await setDoc(doc(db, 'Prayers', id, 'likes', uid), {
    uid
  })
}

export const DeletePrayer = async (prayertoDelete) => {
  return await deleteDoc(doc(db, 'Prayers', prayertoDelete))
}
export const addComment = async ({CommentId, newComment}) => {
  try {
    const doc = await addDoc(collection(db, 'Prayers', CommentId, 'comments'), {
      ...newComment
    })

    return {
      id: doc.id,
      ...newComment
    }
  }

    catch (error) {
      return {
        success: false,
        error: error

      }
    }

  
}

