import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export default class YourCartPage extends BasePage {


    constructor(protected page: Page) {
        super(page);
    }

   

}