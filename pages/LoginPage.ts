import { Locator, Page, expect } from "@playwright/test";
import UserCredetials from "../helpers/UserCredentials";
import ApplicationURL from "../helpers/ApplicationURL";
import { ErrorMessages } from "../helpers/ErrorMessages";
import { BasePage } from "./BasePage";


export default class LoginPage extends BasePage {

    private usernameField: Locator;
    private passwordField: Locator;
    private loginButton: Locator;
    private errorMessage: Locator;

    
    constructor(protected page: Page) {
        super(page);
        this.usernameField = this.page.locator('[data-test="username"]');
        this.passwordField = this.page.locator('[data-test="password"]');
        this.loginButton = this.page.locator('[data-test="login-button"]');
        this.errorMessage = this.page.locator('[data-test="error"]')
    }


    public async loginToApplication(username = UserCredetials.STANDARD_USER, 
        password = UserCredetials.CORRECT_PASSWORD, 
        url = ApplicationURL.BASE_URL) {
        await this.page.goto(url);
        await this.validatePageUrl(ApplicationURL.BASE_URL);
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    public async validateErrorMessage(errorMessage: ErrorMessages) {
        await this.validateElementText(this.errorMessage, errorMessage.valueOf())
    }

   
}