import { db } from "@/lib/firebaseConfig";
import {
  collection,
  orderBy,
  limit,
  query,
  startAfter,
  getDocs,
} from "firebase/firestore";

export const getComments = async (id, lastKey, pageSize, user) => {
  if (!user) return;

  let q = query(
    collection(db, "Prayers", id, 'comments'),
    orderBy("createdAt", "desc"),
    limit(pageSize)
  );

  if (lastKey) {
    q = query(
      collection(db, "Prayers", id, 'comments'),
      orderBy("createdAt", "desc"),
      startAfter(lastKey),
      limit(pageSize)
    );
  }

  try {
    const data = await getDocs(query(q));
    return data;
  } catch (error) {
    throw error;
  }
};

