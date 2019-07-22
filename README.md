# Formal verification of Kibana's APM UI module

We want to make sure that Kibana's APM UI module works as expected,
so for that reason we are adding [smoke tests](http://softwaretestingfundamentals.com/smoke-testing/) to verify that the any code submission meets the specifications defined here with certain grade of satisfaction.

>Smoke Testing, also known as “Build Verification Testing”, is a type of software testing that comprises of a non-exhaustive set of tests that aim at ensuring that the most important functions work. The result of this testing is used to decide if a build is stable enough to proceed with further testing.

## Running the tests

The tests are located under the [./src](./src) directory. Place your terminal there and execute the Node's classic:

```shell
$ npm run test
```

## Tooling

The specification of these smoke tests has been done using the `BDD` (Behaviour-Driven Development) principles, where:

>BDD aims to narrow the communication gaps between team members, foster better understanding of the customer and promote continuous communication with real world examples.

The implementation of these smoke tests has been done with [Cypress](https://www.cypress.io/) + [Cucumber](https://cucumber.io/).

### Cucumber: BDD at its core

From their website:

>Cucumber is a tool that supports Behaviour-Driven Development(BDD), and it reads executable specifications written in plain text and validates that the software does what those specifications say. The specifications consists of multiple examples, or scenarios.

The way we are going to specify our software, which represents how the Kibana APM UI module works, is using [`Gherkin`](https://cucumber.io/docs/gherkin/reference/).

>Gherkin uses a set of special keywords to give structure and meaning to executable specifications. Each keyword is translated to many spoken languages. Most lines in a Gherkin document start with one of the keywords.

The key part here is **executable specifications**: we will be able to automate the verification of the spefications anf potentially get a coverage of these specs.

### Cypress: a test runner not using Selenium

From their website:

>Cypress makes setting up, writing, running and debugging tests easy.

For this POC, we have chosen Cypress over any other functional test framework because (sic) _"Cypress tests are only written in JavaScript"_, and the majority of our teams are tightly related to frontend development, so it seems reasonable to choose it.

Besides, (sic) _"Cypress is all in one"_, so no need to install any other tooling in the machines (local or CI).

## Test Specification

All the Gherkin (Cucumber) specifications are written in `.feature` files.

A good example could be [this one](./cypress/integration/apm_ui.feature):

```cucumber
Feature: APM UI module

Scenario: As an APM User I want to check that the APM UI module is present in the left, main menu
  Given the Elastic Stack in "7.2.0" is "running"
  When the user "admin" logs in
  Then Kibana's main menu displays the "APM UI" icon
```

## Test Implementation

We are using Cypress + Cucumber to implement the tests, where we create connections to the `Given`, `When`, `Then`, `And`, etc. in a well-known file structure, using feature file name as the parent directory for the Javascript files.

As an example, the Javascript implementation of the `apm_ui.feature` is located under the [./cypress/integration/apm_ui](./cypress/integration/apm_ui) directory. For the sake of simplicity, we are not reusing steps, so the javascript files will contain all of them in one single file.