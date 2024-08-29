import { expect, Page } from "@playwright/test";
import { Fixture, Then, When } from "playwright-bdd/decorators";
export default
@Fixture("dosschemills")
class DosschemillsPage {
  constructor(public page: Page) {
    this.page = page;
  }

  private searchInput = this.page.locator('input[name="search"]');

  @When("I enter {string} in the search field")
  async enterSearchTerm(term: string) {
    const form = await this.page.getByTestId("search-box");

    const input = form.locator(this.searchInput);
    await input.fill(term);
    await this.page.keyboard.press("Enter");
  }

  @Then("I should see {string} in the title")
  async verifySearchResults(term: string) {
    const headSearch = this.page.getByRole("heading", { name: term });

    // Wait for the submit button to become visible
    await headSearch.waitFor({ state: "visible", timeout: 10000 });
  }

  @Then("I should see more than 0 search results")
  async verifyMoreThanZeroSearchResults() {
    const statsText = this.page.locator(".ais-Stats-text");

    // Assert that the text content matches the pattern for more than 0 results
    await expect(statsText).toHaveText(/^[1-9][0-9]* results found$/);
  }

  @Then("I should see 0 search results")
  async verifyZeroSearchResults() {
    const statsText = this.page.locator(".ais-Stats-text");
    // Assert that the text content matches the pattern for more than 0 results
    await expect(statsText).toHaveText("0 results found");
  }

  @Then("a product with {string} in the name should be listed")
  async verifyArtipanProducts(term: string) {
    await this.page
      .locator("li")
      .filter({ hasText: term })
      .getByTestId("text-link");
  }

  @When("I click on one of the products with text {string}")
  async clickArtipanProduct(term: string) {
    const productTest = this.page
      .locator("li")
      .filter({ hasText: term })
      .getByTestId("text-link");

    await productTest.waitFor({ state: "visible" });
    await productTest.click();
    //i need wait for firefox
    await this.page.waitForTimeout(2000);
  }

  @Then("an image should be present")
  async verifyImagePresence() {
    // Locate the container using the data-testid attribute
    const container = this.page.locator('[data-testid="content-hero"]');
    await container.waitFor({ state: "visible" });
    // Locate an image within the container
    const image = container.locator("img.md\\:hidden");
    image.waitFor({ state: "visible" });
    // Assert that the image is visible within the container
    await expect(image).toBeVisible();
  }
}
