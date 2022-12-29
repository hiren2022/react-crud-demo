import React, {useEffect, useState} from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Users from "./Components/User/Users";
import AddUser from "./Components/User/AddUser";
import Login from "./Components/Authencation/LoginPage";
import Registration from "./Components/Authencation/Registration";
import Header from "./Components/Layouts/Header";
import 'react-toastify/dist/ReactToastify.css';
import Requests from "./Components/FollowFollowing/Requests";
import Followers from "./Components/FollowFollowing/Followers";
import Followings from "./Components/FollowFollowing/Followings";

function App() {
  const [pathName,setPathName] = useState(window.location.pathname);
  useEffect(()=>{
    setPathName(window.location.pathname);
  },[window.location.pathname]);

  const checkIsAuthRoute = ()=>{
    switch (pathName) {
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
            <Route path='/login' element={<Login/>}  />
            <Route path='/register' element={<Registration/>}  />
            <Route path='/add-user' element={<AddUser/>}  />
            <Route path='/requests' element={<Requests/>}  />
            <Route path='/followers' element={<Followers/>}  />
            <Route path='/followings' element={<Followings/>}  />
            <Route path='/edit-user/:id' element={<AddUser/>}  />
            <Route path='/' element={<Users/>}  />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
