export interface McpSystem {
    name: string;
    process(input: any): any;
    receive(output: any): void;
}

export class McpAdapter {
    private systems: Map<string, McpSystem> = new Map();

    registerSystem(system: McpSystem): void {
        this.systems.set(system.name, system);
        console.log(`Registered mCP system: ${system.name}`);
    }

    getSystem(name: string): McpSystem | undefined {
        return this.systems.get(name);
    }

    getSystemName(): string {
        return Array.from(this.systems.keys()).join(', ');
    }

    processThroughSystem(input: any): any {
        let result = input;
        this.systems.forEach(system => {
            try {
                result = system.process(result);
            } catch (error) {
                console.error(`Error processing system ${system.name}:`, error);
            }
        });
        return result;
    }

    broadcast(output: any): void {
        this.systems.forEach(system => {
            try {
                system.receive(output);
            } catch (error) {
                console.error(`Error broadcasting to system ${system.name}:`, error);
            }
        });
    }
}
