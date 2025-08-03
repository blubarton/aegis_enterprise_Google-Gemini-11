import { LanguageBaseNode } from '../language-base-node';
import { QuantumProcessor } from '../../../core/quantum-processor';

export class PhpNode extends LanguageBaseNode {
    constructor(quantumProcessor: QuantumProcessor) {
        super(quantumProcessor);
        this.languageName = 'PHP';
        this.fileExtension = 'php';
        this.runCommand = 'php {file} < {input} > {output}';
    }
}
