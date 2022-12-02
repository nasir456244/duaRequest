import { db } from "@/lib/firebaseConfig";
import {
  collection,
  orderBy,
  limit,
  query,
  startAfter,
  getDocs,
} from "firebase/firestore";

export const getPrayers = async (lastKey, pageSize, user) => {
  if (!user) return;

  let q = query(
    collection(db, "Prayers"),
    orderBy("createdAt", "desc"),
    limit(pageSize)
  );

  if (lastKey) {
    q = query(
      collection(db, "Prayers"),
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

// export const totalClientsFn = async () => {
//   const q = query(collection(db, "Collections"));
//   try {
//     const data = await getDocs(query(q));
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };
