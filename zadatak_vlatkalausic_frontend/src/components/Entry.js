import React from 'react';
import {Navigate} from 'react-router-dom';

function Entry(){
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [hours, setHours] = React.useState()
    const [minutes, setMinutes] = React.useState()
    const [seconds, setSeconds] = React.useState()
    const [message, setMessage]=React.useState("Please enter valid data.")
    if(localStorage.getItem("username")!=null){
        return <Navigate to="/"/>
    }
    function handleEntrySubmit(e){
        e.preventDefault()
        fetch(process.env.REACT_APP_API+"Entry/Entry",
            {
                method:'POST',
                headers: {
                    'Accept': 'application/json; charset=utf-8',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    "FirstName": firstName,
                    "LastName": lastName,
                    "TimeHours": hours,
                    "TimeMinutes": minutes,
                    "TimeSeconds":seconds,
                    "Approved": false
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
                setMessage(data)
            })
            .catch(error => {
                console.log('Error: ' + error)
            });
    }
    return (
        <div><h1>Entry page</h1><br></br>
        <h3 style={{color:'red'}}>{message}</h3>
            <form onSubmit={handleEntrySubmit}>
                <label>First name</label><br></br>
                <input required type="text" onChange={(e) => setFirstName(e.target.value)}/>
                <br></br><br></br>
                <label>Last name</label><br></br>
                <input required type="text" onChange={(e) => setLastName(e.target.value)}/>
                <br></br><br></br>
                <label>Your race time:</label><br></br><br></br>
                <label>Hours</label><br></br>
                <input required type="number" min="0" step="1" pattern="[0-9.]+" onChange={(e) => setHours(e.target.value)}/>
                <br></br>
                <label>Minutes</label><br></br>
                <input required type="number"  min="0"  max="59" step="1" style={{width: 164}} onChange={(e) => setMinutes(e.target.value)}/>
                <br></br>
                <label>Seconds</label><br></br>
                <input required type="number"  min="0" max="59"  step="1" style={{width: 164}} onChange={(e) => setSeconds(e.target.value)}/>
                <br></br><br></br><br></br>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}
export default Entry;