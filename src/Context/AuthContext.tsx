import { createContext, useState, useEffect, useContext } from 'react'
//will be accessed anytime a user logs in or out. This function will then run on this change (onAuthstate)
//User creates a user interface
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../lib/firebase/firebase'

const AuthContext = createContext ({
    user:null,
    setUser:(user:User) => {},
});

export const AuthProvider = ({children}: {children:React.ReactNode}) => {
    const [user,setUser] = useState<User | null>(null);
    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user) {
                setUser(user);
            } else{
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);

export default AuthContext; 


