import { BaseNode } from '../../interfaces/node.interface';
import { ContextEnvelope } from '../../interfaces/node-wrapper';
import fs from 'fs';

export class FileManagementNode implements BaseNode<any, any> {
    input!: ContextEnvelope<any>;

    initialize(): void {
        console.log('File Management Node initialized');
    }

    async process(): Promise<ContextEnvelope<any>> {
        const { data: payload } = this.input;
        return new Promise((resolve, reject) => {
            const { operation, path, newPath, content } = payload;
            
            switch (operation) {
                case 'read':
                    this.readFile(path, resolve, reject);
                    break;
                case 'write':
                    this.writeFile(path, content, resolve, reject);
                    break;
                case 'delete':
                    this.deleteFile(path, resolve, reject);
                    break;
                case 'copy':
                    this.copyFile(path, newPath, resolve, reject);
                    break;
                case 'move':
                    this.moveFile(path, newPath, resolve, reject);
                    break;
                default:
                    reject(new Error(`Unsupported file operation: ${operation}`));
            }
        });
    }

    private readFile(filePath: string, resolve: any, reject: any) {
        fs.readFile(filePath, 'utf8', (error, data) => {
            if (error) reject(new Error(`File read failed: ${error.message}`));
            else resolve({ content: data });
        });
    }

    private writeFile(filePath: string, content: string, resolve: any, reject: any) {
        fs.writeFile(filePath, content, (error) => {
            if (error) reject(new Error(`File write failed: ${error.message}`));
            else resolve({ status: 'success' });
        });
    }

    private deleteFile(filePath: string, resolve: any, reject: any) {
        fs.unlink(filePath, (error) => {
            if (error) reject(new Error(`File delete failed: ${error.message}`));
            else resolve({ status: 'success' });
        });
    }

    private copyFile(source: string, destination: string, resolve: any, reject: any) {
        fs.copyFile(source, destination, (error) => {
            if (error) reject(new Error(`File copy failed: ${error.message}`));
            else resolve({ status: 'success', source, destination });
        });
    }

    private moveFile(source: string, destination: string, resolve: any, reject: any) {
        fs.rename(source, destination, (error) => {
            if (error) reject(new Error(`File move failed: ${error.message}`));
            else resolve({ status: 'success', source, destination });
        });
    }

    cleanup(): void {
        // Cleanup resources if needed
    }
}
