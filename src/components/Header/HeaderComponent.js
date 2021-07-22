import React from 'react';
import {Link} from "react-router-dom";
import {useMoralis} from "react-moralis";
import classes from './HeaderComponent.module.scss'

const HeaderComponent = () => {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();
  return (
    <header className={classes.header}>
      <div className={classes.headerLink}>
        {!isAuthenticated ? (
          <span onClick={() => authenticate()}>Authenticate</span>
        ) : (
          <div>
            <h1>Welcome {user.get("username")}</h1>
            <span
              onClick={() => {
                logout();
              }}
            >
              logout
            </span>
          </div>
        )}
      </div>

      <Link to="/home" className={classes.headerLink}>Home</Link>
      <br />

      <Link to="liked" className={classes.headerLink}>Liked</Link>
    </header>
  )
}

export default HeaderComponent;