/**
 * Generic wrapper interface for node input/output envelopes.
 * This wrapper encapsulates the ContextEnvelope pattern for consistent typing.
 */

export interface ContextEnvelope<T> {
    data: T;
    emotionalMetadata?: Record<string, any>;
    priorityScore?: number;
}

export interface NodeWrapper<TInput, TOutput> {
    input: ContextEnvelope<TInput>;
    process(): Promise<ContextEnvelope<TOutput>>;
}
