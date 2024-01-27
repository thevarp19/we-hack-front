import {
    DocumentData,
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
} from "firebase/firestore";
import firebaseApp from ".";

const firestoreDb = getFirestore(firebaseApp);

export const getItemById = async (
    path: string,
    id: string
): Promise<DocumentData | null> => {
    const docRef = doc(firestoreDb, path, id);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        return data;
    }
    return null;
};

export const getAllItems = async (path: string): Promise<DocumentData[]> => {
    const collectionRef = collection(firestoreDb, path);
    const querySnapshot = await getDocs(collectionRef);
    const items: DocumentData[] = [];

    querySnapshot.forEach((doc) => {
        if (doc.exists()) {
            const data = doc.data();
            items.push(data);
        }
    });

    return items;
};

export const saveItem = async (
    path: string,
    newItem: DocumentData
): Promise<string | null> => {
    const collectionRef = collection(firestoreDb, path);

    try {
        const docRef = await addDoc(collectionRef, newItem);
        return docRef.id;
    } catch (error) {
        console.error("Error adding document: ", error);
        return null;
    }
};
