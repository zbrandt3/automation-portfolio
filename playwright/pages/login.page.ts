import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { BaseUser } from "../utils/test-users";

export class LoginPage extends BasePage {
    readonly loginEmail: Locator;
    readonly loginPassword: Locator;
    readonly loginButton: Locator;
    readonly registerEmail: Locator;
    readonly registerName: Locator;
    readonly url: string;
    //this appears on successful login, not on page itself. Used for validating login
    readonly displayName: Locator;

    constructor(page: Page) {
        super(page);
        this.loginEmail = page.locator('[data-qa="login-email"]');
        this.loginPassword = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');
        this.registerName = page.locator('[data-qa="signup-name"]');
        this.registerEmail = page.locator('[data-qa="signup-email"]');
        this.url = "/login";
        this.displayName = page.locator('b');

    }

    async login(email: string, password: string) {
        await this.loginEmail.fill(email);
        await this.loginPassword.fill(password);
        await this.loginButton.click();
    }

    async register() {
        let user = new BaseUser();
        await this.registerEmail.fill(user.email)
        await this.registerName.fill(user.password)

    }
}

