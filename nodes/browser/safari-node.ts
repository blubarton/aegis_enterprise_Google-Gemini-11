import { BaseBrowserNode } from './base-browser-node';
import { execSync } from 'child_process';

export class SafariNode extends BaseBrowserNode {
    getDefaultExecutablePath(): string {
        if (process.platform !== 'darwin') {
            throw new Error('Safari is only supported on macOS');
        }
        return '/Applications/Safari.app/Contents/MacOS/Safari';
    }

    async initialize(): Promise<void> {
        console.log('Safari Node initialized');
        
        // Safari requires special setup for automation
        try {
            execSync('sudo safaridriver --enable');
        } catch (error) {
            console.warn('Safaridriver enablement might have failed');
        }
        
        this.config = {
            ...this.config,
            executablePath: this.getDefaultExecutablePath()
        };
        
        await super.initialize();
    }
}
