import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export default class CheckoutOverviewPage extends BasePage {

    private finishButton: Locator;

    constructor(protected page: Page) {
        super(page);
        this.finishButton = page.locator('[data-test="finish"]')
    }

    public async clickFinishButton() {
        await this.clickElement(this.finishButton);
    }
}