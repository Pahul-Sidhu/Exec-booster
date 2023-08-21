import "./App.css";
import ConnectPage from "./components/ConnectPage.js";
import Home from "./components/Home.js";
import Analysis from "./components/Analysis.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/connectquick"
            element={
              <ConnectPage key="default" name="Quickbooks"></ConnectPage>
            }
          />
          <Route
            exact
            path="/connectxero"
            element={<ConnectPage key="default" name="Xero"></ConnectPage>}
          />
          <Route exact path="/" element={<Home key="home"></Home>} />
          <Route
            exact
            path="/analysisQuick"
            element={<Analysis key="analysis" company_name = "quickbooks"></Analysis>}
          />
          <Route
            exact
            path="/analysisXero"
            element={<Analysis key="analysis" company_name = "xero"></Analysis>}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
