import Body from './Body.jsx'
import './App.css'
import Navbar from './Navbar.jsx'
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Login from './Login.jsx'
import Profile from './Profile.jsx'

function App() {

  return (
    <>
      <BrowserRouter baseaname="/">
        <Routes>
          <Route path="/" element={<Body/>} >
            <Route path="/login" element={<Login/>} />
            <Route path="/profile" element={<Profile/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
