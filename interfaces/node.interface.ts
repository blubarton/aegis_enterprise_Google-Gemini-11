import { NodeWrapper } from './node-wrapper';

export interface BaseNode<TInput = any, TOutput = any> extends NodeWrapper<TInput, TOutput> {
    initialize(): void | Promise<void>;
    cleanup(): void | Promise<void>;
}

export interface PlatformNode<TInput = any, TOutput = any> extends BaseNode<TInput, TOutput> {
    createFile(path: string, content: string): void;
    createDirectory(path: string): void;
}

export interface BrowserNode<TInput = any, TOutput = any> extends BaseNode<TInput, TOutput> {
    navigate(url: string): void;
    executeScript(script: string): any;
}

export interface AINode<TInput = any, TOutput = any> extends BaseNode<TInput, TOutput> {
    processImage(imageData: Buffer): any;
    analyzeText(text: string): any;
}
