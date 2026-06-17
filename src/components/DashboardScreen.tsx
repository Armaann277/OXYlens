import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Bell, 
  HelpCircle, 
  Cpu, 
  DollarSign, 
  Users, 
  Zap, 
  Code, 
  FileText, 
  Megaphone, 
  Globe,
  Lock,
  Shield,
  Check,
  ChevronRight,
  Lightbulb,
  ArrowRight,
  Terminal,
  Activity,
  LogIn,
  LogOut,
  CheckCircle,
  AlertTriangle,
  Loader2,
  ExternalLink,
  History
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { ScreenId } from '../types';
import { useAuth } from './AuthContext';
import { 
  dashboardKPIs, 
  mockUsageAnalytics30D, 
  mockModelShares, 
  mockTeamAdoptions, 
  mockActivities 
} from '../mockData';

interface DashboardScreenProps {
  onNavigate: (screenId: ScreenId) => void;
}

export default function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  const { user, googleSignIn, logout, saveSearchQuery, getSearchHistory, isLiveFirebase } = useAuth();
  const [timeRange, setTimeRange] = useState<'30D' | '7D' | '24H'>('30D');
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // States for Real-Time Search Grounding via Gemini
  const [searchQueryRealtime, setSearchQueryRealtime] = useState('');
  const [searchResult, setSearchResult] = useState<{ answer: string; sources: Array<{ title: string; url: string }> } | null>(null);
  const [searchHistory, setSearchHistory] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // Load history from Firebase or LocalStorage
  useEffect(() => {
    getSearchHistory().then(res => setSearchHistory(res));
  }, [user]);

  const handleRealtimeSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQueryRealtime.trim()) return;
    setSearchLoading(true);
    setSearchResult(null);
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQueryRealtime }),
      });
      if (!res.ok) {
        throw new Error('Grounded search failed.');
      }
      const data = await res.json();
      setSearchResult({
        answer: data.answer,
        sources: data.sources || []
      });
      // Save result to db/simulation
      await saveSearchQuery(searchQueryRealtime, data.answer, data.sources || []);
      // Reload history
      const hist = await getSearchHistory();
      setSearchHistory(hist);
    } catch (err: any) {
      console.error(err);
      setSearchResult({
        answer: "Error: Failed to retrieve grounded search results. Please confirm your GEMINI_API_KEY is configured in your secrets.",
        sources: []
      });
    } finally {
      setSearchLoading(false);
    }
  };

  // Handle simple filter on activities based on query just to make it functional!
  const filteredActivities = mockActivities.filter(act => 
    act.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    act.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    act.team.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#e5e2e1]" id="oxylens-dashboard-screen">
      {/* Top Main Navigation Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0D0D0D]/90 backdrop-blur-md border-b border-[#1F1F1F] h-16 flex items-center justify-between px-6 max-w-full">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <span className="font-sans text-2xl font-bold tracking-tight text-white flex items-center gap-1.5">
              <span className="text-[#571bc1]">O</span>xyLens
            </span>
          </div>
          
          {/* Main Navigation Row - Tested via Specific Dashboard Links */}
          <nav className="hidden md:flex items-center gap-6">
            <a 
              className="text-white font-semibold border-b-2 border-[#571bc1] pb-1 text-sm font-sans" 
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }}
            >
              Dashboard
            </a>
            <a 
              className="text-[#c3c5d8] font-medium hover:text-white transition-colors text-sm font-sans" 
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigate('teams'); }}
            >
              Teams
            </a>
            <a 
              className="text-[#c3c5d8] font-medium hover:text-white transition-colors text-sm font-sans" 
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigate('models'); }}
            >
              Models
            </a>
            <a 
              className="text-[#c3c5d8] font-medium hover:text-white transition-colors text-sm font-sans" 
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigate('usage'); }}
            >
              Usage
            </a>
            <a 
              className="text-[#c3c5d8] font-medium hover:text-white transition-colors text-sm font-sans" 
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigate('settings'); }}
            >
              Settings
            </a>
          </nav>
        </div>

        {/* Header Right Workspace items */}
        <div className="flex items-center gap-4">
          {/* Firebase Connection Status Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 bg-[#1F1F1F] px-2.5 py-1 rounded-full text-[10px] font-medium text-white select-none">
            {isLiveFirebase ? (
              <>
                <CheckCircle className="h-3 w-3 text-emerald-400" />
                <span className="text-[#34D399]">Firebase Live</span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-3 w-3 text-amber-400" />
                <span className="text-[#FBBF24]">Firebase Emulator</span>
              </>
            )}
          </div>

          <div className="relative hidden sm:block w-48 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c3c5d8]/70 h-4 w-4" />
            <input 
              className="bg-[#141414] border border-[#1F1F1F] rounded-lg pl-9 pr-4 py-1.5 text-xs text-white focus:outline-none focus:border-[#571bc1] focus:ring-1 focus:ring-[#571bc1]/30 w-full transition-all" 
              placeholder="Search operations..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="text-[#c3c5d8] hover:text-white p-1.5 rounded-md hover:bg-[#1A1A1A] transition-colors relative">
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#571bc1]"></span>
          </button>
          <button className="text-[#c3c5d8] hover:text-white p-1.5 rounded-md hover:bg-[#1A1A1A] transition-colors">
            <HelpCircle className="h-4.5 w-4.5" />
          </button>
          
          <div className="h-5 w-[1px] bg-[#1F1F1F] mx-1"></div>

          {/* User auth badge */}
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
                className="flex items-center gap-1.5 bg-[#1F1F1F]/6 border border-[#2E2E2E] hover:bg-[#202020] text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer"
              >
                <LogIn className="h-4 w-4 text-emerald-400" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}

      <main className="pt-24 pb-16 px-6 max-w-7xl mx-auto space-y-6">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight text-white">AI Visibility Across Your Organization</h1>
            <p className="text-sm md:text-base text-[#c3c5d8] max-w-2xl font-light">
              Track AI adoption, spend, productivity, and model usage across every team in one centralized ops command center.
            </p>
          </div>
        </div>

        {/* Real-time Grounded AI Model Search Console */}
        <div className="bg-[#111111] border border-[#1f1f1f] p-6 rounded-2xl relative overflow-hidden shadow-2xl">
          {/* Subtle glow layer */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#571bc1]/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#571bc1]/12 border border-[#571bc1]/30 flex items-center justify-center text-[#9333EA]">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
                Real-Time Grounded AI Intelligence
                <span className="text-[10px] bg-[#9333EA]/20 border border-[#9333EA]/40 text-[#A855F7] px-2 py-0.5 rounded-full font-mono tracking-normal">
                  Powered by Gemini 3.5 Flash
                </span>
              </h2>
              <p className="text-xs text-[#c3c5d8]/70">
                Ask anything about the latest AI landscape, live model release prices, API capabilities, or provider changes.
              </p>
            </div>
          </div>

          <form onSubmit={handleRealtimeSearch} className="flex flex-col sm:flex-row gap-3">
            <input 
              type="text"
              placeholder="e.g. Compare Gemini 2.5 Flash vs Claude 3.5 Sonnet token pricing and release dates"
              value={searchQueryRealtime}
              onChange={(e) => setSearchQueryRealtime(e.target.value)}
              className="flex-1 bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#571bc1] focus:ring-1 focus:ring-[#571bc1]/30 placeholder-[#c3c5d8]/40 h-11"
            />
            <button 
              type="submit"
              disabled={searchLoading || !searchQueryRealtime.trim()}
              className="px-5 bg-[#571bc1] hover:bg-[#571bc1]/90 hover:shadow-lg text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 h-11 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 cursor-pointer"
            >
              {searchLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Searching Grounded Info...</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span>Search Real-Time</span>
                </>
              )}
            </button>
          </form>

          {/* Loader or Error UI */}
          {searchLoading && (
            <div className="mt-6 flex flex-col items-center justify-center py-8 border border-dashed border-[#1f1f1f] rounded-xl bg-[#0A0A0A]/40">
              <Loader2 className="h-8 w-8 text-[#571bc1] animate-spin mb-3" />
              <p className="text-xs text-white">Fetching live search metadata & drafting grounded answer...</p>
              <p className="text-[10px] text-[#c3c5d8]/60 mt-1 font-mono">Consulting Google Search Engine</p>
            </div>
          )}

          {/* Results UI */}
          {searchResult && !searchLoading && (
            <div className="mt-6 border border-[#2E2E2E] bg-[#0E0E0E] rounded-xl p-5 space-y-4">
              <div className="border-b border-[#1F1F1F] pb-3 flex justify-between items-center">
                <span className="text-xs font-semibold text-white tracking-tight font-sans">Grounded Intelligence Response:</span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Grounded Successfully
                </span>
              </div>
              
              <div className="text-xs text-[#e5e2e1] leading-relaxed font-sans whitespace-pre-wrap max-h-80 overflow-y-auto pr-2">
                {searchResult.answer}
              </div>

              {/* Grounded Sources */}
              {searchResult.sources && searchResult.sources.length > 0 && (
                <div className="pt-3 border-t border-[#1F1F1F] space-y-2">
                  <p className="text-[10px] text-[#c3c5d8]/60 uppercase tracking-widest font-semibold">Web Sources Utilized for Grounding:</p>
                  <div className="flex flex-wrap gap-2">
                    {searchResult.sources.map((src, i) => (
                      <a 
                        key={i}
                        href={src.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 bg-[#1C1B1B] text-[10px] text-[#A855F7] px-2.5 py-1 rounded-md border border-[#2E2E2E] hover:text-[#9333EA] hover:border-[#571bc1] transition-all"
                      >
                        <ExternalLink className="w-3 h-3 text-[#A855F7]/70" />
                        <span className="font-medium truncate max-w-[170px]">{src.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Saved History and Past Queries */}
          {searchHistory && searchHistory.length > 0 && (
            <div className="mt-5 pt-4 border-t border-[#1f1f1f]">
              <div className="flex items-center gap-2 mb-2 text-[#c3c5d8]/70 text-xs">
                <History className="h-3.5 w-3.5" />
                <span>Recent Grounded Queries:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((hist, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSearchQueryRealtime(hist.query);
                      setSearchResult({
                        answer: hist.answer,
                        sources: hist.sources || [],
                      });
                    }}
                    className="text-left bg-[#0E0E0E] hover:bg-[#161616] border border-[#1E1E1F] hover:border-[#2C2C2D] text-[11px] text-[#c3c5d8] px-3 py-1.5 rounded-lg transition-all truncate max-w-[280px] cursor-pointer"
                  >
                    "{hist.query}"
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>


        {/* Dashboard KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardKPIs.map((kpi, idx) => {
            const isSpend = kpi.title.includes('Spend');
            const isPositive = kpi.change.startsWith('+');
            
            return (
              <div 
                key={idx} 
                className="bg-[#111111] border border-[#1F1F1F] p-5 rounded-xl group hover:border-[#2E2E2E] transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[#c3c5d8] text-xs font-medium tracking-wide uppercase opacity-80">{kpi.title}</span>
                  <div className="text-electric-blue opacity-50 group-hover:opacity-100 transition-opacity">
                    {kpi.iconName === 'api' && <Cpu className="h-4 w-4" />}
                    {kpi.iconName === 'payments' && <DollarSign className="h-4 w-4" />}
                    {kpi.iconName === 'person' && <Users className="h-4 w-4" />}
                    {kpi.iconName === 'bolt' && <Zap className="h-4 w-4" />}
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-2xl font-bold text-white tracking-tight leading-none">{kpi.value}</span>
                  <span className={`text-[11px] font-semibold ${
                    kpi.change.includes('Met') ? 'text-emerald-400' :
                    isSpend ? 'text-rose-400' : 'text-emerald-400'
                  }`}>
                    {kpi.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Line Chart of API Usage */}
        <section className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-5 overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">AI Usage Analytics</h2>
              <p className="text-[#c3c5d8]/70 text-xs">Daily API requests across all models over the last 30 days.</p>
            </div>
            
            <div className="flex bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg p-0.5">
              {(['30D', '7D', '24H'] as const).map((r) => (
                <button 
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`text-[11px] px-3 py-1 rounded-md transition-all ${
                    timeRange === r 
                      ? 'bg-[#1C1B1B] text-white font-medium border border-[#2E2E2E]' 
                      : 'text-[#c3c5d8]/60 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Area Line Chart via Recharts */}
          <div className="h-72 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={mockUsageAnalytics30D} 
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid stroke="#161616" strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  stroke="#434656" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#434656" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(val) => `${(val / 1000).toFixed(1)}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111111', 
                    borderColor: '#2E2D2D', 
                    borderRadius: '8px',
                    fontFamily: 'Geist Mono',
                    fontSize: '11px',
                    color: '#e5e2e1'
                  }} 
                  itemStyle={{ color: '#2E62FF' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="requests" 
                  stroke="#2E62FF" 
                  strokeWidth={2} 
                  dot={{ r: 3, stroke: '#2E62FF', strokeWidth: 1, fill: '#0A0A0A' }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Model & Team Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Model Usage Breakdown progress list */}
          <section className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-5">
            <h3 className="text-base font-semibold text-white mb-5">Model Usage Breakdown</h3>
            <div className="space-y-4">
              {mockModelShares.map((m, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-white font-medium">{m.name}</span>
                    <span className="font-mono text-[#c3c5d8]">{m.share}%</span>
                  </div>
                  <div className="h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${m.share}%`, 
                        backgroundColor: idx === 0 ? '#2E62FF' : idx === 1 ? '#8B5CF6' : idx === 2 ? '#EC4899' : '#10B981'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Team Adoption progress list */}
          <section className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-5 flex flex-col justify-between">
            <h3 className="text-base font-semibold text-white mb-5">Team Adoption Rate</h3>
            <div className="space-y-4 flex-1 flex flex-col justify-center">
              {mockTeamAdoptions.map((t, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <span className="text-xs text-[#c3c5d8] w-24 truncate font-medium">{t.team}</span>
                  <div className="flex-1 h-7 bg-[#1A1A1A] rounded-lg overflow-hidden relative border border-[#1F1F1F]">
                    <div 
                      className="h-full bg-[#571bc1]/80 hover:bg-[#571bc1] flex items-center px-3 transition-all duration-1000"
                      style={{ width: `${t.rate}%` }}
                    >
                      <span className="font-mono text-[10px] font-bold text-white">{t.rate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Activities and Spend Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity feed */}
          <section className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-5">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-base font-semibold text-white">Recent Activity Feed</h3>
              <button 
                className="text-electric-blue text-xs font-medium hover:underline flex items-center gap-1"
                onClick={() => onNavigate('usage')}
              >
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {filteredActivities.length === 0 ? (
                <p className="text-xs text-[#c3c5d8]/50 py-4 text-center">No matching activities found.</p>
              ) : (
                filteredActivities.map((act) => (
                  <div key={act.id} className="flex gap-4 items-start pb-4 border-b border-[#161616] last:border-b-0 last:pb-0">
                    <div className="w-8 h-8 rounded-full bg-electric-blue/10 flex items-center justify-center shrink-0">
                      {act.icon === 'code' && <Code className={`h-4 w-4 ${act.color}`} />}
                      {act.icon === 'summarize' && <FileText className={`h-4 w-4 ${act.color}`} />}
                      {act.icon === 'campaign' && <Megaphone className={`h-4 w-4 ${act.color}`} />}
                      {act.icon === 'translate' && <Globe className={`h-4 w-4 ${act.color}`} />}
                    </div>
                    <div>
                      <p className="text-xs text-[#e5e2e1] leading-relaxed">
                        <span className="font-semibold text-white">{act.user}</span> {act.action}
                      </p>
                      <span className="text-[11px] text-[#c3c5d8]/60 font-mono tracking-tight block mt-0.5">
                        {act.time} • {act.team}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* AI Spend Insights */}
          <section className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-5">
            <h3 className="text-base font-semibold text-white mb-5">AI Spend Insights</h3>
            
            <div className="space-y-3">
              <div className="bg-[#151515] p-4 rounded-xl border border-[#1F1F1F]">
                <span className="text-[10px] text-[#c3c5d8]/70 uppercase tracking-widest font-semibold block mb-0.5">Top Cost Driver</span>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-white">Recursive Code Indexing</span>
                  <span className="font-mono text-xs text-rose-400 font-bold">$842.10 <span className="text-[9px] font-normal text-[#c3c5d8]/50">/ mo</span></span>
                </div>
              </div>

              <div className="bg-[#151515] p-4 rounded-xl border border-[#1F1F1F]">
                <span className="text-[10px] text-[#c3c5d8]/70 uppercase tracking-widest font-semibold block mb-0.5">Most Expensive Team</span>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-white">Data Engineering</span>
                  <span className="font-mono text-xs text-white font-bold">$1,102.40 <span className="text-[9px] font-normal text-[#c3c5d8]/50">/ mo</span></span>
                </div>
              </div>

              <div className="bg-[#151515] p-4 rounded-xl border border-[#1F1F1F]">
                <span className="text-[10px] text-[#c3c5d8]/70 uppercase tracking-widest font-semibold block mb-0.5">Highest ROI Team</span>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-white">Customer Success</span>
                  <span className="font-mono text-xs text-emerald-400 font-bold">4.2x <span className="text-[9px] font-normal">Efficiency</span></span>
                </div>
              </div>

              <button 
                onClick={() => alert("Cost summary CSV export initiated.")}
                className="w-full mt-2 py-2.5 bg-[#0D0D0D] border border-[#1F1F1F] rounded-lg text-xs text-white hover:bg-[#1C1B1B] transition-all font-medium flex items-center justify-center gap-1.5"
              >
                Export Cost Analysis (CSV)
              </button>
            </div>
          </section>
        </div>

        {/* Security & Governance Row */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Security & Governance</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-[#111111] border border-[#1F1F1F] p-4 rounded-xl">
              <span className="text-[10px] text-[#c3c5d8]/60 block mb-2 font-medium tracking-wide uppercase">Shadow AI Detection</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                <span className="text-xs text-white font-medium">0 Active Risks</span>
              </div>
            </div>

            <div className="bg-[#111111] border border-[#1F1F1F] p-4 rounded-xl">
              <span className="text-[10px] text-[#c3c5d8]/60 block mb-2 font-medium tracking-wide uppercase">Unauthorized Tools</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.5)] animate-pulse"></div>
                <span className="text-xs text-white font-medium">2 Blocked Attempts</span>
              </div>
            </div>

            <div className="bg-[#111111] border border-[#1F1F1F] p-4 rounded-xl">
              <span className="text-[10px] text-[#c3c5d8]/60 block mb-2 font-medium tracking-wide uppercase">Compliance Status</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                <span className="text-xs text-white font-medium">SOC2 Ready</span>
              </div>
            </div>

            <div className="bg-[#111111] border border-[#1F1F1F] p-4 rounded-xl">
              <span className="text-[10px] text-[#c3c5d8]/60 block mb-2 font-medium tracking-wide uppercase">Total Risk Score</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-white">12 / 100</span>
                <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-semibold font-mono">
                  Minimal
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* Operational Optimization Lifecycle Visual flow map */}
        <footer className="mt-16 py-8 border-t border-[#1F1F1F]">
          <div className="max-w-4xl mx-auto">
            <h4 className="text-center text-[10px] text-[#c3c5d8]/70 uppercase tracking-[0.2em] mb-12 font-semibold">
              Operational Optimization Lifecycle
            </h4>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
              {/* Connector line for large screens */}
              <div className="hidden md:block absolute top-6 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#1F1F1F] to-transparent -z-10"></div>
              
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-[#111111] border border-[#1F1F1F] flex items-center justify-center text-electric-blue hover:border-electric-blue transition-all duration-300">
                  <Activity className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-bold text-white text-xs">Input</span>
                  <p className="text-[10px] text-[#c3c5d8]/60 w-32 leading-relaxed">
                    Raw API traffic and prompt logs collection.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-[#111111] border border-[#1F1F1F] flex items-center justify-center text-electric-blue hover:border-electric-blue transition-all duration-300">
                  <Cpu className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-semibold text-white text-xs">AI Usage</span>
                  <p className="text-[10px] text-[#c3c5d8]/60 w-32 leading-relaxed">
                    Model routing and cost allocation.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-[#111111] border border-[#1F1F1F] flex items-center justify-center text-electric-blue hover:border-electric-blue transition-all duration-300">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-semibold text-white text-xs">Insights</span>
                  <p className="text-[10px] text-[#c3c5d8]/60 w-32 leading-relaxed">
                    Sentiment, ROI, and security analysis.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-electric-blue/10 border border-electric-blue flex items-center justify-center text-electric-blue shadow-[0_0_15px_rgba(46,98,255,0.15)] hover:shadow-[0_0_20px_rgba(46,98,255,0.3)] transition-all duration-300">
                  <Zap className="h-5 w-5 animate-pulse" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-bold text-white text-xs">Optimization</span>
                  <p className="text-[10px] text-[#c3c5d8]/60 w-32 leading-relaxed font-normal">
                    Automated cost saving and rule enforcement.
                  </p>
                </div>
              </div>

            </div>
          </div>
          
          <div className="mt-20 text-center">
            <p className="text-[#c3c5d8]/30 font-mono text-[11px]">© 2026 OxyLens AI Operations. All rights reserved.</p>
          </div>
        </footer>

      </main>
    </div>
  );
}
