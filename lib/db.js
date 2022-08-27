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
  await addDoc(collection(db, 'Prayers'), {
    ...newPrayer
  })
}

export const likePrayer = async (id, uid) => {
  await setDoc(doc(db, 'Prayers', id, 'likes', uid), {
    uid
  })
}

export const DeletePrayer = async prayertoDelete => {
  await deleteDoc(doc(db, 'Prayers', prayertoDelete))
}
export const addComment = async (id, newComment) => {
  await addDoc(collection(db, 'Prayers', id, 'comments'), {
    ...newComment
  })
}

export const DeleteComment = async (PrayerId, commentToDelete) => {
  await deleteDoc(doc(db, 'Prayers', PrayerId, 'comments', commentToDelete))
}


export const likeComment = async (PrayerId, id, uid) => {
  await setDoc(doc(db, 'Prayers', PrayerId, 'comments', id, 'likes', uid), {
    uid
  })
}

export const removeLike = async (PrayerId, id, uid) => {
  await deleteDoc(doc(db, 'Prayers', PrayerId, 'comments', id, 'likes', uid))
}

export const dislikeComment = async (PrayerId, id, uid) => {
  await setDoc(doc(db, 'Prayers', PrayerId, 'comments', id, 'dislikes', uid), {
    uid
  })
}

export const removeDisLike = async (PrayerId, id, uid) => {
  await deleteDoc(doc(db, 'Prayers', PrayerId, 'comments', id, 'dislikes', uid))
}