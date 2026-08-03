import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class PaymentDetailsPage extends BasePage {
    readonly paymentDetailsPageCardName: Locator;
    readonly paymentDetailsPageCardNumber: Locator;
    readonly paymentDetailsPageCVC: Locator;
    readonly paymentDetailsPageExpirationMonth: Locator;
    readonly paymentDetailsPageExpirationYear: Locator;
    readonly paymentDetailsPageConfirmOrderButton: Locator;
    readonly paymentDetailsSuccessAlert: Locator;

    constructor(page: Page) {
        super(page);
        this.paymentDetailsPageCardName = page.locator('[data-qa="name-on-card"]')
        this.paymentDetailsPageCardNumber = page.locator('[data-qa="card-number"]')
        this.paymentDetailsPageCVC = page.locator('[data-qa="cvc"]')
        this.paymentDetailsPageExpirationMonth = page.locator('[data-qa="expiry-month"]')
        this.paymentDetailsPageExpirationYear = page.locator('[data-qa="expiry-year"]')
        this.paymentDetailsPageConfirmOrderButton = page.getByRole('button', ({ name: "Pay and Confirm Order" }));
        this.paymentDetailsSuccessAlert = page.locator('#success_message')
    }
}