import React, { useState } from 'react';
import { Search, Bell, HelpCircle, LogIn, LogOut, CheckCircle, AlertTriangle } from 'lucide-react';
import { ScreenId } from '../types';
import { useAuth } from './AuthContext';

interface HeaderProps {
  title?: string;
  placeholderText?: string;
  onNavigate: (screenId: ScreenId) => void;
  showTabs?: boolean;
}

export default function Header({ 
  title, 
  placeholderText = "Search teams, members, or models...", 
  onNavigate,
  showTabs = false
}: HeaderProps) {
  const { user, googleSignIn, logout, isLiveFirebase } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center w-full h-16 px-6 bg-[#0D0D0D] border-b border-[#1F1F1F] ml-64 max-w-[calc(100%-16rem)]">
      <div className="flex items-center gap-8 w-full max-w-2xl">
        {title && (
          <span className="font-sans text-lg font-bold text-white mr-4">{title}</span>
        )}

        {/* Overview link for usage analytics header xpath triggers */}
        <nav className="flex gap-4 items-center">
          <a 
            className="font-sans text-xs text-[#c3c5d8] hover:text-white transition-colors cursor-pointer"
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }}
          >
            Overview
          </a>
          {showTabs && (
            <>
              <a 
                className="font-sans text-xs text-electric-blue border-b-2 border-electric-blue py-1.5 px-1 font-medium" 
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate('usage'); }}
              >
                Analytics
              </a>
              <a 
                className="font-sans text-xs text-[#c3c5d8] hover:text-white transition-colors py-1.5" 
                href="#"
                onClick={(e) => { e.preventDefault(); alert('Deployments list loaded.'); }}
              >
                Deployments
              </a>
            </>
          )}
        </nav>

        {/* High-density search bar */}
        {!title && (
          <div className="relative w-full max-w-md group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c3c5d8]/70 h-4 w-4" />
            <input 
              className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg pl-9 pr-4 py-1.5 font-sans text-xs focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue/30 transition-all text-white placeholder-[#c3c5d8]/40" 
              placeholder={placeholderText} 
              type="text"
            />
          </div>
        )}
      </div>

      {/* Action panel utilities */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Firebase Live Indicator */}
        <div className="flex items-center gap-1.5 bg-[#1F1F1F] px-2.5 py-1 rounded-full text-[10px] font-medium text-white select-none">
          {isLiveFirebase ? (
            <>
              <CheckCircle className="h-3 w-3 text-emerald-400" />
              <span className="text-[#34D399]">Firebase Connected</span>
            </>
          ) : (
            <>
              <AlertTriangle className="h-3 w-3 text-amber-400" />
              <span className="text-[#FBBF24]">Firebase Emulator</span>
            </>
          )}
        </div>

        <button className="p-1.5 text-[#c3c5d8] hover:text-white hover:bg-[#1A1A1A] rounded-md transition-colors">
          <Bell className="h-4.5 w-4.5" />
        </button>
        <button className="p-1.5 text-[#c3c5d8] hover:text-white hover:bg-[#1A1A1A] rounded-md transition-colors">
          <HelpCircle className="h-4.5 w-4.5" />
        </button>
        
        <div className="h-5 w-[1px] bg-[#1F1F1F] mx-1"></div>
        
        <button 
          onClick={() => alert("Connecting to enterprise support channel...")}
          className="px-3 py-1.5 text-xs text-[#c3c5d8] hover:text-white hover:bg-[#1A1A1A] rounded-lg transition-colors"
        >
          Support
        </button>
        
        <button 
          onClick={() => alert("Create and configure a new AI Model deployment wrapper...")}
          className="bg-electric-blue text-white px-3 py-1.5 text-xs font-semibold rounded-lg hover:bg-opacity-95 transition-all shadow-md"
        >
          New Model
        </button>
        
        {/* Auth Sign-In / User Profile Toggle */}
        <div className="relative">
          {user ? (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-8 h-8 rounded-full overflow-hidden border border-[#571bc1] ring-2 ring-[#571bc1]/25 hover:opacity-80 transition-all cursor-pointer"
              >
                <img 
                  alt={user.displayName || "User Avatar"} 
                  className="w-full h-full object-cover" 
                  src={user.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"}
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-10 w-48 bg-[#141414] border border-[#1F1F1F] rounded-lg shadow-xl py-1.5 z-50 text-left">
                  <div className="px-3 py-2 border-b border-[#1F1F1F] text-xs">
                    <p className="text-white font-medium truncate">{user.displayName || "User"}</p>
                    <p className="text-[#c3c5d8]/60 truncate mt-0.5">{user.email || ""}</p>
                  </div>
                  <button 
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 text-[#EF4444] hover:bg-[#1C1C1D] px-3 py-2 text-xs text-left cursor-pointer"
                  >
                    <LogOut className="h-4.5 w-4.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={() => googleSignIn()}
              className="flex items-center gap-1.5 bg-[#1F1F1F]/6 w-auto border border-[#2E2E2E] hover:bg-[#202020] text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer"
            >
              <LogIn className="h-4 w-4 text-emerald-400" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

