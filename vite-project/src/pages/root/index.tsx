import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const auth = useSelector((state) => state.auth);

  const renderContent = () => {
    if (auth === null) {
      return null;
    }

    if (auth === false) {
      return (
        <li>
          <a href="/auth/google">Login With Google</a>
        </li>
      );
    }

    return (
      <>
        <li style={{ margin: '0 10px' }}>
          <Link to="/blogs">My Blogs</Link>
        </li>
        <li>
          <a href="/auth/logout">Logout</a>
        </li>
      </>
    );
  };

  return (
    <nav className="indigo">
      <div className="nav-wrapper">
        <Link
          to={auth ? '/blogs' : '/'}
          className="left brand-logo"
          style={{ marginLeft: '10px' }}
        >
          Blogster
        </Link>
        <ul className="right">{renderContent()}</ul>
      </div>
    </nav>
  );
};

export default Header;