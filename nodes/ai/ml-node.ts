import { AiBaseNode } from './ai-base-node';
import * as tf from '@tensorflow/tfjs-node';

export class MlNode extends AiBaseNode<any, any> {
    private models: Map<string, tf.LayersModel> = new Map();

    constructor(quantumProcessor: any) {
        super(quantumProcessor);
    }

    async process(): Promise<ContextEnvelope<any>> {
        const { data: payload } = this.input;
        const { operation, modelName, data, options } = payload;
        const quantumData = this.quantumProcess(data);

        try {
            let result: any;

            switch (operation) {
                case 'train':
                    result = await this.trainModel(modelName, quantumData, options);
                    break;
                case 'predict':
                    result = await this.predict(modelName, quantumData);
                    break;
                case 'save':
                    result = await this.saveModel(modelName, options.path);
                    break;
                case 'load':
                    result = await this.loadModel(modelName, options.path);
                    break;
                default:
                    throw new Error(`Unsupported ML operation: ${operation}`);
            }

            // Send results to mCP if connected
            this.sendToMcp({ type: 'ml', operation, modelName, result });

            return { data: result };
        } catch (error) {
            throw new Error(`ML operation failed: ${error.message}`);
        }
    }

    private async trainModel(name: string, data: any, options: any): Promise<tf.History> {
        // Simplified training process
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 10, inputShape: [data.inputShape] }));
        model.add(tf.layers.dense({ units: 1 }));

        model.compile({
            optimizer: 'adam',
            loss: 'meanSquaredError'
        });

        const history = await model.fit(data.x, data.y, {
            epochs: options.epochs || 10,
            batchSize: options.batchSize || 32
        });

        this.models.set(name, model);
        return history;
    }

    private async predict(name: string, data: any): Promise<tf.Tensor> {
        if (!this.models.has(name)) {
            throw new Error(`Model not found: ${name}`);
        }
        const model = this.models.get(name);
        // model.predict can return Tensor or Tensor[], cast to Tensor if array
        const prediction = model!.predict(data);
        if (Array.isArray(prediction)) {
            return prediction[0];
        }
        return prediction;
    }

    private async saveModel(name: string, path: string): Promise<boolean> {
        if (!this.models.has(name)) {
            throw new Error(`Model not found: ${name}`);
        }
        const model = this.models.get(name);
        await model!.save(`file://${path}`);
        return true;
    }

    private async loadModel(name: string, path: string): Promise<boolean> {
        const model = await tf.loadLayersModel(`file://${path}/model.json`);
        this.models.set(name, model);
        return true;
    }

    cleanup(): void {
        this.models.forEach(model => model.dispose());
        this.models.clear();
    }
}
</create_file>
