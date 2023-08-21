const express = require("express");
const routerQuick = express.Router();
var oauthClient = null;
let oauthurl = null;
var OAuthClient = require("intuit-oauth");
const url = require("url");
const querystring = require("querystring");
let oauth2_token_json = null;
let mid = null;

oauthClient = new OAuthClient({
  clientId: "ABKc7w7nQhelKcJk40q96ovtAfJ6tu4BagqugUqZkaWoM0cnyR", // enter the apps `clientId`
  clientSecret: "EEJqKMmPsLn1kXPpukrgwbHOBWzZmsLHQcPd5aO3", // enter the apps `clientSecret`
  environment: "sandbox", // enter either `sandbox` or `production`
  redirectUri: "http://localhost:8000/redirected", // enter the redirectUri
});

const authUri = oauthClient.authorizeUri({
  scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
  state: "intuit-test",
});

oauthurl = authUri;

/**
 * Handle the callback to extract the `Auth Code` and exchange them for `Bearer-Tokens`
 */
routerQuick.get("/authorize", (req, res) => {
  res.send({ url: oauthurl });
});

routerQuick.get("/redirected", async (req, res) => {
  const urlString = req.url;
  const parsedUrl = url.parse(urlString);
  const queryParams = querystring.parse(parsedUrl.query);
  const realmId = queryParams.realmId;
  mid = realmId;

  await oauthClient
    .createToken(req.url)
    .then(function (authResponse) {
      oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2)
    })
    .catch(function (e) {
      // console.error(e);
    });

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.redirect("http://localhost:3000/analysisQuick");
});


routerQuick.get("/retrieveToken", (req, res) => {
  if (oauth2_token_json != null)
    res.send({ token: oauth2_token_json, id : mid});
});

/**
 * Refresh the access-token
 */
routerQuick.get("/refreshAccessToken", (req, res) => {
  oauthClient
    .refresh()
    .then(function (authResponse) {
      oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2);
      res.send(oauth2_token_json);
    })
    .catch(function (e) {
      // console.error(e);
    });
});

/**
 * getCompanyInfo ()
 */
routerQuick.get("/getCompanyInfo", (req, res) => {
  const companyID = oauthClient.getToken().realmId;

  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${companyID}/companyinfo/${companyID}`,
    })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      // console.error(e);
    });
});

/**
 * disconnect ()
 */
routerQuick.get("/disconnect", (req, res) => {
  console.log("The disconnect called ");
  const authUri = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.OpenId, OAuthClient.scopes.Email],
    state: "intuit-test",
  });

});



module.exports = {routerQuick, oauthClient};
