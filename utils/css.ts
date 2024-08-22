import { expect, Locator } from "playwright/test";

export const expectParentContainsClass = async (
  input: Locator,
  nameClass: string
) => {
  //get parent locator
  const parentLocator = input.locator("..");
  //check if parent div has this className
  const hasErrorClass = await parentLocator.evaluate((element, nameClass) => {
    return element.classList.contains(nameClass);
  }, nameClass);

  expect(hasErrorClass).toBeTruthy();
};
