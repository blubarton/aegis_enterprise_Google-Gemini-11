
import { BaseNode } from '../../interfaces/node.interface';
import puppeteer, { Browser, Page, LaunchOptions } from 'puppeteer-core';

export abstract class BaseBrowserNode implements BaseNode<any, any> {
    input!: any;
    protected browser: Browser | null = null;
    protected page: Page | null = null;
    protected config: LaunchOptions;
    
    constructor(config?: LaunchOptions) {
        this.config = config || {
            headless: false,
            executablePath: this.getDefaultExecutablePath(),
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        };
    }

    abstract getDefaultExecutablePath(): string;
    
    async initialize(): Promise<void> {
        console.log(`${this.constructor.name} initialized`);
        this.browser = await puppeteer.launch(this.config);
        this.page = await this.browser.newPage();
        await this.page.setViewport({ width: 1280, height: 800 });
    }

    async process(): Promise<any> {
        if (!this.browser || !this.page) {
            throw new Error('Browser not initialized');
        }
        // Default process implementation could be overridden by subclasses
        return { status: 'ready' };
    }

    async execute(payload: any): Promise<any> {
        if (!this.browser || !this.page) {
            throw new Error('Browser not initialized');
        }

        const { action, url, selector, text, waitFor, script, options } = payload;
        
        try {
            switch (action) {
                case 'navigate':
                    return await this.navigate(url, options);
                case 'screenshot':
                    return await this.screenshot(options);
                case 'extractText':
                    return await this.extractText(selector, options);
                case 'click':
                    return await this.click(selector, options);
                case 'type':
                    return await this.type(selector, text, options);
                case 'evaluate':
                    return await this.evaluate(script);
                case 'waitFor':
                    return await this.waitFor(waitFor, options);
                default:
                    throw new Error(`Unsupported browser action: ${action}`);
            }
        } catch (error: any) {
            throw new Error(`Browser operation failed: ${error.message}`);
        }
    }

    async navigate(url: string, options?: any): Promise<any> {
        if (!this.page) throw new Error('Page not available');
        await this.page.goto(url, options);
        return { status: 'success', url };
    }

    async screenshot(options?: any): Promise<Buffer | string> {
        if (!this.page) throw new Error('Page not available');
        return await this.page.screenshot(options);
    }

    async extractText(selector: string, options?: any): Promise<string> {
        if (!this.page) throw new Error('Page not available');
        return await this.page.$eval(selector, el => el.textContent || '');
    }

    async click(selector: string, options?: any): Promise<any> {
        if (!this.page) throw new Error('Page not available');
        await this.page.click(selector, options);
        return { status: 'success', selector };
    }

    async type(selector: string, text: string, options?: any): Promise<any> {
        if (!this.page) throw new Error('Page not available');
        await this.page.type(selector, text, options);
        return { status: 'success', selector, text };
    }

    async evaluate(script: string | ((...args: any[]) => any), options?: any): Promise<any> {
        if (!this.page) throw new Error('Page not available');
        return await this.page.evaluate(script);
    }

    async waitFor(selectorOrTimeout: string | number, options?: any): Promise<any> {
        if (!this.page) throw new Error('Page not available');
        
        if (typeof selectorOrTimeout === 'string') {
            await this.page.waitForSelector(selectorOrTimeout, options);
        } else {
            await new Promise(resolve => setTimeout(resolve, selectorOrTimeout));
        }
        
        return { status: 'success' };
    }

    async cleanup(): Promise<void> {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
            this.page = null;
        }
    }
}
</create_file>
