import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export default class CheckoutCompletePage extends BasePage {

    private thankYouMessageElement: Locator;
    private backHomeButton: Locator;

    constructor(protected page: Page) {
        super(page);
        this.thankYouMessageElement = page.locator('[class="complete-header"]');
        this.backHomeButton = this.page.locator('[data-test="back-to-products"]');
    }

    public async validateFinalMessage(expectedMessage: string) {
        await this.validateElementText(this.thankYouMessageElement, expectedMessage);
    }

    public async goBackToProducts() {
        await this.clickElement(this.backHomeButton);
    }
}