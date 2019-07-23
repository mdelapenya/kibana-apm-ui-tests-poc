Feature: APM UI module

Scenario: As an APM User I want to check that the APM UI module is present in the left, main menu
  Given the Elastic Stack in "7.2.0" is "running"
  When the user "admin" logs in
  Then Kibana's main menu displays the "APM UI" icon
