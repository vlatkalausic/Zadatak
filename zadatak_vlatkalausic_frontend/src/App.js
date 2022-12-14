import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './components/Home';
import Entry from './components/Entry';
import Login from './components/Login';
import Unapproved from './components/Unapproved';

function App() {
  
  const [app, setApp] =React.useState(false)
  React.useEffect(()=> {

  },[app])
  function Logout(){
    localStorage.clear();
    return <Navigate to="/"/>
  }
  function onLogin(){
    console.log("onlogin")
    setApp(true)
   
  }
  let navdata
  if(localStorage.getItem("username")!=null){
    navdata=
    <ul>
      <li><a href="/">List of all approved entrys</a></li>
      <li><a href="/unapproved">List of all unapproved entrys</a></li>
      <li><a href="/" onClick={Logout}>Logout</a></li>
    </ul>

  }else{
    navdata=
    <ul>
      <li><a href="/">List of best times</a></li>
      <li><a href="/entry">New entry</a></li>
      <li><a href="/login">Admin login</a></li>
    </ul>
  }
  return (
    <Router> {navdata}
      <Routes>
        <Route path="/" element={<Home/>}>
        </Route>
        <Route path="/entry" element={<Entry/>}>
        </Route>
        <Route path="/login" element={<Login onLogin={onLogin}/>}>
        </Route>
        <Route path="/unapproved" element={<Unapproved/>}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
