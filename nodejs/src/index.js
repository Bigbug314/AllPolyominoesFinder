import { initializeApp } from 'firebase/app';
import {
    getFirestore, getDocs, collection, doc, updateDoc, arrayUnion
} from 'firebase/firestore';

//Firebase initialization
const firebaseConfig = {
    apiKey: "AIzaSyCeRSVkKBriadQiX1osQigKoxgwF9gbhCQ",
    authDomain: "mejcarreville.firebaseapp.com",
    projectId: "mejcarreville",
    storageBucket: "mejcarreville.appspot.com",
    messagingSenderId: "798789905877",
    appId: "1:798789905877:web:a36b373fa792bec9f9a15c"
};
  
initializeApp(firebaseConfig);

const db = getFirestore();




export async function get_document(id) {
    const colRef = collection(db, "AllPolyominoes");
    let data = null;
    await getDocs(colRef).then((snapshot) => {
        snapshot.forEach((doc) => {
            if (doc.id === "area" + id.toString()) {
                data = doc.data();
            }
        });
    });
    return data;
}

export async function add_to_document(id, data) {
    await updateDoc(doc(db, "AllPolyominoes", "area" + id.toString()), {data: arrayUnion(...data)});
}

export async function clear_document(id) {
    await updateDoc(doc(db, "AllPolyominoes", "area" + id.toString()), {data: []});
}

export default {
    get_document: get_document,
    add_to_document: add_to_document,
    clear_document: clear_document
};