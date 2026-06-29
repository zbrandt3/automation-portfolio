import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { baseUser } from "../utils/test-data";

export class LoginPage extends BasePage {
    readonly loginEmail: Locator;
    readonly loginPassword: Locator;
    readonly loginButton: Locator;
    readonly registerEmail: Locator;
    readonly registerName: Locator;
    readonly url: string;
    readonly successUrl: string;

    constructor(page: Page) {
        super(page);
        this.loginEmail = page.locator('[data-qa="login-email"]');
        this.loginPassword = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');
        this.registerName = page.locator('[data-qa="signup-name]')
        this.registerEmail = page.locator('[data-qa="signup-email]')
        this.url = "https://automationexercise.com/login";
        this.successUrl = "https://automationexercise.com";
    }

    async login(email: string, password: string) {
        await this.loginEmail.fill(email);
        await this.loginPassword.fill(password);
        await this.loginButton.click();
    }

    async register(name: string) {
        const email = () => {

        }
    }
}

