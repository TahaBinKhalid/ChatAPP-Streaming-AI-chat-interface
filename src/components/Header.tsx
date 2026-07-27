import React from 'react';
import './Header.css';

interface HeaderProps {
    currentView: string;
    setCurrentView: (view: 'home' | 'favorites' | 'auth') => void;
    userEmail?: string | null;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, userEmail }) => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="logo-wrapper" onClick={() => setCurrentView('home')}>
                    <span className="logo-icon">🎬</span>
                    <span className="logo-text">CineMatch</span>
                </div>

                <nav className="nav-links">
                    <button
                        className={`nav-btn ${currentView === 'home' ? 'active' : ''}`}
                        onClick={() => setCurrentView('home')}
                    >
                        <span className="nav-icon">🏠</span>
                        <span className="nav-label">Home</span>
                    </button>

                    <button
                        className={`nav-btn ${currentView === 'favorites' ? 'active' : ''}`}
                        onClick={() => setCurrentView('favorites')}
                    >
                        <span className="nav-icon">❤️</span>
                        <span className="nav-label">Favorites</span>
                    </button>

                    <button
                        className={`nav-btn auth-btn ${currentView === 'auth' ? 'active' : ''}`}
                        onClick={() => setCurrentView('auth')}
                    >
                        <span className="nav-icon">{userEmail ? '👤' : '🔑'}</span>
                        <span className="nav-label">
                            {userEmail ? userEmail.split('@')[0] : 'Sign In'}
                        </span>
                    </button>
                </nav>
            </div>
        </header>
    );
};