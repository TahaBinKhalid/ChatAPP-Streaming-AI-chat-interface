import { google } from '@ai-sdk/google'

// Define your model choice (using Gemini 1.5 Pro or Flash via the AI SDK)
export const CHAT_MODEL = google('gemini-1.5-flash')

export const SYSTEM_PROMPT = `
You are an expert AI engineering mentor and technical advisor. 
Provide concise, highly accurate, and actionable guidance for software developers. 
Maintain a professional, encouraging, and direct tone.
`