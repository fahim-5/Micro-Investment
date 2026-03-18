import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { InvestmentProvider } from './context/InvestmentContext';
import AppRoutes from './routes';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';
import './App.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <InvestmentProvider>
            <div className="app-container">
              <Navbar />
              <main className="main-content">
                <React.Suspense fallback={
                  <div className="flex items-center justify-center min-h-screen">
                    <LoadingSpinner size="large" text="Loading application..." />
                  </div>
                }>
                  <AppRoutes />
                </React.Suspense>
              </main>
              <Footer />
            </div>
          </InvestmentProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;