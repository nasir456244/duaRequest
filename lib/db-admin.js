import { compareDesc, compareAsc, parseISO } from 'date-fns';

import { auth, db } from './firebaseConfig-admin'


export const getMyPrayers = async (uid) => {
    const snapshot = await db.collection('Prayers').where('uid', '==', uid).get()

    const myPrayers = [];


    snapshot.forEach((doc) => {
        myPrayers.push({id: doc.id, ...doc.data()});
    })

    myPrayers.sort((a,b) =>
        compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    );

    return { myPrayers }
}