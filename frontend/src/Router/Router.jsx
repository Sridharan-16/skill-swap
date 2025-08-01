import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from '../pages/Home'
import Logo from '../components/logo'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Logout from '../components/Logout'
import { useNavigate } from 'react-router-dom'
export default function Router(){
  
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path="/home" element={<Home/>} />
                <Route path='/logo' element={<Logo />}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/signup' element={<Signup/>}></Route>
                <Route path='/logout' element={<Logout />}></Route>
            </Routes>
        </BrowserRouter>
    )
}