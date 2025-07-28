@smoke
Feature: Sample Feature

  Scenario Outline: Open a webpage in a specific environment
    Given I navigate to "<path>" in "<env>" environment

    Examples:
      | path  | env |
      | /home | qa  |

  Scenario: Verify the login page UI in QA environment
    Given I navigate to the login page in "qa" environment
    Then I should see the login form with username and password fields

@QA
  Scenario: Verify the login page UI in QA environment
    Given I navigate to the login page in "qa" environment
    Then I should see the login form with username and password fields
