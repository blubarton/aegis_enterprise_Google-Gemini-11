import { BaseNode } from '../../interfaces/node.interface';
import { exec } from 'child_process';
import { ContextEnvelope } from '../../interfaces/node-wrapper';

export class AndroidNode implements BaseNode<ContextEnvelope<any>, ContextEnvelope<any>> {
    input!: ContextEnvelope<any>;

    initialize(): void {
        console.log('Android Node initialized');
    }

    async process(): Promise<ContextEnvelope<any>> {
        const { data: payload } = this.input;
        return new Promise((resolve, reject) => {
            const { command, args = [] } = payload;
            
            switch (command) {
                case 'createFile':
                    this.createFile(args[0], args[1], resolve, reject);
                    break;
                case 'createDirectory':
                    this.createDirectory(args[0], resolve, reject);
                    break;
                case 'launchApp':
                    this.launchApp(args[0], resolve, reject);
                    break;
                default:
                    reject(new Error(`Unsupported Android command: ${command}`));
            }
        });
    }

    private createFile(path: string, content: string, resolve: any, reject: any) {
        const adbCommand = `adb shell "echo '${content}' > ${path}"`;
        exec(adbCommand, (error) => {
            if (error) reject(new Error(`Android file creation failed: ${error.message}`));
            else resolve({ data: { status: 'success', path } });
        });
    }

    private createDirectory(path: string, resolve: any, reject: any) {
        const adbCommand = `adb shell mkdir -p ${path}`;
        exec(adbCommand, (error) => {
            if (error) reject(new Error(`Android directory creation failed: ${error.message}`));
            else resolve({ data: { status: 'success', path } });
        });
    }

    private launchApp(packageName: string, resolve: any, reject: any) {
        const adbCommand = `adb shell monkey -p ${packageName} -c android.intent.category.LAUNCHER 1`;
        exec(adbCommand, (error) => {
            if (error) reject(new Error(`Android app launch failed: ${error.message}`));
            else resolve({ data: { status: 'success', app: packageName } });
        });
    }

    cleanup(): void {
        // Cleanup resources if needed
    }
}
