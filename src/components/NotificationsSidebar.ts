import { Locator, Page } from '@playwright/test';

export class NotificationsSidebar {
    readonly notificationItem: Locator;
    readonly closeButton: Locator;
    readonly inboxButton: Locator;
    readonly sentButton: Locator;

    constructor(private readonly page: Page) {
        this.notificationItem = this.page.getByText(/Согласуйте выполнение задачи|Ваша задача на рассмотрении|Согласуйте завершение задачи/);
        this.closeButton = this.page.getByRole('heading', { name: 'УВЕДОМЛЕНИЯ' }).getByRole('button');
        this.inboxButton = this.page.getByRole('button', { name: /^ВХОДЯЩИЕ\s*(\(\d+\))?$/ });
        this.sentButton = this.page.getByRole('button', { name: /^ОТПРАВЛЕННЫЕ\s*(\(\d+\))?$/ });
    }

    async getNotificationCount(): Promise<number> {
        return await this.notificationItem.count();
    }

    async closeNotifications(): Promise<void> {
        await this.closeButton.click();
    }
}
