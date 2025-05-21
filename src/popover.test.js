const puppeteer = require('puppeteer');

describe('Popover Widget', () => {
	let browser;
	let page;

	beforeAll(async () => {
		browser = await puppeteer.launch();
		page = await browser.newPage();
		await page.goto('http://localhost:8080');
	});

	afterAll(async () => {
		await browser.close();
	});

	it('should display popover when button is clicked', async () => {
		await page.click('#popoverButton');
		const popoverVisible = await page.evaluate(() => {
			const popover = document.querySelector('.popover');
			return popover && window.getComputedStyle(popover).display !== 'none';
		});
		expect(popoverVisible).toBe(true);
	});

	it('should hide popover when button is clicked again', async () => {
		await page.click('#popoverButton'); // first click shows it
		await page.click('#popoverButton'); // second click should hide it
		const popoverVisible = await page.evaluate(() => {
			const popover = document.querySelector('.popover');
			return popover && window.getComputedStyle(popover).display !== 'none';
		});
		expect(popoverVisible).toBe(false);
	});

	it('should hide popover when clicking outside', async () => {
		await page.click('#popoverButton'); // show popover
		await page.click('body'); // click outside
		const popoverVisible = await page.evaluate(() => {
			const popover = document.querySelector('.popover');
			return popover && window.getComputedStyle(popover).display !== 'none';
		});
		expect(popoverVisible).toBe(false);
	});

	it('should have correct title and content', async () => {
		await page.click('#popoverButton');
		const title = await page.$eval('.popover-header', el => el.textContent);
		const content = await page.$eval('.popover-body', el => el.textContent);

		expect(title).toBe('Popover title');
		expect(content).toBe("And here's some amazing content. It's very engaging. Right?");
	});
});