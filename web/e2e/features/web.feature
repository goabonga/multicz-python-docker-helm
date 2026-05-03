Feature: Frontend renders the running versions

  Scenario: web bundle ships its build-time version
    Given I open the home page
    Then the web version badge shows a semver string

  Scenario: web fetches the api version through the same origin
    Given I open the home page
    When the api version finishes loading
    Then the api version badge shows a semver string
