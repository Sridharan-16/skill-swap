import { Link } from 'react-router-dom';
import Logo from './logo';
import LogoutButton from './Logout';
import useAuth from '../hooks/useAuth';

export default function Headers() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="Header">
      <div className="logo1"><Logo /></div>
      <div className="headerContent">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>

        {!isAuthenticated && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}

        {isAuthenticated && <LogoutButton />}
      </div>
    </div>
  );
}
