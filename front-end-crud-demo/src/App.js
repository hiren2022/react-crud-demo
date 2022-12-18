import React, {useEffect, useState} from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Users from "./Components/User/Users";
import AddUser from "./Components/User/AddUser";
import Login from "./Components/Authencation/LoginPage";
import Registration from "./Components/Authencation/Registration";
import Header from "./Components/Layouts/Header";
import 'react-toastify/dist/ReactToastify.css';
import Requests from "./Components/FollowFollowing/Requests";

function App() {
  const [path,setPath] = useState('');
  useEffect(()=>{
    setPath(window.location.pathname);
  },[window.location.pathname]);

  const checkIsAuthRoute = ()=>{
    switch (path) {
      case '/login':
      case '/register':
        return false;
      default:
        return true;
    }
  }
  return (
    <div className="App">
        <BrowserRouter>
          <Header checkIsAuthRoute={checkIsAuthRoute}/>
          <Routes>
            <Route path='/' element={<Users/>}  />
            <Route path='/login' element={<Login/>}  />
            <Route path='/register' element={<Registration/>}  />
            <Route path='/add-user' element={<AddUser/>}  />
            <Route path='/requests' element={<Requests/>}  />
            <Route path='/followers' element={<Requests/>}  />
            <Route path='/followings' element={<Requests/>}  />
            <Route path='/edit-user/:id' element={<AddUser/>}  />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
