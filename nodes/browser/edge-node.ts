import { BaseBrowserNode } from './base-browser-node';

export class EdgeNode extends BaseBrowserNode {
    getDefaultExecutablePath(): string {
        switch (process.platform) {
            case 'win32':
                return 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
            case 'darwin':
                return '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge';
            default:
                throw new Error('Edge is only supported on Windows and macOS');
        }
    }
}
