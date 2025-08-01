import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./logo";

export default function Headers(){
    return(
        <div className="Header">
            <div className="logo1"><Logo /></div>
            <div className="headerContent"> {/* ✅ fixed class name */}
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
            </div>
        </div>
    )
}
