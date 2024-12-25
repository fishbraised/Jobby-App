import Cookies from 'js-cookie';

import { Link, withRouter } from 'react-router-dom';

import { AiFillHome } from 'react-icons/ai';
import { BsBriefcaseFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';

import './index.css';

const Navbar = (props) => {
  const onLogoutClick = () => {
    const { history } = props;

    Cookies.remove('jwt_token', { path: '/login' });
    history.replace('/login');
  };

  return (
    <nav className="navbar">
      <img
        className="navbar-logo"
        src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F907f9cac5e83c3cfa52e31f976a4f9e2.cdn.bubble.io%2Ff1694435786249x476254169322664960%2FGroup%2520680.png?w=&h=&auto=compress&dpr=1&fit=max"
        alt="navbar-logo"
      />
      <div className="navbar-links-mobile">
        <Link to="/">
          <AiFillHome className="navbar-icon" />
        </Link>

        <Link to="/jobs">
          <BsBriefcaseFill className="navbar-icon" />
        </Link>

        <button onClick={onLogoutClick}>
          <FiLogOut className="navbar-icon" />
        </button>
      </div>
      {/* Convert these things above to ul and li, with button */}

      <ul className="navbar-links-desktop">
        <Link to="/" className="navbar-link">
          <li className="navbar-link-item">Home</li>
        </Link>

        <Link to="/jobs" className="navbar-link">
          <li className="navbar-link-item">Jobs</li>
        </Link>
      </ul>
      <button className="logout-btn" onClick={onLogoutClick}>
        Logout
      </button>
    </nav>
  );
};

export default withRouter(Navbar);
