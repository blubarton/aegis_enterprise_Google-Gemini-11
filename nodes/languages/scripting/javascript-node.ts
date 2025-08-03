import { LanguageBaseNode } from '../language-base-node';
import { QuantumProcessor } from '../../../core/quantum-processor';

export class JavaScriptNode extends LanguageBaseNode {
    constructor(quantumProcessor: QuantumProcessor) {
        super(quantumProcessor);
        this.languageName = 'JavaScript';
        this.fileExtension = 'js';
        this.runCommand = 'node {file} < {input} > {output}';
    }
}
