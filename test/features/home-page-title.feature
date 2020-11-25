@smoke
Feature: Access to home pages of required websites


@evernote
Scenario: As a user I should have access to Evernote home page
    Given I open "Evernote" home page
    Then Page title should include text "Organize Your Notes with Evernote"
    And Page title should not include text "any other text"


@common
Scenario Outline: <Number> As a user I should have access to <Page Name> home page
    Given I open "<Page Name>" home page
    Then Page title should include text "<Expected Text>"

Examples:
    | Number | Page Name | Expected Text                     |
    | 1      | AngularJS | AngularJS                         |
    | 2      | Evernote  | Organize Your Notes with Evernote |