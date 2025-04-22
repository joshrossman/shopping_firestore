import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase/firebase'
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { User } from '@auth0/auth0-react';


const DisplayData = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [newAge, setNewAge ] = useState<string>('');
    const [newName, setNewName] = useState<string>('');

    const updateUser = async (userId, updatedData) => {
        const userDoc = doc(db, ' users', userId);
        await updateDoc(userDoc, updatedData);
    };

    const deleteUser = async (userId)=> {
        await deleteDoc(doc(db,'users',userId))
    }

    useEffect(() => {
        const fetchData = async() => {
            const querySnapshot = await getDocs(collection(db,'users'));
            const dataArray = 
            querySnapshot.docs.map((doc) => ({
                id:doc.id,
                ...doc.data(),
            })) as User[];
            setUsers(dataArray);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2> User List</h2>
            {users.map((user) => (
                <div
                key={user.id}>
                    <div 
                    key={user.id}>
                        <p>Name: {user.name}</p>
                        <p>Age: {user.age}</p>
                        <p>Email: {user.email}</p>
                        <p>Password: {user.password}</p>
                        <p>Address: {user.address}</p>
                        
                    </div>
                    <input
                    onChange={(e)=>setNewName(e.target.value)}
                    type='string'
                    placeholder='Enter New Name:'
                    />
                    <button onClick={()=>updateUser(user.id,{name:newName})}>
                        Update Name
                    </button>
                    <input
                    onChange={(e)=>setNewAge(e.target.value)}
                        type='number'
                        placeholder="Enter New Age:"></input>
                    <button
                    onClick={()=>updateUser(user.id,{age:newAge})}>Update Age</button>
                    <button onClick={()=>deleteUser(user.id)}>Delete User</button>
                </div>
            ))}
        </div>
    )
}
export default DisplayData