import { BaseBrowserNode } from './base-browser-node';

export class FirefoxNode extends BaseBrowserNode {
    getDefaultExecutablePath(): string {
        switch (process.platform) {
            case 'win32':
                return 'C:\\Program Files\\Mozilla Firefox\\firefox.exe';
            case 'darwin':
                return '/Applications/Firefox.app/Contents/MacOS/firefox';
            case 'linux':
                return '/usr/bin/firefox';
            default:
                throw new Error('Unsupported platform for Firefox');
        }
    }
}
