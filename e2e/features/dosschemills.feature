Feature: Manage Dosschemills Page Behavior

  Scenario: Search for Artisan and Verify Results
    Given I open url "https://www.dosschemills.com/en"
    When I accept cookies button "Accept"
    When I enter "artisan" in the search field
    Then I should see "Search Results" in the title
    Then I should see more than 0 search results
    Then a product with "Action Antipan Maya" in the name should be listed
    When I click on one of the products with text "Action Artipan Maya"
    Then an image should be present

  Scenario Outline: Search for <Product> and Verify Results
    Given I open url "https://www.dosschemills.com/en"
    When I accept cookies button "Accept"
    When I enter "<SearchTerm>" in the search field
    Then I should see "<Title>" in the title
    Then I should see more than 0 search results
    Then a product with "<ProductName>" in the name should be listed
    When I click on one of the products with text "<ProductName>"
    Then an image should be present

    Examples:
      | SearchTerm | Title          | ProductName                    |
      | flour      | Search Results | 100% whole grain, 100% healthy |

  Scenario Outline: Search for <Product> and Verify NO Results
    Given I open url "https://www.dosschemills.com/en"
    When I accept cookies button "Accept"
    When I enter "<SearchTerm>" in the search field
    Then I should see "<Title>" in the title
    Then I should see 0 search results

    Examples:
      | SearchTerm | Title          |
      | fffffffff  | Search Results |
