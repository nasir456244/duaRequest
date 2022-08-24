import {
  collection,
  setDoc,
  doc,
  addDoc,
  updateDoc,
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

export const createTimeOutDoc = async (uid, timeOutDoc) => {
  await setDoc(doc(db, 'TimeOut', 'TimeOutUsers', 'users', uid), {
    ...timeOutDoc
  })
}

export const UpdateTimeOutDoc = async (uid, updatetimeoutdoc) => {
  await updateDoc(doc(db, 'TimeOut', 'TimeOutUsers', 'users', uid), {
    ...updatetimeoutdoc
  })
}

export const likePrayer = async (id, uid) => {
  await setDoc(doc(db, 'Prayers', id, 'likes', uid), {
    uid
  })
}

export const addComment = async (id, newComment) => {
  await addDoc(collection(db, 'Prayers', id, 'comments'), {
    ...newComment
  })
}

export const DeleteComment = async (PrayerId, commentToDelete) => {
  await deleteDoc(doc(db, 'Prayers', PrayerId, 'comments', commentToDelete))
}

export const DeletePrayer = async prayertoDelete => {
  await deleteDoc(doc(db, 'Prayers', prayertoDelete))
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