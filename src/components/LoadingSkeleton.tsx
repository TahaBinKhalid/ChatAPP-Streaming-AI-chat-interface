import React from 'react'

export function LoadingSkeleton() {
    return (
        <div style={{
            backgroundColor: '#1f1f1f',
            border: '1px solid #333333',
            borderRadius: '12px',
            padding: '16px',
            margin: '10px 0',
            maxWidth: '380px',
            animation: 'pulse 1.5s infinite ease-in-out'
        }}>
            <div style={{ height: '12px', backgroundColor: '#374151', borderRadius: '4px', width: '40%', marginBottom: '12px' }} />
            <div style={{ height: '16px', backgroundColor: '#374151', borderRadius: '4px', width: '80%', marginBottom: '8px' }} />
            <div style={{ height: '14px', backgroundColor: '#2a2a2a', borderRadius: '4px', width: '100%' }} />
        </div>
    )
}