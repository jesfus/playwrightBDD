Feature: Arvesta brand site

  Scenario: Check proxani exists
    Given I open url "https://arvesta.eu/en/"
    When I accept cookies button "Accept All Cookies"
    When I click navigation menu "Strong brands"
    When I click checkbox "Animal nutrition"
    Then I see in title "Proxani"

  Scenario Outline: Check brand exists in title
    Given I open url "<url>"
    When I accept cookies button "<cookiesButton>"
    When I click navigation menu "<navigationMenu>"
    When I click checkbox "<checkbox>"
    Then I see in title "<expectedTitle>"

    Examples:
      | url                    | cookiesButton      | navigationMenu | checkbox         | expectedTitle |
      | https://arvesta.eu/en/ | Accept All Cookies | Strong brands  | Potatoes storage | Servagri      |
      | https://arvesta.eu/en/ | Accept All Cookies | Strong brands  | Grain receipt    | Vaesken       |
