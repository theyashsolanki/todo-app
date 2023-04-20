import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "../config/firebase"
import {Navigate} from 'react-router-dom'
import { useContext } from "react"
import { AppContext } from "../context/AppContext"



const Login = () => {
    const {Auth } = useContext(AppContext)
    
    const signInWithGoogle = async () => {
        await signInWithPopup(auth, provider)
    }
    if(Auth) {
        return <Navigate to='/'/>
    }
  
    return (
      <div className='h-screen flex flex-col items-center justify-center p-10 '>
          <h2 className='m-2 text-2xl font-bold'>login</h2>
          <button className='bg-green-500 text-white p-2 rounded-lg'
          onClick={signInWithGoogle}>
            Sign in with Google
          </button>
      </div>
    )
   
}

export default Login