import React, { useState } from 'react';
import {urlConfig} from '../context/config';
import { useAppContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
useEffect(() => {
  if (sessionStorage.getItem('auth-token')) {
    navigate('/app')
  }
}, [navigate])
    //insert code here to create useState hook variables for email, password
    const [incorrect, setIncorrect] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
const bearerToken = sessionStorage.getItem('bearer-token');
const { setIsLoggedIn } = useAppContext();


    // insert code here to create handleLogin function and include console.log
    const handleLogin = async () => {
        console.log("Inside handleLogin");
         const response = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
                //Step 1 - Task 6
                method: 'POST',
                //Step 1 - Task 7
                headers: {
                    'content-type': 'application/json',
                },
                //Step 1 - Task 8
                body: JSON.stringify({
                    
                    email: email,
                    password: password
                })
            }); 
             const json = await response.json();
            console.log('json data', json);
            console.log('er', json.error);
             if (json.authtoken) {
            sessionStorage.setItem('auth-token', json.authtoken);
            sessionStorage.setItem('name', firstName);
            sessionStorage.setItem('email', json.email);
            //insert code for setting logged in state
            setIsLoggedIn(true);
            //insert code for navigating to MainPAge
            navigate('/app');
}
else{
   document.getElementById("email").value="";
        document.getElementById("password").value="";
        setIncorrect("Wrong password. Try again.");
    //Below is optional, but recommended - Clear out error message after 2 seconds
        setTimeout(() => {
          setIncorrect("");
        }, 2000);
    }
        return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="login-card p-4 border rounded">
              <h2 className="text-center mb-4 font-weight-bold">Login</h2>

          {/* insert code here to create input elements for the variables email and  password */}
<div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input
        id="email"
        type="text"
        className="form-control"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
    />
</div>
<div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input
        id="password"
        type="password"
        className="form-control"
        placeholder="Password"
        value={password}
       onChange={(e) => {setEmail(e.target.value); setIncorrect("")}}
    />
</div>
<span style={{color:'red',height:'.5cm',display:'block',fontStyle:'italic',fontSize:'12px'}}>{incorrect}</span>
<button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>Login</button>
          {/* insert code here to create a button that performs the `handleLogin` function on click */}
                <p className="mt-4 text-center">
                    New here? <a href="/app/register" className="text-primary">Register Here</a>
                </p>

            </div>
          </div>
        </div>
      </div>
    )
}

export default LoginPage;
