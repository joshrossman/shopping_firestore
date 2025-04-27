import { createContext, useState, useEffect, useContext } from 'react'
//will be accessed anytime a user logs in or out. This function will then run on this change (onAuthstate)
//User creates a user interface
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../lib/firebase/firebase'
import { db } from '../lib/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';






const AuthContext = createContext ({
    user:null,
    setUser:(_user:any) => {},
    globalUserId:'',
    globalUserName:'',
    
    
});

export const AuthProvider = ({children}: {children:React.ReactNode}) => {
    const [user,setUser] = useState<any>(null);
    const [globalUserId, setId] = useState <string>('')
    const [globalUserName, setName] = useState <string>('')

    useEffect(() => {
        const fetchData = async() => {
            const querySnapshot = await getDocs(collection(db,'users'));
            const dataArray = 
            querySnapshot.docs.map((doc) => ({
                id:doc.id,
                ...doc.data(),
            })) as [];
            if(user)
            {
                const newData:any= dataArray.find((myUser:any)=>myUser.email===user.email)
                if(newData!=undefined)
                {
                    setId(newData.id)
                    setName(newData.displayName)
                  
                }
            }
            else{
                setId('')
            }
    
        };
    
        fetchData();
    }, [user]);


    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user) {
                setUser(user);
            } else{
                setUser(null);
                setId('')
                setName('')
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{user,globalUserId,globalUserName,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);

export default AuthContext; 


