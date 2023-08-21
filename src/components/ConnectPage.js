import React, { useState, useEffect, useRef } from "react";
import NavbarExternal from "./NavbarExternal.js";
import logo from "../images/connectLogo.jpg";

export default function ConnectPage(type) {
  const authorize = async () => {
    let url = null;

    if (type.name === "Quickbooks") {
      url = await fetch("http://localhost:8000/authorize", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else if (type.name === "Xero") {
      url = await fetch("http://localhost:8000/authorizeXero", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    const data = await url.json();

    if (data.url != null) {
      console.log(data.url);
      window.location.href = data.url;
    }
  };

  return (
    <>
      <NavbarExternal></NavbarExternal>
      <div className="container">
        <div className="row" style={{ width: "100%" }}>
          <div className="container-fluid col-lg-6 col-12">
            <div className="d-flex flex-column justify-content-top align-items-center h-100 mt-3">
              <h1 className="p-2">
                Empowering Data-driven Decision Making and Competitive Advantage
              </h1>
              <p className="mt-2 p-3">
                AI Insights for Executives is a cutting-edge AI-powered tool
                designed to support the executive team of a company in making
                informed and strategic decisions. Leveraging the power of
                artificial intelligence, advanced analytics and data of
                quickbooks, this tool equips executives with valuable insights
                and actionable intelligence, enabling them to stay ahead of the
                competition and drive the company's success.
              </p>
              <button
                className="btn btn-secondary btn-lg btn-stylish m-3"
                onClick={authorize}
              >
                Connect to {type.name}
              </button>
            </div>
          </div>
          <div className="col-lg-6 col-12 my-2">
            <img
              src={logo}
              className="img-fluid rounded"
              alt="Business analysis"
            />
          </div>
        </div>
      </div>
    </>
  );
}
