import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const createUser = (uid, data) => {
    setDoc(doc(db, 'Users', uid), {
        uid,
        ...data},
        {merge: true
    })

}

