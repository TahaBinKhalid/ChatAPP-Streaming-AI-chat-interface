'use client'

import { useChat } from '@ai-sdk/react'
import { useRef, useEffect, useState } from 'react'
import { MetricCard } from './MetricCard'
import { LoadingSkeleton } from './LoadingSkeleton'
import styles from './Chat.module.css'

export default function Chat() {
    const { messages, sendMessage, status, error, stop } = useChat({
        api: 'http://localhost:3001/api/chat',
    } as any)
    const [input, setInput] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, status])

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!input.trim()) return
        sendMessage({ text: input })
        setInput('')
    }

    const isLoading = status === 'submitted' || status === 'streaming'

    return (
        <div className={styles.chatContainer}>
            <header className={styles.header}>
                Distributed Architecture & AI Study Agent
            </header>

            <div className={styles.messagesArea}>
                {messages.length === 0 && (
                    <div className={styles.emptyState}>
                        <h3 style={{ color: '#f3f4f6', marginBottom: '8px' }}>Welcome to StudyPulse AI</h3>
                        <p className={styles.emptyStateText}>
                            Ask about architecture benchmarks to trigger generative UI tools:
                        </p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '12px' }}>
                            <button
                                type="button"
                                onClick={() => sendMessage({ text: 'Compare edge-fog vs microservices latency' })}
                                style={{ background: '#2a2a2a', border: '1px solid #444', color: '#fff', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                            >
                                Compare edge-fog vs microservices latency
                            </button>
                        </div>
                    </div>
                )}

                {messages.map((m: any) => (
                    <div key={m.id} className={m.role === 'user' ? styles.messageRowUser : styles.messageRowAssistant}>
                        <div className={m.role === 'user' ? styles.messageBubbleUser : styles.messageBubbleAssistant}>
                            {'parts' in m && Array.isArray(m.parts) ? (
                                m.parts.map((part: any, index: number) => {
                                    if (part.type === 'text') {
                                        return <p key={index} style={{ margin: 0 }}>{part.text}</p>
                                    }
                                    if (part.type === 'tool-invocation') {
                                        const toolInvocation = part.toolInvocation
                                        const { toolCallId, toolName, state } = toolInvocation

                                        if (state === 'call') {
                                            return <LoadingSkeleton key={toolCallId} />
                                        }
                                        if (state === 'result') {
                                            const { result } = toolInvocation
                                            if (toolName === 'querySystemMetrics') {
                                                return (
                                                    <MetricCard
                                                        key={toolCallId}
                                                        architecture={result.architecture}
                                                        metricType={result.metricType}
                                                        score={result.score}
                                                        details={result.details}
                                                        timestamp={result.timestamp}
                                                    />
                                                )
                                            }
                                        }
                                    }
                                    return null
                                })
                            ) : (
                                <p style={{ margin: 0 }}>{m.content}</p>
                            )}
                        </div>
                    </div>
                ))}

                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                    <div className={styles.messageRowAssistant}>
                        <div className={styles.messageBubbleAssistant}>
                            <LoadingSkeleton />
                        </div>
                    </div>
                )}

                {error && (
                    <div style={{ backgroundColor: '#2d1515', border: '1px solid #ef4444', borderRadius: '8px', padding: '12px', margin: '12px 0', color: '#fca5a5', fontSize: '0.875rem' }}>
                        <p style={{ margin: '0 0 8px 0' }}>⚠️ Stream Interrupted or Network Error occurred.</p>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className={styles.formContainer}>
                <form onSubmit={handleFormSubmit} className={styles.formWrapper}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about architectural benchmarks..."
                        className={styles.inputField}
                    />
                    {isLoading ? (
                        <button type="button" onClick={stop} className={styles.stopButton}>Stop</button>
                    ) : (
                        <button type="submit" className={styles.sendButton}>Send</button>
                    )}
                </form>
            </div>
        </div>
    )
}