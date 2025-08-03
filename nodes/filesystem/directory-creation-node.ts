import { BaseNode } from '../../interfaces/node.interface';
import { ContextEnvelope } from '../../interfaces/node-wrapper';
import fs from 'fs';

export class DirectoryCreationNode implements BaseNode<any, any> {
    input!: ContextEnvelope<any>;

    initialize(): void {
        console.log('Directory Creation Node initialized');
    }

    async process(): Promise<ContextEnvelope<any>> {
        const { data: payload } = this.input;
        return new Promise((resolve, reject) => {
            const { dirPath } = payload;
            
            fs.mkdir(dirPath, { recursive: true }, (error) => {
                if (error) reject(new Error(`Directory creation failed: ${error.message}`));
                else resolve({ data: { status: 'success', path: dirPath } });
            });
        });
    }

    cleanup(): void {
        // Cleanup resources if needed
    }
}
