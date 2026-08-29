import React from 'react'

interface ImagePromptCardProps {
    subject: string
    style: string
    aspectRatio: string
    prompt: string
    mockImageUrl: string
    timestamp: string
}

export function ImagePromptCard({ subject, style, aspectRatio, prompt, mockImageUrl, timestamp }: ImagePromptCardProps) {
    return (
        <div style={{
            backgroundColor: '#1f1f1f',
            border: '1px solid #333333',
            borderRadius: '12px',
            padding: '16px',
            margin: '10px 0',
            color: '#ffffff',
            maxWidth: '440px',
            fontFamily: 'inherit'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#E50914', fontWeight: 600 }}>
                    AI Visual Asset & Prompt Generated
                </span>
                <span style={{ fontSize: '0.70rem', color: '#6b7280' }}>
                    {new Date(timestamp).toLocaleTimeString()}
                </span>
            </div>

            <div style={{ borderRadius: '8px', overflow: 'hidden', marginBottom: '12px', border: '1px solid #2a2a2a' }}>
                <img src={mockImageUrl} alt={subject} style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }} />
            </div>

            <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: '#f3f4f6', textTransform: 'capitalize' }}>
                {subject}
            </h4>
            <p style={{ margin: '0 0 10px 0', fontSize: '0.8125rem', color: '#9ca3af' }}>
                Style: <strong style={{ color: '#e5e7eb' }}>{style}</strong> | Ratio: <strong style={{ color: '#e5e7eb' }}>{aspectRatio}</strong>
            </p>

            <div style={{ backgroundColor: '#141414', padding: '10px', borderRadius: '6px', border: '1px solid #2a2a2a' }}>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#d1d5db', fontFamily: 'monospace', lineHeight: 1.4 }}>
                    {prompt}
                </p>
            </div>
        </div>
    )
}