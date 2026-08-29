'use client'
import React, { useState, useRef } from 'react'

interface TabItem {
    id: string
    label: string
    content: React.ReactNode
}

interface TabsProps {
    tabs: TabItem[]
}

export default function Tabs({ tabs }: TabsProps) {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id || '')
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        let nextIndex = index
        if (e.key === 'ArrowRight') {
            nextIndex = (index + 1) % tabs.length
        } else if (e.key === 'ArrowLeft') {
            nextIndex = (index - 1 + tabs.length) % tabs.length
        } else if (e.key === 'Home') {
            nextIndex = 0
        } else if (e.key === 'End') {
            nextIndex = tabs.length - 1
        } else {
            return
        }

        e.preventDefault()
        setActiveTab(tabs[nextIndex].id)
        tabRefs.current[nextIndex]?.focus()
    }

    return (
        <div className="w-full">
            <div role="tablist" aria-label="Content Tabs" className="flex border-b border-[#333] gap-2">
                {tabs.map((tab, index) => {
                    const isActive = tab.id === activeTab
                    return (
                        <button
                            key={tab.id}
                            ref={(el) => { tabRefs.current[index] = el }}
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={`panel-${tab.id}`}
                            id={`tab-${tab.id}`}
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => setActiveTab(tab.id)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 focus:outline-none focus:ring-1 focus:ring-[#E50914] ${isActive
                                    ? 'border-[#E50914] text-white'
                                    : 'border-transparent text-gray-400 hover:text-gray-200'
                                }`}
                        >
                            {tab.label}
                        </button>
                    )
                })}
            </div>

            <div className="mt-4">
                {tabs.map((tab) => {
                    const isActive = tab.id === activeTab
                    return (
                        <div
                            key={tab.id}
                            role="tabpanel"
                            id={`panel-${tab.id}`}
                            aria-labelledby={`tab-${tab.id}`}
                            hidden={!isActive}
                            tabIndex={0}
                            className="text-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#E50914] rounded p-2"
                        >
                            {tab.content}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}