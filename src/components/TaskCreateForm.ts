import { Locator, Page } from '@playwright/test';

export class TaskCreateForm {
    readonly titleInput: Locator;
    readonly descriptionInput: Locator;
    readonly submitButton: Locator;
    readonly cancelButton: Locator;

    constructor(private readonly page: Page) {
        this.titleInput = this.page.getByLabel('Title');
        this.descriptionInput = this.page.getByLabel('Description');
        this.submitButton = this.page.getByRole('button', { name: 'Create' });
        this.cancelButton = this.page.getByRole('button', { name: 'Cancel' });
    }

    async fillTitle(title: string): Promise<void> {
        await this.titleInput.fill(title);
    }

    async fillDescription(description: string): Promise<void> {
        await this.descriptionInput.fill(description);
    }

    async submit(): Promise<void> {
        await this.submitButton.click();
    }

    async cancel(): Promise<void> {
        await this.cancelButton.click();
    }

    async createTask(title: string, description: string): Promise<void> {
        await this.fillTitle(title);
        await this.fillDescription(description);
        await this.submit();
    }
}
