import { APIGatewayProxyHandler } from 'aws-lambda';
import { validateApiKey } from './utils/apiKeyValidator';
import { processRequest } from './handlers/processRequest';

export const handler: APIGatewayProxyHandler = async (event) => {
  const apiKey = event.headers['x-api-key'];

  if (!validateApiKey(apiKey)) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: 'Invalid or missing API key' }),
    };
  }

  try {
    const response = await processRequest(event);
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', details: err.message }),
    };
  }
};
