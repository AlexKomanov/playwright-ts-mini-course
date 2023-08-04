import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export default class YourCartPage extends BasePage {

    private cartItem: Locator;
    private cartItemName: Locator;
    private checkoutButton: Locator;


    constructor(protected page: Page) {
        super(page);
        this.cartItem = this.page.locator('[class="cart_item"]');
        this.cartItemName = this.page.locator('[class="inventory_item_name"]');
        this.checkoutButton = this.page.locator('[data-test="checkout"]');
    }

    public async validateNumberOfItems(expectedNumber: number) {
        await expect(this.cartItem).toHaveCount(expectedNumber);
    }

    public async validateItemExistsinCart(productName: string) {
        await expect(this.cartItemName.filter({hasText: productName})).toBeVisible();
    }

    public async goToCheckout() {
        await this.clickElement(this.checkoutButton);
    }

   

}