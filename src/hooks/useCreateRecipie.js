import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const useCreateRecipie = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const addNewDoc = async (newDoc) => {
    try {
      const docRef = await addDoc(collection(db, "recipies"), newDoc);
      setData({ id: docRef.id, ...newDoc });
    } catch (e) {
      setError(e);
    }
  };

  return { data, error, addNewDoc };
};
