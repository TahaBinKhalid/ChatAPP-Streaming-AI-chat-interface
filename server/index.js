import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Resolve root directory .env.local safely from the server folder
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.join(__dirname, '../.env.local') })

import express from 'express'
import cors from 'cors'
import { google } from '@ai-sdk/google'
import { streamText } from 'ai'
import { z } from 'zod'

const app = express()
app.use(cors())
app.use(express.json())

const researchTools = {
    querySystemMetrics: {
        description: 'Query architectural metrics, latency benchmarks, or node configurations for distributed and edge systems.',
        parameters: z.object({
            architecture: z.enum(['monolithic', 'microservices', 'serverless', 'edge-fog']),
            metricType: z.enum(['latency', 'throughput', 'fault-tolerance', 'scalability']),
        }),
        execute: async ({ architecture, metricType }) => {
            const benchmarkData = {
                'microservices': { latency: { score: 78, details: 'Higher inter-service network hop overhead.' } },
                'edge-fog': { latency: { score: 96, details: 'Ultra-low latency by processing data close to source.' } },
            }
            const result = benchmarkData[architecture]?.[metricType] || { score: 80, details: 'Baseline metrics recorded.' }
            return { architecture, metricType, score: result.score, details: result.details, timestamp: new Date().toISOString() }
        },
    },
}

app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body

        const result = await streamText({
            model: google('gemini-2.5'),
            messages,
            tools: researchTools,
            system: 'You are an expert distributed systems architect and study assistant.',
        })

        result.pipeDataStreamToResponse(res)
    } catch (error) {
        console.error('Backend Error Details:', error)
        res.status(500).json({ error: error.message || 'Failed to process AI request' })
    }
})

const PORT = 3001
app.listen(PORT, () => console.log(`Backend server running on http://localhost:${PORT}`))