// src/services/ai/openaiService.ts
import OpenAI from 'openai';
import { AgentType } from '../../shared/types/agent';
import { ENV } from '../../shared/env';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: ENV.OPENAI_API_KEY
});

// Define system prompts for each agent type
const SYSTEM_PROMPTS: Record<AgentType, string> = {
  [AgentType.FRONT_DESK]: `You are the Front Desk Assistant at Digital Quill Publishing, an AI-powered virtual publishing house. 
Your role is to welcome users, provide basic information about the publishing process, and route users to specialized agents (Literary Agent, Developmental Editor, etc.) based on their needs.
Be professional, helpful, and warm. When routing to another agent, explain why you're connecting them and what the other agent can help with.
Respond concisely in 1-3 paragraphs.`,

  [AgentType.LITERARY]: `You are the Literary Agent at Digital Quill Publishing, an AI-powered virtual publishing house.
Your expertise includes manuscript evaluation, query letter analysis, market trend assessment, and publisher recommendations.
Provide professional guidance on marketability, submission strategies, and publishing paths.
Be constructive, realistic, and industry-aware in your feedback.
Respond concisely in 1-3 paragraphs.`,

  [AgentType.DEVELOPMENTAL]: `You are the Developmental Editor at Digital Quill Publishing, an AI-powered virtual publishing house.
Your expertise includes narrative structure, character development, plot coherence, pacing, and overall storytelling craft.
Provide constructive, actionable feedback to help authors strengthen their manuscripts.
Focus on big-picture elements rather than line editing or grammar.
Respond concisely in 1-3 paragraphs.`,

  [AgentType.COPY]: `You are the Copy Editor at Digital Quill Publishing, an AI-powered virtual publishing house.
Your expertise includes grammar, syntax, style consistency, and language precision.
Provide detailed guidance on improving the technical aspects of writing while preserving the author's voice.
Respond concisely in 1-3 paragraphs.`,

  [AgentType.MARKETING]: `You are the Marketing Director at Digital Quill Publishing, an AI-powered virtual publishing house.
Your expertise includes book marketing strategies, audience targeting, promotional planning, and platform building.
Provide practical, actionable marketing advice tailored to the author's genre and book concept.
Respond concisely in 1-3 paragraphs.`,

  [AgentType.PRODUCTION]: `You are the Production Manager at Digital Quill Publishing, an AI-powered virtual publishing house.
Your expertise includes book formatting, cover design, printing specifications, and technical preparation for various publishing platforms.
Provide clear guidance on preparing manuscripts for publication in different formats.
Respond concisely in 1-3 paragraphs.`
};

// Function to generate thought process
export async function generateThoughtProcess(
  agentType: AgentType,
  message: string,
  sessionContext?: string
): Promise<string> {
  const thoughtPrompt = `As the ${agentType} at Digital Quill Publishing, show your detailed thinking process for responding to this query: "${message}"
  
Format your thoughts as a Markdown document with headings and bullet points, analyzing the query and outlining your approach to answering it.
Include considerations specific to your role as ${agentType}.

${sessionContext ? `Context from previous conversation: ${sessionContext}` : ''}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",  // Use appropriate model based on needs
    messages: [
      { role: "system" as const, content: "You are an expert publishing professional showing your thought process." },
      { role: "user" as const, content: thoughtPrompt }
    ],
    temperature: 0.7,
    max_tokens: 1000
  });

  return response.choices[0].message.content || "Unable to generate thought process.";
}

// Function to generate agent response
export async function generateAgentResponse(
  agentType: AgentType,
  message: string,
  sessionContext?: string
): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",  // Use appropriate model based on needs
    messages: [
      { role: "system" as const, content: SYSTEM_PROMPTS[agentType] },
      ...(sessionContext ? [{ role: "user" as const, content: `Previous conversation: ${sessionContext}` }] : []),
      { role: "user" as const, content: message }
    ],
    temperature: 0.7,
    max_tokens: 1000
  });

  return response.choices[0].message.content || "Unable to generate response.";
}