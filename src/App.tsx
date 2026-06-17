import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ScreenId } from './types';
import { AuthProvider } from './components/AuthContext';
import DashboardScreen from './components/DashboardScreen';
import TeamsScreen from './components/TeamsScreen';
import ModelsScreen from './components/ModelsScreen';
import UsageScreen from './components/UsageScreen';
import SettingsScreen from './components/SettingsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('dashboard');
  const [direction, setDirection] = useState<'push' | 'push_back' | 'none'>('none');

  const navigate = (to: ScreenId) => {
    let dir: 'push' | 'push_back' | 'none' = 'none';
    if (currentScreen === 'dashboard' && to !== 'dashboard') {
      dir = 'push';
    } else if (currentScreen !== 'dashboard' && to === 'dashboard') {
      dir = 'push_back';
    } else {
      dir = 'none';
    }
    setDirection(dir);
    setCurrentScreen(to);
  };

  // Switcher to render correct screen contents
  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <DashboardScreen onNavigate={navigate} />;
      case 'teams':
        return <TeamsScreen onNavigate={navigate} />;
      case 'models':
        return <ModelsScreen onNavigate={navigate} />;
      case 'usage':
        return <UsageScreen onNavigate={navigate} />;
      case 'settings':
        return <SettingsScreen onNavigate={navigate} />;
      default:
        return <DashboardScreen onNavigate={navigate} />;
    }
  };

  const variants = {
    initial: (dir: 'push' | 'push_back' | 'none') => {
      if (dir === 'push') return { x: '100%', opacity: 0.8 };
      if (dir === 'push_back') return { x: '-100%', opacity: 0.8 };
      return { opacity: 0 };
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: { type: 'tween', ease: 'easeInOut', duration: 0.32 }
    },
    exit: (dir: 'push' | 'push_back' | 'none') => {
      if (dir === 'push') return { x: '-100%', opacity: 0.8, transition: { type: 'tween', ease: 'easeInOut', duration: 0.32 } };
      if (dir === 'push_back') return { x: '100%', opacity: 0.8, transition: { type: 'tween', ease: 'easeInOut', duration: 0.32 } };
      return { opacity: 0, transition: { duration: 0.1 } };
    }
  };

  return (
    <AuthProvider>
      <div className="w-full min-h-screen bg-[#0A0A0A] overflow-x-hidden relative" id="oxylens-app-root">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentScreen}
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full min-h-screen"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>
    </AuthProvider>
  );
}

