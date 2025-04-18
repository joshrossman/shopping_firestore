import { useEffect, useState} from 'react'
import { useAuth } from '../Context/AuthContext'
import { updateProfile, deleteUser } from 'firebase/auth'
import styles from '../styles/auth-styles'
import { db } from '../lib/firebase/firebase'
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

interface User{
    id?:string;
    email: string;
    password:string;
    displayName: string;
    age?:string;
    address?:string;
}

const Profile = () => {

  const { user }= useAuth()
  
  const [email, setEmail] = useState('')
  useEffect(()=>{
    const createUser = async()=>{
    if(!user){
      return <div>'Loading user'</div>
    }
    if(user)
    {

      console.log('user',user)
      setEmail(user.email)
    }
    }
    createUser();
  },[user]);

  
  const [users, setUsers] = useState<User[]>([])
 
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
      
 const [newUser, setUser] = useState<User>({email:'',password:'',displayName:'',address:'',age:''}) 
 const [displayName, setDisplayName] = useState('')
 
 const [address, setAddress] = useState('')
 const [age, setAge] = useState('')
 const [error,setError] = useState('')
 const [success,setSuccess] = useState('')

 useEffect(()=>{
  if(users.length>0||newUser.email!=='')
  {
  
  
    setUser(users.filter(myUser => myUser.email === email)[0])
    setDisplayName(users.filter(myUser => myUser.email === email)[0].displayName)
    setEmail(users.filter(myUser => myUser.email === email)[0].email)
    setAddress(users.filter(myUser => myUser.email === email)[0].address||'')
    setAge(users.filter(myUser => myUser.email === email)[0].age||'')
  }
 

 },[users,newUser])       
   
 

        
   
    const updateUser = async (userId, updatedData) => {
            const userDoc = doc(db, 'users', userId);
            await updateDoc(userDoc, updatedData);
      };
      
    const deleteMyUser = async (userId)=> {
          await deleteDoc(doc(db,'users',userId))
      }
    
       
  const handleUpdateProfile = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setError('');
    setSuccess('');
    if(!user){
      setError('User not found');
      return;
    }
    try {
      await updateProfile(user, {
        displayName: displayName,
      });
      await updateUser(newUser.id,{displayName,age,address})
      setSuccess('Profile updated successfully')
    } catch (error: any) {
      if(user)
        setError(error.message)
    }
  };

  const handleDeleteAccount = async () => {
    try {
      if (!user) {
        setError('User Not Found');
        return;
      }

      await deleteMyUser(newUser.id);
      await deleteUser(user);
      setSuccess('Account deleted successfully');

    } catch (error: any) {
      setError(error.message);
    }
  };


  return (
    <div style={styles.form}>
      <h1>Profile</h1>
      {/*Add delete account button */}

      <form onSubmit={handleUpdateProfile}>
        
      <input  
        style={styles.input}
        disabled={true}
        type='email'
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        placeholder='Email'
      />
      <input
          style={styles.input}
          type='text'
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder='Name'
      />
      <input  
        style={styles.input}
        type='text'
        value={age}
        onChange={(e)=> setAge(e.target.value)}
        placeholder='Age'
      />
      <input  
        style={styles.input}
        type='text'
        value={address}
        onChange={(e)=> setAddress(e.target.value)}
        placeholder='Address'
      />
      <button style={styles.button} type='submit'>
        Update Profile
      </button>

      {success&&<p style={styles.success}>{success}</p>}
      {error&&<p style={styles.error}>{error}</p>}
      <div>
        <button
          onClick={handleDeleteAccount}
          style={styles.deleteAccountButton}
        >
          Delete Account
        </button>
      </div>
      </form>
      
    </div>
  )
}

export default Profile;