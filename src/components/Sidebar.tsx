import React from 'react';
import { 
  Terminal, 
  Users, 
  Cpu, 
  Activity, 
  BarChart3, 
  Settings as SettingsIcon, 
  Plus, 
  FileText, 
  CloudRain, 
  ShieldAlert 
} from 'lucide-react';
import { ScreenId } from '../types';

interface SidebarProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export default function Sidebar({ activeScreen, onNavigate }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col p-4 z-40 bg-[#111111] border-r border-[#1F1F1F] w-64">
      {/* Brand header */}
      <div className="flex items-center gap-2 mb-8 px-2 cursor-pointer" onClick={() => onNavigate('dashboard')}>
        <div className="w-8 h-8 rounded bg-electric-blue/10 flex items-center justify-center border border-electric-blue/30 text-electric-blue">
          <Terminal className="h-4.5 w-4.5" />
        </div>
        <div>
          <h1 className="font-sans text-lg font-bold text-white leading-none">OxyLens</h1>
          <p className="text-[9px] text-[#c3c5d8]/70 uppercase tracking-widest mt-1">AI Operations</p>
        </div>
      </div>

      {/* Main sidebar items */}
      <nav className="flex-1 space-y-1">
        {/* Dashboard link */}
        <a 
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium transition-all group ${
            activeScreen === 'dashboard' 
              ? 'bg-[#1C1B1B] border border-[#2E2E2E] text-white' 
              : 'text-[#c3c5d8]/70 hover:bg-[#1A1A1A] hover:text-white'
          }`}
          href="#"
          onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }}
        >
          <BarChart3 className={`h-4.5 w-4.5 ${activeScreen === 'dashboard' ? 'text-electric-blue' : 'text-[#c3c5d8]/60 group-hover:text-white'}`} />
          <span>Dashboard</span>
        </a>

        {/* Teams link */}
        <a 
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium transition-all group ${
            activeScreen === 'teams' 
              ? 'bg-[#571bc1]/90 border border-[#571bc1] text-white' 
              : 'text-[#c3c5d8]/70 hover:bg-[#1A1A1A] hover:text-white'
          }`}
          href="#"
          onClick={(e) => { e.preventDefault(); onNavigate('teams'); }}
        >
          <Users className={`h-4.5 w-4.5 ${activeScreen === 'teams' ? 'text-white' : 'text-[#c3c5d8]/60 group-hover:text-white'}`} />
          <span>Teams</span>
        </a>

        {/* AI Models link */}
        <a 
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium transition-all group ${
            activeScreen === 'models' 
              ? 'bg-[#571bc1]/90 border border-[#571bc1] text-white' 
              : 'text-[#c3c5d8]/70 hover:bg-[#1A1A1A] hover:text-white'
          }`}
          href="#"
          onClick={(e) => { e.preventDefault(); onNavigate('models'); }}
        >
          <Cpu className={`h-4.5 w-4.5 ${activeScreen === 'models' ? 'text-white' : 'text-[#c3c5d8]/60 group-hover:text-white'}`} />
          <span>AI Models</span>
        </a>

        {/* Analytics/Usage link */}
        <a 
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium transition-all group ${
            activeScreen === 'usage' 
              ? 'bg-[#571bc1]/90 border border-[#571bc1] text-white' 
              : 'text-[#c3c5d8]/70 hover:bg-[#1A1A1A] hover:text-white'
          }`}
          href="#"
          onClick={(e) => { e.preventDefault(); onNavigate('usage'); }}
        >
          <Activity className={`h-4.5 w-4.5 ${activeScreen === 'usage' ? 'text-white' : 'text-[#c3c5d8]/60 group-hover:text-white'}`} />
          <span>Analytics</span>
        </a>

        {/* Settings link */}
        <a 
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium transition-all group ${
            activeScreen === 'settings' 
              ? 'bg-[#571bc1]/90 border border-[#571bc1] text-white' 
              : 'text-[#c3c5d8]/70 hover:bg-[#1A1A1A] hover:text-white'
          }`}
          href="#"
          onClick={(e) => { e.preventDefault(); onNavigate('settings'); }}
        >
          <SettingsIcon className={`h-4.5 w-4.5 ${activeScreen === 'settings' ? 'text-white' : 'text-[#c3c5d8]/60 group-hover:text-white'}`} />
          <span>Settings</span>
        </a>
      </nav>

      {/* Bottom sidebar controls */}
      <div className="mt-auto border-t border-[#1F1F1F] pt-4 px-1 space-y-4">
        <button 
          onClick={() => alert("Initiating instance deployment...")}
          className="w-full bg-electric-blue border border-electric-blue/40 hover:bg-opacity-95 text-white text-xs py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Deploy Instance
        </button>

        <div className="space-y-1">
          <a 
            className="flex items-center gap-3 px-3 py-1.5 text-xs text-[#c3c5d8]/70 hover:text-white transition-all rounded-md" 
            href="#"
            onClick={(e) => { e.preventDefault(); alert("Documentation overview loaded.") }}
          >
            <FileText className="h-4 w-4" />
            <span>Docs</span>
          </a>
          <a 
            className="flex items-center gap-3 px-3 py-1.5 text-xs text-[#c3c5d8]/70 hover:text-white transition-all rounded-md" 
            href="#"
            onClick={(e) => { e.preventDefault(); alert("Systems Operational.") }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></span>
            <span>Status</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
