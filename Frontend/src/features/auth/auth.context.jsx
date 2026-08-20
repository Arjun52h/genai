import {createContext ,useState  , useEffect} from 'react';
import { getMe } from './services/auth.api';
export const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const getandset = async() =>{
            try {
                const data = await getMe()
                setUser(data.user)
                
            } catch (error) {
                console.log("Error at the auth.context.js");
                
            }
            finally{
                setLoading(false)
            }
        }
        getandset()
    },[])

    // useEffect(()=>{
    //     const getandsetdata = async()=>{
    //         const data = await getMe()
    //         setUser(data.user)
    //         setLoading(false)
    //     }
    //     getandsetdata()
    // })

    return (
        <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}
 