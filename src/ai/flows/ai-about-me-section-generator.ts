'use server';
/**
 * @fileOverview An AI agent for generating 'About Me' sections for a portfolio.
 *
 * - generateAboutMeSection - A function that generates an 'About Me' section based on professional details and tone.
 * - GenerateAboutMeSectionInput - The input type for the generateAboutMeSection function.
 * - GenerateAboutMeSectionOutput - The return type for the generateAboutMeSection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAboutMeSectionInputSchema = z.object({
  professionalDetails: z
    .string()
    .describe(
      'Detailed professional background, including experience, skills, and achievements.'
    ),
  desiredTone: z
    .enum([
      'professional',
      'casual',
      'innovative',
      'friendly',
      'formal',
      'witty',
    ])
    .describe('The desired tone for the \'About Me\' section.'),
});
export type GenerateAboutMeSectionInput = z.infer<
  typeof GenerateAboutMeSectionInputSchema
>;

const GenerateAboutMeSectionOutputSchema = z.object({
  aboutMeSection: z.string().describe('The AI-generated \'About Me\' section.'),
});
export type GenerateAboutMeSectionOutput = z.infer<
  typeof GenerateAboutMeSectionOutputSchema
>;

export async function generateAboutMeSection(
  input: GenerateAboutMeSectionInput
): Promise<GenerateAboutMeSectionOutput> {
  return generateAboutMeSectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAboutMeSectionPrompt',
  input: {schema: GenerateAboutMeSectionInputSchema},
  output: {schema: GenerateAboutMeSectionOutputSchema},
  prompt: `You are an AI assistant specialized in crafting compelling 'About Me' sections for professional portfolios.
Your task is to generate a concise and engaging 'About Me' section based on the provided professional details and desired tone.

Professional Details: {{{professionalDetails}}}
Desired Tone: {{{desiredTone}}}

Craft the 'About Me' section in a way that aligns with the specified tone and highlights the most relevant aspects of the professional details. Focus on creating a strong personal introduction.`,
});

const generateAboutMeSectionFlow = ai.defineFlow(
  {
    name: 'generateAboutMeSectionFlow',
    inputSchema: GenerateAboutMeSectionInputSchema,
    outputSchema: GenerateAboutMeSectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
