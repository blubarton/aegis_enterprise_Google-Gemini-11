import { LanguageBaseNode } from '../language-base-node';
import { QuantumProcessor } from '../../../core/quantum-processor';

export class PythonNode extends LanguageBaseNode {
    constructor(quantumProcessor: QuantumProcessor) {
        super(quantumProcessor);
        this.languageName = 'Python';
        this.fileExtension = 'py';
        this.runCommand = 'python {file} < {input} > {output}';
    }
}
