import React from "react";
import { Link } from "react-router-dom";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <Link className="navbar-brand" to="/">
        County Search - Dawson
      </Link>
      <div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              to="/"
              className={
                window.location.pathname === "/" || window.location.pathname === "/search"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Search
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/runsheet"
              className={window.location.pathname === "/runsheet" ? "nav-link active" : "nav-link"}
            >
              Runsheet
            </Link>
          </li>
          <li className="nav-item">
            {localStorage.getItem('jwtToken') ? (<Link
            to="/login"
              onClick={() => {
                localStorage.removeItem('jwtToken');
                window.location.reload();
              }
              }
              className="nav-link"
            >
              Logout
            </Link>) : (<Link
                to="/login"
                className={window.location.pathname === "/login" ? "nav-link active" : "nav-link"}
              >
                Login
            </Link>)}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
