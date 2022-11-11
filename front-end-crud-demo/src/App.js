import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Users from "./Components/User/Users";
import AddUser from "./Components/User/AddUser";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Users/>}  />
            <Route path='/add-user' element={<AddUser/>}  />
            <Route path='/edit-user/:id' element={<AddUser/>}  />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
