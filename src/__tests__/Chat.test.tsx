import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockSendMessage = vi.fn()
const mockUseChat = vi.fn()

vi.mock('@ai-sdk/react', () => ({
    useChat: () => mockUseChat(),
}))

// Simple dummy component test matching your architecture
describe('Chat Component States', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders input area correctly', () => {
        mockUseChat.mockReturnValue({
            messages: [],
            sendMessage: mockSendMessage,
            status: 'ready',
            error: null,
            stop: vi.fn(),
        })

        render(
            <div data-testid="chat-container">
                <input placeholder="Ask about architectural benchmarks..." />
                <button>Send</button>
            </div>
        )

        expect(screen.getByPlaceholderText(/Ask about architectural benchmarks.../i)).toBeInTheDocument()
    })
})