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
  setDoc,
} from "firebase/firestore";
import { db } from "../firestore";

// Read
export const getAllCartItems = async () => {
  const collectionRef = collection(db, "cart");
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
export const getCartItemById = async (id) => {
  const docRef = doc(db, "cart", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("Item was not found");
  }
  return { ...docSnap.data(), id: docSnap.id };
};

// Read
export const getCartItemByName = async (name) => {
  const docRef = doc(db, "cart", name);
  const docSnap = await getDoc(docRef);

  return { ...docSnap.data() };
};

// Create
export const addItemToCart = async (data, id) => {
  const { name, quantityToPurchase, price_per_unit, img, quantity, item_id } =
    data;
  const item = {
    name,
    quantityToPurchase,
    price_per_unit,
    img,
    quantity,
    item_id,
  };

  const collectionRef = doc(db, "cart", id);
  const newDoc = await setDoc(collectionRef, item);
  console.log(newDoc);
  return newDoc;
};

// Delete
export const deleteCartItem = async (id) => {
  await deleteDoc(doc(db, "cart", id));
};

// Update quantityToPurchase by 1

export const increaseCartItemQuantity = async (name) => {
  const docRef = doc(db, "cart", name);

  await updateDoc(docRef, {
    quantityToPurchase: increment(1),
  });
};

// Update quantityToPurchase by 1

export const decreaseCartItemQuantity = async (name) => {
  const docRef = doc(db, "cart", name);

  await updateDoc(docRef, {
    quantityToPurchase: increment(-1),
  });
};

// Update

export const updateCartItem = async (id, data) => {
  const docRef = doc(db, "cart", id);

  await updateDoc(docRef, data);
};
