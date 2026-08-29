import React from 'react'

interface MetricCardProps {
    architecture: string
    metricType: string
    score: number
    details: string
    timestamp: string
}

export function MetricCard({ architecture, metricType, score, details, timestamp }: MetricCardProps) {
    const getBadgeColor = (s: number) => {
        if (s >= 90) return '#10b981'
        if (s >= 70) return '#f59e0b'
        return '#ef4444'
    }

    return (
        <div style={{
            backgroundColor: '#1f1f1f',
            border: '1px solid #333333',
            borderRadius: '12px',
            padding: '16px',
            margin: '10px 0',
            color: '#ffffff',
            maxWidth: '420px',
            fontFamily: 'inherit'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9ca3af', fontWeight: 600 }}>
                    System Benchmark Report
                </span>
                <span style={{ fontSize: '0.70rem', color: '#6b7280' }}>
                    {new Date(timestamp).toLocaleTimeString()}
                </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                    <h4 style={{ margin: 0, fontSize: '1rem', textTransform: 'capitalize', color: '#f3f4f6' }}>
                        {architecture} Architecture
                    </h4>
                    <p style={{ margin: '2px 0 0 0', fontSize: '0.8125rem', color: '#9ca3af', textTransform: 'capitalize' }}>
                        Metric: {metricType}
                    </p>
                </div>
                <div style={{
                    backgroundColor: getBadgeColor(score),
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    padding: '6px 12px',
                    borderRadius: '8px',
                }}>
                    {score}/100
                </div>
            </div>

            <p style={{ margin: 0, fontSize: '0.875rem', color: '#d1d5db', lineHeight: 1.4, borderTop: '1px solid #2a2a2a', paddingTop: '10px' }}>
                {details}
            </p>
        </div>
    )
}