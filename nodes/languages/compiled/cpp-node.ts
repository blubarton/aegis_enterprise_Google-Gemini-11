import { LanguageBaseNode } from '../language-base-node';
import { QuantumProcessor } from '../../../core/quantum-processor';
import fs from 'fs';
import path from 'path';

export class CppNode extends LanguageBaseNode {
    constructor(quantumProcessor: QuantumProcessor) {
        super(quantumProcessor);
        this.languageName = 'C++';
        this.fileExtension = 'cpp';
        this.compileCommand = 'g++ {file} -o {file}.out';
        this.runCommand = '{file}.out < {input} > {output}';
    }
    
    async execute(payload: any): Promise<any> {
        const result = await super.execute(payload);
        // Clean up compiled binary
        if (result.success && payload.compile) {
            const fileId = payload.fileId || '';
            const binaryFile = path.join(this.tempDir, `${fileId}.cpp.out`);
            if (fs.existsSync(binaryFile)) {
                fs.unlinkSync(binaryFile);
            }
        }
        return result;
    }
}
