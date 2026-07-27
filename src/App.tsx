import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { HomeView } from './pages/home/HomeView';
import { FavoritesView } from './pages/favorites/FavoritesView';
import { AuthView } from './pages/auth/AuthView';
import { FirebaseService } from './services/FirebaseService';
import type { Movie } from './types/Movie';
import './App.css';

function MainApp() {
  const [currentView, setCurrentView] = useState<'home' | 'favorites' | 'auth'>('home');
  const { user } = useAuth();

  // Implement the favorite toggle handler here
  const handleToggleFavorite = async (movie: Movie) => {
    if (!user) {
      alert("Please sign in to add favorites!");
      setCurrentView('auth');
      return;
    }
    try {
      await FirebaseService.addFavorite(user.uid, movie);
      alert(`Added "${movie.Title}" to favorites!`);
    } catch (error) {
      console.error("Failed to add favorite:", error);
    }
  };

  return (
    <div className="app">
      <Header currentView={currentView} setCurrentView={setCurrentView} userEmail={user?.email} />
      <main>
        {currentView === 'home' && (
          <HomeView
            favorites={[]}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
        {currentView === 'favorites' && <FavoritesView />}
        {currentView === 'auth' && <AuthView />}
      </main>
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;