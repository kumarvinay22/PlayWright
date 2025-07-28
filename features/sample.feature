@smoke
Feature: Sample Feature

  Scenario Outline: Open a webpage in a specific environment
    Given I navigate to "<path>" in "<env>" environment

    Examples:
      | path      | env  |
      | /home     | qa   |
      | /about    | prod |
      | /contact  | qa   |
