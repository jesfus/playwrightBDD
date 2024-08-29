# Playwright + BDD

Behavior-Driven Development (BDD) is an Agile software development methodology that focuses on collaboration between developers, testers, and business stakeholders to ensure that the software being developed meets business requirements. Here's how BDD testing works:

## Overview of BDD

- **Collaboration**: BDD emphasizes collaboration among the "Three Amigos" — business stakeholders, developers, and testers. This collaboration ensures that everyone has a shared understanding of the desired behavior of the application.
- **Natural Language**: BDD uses a domain-specific language (DSL) that is readable by non-technical stakeholders. This language, often implemented using Gherkin syntax, allows teams to write test scenarios in plain English, making them accessible to all parties involved.
- **Focus on Behavior**: Instead of focusing solely on functionality, BDD centers on the behavior of the application as it relates to business needs. This helps ensure that the software aligns with what the stakeholders want.

## How BDD Testing Works

- **Feature Files**: BDD scenarios are written in feature files using the **[Gherkin](https://cucumber.io/docs/gherkin/reference/)** syntax. These files describe the expected behavior of the application in a structured format using Given-When-Then statements (the extension of this files are **.feature**).
  - **Given**: Sets up the initial context or preconditions.
  - **When**: Describes the action or event that triggers the behavior.
  - **Then**: Specifies the expected outcome or result.
- **Step Definitions**: Each line in a feature file is mapped to code using step definitions. These are the glue code that connects the plain language scenarios to executable code.

- **Automation and Execution**: BDD tools like Cucumber or SpecFlow parse the feature files and execute the corresponding step definitions. This automation ensures that the application behaves as expected according to the scenarios defined.
- **Continuous Integration**: BDD tests are often integrated into the continuous integration pipeline, allowing them to be run automatically whenever changes are made to the codebase. This helps catch issues early and ensures that the software remains aligned with business requirements.

## Benefits of BDD

- **Improved Communication**: By using a common language and involving all stakeholders, BDD improves communication and reduces misunderstandings.
- **Alignment with Business Goals**: BDD ensures that the development process is aligned with business objectives, leading to more relevant and valuable software.
- **Enhanced Test Coverage**: By focusing on behavior, BDD often results in more comprehensive test coverage, identifying edge cases that might be missed with traditional testing approaches.
  Tools for BDD

## Requirements

- [Have installed nvm](https://github.com/nvm-sh/nvm)
- [Have installed direnv ](https://direnv.net/docs/installation.html)

Having these two installled packages once the project is downloaded and when we open the terminal configured with direnv it will automatically install with nvm the needed node version and It will use it.

## Authors

- [@octokatherine](https://www.github.com/octokatherine)

## Libraries

For this project we have used next libraries, for more information:

- [Playwright](https://playwright.dev/docs/intro)
- [Playwright-bdd](https://vitalets.github.io/playwright-bdd/#/)

## Installation

After have installed nvm and direnv just install all dependecies with npm.

```bash
  npm install
```

## Demo

Insert gif or link to demo

## FAQ

#### Question 1

Answer 1

#### Question 2

Answer 2

## Folder and files structure

Project is structured in the next folders:

- playwright.config.ts
- e2e
- .feature-gen
- playwright-report
- test-results
- utils
- .github

### playwright.config.ts

This file is the configuration file for Playwright.

**BDD Configuration:**

- **defineBddConfig** is used to specify directories for BDD features (Given/When/Then) and step definitions, pointing to **"e2e/features"** and **"e2e/fixtures/fixtures.ts"** respectively.
  **Test Configuration:**
- **Parallel Execution**: Tests are configured to run fully in parallel to speed up execution.
- **CI Settings**: - **forbidOnly** ensures that the build fails if test.only is left in the code, which is useful for continuous integration (CI) environments. - **retries** are set to 2 on CI, allowing tests to be retried twice upon failure. - **workers** are limited to 1 on CI to opt out of parallel execution, which can help with resource constraints on CI servers.
  **Reporting**:
- **The reporter** is set to "html", meaning test results will be output in an HTML format which will be placed into folder the **playwright-report**.
  **Artifacts:**
- **Videos** are retained only on test failures (video: "retain-on-failure").
- **Screenshots** are taken only on failure (screenshot: "only-on-failure").
  **Screenshot Expectations:**
- **expect.toHaveScreenshot** is configured with a maxDiffPixelRatio of 0.1, setting a tolerance level for visual regression tests.
  **Projects:**
  The configuration defines multiple projects for different browsers:
- **Chromium:** Uses the configuration for "Desktop Chrome".
- **Webkit:** Uses the configuration for "Desktop Safari".
- **Firefox:** Uses the configuration for "Desktop Firefox".
  This configuration file is tailored for running Playwright tests with BDD features, managing test execution in different environments, and supporting multiple browser targets.

# e2e folder

This is the most important folder where developer will be working for test creation/definition.
Into this folder we can find 3 subfoldes: features/fixures/steps

## Features folder

As was defined in the **playwright.config.ts** file in this folder will contain all **.feature** files for BDD feature scenarios tests definition.
As an example:

```bash
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
```

We can see two parts here, one is the **Scenario** definition and the second one is the **Scenario Outline** (not mandatory) This scenario outline allows for testing multiple examples with different inputs.
It means this scenario will be executed 3 times(one foreach Examples row) with 3 different values which needs to matches with the variables defined in the **Scenario Outline**

## Steps folder

This folder will contain all **.ts** that will map with the .feature files.
Each line in a **.feature** file into **/features** folder is mapped to code using step definitions. These are the glue code that connects the plain language scenarios to executable code.

**_IMPORTANT:_**
A **.feature** definition can't be defined more than once in the steps that's why into steps has been created a file **common.steps.ts**, here we see the content:

```bash
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
```

these are steps that are repeated in different scenarios which cannot be re-defined each time, that's why we create one common definition for all scenarios that want reuse them in the **.features** files. Otherwhise when execute tests it will crash.

In this steps folder .ts files should be created and grouped by fixture which can contain several scenarios.

```bash
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
```

As we can see here this class will contains all definitions for the fixture **checkingArvestaBrands** which can be easily grouped for specific fixtures definitions.

## Fixture folder

It will contain a only one file **fixtures.ts** which will be define all fixtures desired and for each fixture which step file will be used for this definition.
in the next code you can see the **fixtures.ts** content:

```bash
import {
  ArvestaPage,
  AveveagrarischPage,
  CommonSteps,
  DosschemillsPage,
} from "@steps";
import { test as base } from "playwright-bdd";

type Fixtures = {
  commonSteps: CommonSteps;
  checkingArvestaBrands: ArvestaPage;
};

export const test = base.extend<Fixtures>({
  commonSteps: async ({ page }, use) => use(new CommonSteps(page)),
  checkingArvestaBrands: async ({ page }, use) => use(new ArvestaPage(page)),
});
```

Here has been created a new test const for exends as much fixtures as desired, in this case
we have created the **commonSteps** features which will be resolved by class into steps folder **CommonSteps** and the fixture **checkingArvestaBrands** which will be resolved by **ArvestaPage**.

**_IMPORTANT:_**
the fixtures names defined into const test (commonSteps and checkingArvestaBrands) should match with the definition of the step classes Fixture decorator. Otherwise it will end with an error because will not find the expected fixture name
Example:

```bash
export default @Fixture("checkingArvestaBrands")
class ArvestaPage {}
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Tips

In order to make as easy as posible the creation and definiton of test i will suggest follow the next steps:

1. Collect the fixture user case (<User case>) from customer.
2. Send this text to the promt AI overriting <User case> by the user case collected.
   Create Page Object Model 'TodoPage' in TypeScript for the following feature:
   <User case> . _ Use 'page' from '@playwright/test' as constructor parameter. _ Use Given, When, Then from 'playwright-bdd/decorators' as BDD decorators, for example: @Given('pattern {string}'). \* Don't fill methods body.

Let's imagine that the <User case> in this example is : As a user I want to manage a page behaviour: create items, complete items and filter to see only completed items.

the input ended will be like this:

Create Page Object Model 'TodoPage' in TypeScript for the following feature:
As a user I want to manage a page behaviour: create items, complete items and filter to see only completed items. . _ Use 'page' from '@playwright/test' as constructor parameter. _ Use Given, When, Then from 'playwright-bdd/decorators' as BDD decorators, for example: @Given('pattern {string}'). \* Don't fill methods body.

3. Collect AI output it should be something like this:

```bash
import { Page } from '@playwright/test';
import { Given, When, Then } from 'playwright-bdd/decorators';

export class TodoPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  @Given('the user is on the todo page')
  async navigateToTodoPage(): Promise<void> {
    // Navigate to the todo page
  }

  @When('the user creates a todo item with text {string}')
  async createTodoItem(text: string): Promise<void> {
    // Logic to create a new todo item with the specified text
  }

  @When('the user marks the todo item with text {string} as complete')
  async completeTodoItem(text: string): Promise<void> {
    // Logic to mark the specified todo item as complete
  }

  @When('the user filters to show only completed items')
  async filterCompletedItems(): Promise<void> {
    // Logic to filter and show only completed items
  }

  @Then('the todo item with text {string} should be visible')
  async verifyTodoItemVisible(text: string): Promise<void> {
    // Logic to verify that a todo item with the specified text is visible
  }

  @Then('the todo item with text {string} should not be visible')
  async verifyTodoItemNotVisible(text: string): Promise<void> {
    // Logic to verify that a todo item with the specified text is not visible
  }
}

```

Now we have more or less our steps created so we can create a .ts file into the steps folder with the desired name and copy paste this code iside.
Don't forget to add de decorator @Fixture with the desired fixture name for this example we will called "myFirstSteps".
Also important add this new file into **/steps/index.ts** file to export it

4. Add this step into fixture.ts file.
   to do this add into the const test definition the new fixture refering the new class already created before. Lets imagine we have created this class as MyFirstSteps then we create a new fixture called myFirstSteps that will be defined by our class MyFirstSteps from steps folder

```bash
import {
  ArvestaPage,
  CommonSteps,
  MyFirstSteps,
} from "@steps";
import { test as base } from "playwright-bdd";

type Fixtures = {
  commonSteps: CommonSteps;
  checkingArvestaBrands: ArvestaPage;
  myFirstSteps: MyFirstSteps;

};

export const test = base.extend<Fixtures>({
  commonSteps: async ({ page }, use) => use(new CommonSteps(page)),
  checkingArvestaBrands: async ({ page }, use) => use(new ArvestaPage(page)),
  myFirstSteps: async ({ page }, use) => use(new MyFirstSteps(page)),
});

```

5. Create **.feature** file.
   Return to **/steps/index.ts** and comment on all export steps except the last one created (MyFirstSteps).

```bash
// export { default as ArvestaPage } from "e2e/steps/arvesta/arvestaPage.steps";
// export { default as CommonSteps } from "e2e/steps/common.steps";
export { default as MyTest } from "e2e/steps/tirar/myTest.steps";

```

now execute the next command:

```bash
npx bddgen export
```

in your output terminal you will see all <Gherkin steps> defined for your .feature file:

```bash
* Given the user is on the todo page
* When the user creates a todo item with text {string}
* When the user marks the todo item with text {string} as complete
* When the user filters to show only completed items
* Then the todo item with text {string} should be visible
* Then the todo item with text {string} should not be visible
```

Now come back to the AI and past this code overwriting <Gherkin steps> by the steps provided before by the command **_npx bddgen export_** :
Generate BDD scenarios as a single Gherkin file strictly using only the following steps:
<Gherkin steps>

and voilà this should looks like this:

```bash
Feature: Manage Todo Items

  Scenario: Create a todo item
    Given the user is on the todo page
    When the user creates a todo item with text "Buy groceries"
    Then the todo item with text "Buy groceries" should be visible

  Scenario: Complete a todo item
    Given the user is on the todo page
    When the user creates a todo item with text "Read a book"
    And the user marks the todo item with text "Read a book" as complete
    Then the todo item with text "Read a book" should be visible

  Scenario: Filter to show only completed items
    Given the user is on the todo page
    When the user creates a todo item with text "Walk the dog"
    And the user creates a todo item with text "Write a report"
    And the user marks the todo item with text "Walk the dog" as complete
    And the user filters to show only completed items
    Then the todo item with text "Walk the dog" should be visible
    Then the todo item with text "Write a report" should not be visible
```

now just go to **/features** folder create your own .feature file and paste the previous output.
If we want go one more step forward we can now add another input to the AI, paste this text:

```bash
create Scenario Outline:
```

and we will have something an output like this:

```bash
Feature: Manage Todo Items

  Scenario Outline: Create, complete, and filter todo items
    Given the user is on the todo page
    When the user creates a todo item with text "<item1>"
    And the user creates a todo item with text "<item2>"
    And the user marks the todo item with text "<item1>" as complete
    And the user filters to show only completed items
    Then the todo item with text "<item1>" should be visible
    Then the todo item with text "<item2>" should not be visible

  Examples:
    | item1         | item2          |
    | "Buy milk"    | "Clean house"  |
    | "Read book"   | "Write email"  |
    | "Walk dog"    | "Cook dinner"  |
```

where we can override it with real text scenarios for the Examples
