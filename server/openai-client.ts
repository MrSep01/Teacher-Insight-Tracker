import OpenAI from "openai";

let cachedClient: OpenAI | null | undefined;

export class MissingOpenAIKeyError extends Error {
  constructor() {
    super("OpenAI API key is not configured. Set OPENAI_API_KEY to enable AI features.");
    this.name = "MissingOpenAIKeyError";
  }
}

function resolveOpenAIClient(): OpenAI | null {
  if (cachedClient !== undefined) {
    return cachedClient;
  }

  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    cachedClient = null;
    return cachedClient;
  }

  cachedClient = new OpenAI({ apiKey });
  return cachedClient;
}

export function getOpenAIClient(): OpenAI | null {
  return resolveOpenAIClient();
}

export function requireOpenAIClient(): OpenAI {
  const client = resolveOpenAIClient();
  if (!client) {
    throw new MissingOpenAIKeyError();
  }
  return client;
}

export function isOpenAIConfigured(): boolean {
  return resolveOpenAIClient() !== null;
}
