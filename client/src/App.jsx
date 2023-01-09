import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import List from './Pages/Hotel List/List';
import Hotel from './Pages/Single Hotel/Hotel';
import Login from './Pages/Log in/Login';
import Registration from './Pages/Registration/Registration';
function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/hotels" element={<List/>} />
          <Route path="/hotels/:id" element={<Hotel/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/registration" element={<Registration/>} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
