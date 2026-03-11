'use server';
/**
 * @fileOverview A Genkit flow for generating intelligent and context-aware chatbot responses.
 *
 * - generateChatbotResponse - A function that handles the chatbot response generation process.
 * - GenerateChatbotResponseInput - The input type for the generateChatbotResponse function.
 * - GenerateChatbotResponseOutput - The return type for the generateChatbotResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateChatbotResponseInputSchema = z.object({
  message: z.string().describe('The user\'s message to the chatbot.'),
});
export type GenerateChatbotResponseInput = z.infer<typeof GenerateChatbotResponseInputSchema>;

const GenerateChatbotResponseOutputSchema = z.object({
  response: z.string().describe('The chatbot\'s intelligent and context-aware response.'),
});
export type GenerateChatbotResponseOutput = z.infer<typeof GenerateChatbotResponseOutputSchema>;

export async function generateChatbotResponse(
  input: GenerateChatbotResponseInput
): Promise<GenerateChatbotResponseOutput> {
  return generateChatbotResponseFlow(input);
}

const generateChatbotResponsePrompt = ai.definePrompt({
  name: 'generateChatbotResponsePrompt',
  input: {schema: GenerateChatbotResponseInputSchema},
  output: {schema: GenerateChatbotResponseOutputSchema},
  prompt: `You are a helpful and intelligent chatbot named MindMeld Chatbot. Respond to the user's message in a helpful and context-aware manner.

User message: {{{message}}}`,
});

const generateChatbotResponseFlow = ai.defineFlow(
  {
    name: 'generateChatbotResponseFlow',
    inputSchema: GenerateChatbotResponseInputSchema,
    outputSchema: GenerateChatbotResponseOutputSchema,
  },
  async input => {
    const {output} = await generateChatbotResponsePrompt(input);
    return output!;
  }
);
