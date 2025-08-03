export interface McpConnection {
    name: string;
    type: 'http' | 'websocket' | 'grpc' | 'local';
    endpoint: string;
    authentication: {
        type: 'apiKey' | 'oauth2' | 'jwt' | 'quantum';
        credentials: Record<string, string>;
    };
    capabilities: string[];
    enabled: boolean;
}

export interface McpConfig {
    version: string;
    quantumKey: string;
    connections: McpConnection[];
    security: {
        requireEncryption: boolean;
        allowedOrigins: string[];
        maxConnections: number;
    };
}

export const DEFAULT_MCP_CONFIG: McpConfig = {
    version: "1.0",
    quantumKey: "aegis-quantum-entanglement-key",
    connections: [
        {
            name: "VS Code AI",
            type: "http",
            endpoint: "http://localhost:3000/mcp-endpoint",
            authentication: {
                type: "apiKey",
                credentials: {
                    apiKey: "your-vscode-api-key"
                }
            },
            capabilities: ["codeCompletion", "errorDiagnosis", "refactoring"],
            enabled: true
        }
    ],
    security: {
        requireEncryption: true,
        allowedOrigins: ["http://localhost:*", "vscode://*"],
        maxConnections: 10
    }
};

export function loadMcpConfig(): McpConfig {
    // In a real implementation, this would load from a JSON file
    // For now, we'll return the default config
    return DEFAULT_MCP_CONFIG;
}

export function validateMcpConfig(config: McpConfig): boolean {
    // Basic validation logic
    if (!config.quantumKey || config.quantumKey.length < 32) {
        throw new Error("Invalid quantum key");
    }
    
    if (!config.connections || config.connections.length === 0) {
        throw new Error("No connections defined");
    }
    
    return true;
}
