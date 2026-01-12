import Body from './Body.jsx'
import './App.css'
import Navbar from './Navbar.jsx'
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Login from './Login.jsx'
import Profile from './Profile.jsx'
import { Provider } from 'react-redux'
import appStore from './utils/appStore.js'
import Feed from './Feed.jsx'

function App() {

  return (
    <>
    <Provider store={appStore} >
      <BrowserRouter baseaname="/">
        <Routes>
          <Route path="/" element={<Body/>} >
            <Route path="/login" element={<Login/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/feed" element={<Feed/>} />
            <Route path="/feed" element={<Feed/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
