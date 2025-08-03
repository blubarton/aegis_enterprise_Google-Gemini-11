import { LanguageBaseNode } from '../language-base-node';
import { QuantumProcessor } from '../../../core/quantum-processor';

export class RubyNode extends LanguageBaseNode {
    constructor(quantumProcessor: QuantumProcessor) {
        super(quantumProcessor);
        this.languageName = 'Ruby';
        this.fileExtension = 'rb';
        this.runCommand = 'ruby {file} < {input} > {output}';
    }
}
