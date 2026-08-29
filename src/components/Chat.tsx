'use client'

import { useChat } from '@ai-sdk/react'
import { useRef, useEffect } from 'react'
import { MetricCard } from './MetricCard'
import styles from './Chat.module.css'

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat()
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <div className={styles.chatContainer}>
            <header className={styles.header}>
                Distributed Architecture Assistant & Generative UI
            </header>

            <div className={styles.messagesArea}>
                {messages.length === 0 && (
                    <div className={styles.emptyState}>
                        <p className={styles.emptyStateText}>
                            Ask about architecture benchmarks (e.g., &quot;Compare edge-fog vs microservices latency&quot;) to trigger generative UI tools.
                        </p>
                    </div>
                )}

                {messages.map((m) => (
                    <div key={m.id} className={m.role === 'user' ? styles.messageRowUser : styles.messageRowAssistant}>
                        <div className={m.role === 'user' ? styles.messageBubbleUser : styles.messageBubbleAssistant}>
                            {/* Render regular message text */}
                            {m.content && <p style={{ margin: 0 }}>{m.content}</p>}

                            {/* Render Tool Invocations and Results with Generative UI */}
                            {m.toolInvocations?.map((toolInvocation) => {
                                const { toolCallId, toolName, state } = toolInvocation

                                if (state === 'call') {
                                    return (
                                        <div key={toolCallId} style={{ color: '#9ca3af', fontStyle: 'italic', fontSize: '0.8125rem', margin: '8px 0' }}>
                                            ⏳ Running tool: <strong style={{ color: '#ffffff' }}>{toolName}</strong>...
                                        </div>
                                    )
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
                                    // Fallback for other tools
                                    return (
                                        <pre key={toolCallId} style={{ background: '#111', padding: '8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                                            {JSON.stringify(result, null, 2)}
                                        </pre>
                                    )
                                }

                                return null
                            })}
                        </div>
                    </div>
                ))}
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
                        <button type="submit" className={styles.sendButton}>Send</button>
                    )}
                </form>
            </div>
        </div>
    )
}