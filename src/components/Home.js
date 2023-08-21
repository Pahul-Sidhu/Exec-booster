import React from "react";
import NavbarExternal from "./NavbarExternal.js";
import quickbooks from "../images/quickbooks_logo.png";
import xero from "../images/xero.png";
import excel from "../images/excel.png";
import "../css/Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <NavbarExternal></NavbarExternal>
      <div className="container d-flex justify-content-center">
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-column justify-content-center align-items-center mt-3">
              <h1 className="p-2">Dashboard</h1>
              <h3 className="mt-2 p-3">Select the application you use</h3>
              <div className="row m-2 p-2">
                <div
                  className="col-12 col-sm-6 col-md-4 mb-4"
                  style={{ width: "20rem" }}
                >
                  <Link className="nav-link" to="/connectquick">
                    <div className="card h-100 card-hover">
                      <img
                        src={quickbooks}
                        className="card-img-top mx-auto"
                        alt="..."
                        style={{ objectFit: "fill", height: "200px" }}
                      />
                      <hr />
                      <div className="card-body">
                        <p className="card-text">
                          A comprehensive accounting software for businesses,
                          offering streamlined financial management,
                          bookkeeping, and invoicing solutions.
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div
                  className="col-12 col-sm-6 col-md-4 mb-4"
                  style={{ width: "20rem" }}
                >
                  <Link className="nav-link" to="/connectxero">
                    <div className="card h-100 card-hover">
                      <img
                        src={xero}
                        className="card-img-top mx-auto"
                        style={{ objectFit: "fill", height: "200px" }}
                        alt="..."
                      />
                      <hr />
                      <div className="card-body">
                        <p className="card-text">
                          Xero is an intuitive cloud-based accounting platform
                          for small businesses, providing seamless bookkeeping,
                          invoicing, and financial management capabilities.
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>

                <div
                  className="col-12 col-sm-6 col-md-4 mb-4"
                  style={{ width: "21rem" }}
                >
                  <Link className="nav-link" to="/">
                    <div className="card h-100 card-hover">
                      <img
                        src={excel}
                        className="card-img-top mx-auto"
                        style={{ objectFit: "fill", height: "200px" }}
                        alt="..."
                      />
                      <hr />
                      <div className="card-body">
                        <p className="card-text">
                          A powerful spreadsheet software that enables data
                          organization, analysis, and visualization, offering a
                          wide range of functions for calculations, data
                          manipulation, and reporting.
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
