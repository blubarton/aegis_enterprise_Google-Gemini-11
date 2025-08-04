import { geminiEngine } from '../services/geminiEngine';
import { APIGatewayProxyEvent } from 'aws-lambda';

export async function processRequest(event: APIGatewayProxyEvent) {
  const input = JSON.parse(event.body || '{}');
  const result = await geminiEngine(input);
  return { result };
}
