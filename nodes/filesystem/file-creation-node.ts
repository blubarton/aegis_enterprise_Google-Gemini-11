import { BaseNode } from '../../interfaces/node.interface';
import { ContextEnvelope } from '../../interfaces/node-wrapper';
import fs from 'fs';
import path from 'path';

export class FileCreationNode implements BaseNode<any, any> {
    input!: ContextEnvelope<any>;

    initialize(): void {
        console.log('File Creation Node initialized');
    }

    async process(): Promise<ContextEnvelope<any>> {
        const { data: payload } = this.input;
        return new Promise((resolve, reject) => {
            const { filePath, content } = payload;
            const dir = path.dirname(filePath);
            
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            
            fs.writeFile(filePath, content, (error) => {
                if (error) reject(new Error(`File creation failed: ${error.message}`));
                else resolve({ data: { status: 'success', path: filePath } });
            });
        });
    }

    cleanup(): void {
        // Cleanup resources if needed
    }
}
