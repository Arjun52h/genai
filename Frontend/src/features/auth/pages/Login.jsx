import React, { useState } from 'react'
import {useNavigate , Link} from 'react-router'
import '../auth.form.scss'
import { useAuth } from '../hooks/useAuth';
function Login() {
    const navigate = useNavigate();

    const {loading , handleLogin} = useAuth()

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
       await handleLogin({email , password})
       navigate('/')
        
        // Handle form submission logic here
    }

    if(loading){
        return <main><h1>Loading...... Please wait </h1></main>
    }
  return (
    <main>
        
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor  = "email"> Email </label>
                    <input type="email" id = "email" name = "email" placeholder='Enter your email' required
                    onChange={(e) =>{setemail(e.target.value)}}
                    />
                    
                </div>
                <div className="input-group">
                    <label htmlFor  = "password"> Password </label>
                    <input type="password" id = "password" name = "password" placeholder='Enter your password' required
                    onChange={(e)=>{setpassword(e.target.value)}}
                    />
                </div>
                <button type="submit" className="button primary_button">Login</button>
            </form>

            <p>Dont have an account? <Link to="/register">Register here</Link></p>
        </div>
    </main>
  )
}

export default Login