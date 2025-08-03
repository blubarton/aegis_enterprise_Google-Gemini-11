import { BaseNode } from '../../interfaces/node.interface';
import { QuantumProcessor } from '../../core/quantum-processor';
import { McpAdapter } from '../../core/mcp-adapter';
import { ContextEnvelope } from '../../interfaces/node-wrapper';

export abstract class AiBaseNode<TInput = any, TOutput = any> implements BaseNode<ContextEnvelope<TInput>, ContextEnvelope<TOutput>> {
    input!: ContextEnvelope<TInput>;
    protected quantumProcessor: QuantumProcessor;
    protected mcpAdapter: McpAdapter | null = null;

    constructor(quantumProcessor: QuantumProcessor) {
        this.quantumProcessor = quantumProcessor;
    }

    initialize(): void | Promise<void> {
        console.log(`${this.constructor.name} initialized`);
    }

    // Connect to mCP system
    connectToMcp(mcpAdapter: McpAdapter): void {
        this.mcpAdapter = mcpAdapter;
        console.log(`Connected to mCP system: ${mcpAdapter.getSystemName()}`);
    }

    // Process input using quantum enhancements
    protected quantumProcess(input: TInput): TInput {
        return this.quantumProcessor.optimize(input);
    }

    // Send output to mCP system
    protected sendToMcp(output: TOutput): void {
        if (this.mcpAdapter && typeof this.mcpAdapter.broadcast === 'function') {
            this.mcpAdapter.broadcast(output);
        }
    }

    abstract process(): Promise<ContextEnvelope<TOutput>>;
    abstract cleanup(): void | Promise<void>;
}
</create_file>
