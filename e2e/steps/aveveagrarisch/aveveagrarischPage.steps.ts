import { expect, Page } from "@playwright/test";
import { fillInput } from "@utils/controls";
import { Fixture, Then, When } from "playwright-bdd/decorators";

export default
@Fixture("aveveagrarisch")
class AveveagrarischPage {
  constructor(public page: Page) {
    this.page = page;
  }

  @When("I enter postal code {string} in the search box next to the map")
  async enterPostalCode(postalCode: string) {
    await fillInput(this.page, "location", postalCode);
  }
  @When("I select option {string}")
  async selectPostalCodeOption(option: string) {
    const listItem = this.page.locator("ul.list-none li", {
      hasText: option,
    });
    // Ensure the list item is visible
    await expect(listItem).toBeVisible();
    // Select item
    await listItem.click();
    //press enter to execute the search
    await this.page.keyboard.press("Enter");
  }

  @Then(
    "I check that one of the locations found contains the city name {string}"
  )
  async checkLocationContainsCity(cityName: string) {
    const liLocator = this.page.locator(
      `ul.bg-dealerOverview-list > li:has-text("${cityName}")`
    );

    await expect(liLocator).toHaveCount(1);
  }

  @Then("I verify search results for postal code are in google maps")
  async verifySearchResultsInGoogleMaps() {
    await this.page.setViewportSize({ width: 1024, height: 800 });
    //get map search div
    const mapDiv = this.page.locator(
      'div[data-testid="map"].dealer-overview-map'
    );
    await mapDiv.waitFor({ state: "visible" });
    await mapDiv.scrollIntoViewIfNeeded();
    // Ensure the div is visible
    await expect(mapDiv).toBeVisible();
    await this.page.waitForTimeout(2000);

    await expect(this.page).toHaveScreenshot("map.png");
  }
}
