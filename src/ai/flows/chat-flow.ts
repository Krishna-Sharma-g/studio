"use server";
/**
 * @fileOverview A simple AI chatbot flow for M&M Bank.
 *
 * - chat - A function that takes a user query and returns an AI-generated response.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { getAI } from '@/ai/genkit';
import { z } from 'genkit';

const ChatInputSchema = z.object({
  query: z.string().describe('The user\'s question to the chatbot.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe('The AI-generated response.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  const ai = await getAI();

  const prompt = ai.definePrompt({
    name: 'chatPrompt',
    input: { schema: ChatInputSchema },
    output: { schema: ChatOutputSchema },
    prompt: `You are a friendly and helpful banking assistant for M&M Bank.
Your goal is to answer the user's questions in simple, clear, and easy-to-understand English.
Avoid jargon and complex financial terms.

User's question: {{{query}}}`,
  });

  const chatFlow = ai.defineFlow(
    {
      name: 'chatFlow',
      inputSchema: ChatInputSchema,
      outputSchema: ChatOutputSchema,
    },
    async (input) => {
      const { output } = await prompt(input);
      return output!;
    }
  );

  const result = await chatFlow(input);
  return result;
}