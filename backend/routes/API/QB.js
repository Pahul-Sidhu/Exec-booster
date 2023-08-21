const { oauthClient } = require("../QB_Auth_QuickBooks");
const express = require("express");
const routerQB = express.Router();
const { body, validationResult } = require("express-validator");
var OAuthClient = require("intuit-oauth");
// const companyID = oauthClient.getToken().realmId;

routerQB.get("/getBalanceSheet", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header("id")}/reports/BalanceSheet`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/getGL", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header("id")}/reports/GeneralLedger`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/getGLFR", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header("id")}/reports/GeneralLedgerFR`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/getPL", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header("id")}/reports/ProfitAndLoss`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/getPLDetails", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header("id")}/reports/ProfitAndLossDetail`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/getTB", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header("id")}/reports/TrialBalance`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/account_info", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * from Account&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/customer_info", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * from Customer&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/vendor_info", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * from vendor&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/employee_info", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * from Employee&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/bills", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * from bill&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/invoices", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * from Invoice&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.log(e);
      console.error("Error:", e.message);
      console.error("Stack Trace:", e.stack);
    });
});

routerQB.get("/payments", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * from Payment&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

//today
routerQB.get("/budget", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * from Budget&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/class", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * from Class&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/creditMemo", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * from CreditMemo&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/creditPayments", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * from creditcardpayment&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/department", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * from Department&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/deposit", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * from Deposit&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/estimate", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * from estimate&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/item", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * from Item&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/journalEntry", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * from JournalEntry&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/purchase", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * from Purchase&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/purchaseOrders", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * from PurchaseOrder&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/refundreceipts", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * from RefundReceipt&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/Reimbursecharge", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * from ReimburseCharge&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/SalesReceipts", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * from SalesReceipt&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/taxclassifications", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/taxclassification`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/taxcode", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * From TaxCode&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/taxpayment", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * From TaxPayment&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/taxrate", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * From TaxRate&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/taxagency", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * From TaxAgency&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/term", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * From Term&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/timeactivity", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * From TimeActivity&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/transfer", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * From Transfer&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

routerQB.get("/vendorCredit", (req, res) => {
  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${req.header(
        "id"
      )}/query?query=select * From vendorcredit&minorversion=65`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
      res.send({ Error: "Couldn't fetch" });
    });
});

module.exports = { routerQB };
