import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export default class CheckoutYourInformationPage extends BasePage {

    private firstNameTextField: Locator;
    private lastNameTextField: Locator;
    private postalCodeTextField: Locator;
    private continueButton: Locator;

    constructor(protected page: Page) {
        super(page);
        this.firstNameTextField = this.page.locator('[data-test="firstName"]');
        this.lastNameTextField = this.page.locator('[data-test="lastName"]');
        this.postalCodeTextField = this.page.locator('[data-test="postalCode"]');
        this.continueButton = this.page.locator('[data-test="continue"]');
    }

    public async fillInformation(firstName: string, lastName: string, postalCode: string) {
        await this.fillText(this.firstNameTextField, firstName);
        await this.fillText(this.lastNameTextField, lastName);
        await this.fillText(this.postalCodeTextField, postalCode);
    }

    public async goTocheckoutOverview() {
        await this.clickElement(this.continueButton);
    }


}


