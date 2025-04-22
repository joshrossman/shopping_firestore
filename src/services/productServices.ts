import { Product } from '../types/type'
import { db } from '../lib/firebase/firebase'
import {collection, getDocs, query, where} from 'firebase/firestore'
//libraries need curly braces because it exports more than one thing, but a component with an export default doesn't need


export const getAllProducts = async():Promise<Product[]> =>{
    //snapshot of all of the docs in firebase
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data()
    }))as Product[];

}



;


