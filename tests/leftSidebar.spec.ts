import { test, expect } from '@playwright/test';
import { testit } from 'testit-adapter-playwright';
import { prepareMockSession } from '../src/helpers/MockSession';
import { HomePage } from '../src/pages/HomePage';

test.describe('Навигация через кнопки левого сайдбара', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        await prepareMockSession(page);
        homePage = new HomePage(page);
        await homePage.goto('/');
    });

    test.afterEach(async ({ page }) => {
        await page.evaluate(() => {
            localStorage.clear();
            sessionStorage.clear();
        });
    });

    test('Переход на страницу задач по кнопке "Задачник"', async ({ page }) => {
        await testit.step('Перейти на страницу "События"', async () => {
            await homePage.leftSidebar.navigateToEvents();
            await expect(page).toHaveURL(/\/events/);
        });

        await testit.step('Нажать кнопку "Задачник" в левом сайдбаре', async () => {
            await homePage.leftSidebar.navigateToTasks();
        });

        await testit.step('Проверить, что страница задач загружена', async () => {
            await expect(page).toHaveURL(/\/$/);
            await page.waitForLoadState('domcontentloaded');
        });

        await testit.step('Проверить, что кнопка "Задачник" подсвечена синим', async () => {
            await expect.poll(() => homePage.leftSidebar.isButtonHighlighted(homePage.leftSidebar.taskButton)).toBe(true);
        });

        await testit.step('Проверить, что кнопка "События" не подсвечена', async () => {
            await expect.poll(() => homePage.leftSidebar.isButtonHighlighted(homePage.leftSidebar.eventsButton)).toBe(false);
        });
    });

    test('Переход на страницу событий по кнопке "События"', async ({ page }) => {
        await testit.step('Нажать кнопку "События" в левом сайдбаре', async () => {
            await homePage.leftSidebar.navigateToEvents();
        });

        await testit.step('Проверить, что страница событий загружена', async () => {
            await expect(page).toHaveURL(/\/events/);
            await page.waitForLoadState('domcontentloaded');
        });

        await testit.step('Проверить, что кнопка "События" подсвечена синим', async () => {
            await expect.poll(() => homePage.leftSidebar.isButtonHighlighted(homePage.leftSidebar.eventsButton)).toBe(true);
        });

        await testit.step('Проверить, что кнопка "Задачник" не подсвечена', async () => {
            await expect.poll(() => homePage.leftSidebar.isButtonHighlighted(homePage.leftSidebar.taskButton)).toBe(false);
        });
    });

    test('Переход на страницу уведомлений по кнопке "Уведомления"', async ({ page }) => {
        await testit.step('Нажать кнопку "Уведомления" в левом сайдбаре', async () => {
            await homePage.leftSidebar.navigateToNotifications();
        });

        await testit.step('Проверить, что панель уведомлений отображается', async () => {
            await expect(page.getByRole('heading', { name: 'УВЕДОМЛЕНИЯ' })).toBeVisible();
        });
    });

    test('Кнопка "Создать задачу" видима в сайдбаре', async () => {
        await testit.step('Проверить, что кнопка "Создать задачу" отображается', async () => {
            await expect(homePage.leftSidebar.createTaskButton).toBeVisible();
        });
    });

    test('Переключение между разделами скрывает контент предыдущего раздела', async ({ page }) => {
        await testit.step('Открыть раздел "Задачник"', async () => {
            await homePage.leftSidebar.navigateToTasks();
        });

        await testit.step('Проверить, что страница задач загружена', async () => {
            await expect(page).toHaveURL(/\/$/);
            await page.waitForLoadState('domcontentloaded');
        });

        await testit.step('Переключиться на раздел "События"', async () => {
            await homePage.leftSidebar.navigateToEvents();
        });

        await testit.step('Проверить, что страница событий загружена', async () => {
            await expect(page).toHaveURL(/\/events/);
            await page.waitForLoadState('domcontentloaded');
        });

        await testit.step('Переключиться на раздел "Уведомления"', async () => {
            await homePage.leftSidebar.navigateToNotifications();
        });

        await testit.step('Проверить, что панель уведомлений отображается', async () => {
            await expect(page.getByRole('heading', { name: 'УВЕДОМЛЕНИЯ' })).toBeVisible();
        });
    });
});
