import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { HomePage } from "./home.page";

export class LoginPage extends BasePage {
    readonly loginEmail: Locator;
    readonly loginPassword: Locator;
    readonly loginButton: Locator;
    readonly url: string;
    readonly loginError: Locator;
    readonly registrationSignupName: Locator;
    readonly registrationSignupEmail: Locator;
    readonly registrationSignUpButton: Locator;
    readonly registrationEmailError: Locator;
    readonly registrationContinue: Locator;

    //appears on successful login, not on page itself. Used for validating login

    constructor(page: Page) {
        super(page);
        this.loginEmail = page.locator('[data-qa="login-email"]');
        this.loginPassword = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');
        this.url = "/login";
        this.loginError = page.getByText('Your email or password is incorrect!');

        this.registrationSignupName = page.locator('[data-qa="signup-name"]');
        this.registrationSignupEmail = page.locator('[data-qa="signup-email"]');
        this.registrationSignUpButton = page.locator('[data-qa="signup-button"]');
        this.registrationEmailError = page.getByText('Email Address already exist!');
        this.registrationContinue = page.locator('[data-qa="continue-button"]');

    }

    async login(email: string, password: string) {
        await this.page.goto(this.url);
        await this.loginEmail.fill(email);
        await this.loginPassword.fill(password);
        await this.loginButton.click();
    }

}

