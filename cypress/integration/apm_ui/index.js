/* global And, Given, Then */

const environment = Cypress.env("testEnvironment");

Cypress.Screenshot.defaults({
  screenshotOnRunFailure: true
});

Given(`the Elastic Stack in {string} is {string}`, (version, status) => {
  console.log("The Elastic Stack " + version + " is " + status);
});

When(`the user {string} logs in`, userName => {
  console.log("User " + userName + " is logged in");
});

Then(`Kibana's main menu displays the {string} icon`, moduleName => {
  console.log("Module " + moduleName + " is not visible");
});
