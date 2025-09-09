import { NavLink } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import logo from '../assets/images/Logo.png';
import '../styles/Navbar.css';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className='container'>
        <NavLink to='/' className='nav-title'>
          <img className='navbar-logo' src={logo} alt='' />
          <h1>FitLab</h1>
        </NavLink>

        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <NavLink to='/login'>Login</NavLink>
              <NavLink to='/signup'>Signup</NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
