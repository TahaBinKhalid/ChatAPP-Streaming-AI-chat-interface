'use client'
import React, { useState, useId } from 'react'

interface DisclosureProps {
    buttonText: string
    children: React.ReactNode
}

export default function Disclosure({ buttonText, children }: DisclosureProps) {
    const [isOpen, setIsOpen] = useState(false)
    const contentId = useId()

    return (
        <div className="border border-[#333] rounded-lg overflow-hidden bg-[#1F1F1F]">
            <h3>
                <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-4 py-3 text-left font-medium text-white flex justify-between items-center hover:bg-[#2a2a2a] transition-colors focus:outline-none focus:ring-1 focus:ring-[#E50914]"
                >
                    <span>{buttonText}</span>
                    <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                        ▼
                    </span>
                </button>
            </h3>
            <div
                id={contentId}
                hidden={!isOpen}
                className="px-4 py-3 text-gray-300 text-sm border-t border-[#333] bg-[#141414]"
            >
                {children}
            </div>
        </div>
    )
}