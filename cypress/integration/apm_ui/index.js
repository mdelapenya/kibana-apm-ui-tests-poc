/* global And, Given, Then, cy */

const { GenericContainer } = require("testcontainers");

Cypress.Screenshot.defaults({
  screenshotOnRunFailure: true
});

var elasticSearchContainer;
var kibanaContainer;

async function runElasticStack(version) {
  elasticSearchContainer = await new GenericContainer("docker.elastic.co/elasticsearch/elasticsearch", version)
    .withExposedPorts(9200)
    .start();
  kibanaContainer = await new GenericContainer("docker.elastic.co/kibana/kibana", version)
    .withExposedPorts(9200)
    .start();
}

async function stopElasticStack() {
  await kibanaContainer.stop();
  await elasticSearchContainer.stop();
}

Given(`the Elastic Stack in {string} is {string}`, async(version, status) => {
  await runElasticStack(version);
  cy.log("The Elastic Stack " + version + " is " + status);
});

When(`the user {string} logs in`, async(userName) => {
  cy.log("User " + userName + " is logged in");
  setTimeout(function() {
    cy.log('Sleeping for 5 seconds');
  }, 5000);
});

Then(`Kibana's main menu displays the {string} icon`, async(moduleName) => {
  cy.log("Module " + moduleName + " is not visible");
  await stopElasticStack();
});
