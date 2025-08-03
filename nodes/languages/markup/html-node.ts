import { LanguageBaseNode } from '../language-base-node';
import { QuantumProcessor } from '../../../core/quantum-processor';

export class HtmlNode extends LanguageBaseNode {
    constructor(quantumProcessor: QuantumProcessor) {
        super(quantumProcessor);
        this.languageName = 'HTML';
        this.fileExtension = 'html';
        this.runCommand = '';
    }
    
    async execute(payload: any): Promise<any> {
        // HTML doesn't execute, but we can parse and render
        const { code } = payload;
        return {
            success: true,
            output: code,
            rendered: true
        };
    }
}
