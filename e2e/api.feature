Feature: api endpoints expose runtime info

  Background:
    Given the api is reachable

  Scenario: /version returns a semver
    When I GET "/version"
    Then the response status is 200
    And the JSON field "version" matches semver

  Scenario: /status reports health, uptime and version
    When I GET "/status"
    Then the response status is 200
    And the JSON field "version" matches semver
    And the JSON field "healthy" equals true
    And the JSON field "uptime_s" is a non-negative integer

  Scenario: /info returns runtime metadata
    When I GET "/info"
    Then the response status is 200
    And the JSON field "name" equals "multicz-demo"
    And the JSON field "version" matches semver
