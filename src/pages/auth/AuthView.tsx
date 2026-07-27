import React from 'react';
import { useAuthViewModel } from './UseAuthViewModel';
import './AuthView.css';

export const AuthView: React.FC = () => {
    const {
        user,
        email,
        setEmail,
        password,
        setPassword,
        isRegistering,
        setIsRegistering,
        error,
        loading,
        handleSubmit,
        logout
    } = useAuthViewModel();

    if (user) {
        return (
            <div className="auth-wrapper">
                <div className="auth-card profile-card">
                    <div className="profile-header">
                        <div className="profile-avatar">
                            {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="profile-info">
                            <h3 className="profile-greeting">Welcome Back</h3>
                            <p className="profile-email">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="auth-button logout-btn"
                        disabled={loading}
                    >
                        {loading ? 'Signing Out...' : 'Sign Out'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <div className="auth-header">
                    <h2 className="auth-title">{isRegistering ? 'Create Account' : 'Welcome Back'}</h2>
                    <p className="auth-subtitle">
                        {isRegistering
                            ? 'Join us and start your movie journey'
                            : 'Sign in to continue your movie journey'}
                    </p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <label htmlFor="email" className="input-label">
                            Email Address
                        </label>
                        <div className="input-icon-wrapper">
                            <span className="input-icon">✉</span>
                            <input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="auth-input"
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password" className="input-label">
                            Password
                        </label>
                        <div className="input-icon-wrapper">
                            <span className="input-icon">🔒</span>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="auth-input"
                            />
                        </div>
                    </div>

                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? (
                            <span className="button-loader">⏳</span>
                        ) : (
                            isRegistering ? 'Create Account' : 'Sign In'
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <button
                        type="button"
                        className="auth-toggle-btn"
                        onClick={() => setIsRegistering(!isRegistering)}
                    >
                        {isRegistering
                            ? 'Already have an account? Sign In'
                            : "Don't have an account? Sign Up"}
                    </button>
                </div>
            </div>
        </div>
    );
};