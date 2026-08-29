import { google } from '@ai-sdk/google'
import { streamText } from 'ai'
import { researchTools } from './tools'

export const maxDuration = 30

export async function POST(req: Request) {
    const { messages } = await req.json()

    const result = await streamText({
        model: google('gemini-2.5'),
        messages,
        tools: researchTools,
        system: 'You are an expert distributed systems architect and research assistant. When users ask about system architectures, use the querySystemMetrics tool to provide verified benchmark evaluations.',
    })

    return result.toDataStreamResponse()
}