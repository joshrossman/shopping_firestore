import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from "../lib/firebase/firebase"
import { useNavigate } from 'react-router-dom'
import styles from '../styles/auth-styles'
import { db} from  '../lib/firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { User } from 'firebase/auth'



const Register = () => {
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('')
    
    const [error, setError] = useState('');
    const [_users, _setUsers] = useState<User[]>([]);
    const [age, setAge ] = useState<string>('');
    const [displayName, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');

    const [_data, _setData] = useState<User>({id:'',email:'',password:'',name:'',age:'',address:''});
  
      
    
    


    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        try{
            //create user with email and password using firebase auth
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            await updateProfile(userCredential.user, {
                displayName: displayName,
            });
            
           
            await addDoc(collection(db,'users'),{email,displayName,age,address});
            alert('Data Added!');
            
            navigate('/profile');
            }catch(error: any){
                setError(error.message)
            }
        }

  return (
    <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            {error && <p style={styles.error}>{error}</p>}
            <fieldset style={styles.fieldset}>
                <legend style={styles.legend}>Register</legend>
                <input  
                    style={styles.input}
                    type='email'
                    placeholder="Email"
                    value={email}
                    onChange={(e)=> {setEmail(e.target.value)}}
            />
            <input
                style={styles.input}
                type='text'
                placeholder='Name'
                value={displayName}
                onChange={(e) => {setName(e.target.value)}}
            />
            <input  
                style={styles.input}
                type='password'
                placeholder="Password"
                value={password}
                onChange={(e)=> {setPassword(e.target.value)}}
            />
            <input  
                style={styles.input}
                type='text'
                placeholder="Address"
                value={address}
                onChange={(e)=> {setAddress(e.target.value)}}
            />
            <input  
                style={styles.input}
                type='text'
                placeholder="Age"
                value={age}
                onChange={(e)=> {setAge(e.target.value)}}
            />
            <button type='submit'>Register</button>

            </fieldset>
        </form>
    </div>
  )
}

export default Register