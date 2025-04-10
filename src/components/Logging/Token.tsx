
import { useAuth0,  } from '@auth0/auth0-react'
import {useEffect} from 'react'

const Token = () => {
    
    const {  isAuthenticated, getAccessTokenSilently } = useAuth0();
    
    useEffect(() => 
    {
        const getToken = async () => 
        {
            if (isAuthenticated) 
            {
                try 
                {
                    const token = await getAccessTokenSilently({
                        authorizationParams:
                        {
                            audience: 'https://www.googleapis.com/oauth2/v3/userinfo',
                            scope: 'openid profile email',
                        }
                    });

                    sessionStorage.setItem('google_jwt_token', token)
                    console.log(token)
                    return (
                        <button>
                            {token}
                        </button>
                    )

                } 
                catch (err) 
                {
                    console.error('Error Getting Token', err)
                }
                
            }
       
    };
    getToken();
 }, [isAuthenticated]);

   
    
};

export default Token
