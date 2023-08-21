const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const multer = require("multer");
const path = require("path");

//routes
const { routerQuick } = require("./routes/QB_Auth_QuickBooks");
const { routerXero } = require("./routes/QB_Auth_Xero");
const { routerQB } = require("./routes/API/QB");
const { routerAI } = require("./routes/AI");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

app.get("/", (req, res) => res.send("Welcome to backend! Pahul"));

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.post("/upload", (req, res) => {
//   // Create and populate a file with data on the server
//   const textContent = `Balance-sheet: ${req.body.BS}\nGeneral-Ledger: ${req.body.GL}\nGeneral-Ledger-FR: ${req.body.GLFR}\nProfit-Loss: ${req.body.PL}\nTrial-Balance: ${req.body.TB}\nProft-Loss-Detail: ${req.body.PLD}`;
//   const filePath = path.join(__dirname, "uploads", "file.txt");

//   fs.writeFile(filePath, textContent, (err) => {
//     if (err) {
//       console.error("Error creating the file:", err);
//       return res.json({ error: "Error creating the file" });
//     }
//   });
// });

//Quickbooks

app.get("/authorize", routerQuick);

app.get("/redirected", routerQuick);

app.get("/retrieveToken", routerQuick);

app.get("/refreshAccessToken", routerQuick);

app.get("/getCompanyInfo", routerQuick);

app.get("/disconnect", routerQuick);

//Xero

app.get("/authorizeXero", routerXero);

app.get("/redirectedXero", routerXero);

app.get("/retrieveTokenXero", routerXero);

app.post("/getcompany_xero", routerXero);

app.get("/getBalanceSheet", routerQB);
app.get("/getGL", routerQB);
app.get("/getGLFR", routerQB);
app.get("/getPL", routerQB);
app.get("/getPLDetails", routerQB);
app.get("/getTB", routerQB);
app.get("/account_info", routerQB);

app.get("/customer_info", routerQB);

app.get("/vendor_info", routerQB);

app.get("/employee_info", routerQB);

app.get("/bills", routerQB);

app.get("/invoices", routerQB);

app.get("/payments", routerQB);

app.get('/budget', routerQB);
app.get('/class', routerQB);
app.get('/creditMemo', routerQB);
app.get('/creditPayments', routerQB);
app.get('/department', routerQB);
app.get('/deposit', routerQB);
app.get('/estimate', routerQB);
app.get('/item', routerQB);
app.get('/journalEntry', routerQB);
app.get('/purchase', routerQB);
app.get('/purchaseOrders', routerQB);
app.get('/refundreceipts', routerQB);
app.get('/Reimbursecharge', routerQB);
app.get('/SalesReceipts', routerQB);
app.get('/taxclassifications', routerQB);
app.get('/taxcode', routerQB);
app.get('/taxpayment', routerQB);
app.get('/taxrate', routerQB);
app.get('/taxagency', routerQB);
app.get('/term', routerQB);
app.get('/timeactivity', routerQB);
app.get('/transfer', routerQB);
app.get('/vendorCredit', routerQB);

app.post("/completions", routerAI);

app.listen(port, () => {
  console.log(`execBoost listening on port ${port}`);
});
