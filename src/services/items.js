// I will create all the functions that I need to create, read ,update ,and delete from firestore.

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../firestore";

// Read
export const getAllItems = async () => {
  const collectionRef = collection(db, "items");
  const querySnapshot = await getDocs(collectionRef);
  const data = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  return data;
};

// Read
export const getItemById = async (id) => {
  const docRef = doc(db, "items", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("Item was not found");
  }
  return { ...docSnap.data(), id: docSnap.id };
};

// Create
export const addItem = async (data) => {
  const { title, yearReleased, amountWatched } = data;
  const item = { title, yearReleased, amountWatched };

  const collectionRef = collection(db, "items");

  const newDoc = await addDoc(collectionRef, item);
  console.log(newDoc);
  return newDoc;
};

// Delete
export const deleteItem = async (id) => {
  await deleteDoc(doc(db, "items", id));
};

// Update amount watched

export const updateItemAmount = async (id) => {
  const docRef = doc(db, "items", id);

  await updateDoc(docRef, {
    amountWatched: increment(1),
  });
};

// Update favourited

export const updateItemFavourite = async (id, status) => {
  const docRef = doc(db, "items", id);

  await updateDoc(docRef, {
    favourited: !status,
  });
};

// Update

export const updateItem = async (id, data) => {
  const docRef = doc(db, "items", id);

  await updateDoc(docRef, data);
};
