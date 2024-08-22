#aveveagrarischPage.steps.ts
Feature: Aveve Agrarisch Store Locator

  Scenario: Search for a location using postal code
    Given I open url "https://aveveagrarisch.be/nl/aveve-agrarische-centra/"
    When I accept cookies button "Alle cookies accepteren"
    When I enter postal code "1000" in the search box next to the map
    When I select option "1000 Brussel, België"
    Then I check that one of the locations found contains the city name "Mollem"
    Then I verify search results for postal code are in google maps
