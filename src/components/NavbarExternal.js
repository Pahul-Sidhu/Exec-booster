import React from "react";
import logo from "../images/logo212.png";
import { Link } from "react-router-dom";

export default function NavbarExternal() {
  return (
    <nav className="navbar navbar-expand-lg" style={{"backgroundColor" : "rgb(247 243 243)"}}>
      <div className="container-fluid">
        <Link className="nav-link" to="/">
          <a className="navbar-brand ms-5" href="#">
            <img
              src={logo}
              alt="logo"
              style={{
                maxHeight: "5vh",
                maxWidth: "100%",
                padding: "2px",
              }}
            />
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item mx-5">
              <a className="nav-link" aria-current="page" href="#">
                About
              </a>
            </li>
            <li className="nav-item mx-5">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
