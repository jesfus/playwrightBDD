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
  aveveagrarisch: AveveagrarischPage;
  dosschemills: DosschemillsPage;
};

export const test = base.extend<Fixtures>({
  commonSteps: async ({ page }, use) => use(new CommonSteps(page)),
  checkingArvestaBrands: async ({ page }, use) => use(new ArvestaPage(page)),
  aveveagrarisch: async ({ page }, use) => use(new AveveagrarischPage(page)),
  dosschemills: async ({ page }, use) => use(new DosschemillsPage(page)),
});
