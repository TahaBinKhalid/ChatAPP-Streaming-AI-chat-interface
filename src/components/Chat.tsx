'use client'

import { useChat } from 'ai/react'
import { useRef, useEffect, useState } from 'react'
import styles from './Chat.module.css'

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat()
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const [isUserScrolledUp, setIsUserScrolledUp] = useState(false)

    const handleScroll = () => {
        if (!scrollContainerRef.current) return
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
        const isAtBottom = scrollHeight - scrollTop - clientHeight < 50
        setIsUserScrolledUp(!isAtBottom)
    }

    useEffect(() => {
        if (!isUserScrolledUp) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages, isUserScrolledUp])

    return (
        <div className={styles.chatContainer}>
            <header className={styles.header}>
                Gemini AI Chat Playground
            </header>

            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className={styles.messagesArea}
            >
                {messages.length === 0 && (
                    <div className={styles.emptyState}>
                        <p className={styles.emptyStateText}>Send a message to start streaming with Gemini.</p>
                    </div>
                )}

                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={m.role === 'user' ? styles.messageRowUser : styles.messageRowAssistant}
                    >
                        <div
                            className={m.role === 'user' ? styles.messageBubbleUser : styles.messageBubbleAssistant}
                        >
                            <p>{m.content}</p>
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
                        placeholder="Ask Gemini anything..."
                        className={styles.inputField}
                    />

                    {isLoading ? (
                        <button
                            type="button"
                            onClick={stop}
                            className={styles.stopButton}
                        >
                            Stop
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className={styles.sendButton}
                        >
                            Send
                        </button>
                    )}
                </form>
            </div>
        </div>
    )
}