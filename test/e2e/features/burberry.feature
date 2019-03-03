@all
Feature: Burberry

@header_icons
  Scenario Outline: I should be able to access <>
    Given I open "https://uk.burberry.com/" url
    When I click "<Icon>"
    Then Text of <Header> should contain <Text>

  Examples:
  | Icon        | Header          | Text               |
  | Login icon  | "Login header"  | "SIGN IN/REGISTER" |
  | Basket icon | "Basket header" | "SHOPPING BAG"     |

  @menu
  Scenario: User can navigate through main menu 
    Given I open "https://uk.burberry.com/" url
    When I wait until "Menu" is present
    And I click "The trench coat"
    Then Page title should be "The Heritage Trench | Burberry"
    And "Menu" should be visible
    And Count of "Menu items" should be "6"
    And Count of "Pre-footer section" should be "3"
    And I wait "10" seconds