import { collection, setDoc, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const createUser = (uid, data) => {
    setDoc(doc(db, 'Users', uid), {
        uid,
        ...data},
        {merge: true
    })

}


export const createPrayer = async (newPrayer) => {
    await addDoc(collection(db, 'Prayers'), {
        ...newPrayer
    });
}

export const createTimeOutDoc = async (uid, timeOutDoc) => {
    await setDoc(doc(db, "TimeOut", "TimeOutUsers", "users", uid), {
         ...timeOutDoc
    });
}

export const UpdateTimeOutDoc = async (uid, updatetimeoutdoc) => {
    await updateDoc(doc(db, "TimeOut", "TimeOutUsers", "users", uid), {
         ...updatetimeoutdoc
    });
}

export const likePrayer = async (id, uid) => {
    await setDoc(doc(db, "Prayers", id, "likes", uid),{
        uid
    });
}

export const dislikePrayer = async (id, uid) => {
    await deleteDoc(doc(db, "Prayers", id, "likes", uid));

}

export const addComment = async (id, newComment) => {
    await addDoc(collection(db, "Prayers", id, "comments"), {
        ...newComment
    });
}

export const DeleteComment = async (queryId, commentToDelete) => {
    await deleteDoc(doc(db,'Prayers', queryId, 'comments', commentToDelete))
}

export const DeletePrayer = async (prayertoDelete) => {
    await deleteDoc(doc(db, 'Prayers', prayertoDelete))
}