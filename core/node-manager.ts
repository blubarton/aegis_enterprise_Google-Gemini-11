import { SecurityEngine } from './security';
import { BaseNode } from '../interfaces/node.interface';

// Platform nodes
import { AndroidNode } from '../nodes/platform/android-node';
import { IosNode } from '../nodes/platform/ios-node';
import { WindowsNode } from '../nodes/platform/windows-node';
import { MacosNode } from '../nodes/platform/macos-node';
import { LinuxNode } from '../nodes/platform/linux-node';

// File system nodes
import { FileCreationNode } from '../nodes/filesystem/file-creation-node';
import { DirectoryCreationNode } from '../nodes/filesystem/directory-creation-node';
import { FileManagementNode } from '../nodes/filesystem/file-management-node';

// Browser nodes
import { ChromeNode } from '../nodes/browser/chrome-node';
import { FirefoxNode } from '../nodes/browser/firefox-node';
import { EdgeNode } from '../nodes/browser/edge-node';
import { SafariNode } from '../nodes/browser/safari-node';

// AI nodes
import { ComputerVisionNode } from '../nodes/ai/computer-vision-node';
import { NlpNode } from '../nodes/ai/nlp-node';
import { MlNode } from '../nodes/ai/ml-node';
import { QuantumProcessor } from './quantum-processor';
import { McpAdapter, McpSystem } from './mcp-adapter';

const NODE_CONFIG = {
    browser: {
        chrome: {
            headless: false,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process'
            ]
        },
        firefox: {
            headless: false,
            product: 'firefox',
            args: ['-headless']
        },
        edge: {
            headless: false,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        },
        safari: {
            headless: false
        }
    }
};

export class NodeManager {
    private nodes: Map<string, BaseNode<any, any>> = new Map();
    private securityEngine: SecurityEngine;
    private quantumProcessor: QuantumProcessor;
    private mcpAdapter: McpAdapter;

    constructor(securityEngine: SecurityEngine) {
        this.securityEngine = securityEngine;
        this.quantumProcessor = new QuantumProcessor();
        this.mcpAdapter = new McpAdapter();
    }

    public loadNodes(): void {
        // Load platform nodes
        this.registerNode('android', new AndroidNode());
        this.registerNode('ios', new IosNode());
        this.registerNode('windows', new WindowsNode());
        this.registerNode('macos', new MacosNode());
        this.registerNode('linux', new LinuxNode());

        // Load file system nodes
        this.registerNode('fileCreation', new FileCreationNode());
        this.registerNode('directoryCreation', new DirectoryCreationNode());
        this.registerNode('fileManagement', new FileManagementNode());

        // Load browser nodes
        this.registerNode('chrome', new ChromeNode(NODE_CONFIG.browser.chrome));
        this.registerNode('firefox', new FirefoxNode(NODE_CONFIG.browser.firefox));
        this.registerNode('edge', new EdgeNode(NODE_CONFIG.browser.edge));
        this.registerNode('safari', new SafariNode(NODE_CONFIG.browser.safari));

        // Load AI nodes
        const visionNode = new ComputerVisionNode(this.quantumProcessor);
        const nlpNode = new NlpNode(this.quantumProcessor);
        const mlNode = new MlNode(this.quantumProcessor);

        this.registerNode('computerVision', visionNode);
        this.registerNode('nlp', nlpNode);
        this.registerNode('ml', mlNode);
    }

    public registerNode(nodeType: string, node: BaseNode<any, any>): void {
        if (!this.securityEngine.validateNode(node)) {
            throw new Error(`Security validation failed for node: ${nodeType}`);
        }
        this.nodes.set(nodeType, node);
    }

    public execute(task: any): any {
        const node = this.nodes.get(task.nodeType);
        if (!node) throw new Error(`Node not found: ${task.nodeType}`);

        return node.execute(task.payload);
    }

    public releaseAll(): void {
        this.nodes.forEach(node => node.cleanup());
        this.nodes.clear();
    }

    public registerMcpSystem(system: McpSystem): void {
        this.mcpAdapter.registerSystem(system);
    }

    public processThroughMcp(input: any): any {
        return this.mcpAdapter.processThroughSystem(input);
    }

    public broadcastToMcp(output: any): void {
        this.mcpAdapter.broadcast(output);
    }
}
</create_file>
