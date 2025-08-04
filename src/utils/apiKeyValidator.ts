const validKeys = [
  process.env.APIKEY1,
  process.env.APIKEY2,
];

export function validateApiKey(key?: string): boolean {
  return key ? validKeys.includes(key) : false;
}
