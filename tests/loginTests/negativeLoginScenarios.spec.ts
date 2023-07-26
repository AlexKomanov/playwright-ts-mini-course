import { test } from "@playwright/test";
import LoginPage from "../../pages/LoginPage";
import UserCredetials from "../../helpers/UserCredentials";
import { ErrorMessages } from "../../helpers/ErrorMessages";
import ApplicationURL from "../../helpers/ApplicationURL";


test.describe("Negative Login Scenarios", () => {
    
    let loginPage: LoginPage;

    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page)
    })

    test("Login with locked_out_user", async({page}) => {
        await loginPage.loginToApplication(UserCredetials.LOCKED_OUT_USER);
        await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_LOCKED_USER);
        await loginPage.validatePageUrl(ApplicationURL.BASE_URL)
    })

    test("Login with incorrect username", async({page}) => {
        await loginPage.loginToApplication("useruser");
        await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_INCORRECT_CREDENTIALS)
        await loginPage.validatePageUrl(ApplicationURL.BASE_URL)
    })

    test("Login with incorrect password", async({page}) => {
        await loginPage.loginToApplication(UserCredetials.STANDARD_USER, "blablabla");
        await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_INCORRECT_CREDENTIALS);
        await loginPage.validatePageUrl(ApplicationURL.BASE_URL)
    })
})