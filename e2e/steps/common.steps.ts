import { Page } from "@playwright/test";
import { Fixture, Given, When } from "playwright-bdd/decorators";

export default
@Fixture("commonSteps")
class CommonSteps {
  constructor(private page: Page) {}

  @Given("I open url {string}")
  async openUrl(url: string) {
    await this.page.goto(url);
  }

  @When("I accept cookies button {string}")
  async acceptCookies(buttonLabel: string) {
    await this.page.getByRole("button", { name: buttonLabel }).click();
  }
}
