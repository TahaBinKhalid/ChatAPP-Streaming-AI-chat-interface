'use client'

import { useEffect } from 'react'

export default function ErrorBoundary({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('API Route Error caught by boundary:', error)
    }, [error])

    return (
        <div style={{
            backgroundColor: '#1f1f1f',
            border: '1px solid #ef4444',
            borderRadius: '12px',
            padding: '20px',
            margin: '20px',
            color: '#ffffff',
            fontFamily: 'inherit',
            maxWidth: '500px'
        }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#ef4444', fontSize: '1.1rem' }}>
                ⚠️ Server or API Failure Detected
            </h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '0.875rem', color: '#d1d5db' }}>
                {error.message || 'An unexpected error occurred while communicating with the AI model or tool pipeline.'}
            </p>
            <button
                onClick={() => reset()}
                style={{
                    backgroundColor: '#ef4444',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                }}
            >
                Retry Request
            </button>
        </div>
    )
}