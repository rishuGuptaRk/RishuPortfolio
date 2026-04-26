'use server';
/**
 * @fileOverview An AI tool to generate summary synopses for projects based on user input.
 *
 * - generateProjectSynopsis - A function that generates an AI-powered project synopsis.
 * - AiProjectSynopsisGeneratorInput - The input type for the generateProjectSynopsis function.
 * - AiProjectSynopsisGeneratorOutput - The return type for the generateProjectSynopsis function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiProjectSynopsisGeneratorInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  projectDescription: z.string().describe('A detailed description of the project.'),
  technologiesUsed: z
    .array(z.string())
    .describe('A list of technologies and tools used in the project.'),
  desiredTone: z
    .string()
    .describe('The desired tone or style for the synopsis (e.g., "professional", "creative", "technical", "enthusiastic").'),
});
export type AiProjectSynopsisGeneratorInput = z.infer<typeof AiProjectSynopsisGeneratorInputSchema>;

const AiProjectSynopsisGeneratorOutputSchema = z.object({
  synopsis: z.string().describe('The AI-generated summary synopsis for the project.'),
});
export type AiProjectSynopsisGeneratorOutput = z.infer<typeof AiProjectSynopsisGeneratorOutputSchema>;

export async function generateProjectSynopsis(
  input: AiProjectSynopsisGeneratorInput
): Promise<AiProjectSynopsisGeneratorOutput> {
  return aiProjectSynopsisGeneratorFlow(input);
}

const projectSynopsisPrompt = ai.definePrompt({
  name: 'projectSynopsisPrompt',
  input: { schema: AiProjectSynopsisGeneratorInputSchema },
  output: { schema: AiProjectSynopsisGeneratorOutputSchema },
  prompt: `You are an AI assistant specialized in generating compelling project synopses for portfolios.
Your goal is to create a concise and engaging summary for a project, tailored to a specific tone or style.

Here are the details of the project:
Project Name: {{{projectName}}}
Project Description: {{{projectDescription}}}
Technologies Used: {{#each technologiesUsed}}
- {{{this}}}
{{/each}}

Please generate a synopsis for this project, keeping the tone/style: {{{desiredTone}}}.
The synopsis should be professional, engaging, and highlight the key aspects and achievements of the project.
Make sure to emphasize the impact or value of the project. The output should be a JSON object containing only the 'synopsis' field.`,
});

const aiProjectSynopsisGeneratorFlow = ai.defineFlow(
  {
    name: 'aiProjectSynopsisGeneratorFlow',
    inputSchema: AiProjectSynopsisGeneratorInputSchema,
    outputSchema: AiProjectSynopsisGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await projectSynopsisPrompt(input);
    return output!;
  }
);
