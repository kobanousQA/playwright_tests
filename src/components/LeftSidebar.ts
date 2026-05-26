import { Locator, Page } from '@playwright/test';

const ACTIVE_COLOR = 'rgb(41, 119, 255)';

export class LeftSidebar {
    readonly taskButton: Locator;
    readonly eventsButton: Locator;
    readonly notificationsButton: Locator;
    readonly createTaskButton: Locator;

    constructor(private readonly page: Page) {
        this.taskButton = this.page.getByRole('button', { name: 'Задачник' });
        this.eventsButton = this.page.getByRole('button', { name: 'События' });
        this.notificationsButton = this.page.getByRole('button', { name: 'Уведомления' });
        this.createTaskButton = this.page.getByRole('complementary').getByRole('button', { name: 'Создать задачу' });
    }

    async navigateToTasks(): Promise<void> {
        await this.taskButton.click();
    }

    async navigateToEvents(): Promise<void> {
        await this.eventsButton.click();
    }

    async navigateToNotifications(): Promise<void> {
        await this.notificationsButton.click();
    }

    async openCreateTaskForm(): Promise<void> {
        await this.createTaskButton.click();
    }

    async getButtonColor(button: Locator): Promise<string> {
        return await button.evaluate(el => window.getComputedStyle(el).color);
    }

    async isButtonHighlighted(button: Locator): Promise<boolean> {
        const color = await this.getButtonColor(button);
        return color === ACTIVE_COLOR;
    }
}
