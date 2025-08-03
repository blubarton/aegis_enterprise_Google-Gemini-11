import { BaseNode } from '../../interfaces/node.interface';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { ContextEnvelope } from '../../interfaces/node-wrapper';

export class MacosNode implements BaseNode<ContextEnvelope<any>, ContextEnvelope<any>> {
    input!: ContextEnvelope<any>;

    initialize(): void {
        console.log('MacOS Node initialized');
    }

    async process(): Promise<ContextEnvelope<any>> {
        const { data: payload } = this.input;
        const { command, args = [] } = payload;

        try {
            switch (command) {
                case 'createFile':
                    const createFileResult = await this.createFile(args[0], args[1]);
                    return { data: createFileResult };
                case 'createDirectory':
                    const createDirResult = await this.createDirectory(args[0]);
                    return { data: createDirResult };
                case 'launchApp':
                    const launchResult = await this.launchApp(args[0]);
                    return { data: launchResult };
                default:
                    throw new Error(`Unsupported MacOS command: ${command}`);
            }
        } catch (error) {
            throw error;
        }
    }

    private createFile(filePath: string, content: string): Promise<{ status: string; path: string }> {
        return new Promise((resolve, reject) => {
            const dir = path.dirname(filePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            fs.writeFile(filePath, content, (error) => {
                if (error) reject(new Error(`MacOS file creation failed: ${error.message}`));
                else resolve({ status: 'success', path: filePath });
            });
        });
    }

    private createDirectory(dirPath: string): Promise<{ status: string; path: string }> {
        return new Promise((resolve, reject) => {
            fs.mkdir(dirPath, { recursive: true }, (error) => {
                if (error) reject(new Error(`MacOS directory creation failed: ${error.message}`));
                else resolve({ status: 'success', path: dirPath });
            });
        });
    }

    private launchApp(appName: string): Promise<{ status: string; app: string }> {
        return new Promise((resolve, reject) => {
            const command = `open -a "${appName}"`;
            exec(command, (error) => {
                if (error) reject(new Error(`MacOS app launch failed: ${error.message}`));
                else resolve({ status: 'success', app: appName });
            });
        });
    }

    cleanup(): void {
        // Cleanup resources if needed
    }
}
