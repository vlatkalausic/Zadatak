import React from 'react';
import {Navigate} from 'react-router-dom';
function Login(props){
    const [username, setUsername]=React.useState("")
    const [password, setPassword]=React.useState("")
    const [message, setMessage]=React.useState("Please enter login data.")
    if(message==="Login successful."){
        return <Navigate to="/"/>
    }
    function handleLoginSubmit(e){
        e.preventDefault()
        fetch(process.env.REACT_APP_API+"User/Login",
            {
                method:'POST',
                headers: {
                    'Accept': 'application/json; charset=utf-8',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    "Username": username,
                    "Password": password
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error status: ${response.status}`);
                    
                }
                else{
                    
                    return response.text();
                
            }})
            .then(data => {
                localStorage.setItem("token", data)
                localStorage.setItem("username", username)
                props.onLogin()
                setMessage("Login successful.")
            })
            .catch(error => {
                console.log('Error: ' + error)
                setMessage("Wrong login data.")
            });
    }
    
    return (
        <div><h1>Login page</h1><br></br>
        <h3 style={{color:'red'}}>{message}</h3>
        <form onSubmit={handleLoginSubmit}>
            <label>Username</label><br></br>
            <input required type="text" onChange={(e) => setUsername(e.target.value)}/>
            <br></br><br></br>
            <label>Password</label><br></br>
            <input required type="password" onChange={(e) => setPassword(e.target.value)}/>
            <br></br><br></br><br></br>
            <button type="submit">Login</button>
        </form>

        </div>
    )
}
export default Login;