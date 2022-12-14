import React from 'react';

function Home(){
    
    const [approvedEntryData, setEntryData]= React.useState([])
    const [message, setMessage]=React.useState("")
    React.useEffect(() =>
    {
        refresh()
    },[]);

    function refresh(){
        setEntryData([])
        fetch(process.env.REACT_APP_API+'Entry/GetApprovedEntrys')
        .then(res => res.json())
        .then(data => setEntry(data))
        .catch(error => console.log('FAILED: ' + error.message)); 
    }

    function handleDelete(id){

        var answer = window.confirm("Are you sure you want to delete?");
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
                if(localStorage.getItem("username")==null){
                    return [...prevEntryData,
                    <tr key={data[i].id}>
                        <td>{i+1}.</td>
                        <td>{data[i].firstName}</td>
                        <td>{data[i].lastName}</td>
                        <td>{parseRaceTime(data[i].timeHours,data[i].timeMinutes,data[i].timeSeconds)}</td>
                    </tr>]
                }
                else{ 
                    return [...prevEntryData,
                    <tr key={data[i].id}>
                        <td>{i+1}.</td>
                        <td>{data[i].firstName}</td>
                        <td>{data[i].lastName}</td>
                        <td>{parseRaceTime(data[i].timeHours,data[i].timeMinutes,data[i].timeSeconds)}</td>
                        <td><button onClick={() => handleDelete(data[i].id)}>Delete</button></td>
                    </tr>]
                }
            })
        }
    }
    var admin
    var adminlocalstorage=localStorage.getItem("username")
    if(adminlocalstorage!=null){
        admin=<th>Action</th>
    }
    return (
        <div>{adminlocalstorage!=null ? <h1>List of all approved entrys</h1>:<h1>List of best times</h1>} <br></br>
        <h3 style={{color:'red'}}>{message}</h3><br></br>
        
        <table style={{width:"40%",borderCollapse:"collapse", textAlign:"right"}}>
            <thead >
                <tr style={{backgroundColor:"lightgray"}}>
                    <th>Number</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Race Time (hh:mm:ss)</th>
                    {admin}
                </tr>
            </thead>
            <tbody>
                {approvedEntryData}
            </tbody>
        </table>
        </div>
    )
}
export default Home;