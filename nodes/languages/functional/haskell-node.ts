import { LanguageBaseNode } from '../language-base-node';
import { QuantumProcessor } from '../../../core/quantum-processor';

export class HaskellNode extends LanguageBaseNode {
    constructor(quantumProcessor: QuantumProcessor) {
        super(quantumProcessor);
        this.languageName = 'Haskell';
        this.fileExtension = 'hs';
        this.runCommand = 'runhaskell {file} < {input} > {output}';
    }
}
