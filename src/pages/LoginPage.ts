import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = this.page.getByLabel('Username');
        this.passwordInput = this.page.getByLabel('Password');
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
        this.errorMessage = this.page.locator('[role="alert"]');
    }

    async fillUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async clickLogin(): Promise<void> {
        await this.loginButton.click();
    }

    async login(username: string, password: string): Promise<void> {
        await this.goto('/login');
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLogin();
    }

    async getErrorMessage(): Promise<string | null> {
        return await this.errorMessage.textContent();
    }
}
