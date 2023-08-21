import React, { useState, useEffect } from "react";
import logo from "../images/logo212.png";
import "../css/analysis.css";
import { Link } from "react-router-dom";
import Chatbot from "./Chatbot.js";
import { getAI } from "./API_Connect";

export default function Analysis(type) {
  const [main, setMain] = useState("null");

  const Topbar = () => {
    return (
      <nav className="navbar navbar-expand-lg" style={{"backgroundColor" : "rgb(247 243 243)", "position" : "fixed"}}>
        <div className="container-fluid">
          <Link className="nav-link" to="/">
            <a className="navbar-brand ms-5" href="#" onClick={disconnect_company_Xero}>
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
                  Home
                </a>
              </li>
              <li className="nav-item mx-5">
                <a className="nav-link" href="#" onClick={() => {setMain("chatbot"); getAI("");}}>
                  Chatbot
                </a>
              </li>
              <li className="nav-item mx-5 dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Analysis
                </a>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };

  const MainPage = () => {
    return (
      <div className="container-fluid">
        {main === "chatbot" && <Chatbot></Chatbot>}
      </div>

    );
  };

  // Authentication and API calls

  const fetch_token_Quick = async () => {
    const token = await fetch("http://localhost:8000/retrieveToken", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await token.json();

    if (data != null) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("mid", data.id);
    }
  };


  const fetch_token_Xero = async () => {
    const token = await fetch("http://localhost:8000/retrieveTokenXero", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await token.json();

    if (data != null) {
      localStorage.setItem("tokenXero", data.tkn.access_token);
    }
  };

  // const fetch_company_Xero = async () => {
  //   const token = await fetch("http://localhost:8000/getcompany_xero", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const data = await token.json();

  //   if (data != null) {
  //     setCompany(data.company);
  //   }
  // };

  const disconnect_company_Xero = async () => {
    await fetch("http://localhost:8000/disconnect", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

  };

  useEffect(() => {
    if (type.company_name === "quickbooks") fetch_token_Quick();
    else fetch_token_Xero();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <Topbar></Topbar>
        <MainPage></MainPage>
      </div>
    </div>
  );
}
