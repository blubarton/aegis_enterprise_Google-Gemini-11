import { LanguageBaseNode } from '../language-base-node';
import { QuantumProcessor } from '../../../core/quantum-processor';
import path from 'path';

export class JavaNode extends LanguageBaseNode {
    constructor(quantumProcessor: QuantumProcessor) {
        super(quantumProcessor);
        this.languageName = 'Java';
        this.fileExtension = 'java';
        this.compileCommand = 'javac {file}';
        this.runCommand = 'java -cp ' + path.dirname('{file}') + ' ' + 
                          path.basename('{file}', '.java') + ' < {input} > {output}';
    }
}
