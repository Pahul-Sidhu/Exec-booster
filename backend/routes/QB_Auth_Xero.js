const express = require("express");
const routerXero = express.Router();
const {
  XeroAccessToken,
  XeroIdToken,
  XeroClient,
  Contact,
  LineItem,
  Invoice,
  Invoices,
  Phone,
  Contacts,
} = require("xero-node");

let port = 8000;
let token = null;
let tenant_info = null;

const xero = new XeroClient({
  clientId: "C9908139111D40468EF14D7D438D9C0F",
  clientSecret: "64NeT9hdKerRxsIM0ioBiNJViae2AoTGN9hbJ1pHd4Vk8qMs",
  redirectUris: [`http://localhost:${port}/redirectedXero`],
  scopes:
    "openid profile email accounting.settings accounting.reports.read accounting.journals.read accounting.contacts accounting.attachments accounting.transactions offline_access".split(
      " "
    ),
  state: "returnPage=my-sweet-dashboard", // custom params (optional)
  httpTimeout: 3000, // ms (optional)
  clockTolerance: 10, // seconds (optional)
});

routerXero.get("/authorizeXero", async (req, res) => {
  let consentUrl = await xero.buildConsentUrl();
  res.send({ url: consentUrl });
});

routerXero.get("/redirectedXero", async (req, res) => {
  const tokenSet = await xero.apiCallback(req.url);
  token = tokenSet;
  xero.setAccessToken(tokenSet);
  await xero.updateTenants();
  tenant_info = xero.tenants[0];

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.redirect("http://localhost:3000/analysisXero");
});

routerXero.get("/retrieveTokenXero", async (req, res) => {
  if (token != null) res.send({ tkn: token });
});

routerXero.post("/getcompany_xero", async (req, res) => {
  xero.accountingApi
    .getOrganisations(tenant_info.tenantId)
    .then((response) => {
      const organizations = response.body.organisations;
      res.send({"company" : organizations[0].name})
    })
    .catch((error) => {
      console.log("Error retrieving company info:");
    });
});

module.exports = {routerXero};
