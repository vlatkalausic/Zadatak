import React from 'react';
import {Navigate} from 'react-router-dom';
function Unapproved(){
    
    const [unapprovedEntryData, setEntryData]= React.useState([])
    const [isIt, setIsIt]=React.useState(false)
    const [message, setMessage]=React.useState("")
    React.useEffect(() =>
    {
        refresh()
    },[]);

    if(isIt===true){
        setIsIt(false)
        return <Navigate to="/"/>
    }
    function refresh(){
        setEntryData([])
        const token=localStorage.getItem("token")
        fetch(process.env.REACT_APP_API+'Entry/GetUnapprovedEntrys', {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${token}`,
            }})
        .then(function(response) {
            if (response.status === 401) {
                localStorage.clear();
                setIsIt(true)
            }
            else{
                response.json().then(data=> setEntry(data))
                
            }
          })
            .catch(error => console.log('FAILED: ' + error.message)); 
            
    }
    function handleDelete(id){

        var answer = window.confirm("Are you sure you want to reject?");
        if (answer) {
            const token=localStorage.getItem("token")
             fetch(process.env.REACT_APP_API+'Entry/DeleteEntry', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json; charset=utf-8',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(id)
            })
            .then(res => res.text())
            .then(data => {
                setMessage(data)
                refresh()})
            .catch(error => console.log('FAILED: ' + error.message)); 

        }
    }
    function handleApprove(id){
        const token=localStorage.getItem("token")
        fetch(process.env.REACT_APP_API+'Entry/ApproveEntry', {
        method: 'POST',
        headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(id)
        })
        .then(res => res.text())
        .then(data => {
            setMessage(data)
            refresh()})
        .catch(error => console.log('FAILED: ' + error.message)); 

    }
    function parseRaceTime(hours, minutes, seconds){
        let time
        if(hours<10){
            time='0'+hours+':'
        }
        else{
            time=hours+':'
        }
        if(minutes<10){
            time=time+'0'+minutes+':'
        }
        else{
            time=time+minutes+':'
        }
        if(seconds<10){
            time=time+'0'+seconds
        }
        else{
            time=time+seconds
        }
        return time
    }
    function setEntry(data){
        for(let i=0; i<data.length; i++){
            setEntryData(prevEntryData => {
                return [...prevEntryData,
                <tr key={data[i].id}>
                    <td>{i+1}.</td>
                    <td>{data[i].firstName}</td>
                    <td>{data[i].lastName}</td>
                    <td>{parseRaceTime(data[i].timeHours,data[i].timeMinutes,data[i].timeSeconds)}</td>
                    <td><button  onClick={() => handleApprove(data[i].id)}>Approve</button> <button onClick={() => handleDelete(data[i].id)}>Reject</button></td>
                </tr>]
            })
        }
    }
    if(localStorage.getItem("username")!=null){
        return (
            <div><h1>Unapproved entrys</h1><br></br>
            <h3 style={{color:'red'}}>{message}</h3><br></br>
            <table style={{width:"60%",borderCollapse:"collapse", textAlign:"right"}}>
                <thead >
                    <tr style={{backgroundColor:"lightgray"}}>
                        <th>Number</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Race Time (hh:mm:ss)</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {unapprovedEntryData}
                </tbody>
            </table>
            </div>
        ) 
    }
    else {
        return <div><h3>You are not allowed.</h3></div>
    }
}
export default Unapproved;