'use client'

import { useChat } from '@ai-sdk/react'
import { useRef, useEffect } from 'react'
import { MetricCard } from './MetricCard'
import { ImagePromptCard } from './ImagePromptCard'
import { LoadingSkeleton } from './LoadingSkeleton'
import styles from './Chat.module.css'

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit, isLoading, error, reload, stop } = useChat({
        api: '/api/chat',
    })
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isLoading])

    return (
        <div className={styles.chatContainer}>
            <header className={styles.header}>
                Distributed Architecture & AI Visual Asset Assistant
            </header>

            <div className={styles.messagesArea}>
                {/* First-Run Empty State with Quick Action Prompts */}
                {messages.length === 0 && (
                    <div className={styles.emptyState}>
                        <h3 style={{ color: '#f3f4f6', marginBottom: '8px' }}>Welcome to the Architecture Lab</h3>
                        <p className={styles.emptyStateText}>
                            Select a suggested prompt below to begin exploring distributed benchmarks or generating visual assets:
                        </p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '12px' }}>
                            <button
                                onClick={() => handleInputChange({ target: { value: 'Compare edge-fog vs microservices latency' } } as any)}
                                style={{ background: '#2a2a2a', border: '1px solid #444', color: '#fff', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                            >
                                Compare edge-fog vs microservices latency
                            </button>
                            <button
                                onClick={() => handleInputChange({ target: { value: 'Generate a cyberpunk UI prompt for a code editor' } } as any)}
                                style={{ background: '#2a2a2a', border: '1px solid #444', color: '#fff', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                            >
                                Generate cyberpunk UI prompt
                            </button>
                        </div>
                    </div>
                )}

                {messages.map((m) => (
                    <div key={m.id} className={m.role === 'user' ? styles.messageRowUser : styles.messageRowAssistant}>
                        <div className={m.role === 'user' ? styles.messageBubbleUser : styles.messageBubbleAssistant}>
                            {m.content && <p style={{ margin: 0 }}>{m.content}</p>}

                            {m.toolInvocations?.map((toolInvocation) => {
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

                                    if (toolName === 'generateImagePrompt') {
                                        return (
                                            <ImagePromptCard
                                                key={toolCallId}
                                                subject={result.subject}
                                                style={result.style}
                                                aspectRatio={result.aspectRatio}
                                                prompt={result.prompt}
                                                mockImageUrl={result.mockImageUrl}
                                                timestamp={result.timestamp}
                                            />
                                        )
                                    }
                                }
                                return null
                            })}
                        </div>
                    </div>
                ))}

                {/* Loading Skeleton for Slow Responses / Pending Streams */}
                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                    <div className={styles.messageRowAssistant}>
                        <div className={styles.messageBubbleAssistant}>
                            <LoadingSkeleton />
                        </div>
                    </div>
                )}

                {/* Chat Error & Retry Handling */}
                {error && (
                    <div style={{ backgroundColor: '#2d1515', border: '1px solid #ef4444', borderRadius: '8px', padding: '12px', margin: '12px 0', color: '#fca5a5', fontSize: '0.875rem' }}>
                        <p style={{ margin: '0 0 8px 0' }}>⚠️ Stream Interrupted or Network Error occurred.</p>
                        <button
                            onClick={() => reload()}
                            style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '0.75rem' }}
                        >
                            Retry Last Message
                        </button>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit} className={styles.formWrapper}>
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Ask about architectural benchmarks..."
                        className={styles.inputField}
                    />
                    {isLoading ? (
                        <button type="button" onClick={stop} className={styles.stopButton}>Stop</button>
                    ) : (
                        <button type="submit" className={styles.sendButton} disabled={!input.trim()}>Send</button>
                    )}
                </form>
            </div>
        </div>
    )
}