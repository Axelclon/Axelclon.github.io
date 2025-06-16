
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import BottomNav from './components/BottomNav';
import SplashScreen from './components/SplashScreen';
import { PlusCircleIcon } from './components/icons'; // For Log button

// Lazy load pages for better initial load time
const AuthScreen = lazy(() => import('./pages/AuthScreen'));
const HomeScreen = lazy(() => import('./pages/HomeScreen'));
const CalendarScreen = lazy(() => import('./pages/CalendarScreen'));
const LogEntryScreen = lazy(() => import('./pages/LogEntryScreen'));
const ReportsScreen = lazy(() => import('./pages/ReportsScreen'));
const SettingsScreen = lazy(() => import('./pages/SettingsScreen'));
const ProfileScreen = lazy(() => import('./pages/ProfileScreen'));
const ResourcesScreen = lazy(() => import('./pages/ResourcesScreen'));
const PeriodLogModalScreen = lazy(() => import('./pages/PeriodLogModalScreen'));


const AppContainer: React.FC = () => {
  const { user, loadingAuth } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    console.log('[AppContainer] Mount and start splash timer.');
    const timer = setTimeout(() => {
      setShowSplash(false);
      console.log('[AppContainer] Splash timer ended, showSplash: false');
    }, 2500); // Splash screen duration
    return () => {
      clearTimeout(timer);
      console.log('[AppContainer] Unmount or deps change: Splash timer cleared.');
    };
  }, []);

  console.log('[AppContainer] Rendering. showSplash:', showSplash, 'loadingAuth:', loadingAuth, 'User ID:', user ? user.id : null);

  if (showSplash || loadingAuth) {
    console.log('[AppContainer] Showing SplashScreen because showSplash:', showSplash, 'OR loadingAuth:', loadingAuth);
    return <SplashScreen />;
  }

  console.log('[AppContainer] SplashScreen and loadingAuth conditions passed. Determining routes.');

  return (
    <div className="flex flex-col min-h-screen bg-pink-50 text-gray-800">
      <main className="flex-grow pb-20 sm:pb-16"> {/* Padding for BottomNav */}
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {!user ? (
              <>
                {console.log('[AppContainer] User is NOT authenticated. Rendering Auth routes.')}
                <Route path="/auth" element={<AuthScreen />} />
                <Route path="*" element={<Navigate to="/auth" replace />} />
              </>
            ) : (
              <>
                {console.log('[AppContainer] User IS authenticated. Rendering Authenticated routes. User ID:', user.id)}
                <Route path="/" element={<HomeScreen />} />
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/calendar" element={<CalendarScreen />} />
                <Route path="/log" element={<LogEntryScreen />} /> {/* Placeholder: quick log access */}
                <Route path="/reports" element={<ReportsScreen />} />
                <Route path="/settings" element={<SettingsScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/resources" element={<ResourcesScreen />} />
                 <Route path="/log-period" element={<PeriodLogModalScreen />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </Suspense>
      </main>
      {user && (
        <>
          {console.log('[AppContainer] User authenticated, rendering BottomNav.')}
          <BottomNav />
        </>
      )}
    </div>
  );
};

const LoadingFallback: React.FC = () => (
  <div className="flex flex-col justify-center items-center h-screen bg-pink-50" style={{ minHeight: '100vh', border: '2px dashed red', padding: '20px' }}>
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500"></div>
    <p className="ml-4 text-pink-700 text-lg mt-4">Cargando Gotita... (Suspense Fallback)</p>
    <p className="text-sm text-red-700 mt-2">Si ves esto por mucho tiempo, algo podría estar mal con la carga del componente.</p>
  </div>
);

const App: React.FC = () => {
  console.log('[App] Rendering App component with AuthProvider and BrowserRouter.');
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
