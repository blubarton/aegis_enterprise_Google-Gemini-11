import { NodeManager } from './node-manager';
import { QuantumProcessor } from './quantum-processor';
import { SecurityEngine } from './security';
import { McpConnector } from '../services/mcp-connector';
import { loadMcpConfig, validateMcpConfig, McpConfig } from '../config/mcp-config';

export class Orchestrator {
    private nodeManager: NodeManager;
    private quantumProcessor: QuantumProcessor;
    private securityEngine: SecurityEngine;
    private mcpConnector: McpConnector;
    private mcpConfig: McpConfig;

    constructor() {
        this.securityEngine = new SecurityEngine();
        this.quantumProcessor = new QuantumProcessor();
        this.nodeManager = new NodeManager(this.securityEngine);

        this.mcpConfig = loadMcpConfig();
        validateMcpConfig(this.mcpConfig);

        this.mcpConnector = new McpConnector(
            this.mcpConfig,
            this.quantumProcessor,
            this.securityEngine
        );
    }

    public initialize(): void {
        this.securityEngine.activateFirewall();
        this.nodeManager.loadNodes();
        this.quantumProcessor.boot();
        console.log('Aegis Enterprise AI initialized');
    }

    public processTask(task: any): any {
        const verified: boolean = this.securityEngine.verifyTask(task);
        if (!verified) {
            throw new Error('Security violation');
        }

        const quantumOptimized: any = this.quantumProcessor.optimize(task);
        const result: any = this.nodeManager.execute(quantumOptimized);

        return this.quantumProcessor.compress(result);
    }

    public shutdown(): void {
        this.nodeManager.releaseAll();
        this.quantumProcessor.shutdown();
    }

    public async connectToExternalSystem(systemName: string, payload: any): Promise<any> {
        return this.mcpConnector.connectToSystem(systemName, payload);
    }

    public getMcpConfig(): McpConfig | null {
        return this.mcpConfig || null;
    }
}
</create_file>
