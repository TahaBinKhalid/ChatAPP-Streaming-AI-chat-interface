'use client'
import React, { useEffect, useRef } from 'react'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null)
    const previousActiveElement = useRef<HTMLElement | null>(null)

    useEffect(() => {
        if (isOpen) {
            previousActiveElement.current = document.activeElement as HTMLElement
            const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
            const firstElement = focusableElements?.[0]
            firstElement?.focus()

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    onClose()
                }
                if (e.key === 'Tab' && modalRef.current) {
                    const focusable = Array.from(
                        modalRef.current.querySelectorAll<HTMLElement>(
                            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                        )
                    )
                    if (focusable.length === 0) return
                    const first = focusable[0]
                    const last = focusable[focusable.length - 1]

                    if (e.shiftKey && document.activeElement === first) {
                        last.focus()
                        e.preventDefault()
                    } else if (!e.shiftKey && document.activeElement === last) {
                        first.focus()
                        e.preventDefault()
                    }
                }
            }

            document.addEventListener('keydown', handleKeyDown)
            return () => {
                document.removeEventListener('keydown', handleKeyDown)
                previousActiveElement.current?.focus()
            }
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                className="bg-[#1F1F1F] border border-[#333] p-6 rounded-xl max-w-md w-full text-white shadow-2xl relative"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 id="modal-title" className="text-lg font-bold">{title}</h2>
                    <button
                        onClick={onClose}
                        aria-label="Close modal"
                        className="text-gray-400 hover:text-white text-xl font-bold p-1 focus:outline-none focus:ring-1 focus:ring-[#E50914]"
                    >
                        &times;
                    </button>
                </div>
                <div className="text-gray-300 mb-6">{children}</div>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#333] transition-colors focus:outline-none focus:ring-1 focus:ring-[#E50914]"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}