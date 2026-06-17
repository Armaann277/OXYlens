import React, { useState } from 'react';
import { 
  Plus, 
  ChevronRight, 
  Download, 
  Users, 
  Cpu, 
  Activity, 
  Settings as SettingsIcon,
  Search,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Clock,
  Coins,
  Shield,
  Lightbulb,
  Bell,
  HelpCircle,
  FileText
} from 'lucide-react';
import { ScreenId, UsageIdentity } from '../types';
import Sidebar from './Sidebar';
import Header from './Header';
import { mockUsageIdentities } from '../mockData';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface UsageScreenProps {
  onNavigate: (screenId: ScreenId) => void;
}

export default function UsageScreen({ onNavigate }: UsageScreenProps) {
  const [activeRange, setActiveRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [projectFilter, setProjectFilter] = useState('All Projects');

  const lineChartData = [
    { name: '00:00', gpt4o: 100, claude35: 80 },
    { name: '02:00', gpt4o: 240, claude35: 90 },
    { name: '04:00', gpt4o: 180, claude35: 140 },
    { name: '06:00', gpt4o: 350, claude35: 180 },
    { name: '08:00', gpt4o: 220, claude35: 220 },
    { name: '10:00', gpt4o: 480, claude35: 110 },
    { name: '12:00', gpt4o: 380, claude35: 240 },
    { name: '14:00', gpt4o: 512, claude35: 190 },
    { name: '16:00', gpt4o: 680, claude35: 310 },
    { name: '18:00', gpt4o: 420, claude35: 250 },
    { name: '20:00', gpt4o: 610, claude35: 290 },
    { name: '22:00', gpt4o: 590, claude35: 210 },
  ];

  const pieChartData = [
    { name: 'Inference', value: 60, color: '#2E62FF' },
    { name: 'GPU Overheads', value: 25, color: '#8B5CF6' },
    { name: 'Egress/API', value: 15, color: '#EC4899' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#e5e2e1] flex">
      {/* Sidebar (aside) navigation */}
      <Sidebar activeScreen="usage" onNavigate={onNavigate} />

      {/* Main Container */}
      <div className="flex-1 ml-64 min-h-screen flex flex-col">
        
        {/* Customized top header with active Analytics state */}
        <Header onNavigate={onNavigate} showTabs={true} />

        <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
          
          {/* Page row block */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Usage Analytics</h1>
              <p className="text-xs text-[#c3c5d8]/60 font-light mt-0.5">Granular breakdown of model consumption and infrastructure costs.</p>
            </div>

            {/* Timers & CSV Exporter button */}
            <div className="flex items-center gap-2 bg-[#111111] p-1 rounded-lg border border-[#1F1F1F]">
              {(['24h', '7d', '30d'] as const).map((r) => (
                <button 
                  key={r}
                  onClick={() => setActiveRange(r)}
                  className={`text-[11px] px-3 py-1.5 rounded-md uppercase tracking-tight transition-all font-sans ${
                    activeRange === r 
                      ? 'bg-[#1C1B1B] text-white font-medium border border-[#2E2E2E]' 
                      : 'text-[#c3c5d8]/50 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
              <div className="w-[1px] h-4 bg-[#1F1F1F] mx-1"></div>
              <button 
                onClick={() => alert("Initiating token usage logs spreadsheet compile (CSV)...")}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs bg-electric-blue text-white hover:bg-opacity-95 transition-all font-semibold font-sans cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Bento Grid Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Total tokens */}
            <div className="bg-[#111111] border border-[#1F1F1F] p-5 rounded-xl hover:border-[#2E2E2E] transition-all duration-300">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[#c3c5d8]/60 text-[11px] uppercase font-bold font-sans">Total Tokens</span>
                <Coins className="h-4.5 w-4.5 text-electric-blue opacity-70" />
              </div>
              <div className="text-2xl font-bold font-mono text-white tracking-tight">1.2B</div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold mt-2">
                <TrendingUp className="h-3.5 w-3.5" />
                +12.4% vs last period
              </div>
            </div>

            {/* Estimated cost */}
            <div className="bg-[#111111] border border-[#1F1F1F] p-5 rounded-xl hover:border-[#2E2E2E] transition-all duration-300">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[#c3c5d8]/60 text-[11px] uppercase font-bold font-sans">Estimated Cost</span>
                <Coins className="h-4.5 w-4.5 text-electric-blue opacity-70" />
              </div>
              <div className="text-2xl font-bold font-mono text-white tracking-tight">$14,204.12</div>
              <div className="flex items-center gap-1 text-[10px] text-rose-400 font-bold mt-2">
                <TrendingUp className="h-3.5 w-3.5" />
                +4.2% vs last period
              </div>
            </div>

            {/* Peak load */}
            <div className="bg-[#111111] border border-[#1F1F1F] p-5 rounded-xl hover:border-[#2E2E2E] transition-all duration-300">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[#c3c5d8]/60 text-[11px] uppercase font-bold font-sans">Peak Load</span>
                <Clock className="h-4.5 w-4.5 text-electric-blue opacity-70" />
              </div>
              <div className="text-2xl font-bold font-mono text-white tracking-tight">
                4.2k <span className="text-xs font-normal text-[#c3c5d8]/40">req/s</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-[#c3c5d8]/50 mt-2 font-medium">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                Within threshold
              </div>
            </div>

            {/* Avg latency */}
            <div className="bg-[#111111] border border-[#1F1F1F] p-5 rounded-xl hover:border-[#2E2E2E] transition-all duration-300">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[#c3c5d8]/60 text-[11px] uppercase font-bold font-sans">Avg. Latency</span>
                <Activity className="h-4.5 w-4.5 text-electric-blue opacity-70" />
              </div>
              <div className="text-2xl font-bold font-mono text-white tracking-tight">182ms</div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-400 mt-2 font-bold">
                <TrendingDown className="h-3.5 w-3.5" />
                -12ms optimization
              </div>
            </div>

          </div>

          {/* Charts area grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Token consumption chart */}
            <div className="lg:col-span-2 bg-[#111111] border border-[#1F1F1F] p-5 rounded-xl min-h-[400px] flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-sans">Daily Token Consumption</h3>
                  <p className="text-[10px] text-[#c3c5d8]/50 mt-0.5">Inferred vs. Real-time consumption</p>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-electric-blue"></span>
                    <span className="text-[10px] text-[#c3c5d8]/75 font-mono">GPT-4O</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-violet-accent"></span>
                    <span className="text-[10px] text-[#c3c5d8]/75 font-mono">CLAUDE 3.5</span>
                  </div>
                </div>
              </div>

              {/* Area graph comparison with Recharts */}
              <div className="flex-1 h-64 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid stroke="#161616" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" stroke="#434656" fontSize={9} tickLine={false} axisLine={false} />
                    <YAxis stroke="#434656" fontSize={9} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#111111', 
                        borderColor: '#1F1F1F', 
                        fontSize: '11px',
                        color: '#fff', 
                        fontFamily: 'Geist Mono' 
                      }} 
                    />
                    <Line type="monotone" dataKey="gpt4o" stroke="#2E62FF" strokeWidth={2} dot={false} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="claude35" stroke="#8B5CF6" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Cost pie chart */}
            <div className="bg-[#111111] border border-[#1F1F1F] p-5 rounded-xl flex flex-col justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-sans mb-6">Cost by Resource</h3>
              
              <div className="flex-1 flex flex-col justify-center items-center">
                <div className="relative w-44 h-44 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={65}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[10px] text-[#c3c5d8]/50 uppercase tracking-widest font-semibold">Total Spent</span>
                    <span className="text-xl font-bold font-mono text-white mt-0.5">$14.2k</span>
                  </div>
                </div>

                <div className="w-full space-y-2">
                  {pieChartData.map((entry, i) => (
                    <div key={i} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }}></span>
                        <span className="text-[#e5e2e1] font-medium font-sans">{entry.name}</span>
                      </div>
                      <span className="font-mono text-[#c3c5d8]/60">{entry.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Detailed Usage by Identity Section */}
          <div className="bg-[#111111] border border-[#1F1F1F] rounded-xl overflow-hidden shadow-xl">
            <div className="p-5 border-b border-[#1F1F1F] flex justify-between items-center bg-[#151515]">
              <div>
                <h3 className="text-sm font-bold text-white">Usage by Identity</h3>
                <p className="text-[10px] text-[#c3c5d8]/40 mt-0.5">Breakdown per API Key and individual User</p>
              </div>

              <select 
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
                className="bg-[#0A0A0A] border border-[#1F1F1F] text-xs text-white rounded-lg px-3 py-1.5 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue/30 outline-none"
              >
                <option>All Projects</option>
                <option>Production-Cluster</option>
                <option>Dev-Sandbox</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#161616] border-b border-[#1F1F1F]">
                    <th className="px-6 py-4 text-[10px] text-[#c3c5d8]/60 uppercase tracking-wider font-semibold font-sans">Identity</th>
                    <th className="px-6 py-4 text-[10px] text-[#c3c5d8]/60 uppercase tracking-wider font-semibold font-sans">API Key ID</th>
                    <th className="px-6 py-4 text-[10px] text-[#c3c5d8]/60 uppercase tracking-wider font-semibold font-sans text-right">Tokens (24h)</th>
                    <th className="px-6 py-4 text-[10px] text-[#c3c5d8]/60 uppercase tracking-wider font-semibold font-sans text-right">Cost</th>
                    <th className="px-6 py-4 text-[10px] text-[#c3c5d8]/60 uppercase tracking-wider font-semibold font-sans text-right">Error Rate</th>
                    <th className="px-6 py-4 text-[10px] text-[#c3c5d8]/60 uppercase tracking-wider font-semibold font-sans">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1F1F1F] text-xs font-sans">
                  {mockUsageIdentities.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#151515] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <img 
                            alt={`${item.name} user profile pic`} 
                            className="w-7 h-7 rounded-full border border-[#1F1F1F] object-cover" 
                            src={item.avatar}
                          />
                          <div>
                            <div className="text-white font-medium">{item.name}</div>
                            <div className="text-[10px] text-[#c3c5d8]/50">{item.role}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-mono text-[#c3c5d8]/70 text-[11px] bg-[#0A0A0A] border border-[#1F1F1F] px-2 py-1 rounded">
                          {item.apiKey}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-mono text-right font-medium text-white">{item.tokens24h}</td>
                      <td className="px-6 py-4 font-mono text-right text-white font-bold">
                        ${item.cost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={item.errorRate > 5 ? 'text-rose-400 font-bold' : item.errorRate > 1 ? 'text-amber-400' : 'text-emerald-400'}>
                          {item.errorRate.toFixed(2)}%
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-tight font-sans ${
                          item.status === 'Active' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : item.status === 'Paused' 
                            ? 'bg-[#1C1B1B] text-[#c3c5d8] border border-[#2E2E2E]'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            item.status === 'Active' ? 'bg-emerald-400' : item.status === 'Paused' ? 'bg-[#c3c5d8]/40' : 'bg-rose-400'
                          }`} />
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-[#0D0D0D] border-t border-[#1F1F1F] flex items-center justify-between text-xs text-[#c3c5d8]/40 font-mono">
              <span>Showing 1-4 of 184 identities</span>
              <div className="flex gap-1.5">
                <button disabled className="p-1 border border-[#1F1F1F] rounded-md text-[#c3c5d8]/20">Back</button>
                <button className="p-1 border border-[#1F1F1F] rounded-md hover:bg-[#1C1B1B] text-white">Next</button>
              </div>
            </div>
          </div>

          {/* Anomaly and Optimization insights columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            
            {/* Optimization insight card */}
            <div className="bg-[#111111] border border-[#1F1F1F] p-5 rounded-xl flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-electric-blue/10 flex items-center justify-center flex-shrink-0 text-electric-blue border border-electric-blue/20">
                <Lightbulb className="h-5 w-5 animate-bounce" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans mb-1.5">Optimization Insight</h4>
                <p className="text-xs text-[#c3c5d8]/80 leading-relaxed font-light">
                  We noticed a high volume of redundant prompt calls from <span className="font-mono text-white">customer-success-bot</span>. Enabling semantic caching could reduce token consumption by up to <span className="text-emerald-400 font-bold">18%</span>.
                </p>
                <button 
                  onClick={() => alert("Applying semantic cache configurations across global proxy gateways...")}
                  className="mt-3.5 text-xs font-bold text-electric-blue hover:text-white transition-colors cursor-pointer block"
                >
                  Apply Configuration
                </button>
              </div>
            </div>

            {/* Anomaly detected */}
            <div className="bg-[#111111] border border-[#1F1F1F] p-5 rounded-xl flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center flex-shrink-0 text-rose-400 border border-rose-500/20">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans mb-1.5">Anomaly Detected</h4>
                <p className="text-xs text-[#c3c5d8]/80 leading-relaxed font-light">
                  An unusual spike in 429 Errors was detected on API key <span className="font-mono text-white">sk_test_...7z9w</span> starting at 04:20 UTC. Requests are currently being ratelimited to prevent cascading failure.
                </p>
                <button 
                  onClick={() => alert("Loading granular threat logs stream context...")}
                  className="mt-3.5 text-xs font-bold text-rose-400 hover:text-white transition-colors cursor-pointer block"
                >
                  View Logs
                </button>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
