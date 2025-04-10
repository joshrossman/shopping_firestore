import React from 'react'
import {useAuth0} from "@auth0/auth0-react"
const Callback: React.FC = () => {
    const {error} = useAuth0();

        
    if(error){
        return <div>Sorry, we seem to be experiencing an error - {error.message}</div>
    }
    return (
        <div>
        Login Successful
        </div>
    )
    
    
}
export default Callback