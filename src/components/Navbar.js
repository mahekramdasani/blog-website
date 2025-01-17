import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const logout = () => {
    localStorage.clear()
  };
  let location = useLocation();
  useEffect(() => {}, [location]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Blog
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/startups" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/startups"
                >
                  Startups
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/techblogs" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/techblogs"
                >
                  Tech Blogs
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <>
                <Link
                  className="btn btn-primary mx-2"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-2"
                  to="/signup"
                  role="button"
                >
                  Signup
                </Link>
              </>
            ) : (
              <Link
                className="btn btn-primary mx-2"
                to="/login"
                role="button"
                onClick={logout}
              >
                Logout
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
