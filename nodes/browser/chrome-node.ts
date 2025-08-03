import { BaseBrowserNode } from './base-browser-node';

export class ChromeNode extends BaseBrowserNode {
    getDefaultExecutablePath(): string {
        switch (process.platform) {
            case 'win32':
                return 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
            case 'darwin':
                return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
            case 'linux':
                return '/usr/bin/google-chrome';
            default:
                throw new Error('Unsupported platform for Chrome');
        }
    }
}
