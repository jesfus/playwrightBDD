import { expect, Page } from "@playwright/test";
import { dispatchMouseEventBySelector } from "@utils/events";
import { Fixture, Then, When } from "playwright-bdd/decorators";

export default
@Fixture("checkingArvestaBrands")
class ArvestaPage {
  constructor(public page: Page) {
    this.page = page;
  }

  @When("I click navigation menu {string}")
  async clickNavigationMenu(menuLabel: string) {
    const navigationLinkSelector = `a[title="${menuLabel}"]`;
    const bgHeaderLocator = this.page.locator(".bg-header");

    const linkLocator = bgHeaderLocator.locator(navigationLinkSelector);

    // Ensure the link is visible and interactable before clicking
    await linkLocator.waitFor({ state: "visible" });

    //important to leave some time for the menu to appear
    await this.page.waitForTimeout(500);

    //force mouse event otherwise will not work
    await dispatchMouseEventBySelector(
      this.page,
      navigationLinkSelector,
      "mouseover"
    );

    // Create a locator for the <a> element based on href, text content, and class
    const menulinkLocator = this.page.locator(
      'a[href="/en/strong-brands"]:has-text("Strong brands").navItem'
    );
    // Ensure the link is visible and interactable before clicking
    await menulinkLocator.waitFor({ state: "visible" });

    // Click on the located <a> element
    await menulinkLocator.click();
  }

  @When("I click checkbox {string}")
  async clickCheckbox(checkboxLabel: string) {
    const checkboxSelected = await this.page
      .getByRole("button", { name: checkboxLabel, exact: true })
      .first()
      .click();
  }

  @Then("I see in title {string}")
  async seeInTitle(expectedTitle: string) {
    await this.page.click(`button:has-text("${expectedTitle}")`);

    await expect(this.page).toHaveScreenshot(`"${expectedTitle}.png`);
  }
}
