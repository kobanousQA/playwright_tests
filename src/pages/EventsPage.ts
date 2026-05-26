import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { LeftSidebar } from '../components/LeftSidebar';
import { TaskCreateForm } from '../components/TaskCreateForm';
import { NotificationsSidebar } from '../components/NotificationsSidebar';

export class HomePage extends BasePage {
    readonly leftSidebar: LeftSidebar;
    readonly taskCreateForm: TaskCreateForm;
    readonly notificationsSidebar: NotificationsSidebar;

    constructor(page: Page) {
        super(page);
        this.leftSidebar = new LeftSidebar(page);
        this.taskCreateForm = new TaskCreateForm(page);
        this.notificationsSidebar = new NotificationsSidebar(page);
    }
}
