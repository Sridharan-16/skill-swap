import { Link } from 'react-router-dom';
import Logo from './logo';
import LogoutButton from './Logout';
import useAuth from '../hooks/useAuth';

export default function Headers() {
  const { isAuthenticated } = useAuth();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <div className="Header">
      <div className="logo1"><Logo /></div>
      <div className="headerContent">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>

        {!isLoggedIn && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}

        {isLoggedIn && (
          <>
            {/* Option 1: Redirect-based logout */}
            <Link to="/logout">Logout</Link>

            {/* OR Option 2: Button-based logout */}
            {/* <LogoutButton /> */}
          </>
        )}
      </div>
    </div>
  );
}
