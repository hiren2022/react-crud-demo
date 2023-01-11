import React, {useEffect, useState} from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import AddUser from "./Components/User/AddUser";
import Login from "./Components/Authencation/LoginPage";
import Registration from "./Components/Authencation/Registration";
import Header from "./Components/Layouts/Header";
import 'react-toastify/dist/ReactToastify.css';
import Requests from "./Components/FollowFollowing/Requests";
import Followers from "./Components/FollowFollowing/Followers";
import Followings from "./Components/FollowFollowing/Followings";
import Profile from "./Components/User/Profile";
import PostPage from "./Components/Posts/Posts";
import CreatePost from "./Components/Posts/CreatePost";

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

          <Routes>
            <Route path='/' element={<Header checkIsAuthRoute={checkIsAuthRoute}/>} >
            <Route index element={<PostPage/>}  />
            <Route path='login' element={<Login/>}  />
            <Route path='register' element={<Registration/>}  />
            <Route path='post/create' element={<CreatePost/>}  />
            <Route path='profile/:id' element={<Profile/>}  />
            <Route path='requests' element={<Requests/>}  />
            <Route path='followers' element={<Followers/>}  />
            <Route path='followings' element={<Followings/>}  />
            <Route path='edit-user/:id' element={<AddUser/>}  />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
