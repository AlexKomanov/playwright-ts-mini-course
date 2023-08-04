import { test } from "@playwright/test";
import LoginPage from "../../pages/LoginPage";
import ApplicationURL from "../../helpers/ApplicationURL";
import ProductsPage from "../../pages/ProductsPage";
import PageTitles from "../../helpers/PageTitles";


test.describe("Positive Login Scenarios", () => {
    
    let loginPage: LoginPage;
    let productsPage: ProductsPage;

    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
    })

    test.afterEach(async() => {
        await productsPage.validateTitle(PageTitles.INVENTORY_PAGE);
    })

    test("Login with standard_user", async() => {
        await loginPage.loginToApplication(process.env.STANDARD_USER, process.env.CORRECT_PASSWORD);
        await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
    })

    test("Login with problem_user", async() => {
        await loginPage.loginToApplication(process.env.PROBLEM_USER);
        await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL)
    })

    test("Login with performance_glitch_user", async() => {
        await loginPage.loginToApplication(process.env.PERFORMANCE_GLITCH_USER);
        await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL)
    })
})