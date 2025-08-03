import { BaseNode } from '../../../interfaces/node.interface';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { QuantumProcessor } from '../../../core/quantum-processor';

export abstract class LanguageBaseNode implements BaseNode {
    protected quantumProcessor: QuantumProcessor;
    protected tempDir: string;
    protected languageName: string;
    protected fileExtension: string;
    protected compileCommand?: string;
    protected runCommand: string;
    
    constructor(quantumProcessor: QuantumProcessor) {
        this.quantumProcessor = quantumProcessor;
        this.tempDir = path.join(process.cwd(), 'temp');
        this.ensureTempDir();
    }
    
    private ensureTempDir(): void {
        if (!fs.existsSync(this.tempDir)) {
            fs.mkdirSync(this.tempDir, { recursive: true });
        }
    }
    
    initialize(): void {
        console.log(`${this.languageName} Node initialized`);
    }
    
    async execute(payload: any): Promise<any> {
        const { code, args = [], input = '', compile = false } = payload;
        
        try {
            // Quantum-enhanced code optimization
            const quantumEnhancedCode = this.quantumProcessor.optimizeCode(code);
            
            // Create temporary files
            const fileId = uuidv4();
            const sourceFile = path.join(this.tempDir, `${fileId}.${this.fileExtension}`);
            const inputFile = path.join(this.tempDir, `${fileId}.input`);
            const outputFile = path.join(this.tempDir, `${fileId}.output`);
            
            fs.writeFileSync(sourceFile, quantumEnhancedCode);
            fs.writeFileSync(inputFile, input);
            
            // Compile if needed
            if (compile && this.compileCommand) {
                await this.executeCommand(
                    this.compileCommand.replace('{file}', sourceFile),
                    this.tempDir
                );
            }
            
            // Execute the code
            const runCmd = this.runCommand
                .replace('{file}', sourceFile)
                .replace('{input}', inputFile)
                .replace('{output}', outputFile);
            
            const executionResult = await this.executeCommand(runCmd, this.tempDir);
            
            // Read output
            let output = '';
            if (fs.existsSync(outputFile)) {
                output = fs.readFileSync(outputFile, 'utf8');
            }
            
            // Cleanup temporary files
            this.cleanupFiles([sourceFile, inputFile, outputFile]);
            
            return {
                success: true,
                output: output.trim(),
                executionResult
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.message,
                output: ''
            };
        }
    }
    
    private executeCommand(command: string, cwd: string): Promise<string> {
        return new Promise((resolve, reject) => {
            exec(command, { cwd }, (error, stdout, stderr) => {
                if (error) {
                    reject(new Error(`Command failed: ${error.message}\n${stderr}`));
                } else {
                    resolve(stdout);
                }
            });
        });
    }
    
    private cleanupFiles(files: string[]): void {
        files.forEach(file => {
            if (fs.existsSync(file)) {
                try {
                    fs.unlinkSync(file);
                } catch (error) {
                    console.warn(`Failed to delete temp file: ${file}`);
                }
            }
        });
    }
    
    cleanup(): void {
        // Clean up the temp directory
        if (fs.existsSync(this.tempDir)) {
            fs.rmSync(this.tempDir, { recursive: true, force: true });
        }
    }
}
