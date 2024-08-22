import { Page } from "playwright/test";

export type MouseEventType =
  | "click"
  | "dblclick"
  | "mousedown"
  | "mouseup"
  | "mousemove"
  | "mouseover"
  | "mouseout"
  | "mouseenter"
  | "mouseleave"
  | "contextmenu"
  | "wheel";

export const dispatchMouseEventBySelector = async (
  page: Page,
  selectorToEvaluate: string,
  mouseEvent: MouseEventType
): Promise<void> => {
  return await page.evaluate(
    ({ selector, eventType }) => {
      const element = document.querySelector(selector);
      if (element) {
        const event = new MouseEvent(eventType, {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        element.dispatchEvent(event);
      }
    },
    { selector: selectorToEvaluate, eventType: mouseEvent }
  );
};
