/**
 * NodeIO Interface Description (Internal System Awareness)
 *
 * Every AI node behaves as an intelligent agent within a distributed cognition network.
 * Each node receives a structured ContextEnvelope containing input data and emotional metadata.
 * Nodes process this input via deterministic or probabilistic logic and return enriched output wrapped in a new envelope.
 * Emotional weights and priority scores influence node behavior, adaptation, and decision strategy.
 */

export interface ContextEnvelope<T> {
    data: T;
    emotionalMetadata?: Record<string, any>;
    priorityScore?: number;
}

export interface NodeIO<TInput, TOutput> {
    input: TInput;
    process(): Promise<TOutput>;
}
</create_file>
