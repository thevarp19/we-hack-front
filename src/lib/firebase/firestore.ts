import { DocumentData, doc, getDoc, getFirestore } from "firebase/firestore";
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
