import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from '../pages/Home'
import Logo from '../components/logo'
import Login from '../pages/Login'

export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/logo' element={<Logo />}></Route>
                <Route path='/login' element={<Login/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}