import { Locator, Page } from "@playwright/test";

export const fillInput = async (
  page: Page | Locator,
  name: string,
  value: string
) => {
  const input = page.locator(`input[name="${name}"]`);
  // Wait for the input to be visible and enabled
  await input.waitFor({ state: "visible" });

  // Focus the input, fill the value, and trigger change event
  await input.focus();
  // Click the input to ensure it's focused
  await input.click();
  // Fill the input with the desired value
  await input.fill(value);
  // Trigger a change event to ensure the UI updates
  await input.evaluate(input => {
    const event = new Event("change", { bubbles: true });
    input.dispatchEvent(event);
  });

  return input;
};

export const clickButton = async (page: Page | Locator, name: string) => {
  await page.locator(`button[type="${name}"]`).click();
};
