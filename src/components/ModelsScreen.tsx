import React, { useState } from 'react';
import { 
  Plus, 
  Terminal as TerminalIcon, 
  Download, 
  ChevronRight, 
  Filter, 
  Cpu, 
  CheckCircle, 
  AlertTriangle, 
  Server,
  ArrowRight,
  Shield,
  BookOpen,
  History,
  Activity,
  Zap
} from 'lucide-react';
import { ScreenId, AIModel } from '../types';
import Sidebar from './Sidebar';
import Header from './Header';
import { mockModels } from '../mockData';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip,
  XAxis
} from 'recharts';

interface ModelsScreenProps {
  onNavigate: (screenId: ScreenId) => void;
}

export default function ModelsScreen({ onNavigate }: ModelsScreenProps) {
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [activeTab, setActiveTab] = useState<'live' | '1H' | '24H'>('live');

  // Throughput interactive bar mock data
  const throughputData = [
    { time: '14:00', rps: 110 },
    { time: '14:05', rps: 145 },
    { time: '14:10', rps: 130 },
    { time: '14:15', rps: 180 },
    { time: '14:20', rps: 125 },
    { time: '14:25', rps: 210 },
    { time: '14:30', rps: 175 },
    { time: '14:35', rps: 160 },
    { time: '14:40', rps: 195 },
    { time: '14:45', rps: 170 },
    { time: '14:50', rps: 220 },
    { time: '14:55', rps: 245 },
    { time: '15:00', rps: 230 },
  ];

  // Token distribution chart data matching mockups
  const distributionData = [
    { name: 'GPT-4o', value: 62, color: '#2E62FF' },
    { name: 'Claude 3.5', value: 24, color: '#8B5CF6' },
    { name: 'Others', value: 14, color: '#434656' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#e5e2e1] flex">
      <Sidebar activeScreen="models" onNavigate={onNavigate} />

      <div className="flex-1 ml-64 min-h-screen flex flex-col">
        <Header onNavigate={onNavigate} placeholderText="Search models, tags, or providers..." />

        <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
          
          {/* Header titles */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-[9px] text-electric-blue uppercase tracking-widest font-bold">Active Infrastructure</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <h2 className="text-2xl font-bold text-white">Model Registry</h2>
              <p className="text-xs text-[#c3c5d8]/70 mt-1 max-w-2xl font-light">
                Comprehensive view of deployed large language models. Track real-time latency, token efficiency, and operational health across your multi-provider ecosystem.
              </p>
            </div>

            <div className="flex gap-2.5">
              <button 
                onClick={() => alert("Model registries being parsed for analytical filtering...")}
                className="flex items-center gap-1.5 border border-[#1F1F1F] bg-[#111111] hover:bg-[#1C1B1B] px-4 py-2 text-xs font-semibold rounded-lg text-white transition-colors cursor-pointer"
              >
                <Filter className="h-3.5 w-3.5" /> Filter
              </button>
              <button 
                onClick={() => alert("Deployment latency indexes exporting as JSON...")}
                className="flex items-center gap-1.5 border border-[#1F1F1F] bg-[#111111] hover:bg-[#1C1B1B] px-4 py-2 text-xs font-semibold rounded-lg text-white transition-colors cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" /> Export Metrics
              </button>
            </div>
          </div>

          {/* Model Registry Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockModels.map((model) => {
              const isDegraded = model.status === 'Degraded';
              const loadColorClass = isDegraded 
                ? 'bg-amber-500' 
                : model.name.includes('GPT') 
                ? 'bg-electric-blue' 
                : model.name.includes('Llama') 
                ? 'bg-neutral-400' 
                : 'bg-violet-accent';

              return (
                <div 
                  key={model.id}
                  onClick={() => setSelectedModel(model)}
                  className={`group bg-[#111111] border rounded-xl p-5 transition-all duration-300 flex flex-col relative overflow-hidden cursor-pointer ${
                    selectedModel?.id === model.id ? 'border-electric-blue ring-1 ring-electric-blue/30 scale-[1.01]' : 'border-[#1F1F1F] hover:border-[#2E2E2E]'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-[#1A1A1A] rounded-lg border border-[#1F1F1F] text-[#c3c5d8] group-hover:text-white transition-colors">
                      <Cpu className="h-4.5 w-4.5" />
                    </div>
                    
                    {/* Status indicator */}
                    <div className={`px-2 py-0.5 rounded-full border flex items-center gap-1.5 ${
                      isDegraded 
                        ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' 
                        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isDegraded ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                      <span className="text-[10px] font-bold uppercase tracking-tight font-mono">{model.status}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-0.5 group-hover:text-electric-blue transition-colors">{model.name}</h3>
                  <p className="text-[11px] text-[#c3c5d8]/60 mb-6">{model.provider}</p>

                  <div className="space-y-4 mt-auto">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] text-[#c3c5d8]/50">Latency</p>
                        <p className={`font-mono text-xs font-bold ${isDegraded ? 'text-amber-400 font-semibold' : 'text-white'}`}>
                          {model.latency}ms
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-[#c3c5d8]/50">Cost/1k</p>
                        <p className="font-mono text-xs font-bold text-white">
                          ${model.costPer1k.toFixed(4)}
                        </p>
                      </div>
                    </div>

                    <div className="h-1 bg-[#1A1A1A] rounded-full overflow-hidden border border-[#1F1F1F]/60">
                      <div className={`h-full rounded-full transition-all duration-1000 ${loadColorClass}`} style={{ width: `${model.load}%` }}></div>
                    </div>

                    <div className="flex justify-between text-[10px] font-mono text-[#c3c5d8]/40 uppercase">
                      <span>Load: {model.load}%</span>
                      <span>{model.version}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Inference & Token Distribution row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Inference Throughout chart */}
            <div className="lg:col-span-2 bg-[#111111] border border-[#1F1F1F] rounded-xl p-5 flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">Inference Throughput</h4>
                  <p className="text-xs text-[#c3c5d8]/60 mt-0.5">Global requests per second (RPS)</p>
                </div>

                <div className="flex bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg p-0.5">
                  {(['live', '1H', '24H'] as const).map((tab) => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-[11px] uppercase tracking-normal px-3 py-1.5 rounded-md transition-all ${
                        activeTab === tab 
                          ? 'bg-[#1C1B1B] text-white font-medium border border-[#2E2E2E]' 
                          : 'text-[#c3c5d8]/50 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bar graph representing latency spikes */}
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={throughputData}>
                    <XAxis dataKey="time" stroke="#434656" fontSize={9} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#111111', 
                        borderColor: '#1F1F1F', 
                        fontSize: '11px',
                        color: '#e5e2e1',
                        fontFamily: 'Geist Mono'
                      }} 
                    />
                    <Bar dataKey="rps" fill="#2E62FF" opacity={0.65} radius={[3, 3, 0, 0]} className="hover:opacity-100 transition-opacity" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Token allocation donut chart */}
            <div className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-5 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-white tracking-tight">Token Distribution</h4>
                <p className="text-xs text-[#c3c5d8]/60 mt-0.5">Allocation by model instance</p>
              </div>

              <div className="relative h-44 flex items-center justify-center my-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={48}
                      outerRadius={65}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Central Labels overlay to render exactly like screenshots */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
                  <span className="text-2xl font-bold text-white leading-none">1.4M</span>
                  <span className="text-[9px] text-[#c3c5d8]/50 uppercase tracking-wider font-semibold mt-0.5">
                    Total Tokens
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {distributionData.map((d, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }}></span>
                      <span className="text-[#e5e2e1] font-medium">{d.name}</span>
                    </div>
                    <span className="font-mono text-[#c3c5d8]/60">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Documentation and resources cards */}
          <section className="space-y-4">
            <h3 className="text-base font-bold text-white">Documentation & Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <a 
                onClick={(e) => { e.preventDefault(); alert("Rendering detailed API tutorial..."); }}
                className="group p-5 bg-[#111111] border border-[#1F1F1F] rounded-xl hover:border-electric-blue/40 transition-all flex flex-col justify-between h-40"
                href="#"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2 text-electric-blue">
                    <TerminalIcon className="h-5 w-5" />
                    <h5 className="text-sm font-bold text-white">API Integration</h5>
                  </div>
                  <p className="text-xs text-[#c3c5d8]/60 line-clamp-2">
                    Connect your applications via our unified SDK and secure proxy layer with raw endpoint tunneling.
                  </p>
                </div>
                <span className="text-xs text-electric-blue group-hover:underline flex items-center gap-1 mt-4">
                  View docs <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </a>

              <a 
                onClick={(e) => { e.preventDefault(); alert("Compliance blueprints loaded."); }}
                className="group p-5 bg-[#111111] border border-[#1F1F1F] rounded-xl hover:border-violet-accent/40 transition-all flex flex-col justify-between h-40"
                href="#"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2 text-violet-accent">
                    <Shield className="h-5 w-5" />
                    <h5 className="text-sm font-bold text-white">Security Policies</h5>
                  </div>
                  <p className="text-xs text-[#c3c5d8]/60 line-clamp-2">
                    Manage data residency, PII filtering parameters, and model-specific authorization constraints.
                  </p>
                </div>
                <span className="text-xs text-violet-accent group-hover:underline flex items-center gap-1 mt-4">
                  View docs <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </a>

              <a 
                onClick={(e) => { e.preventDefault(); alert("Redirecting to prompt templates database."); }}
                className="group p-5 bg-[#111111] border border-[#1F1F1F] rounded-xl hover:border-[#10B981]/40 transition-all flex flex-col justify-between h-40"
                href="#"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2 text-emerald-400">
                    <BookOpen className="h-5 w-5" />
                    <h5 className="text-sm font-bold text-white">Prompt Library</h5>
                  </div>
                  <p className="text-xs text-[#c3c5d8]/60 line-clamp-2">
                    Corporate repository of fully optimized prompt designs for standard enterprise models.
                  </p>
                </div>
                <span className="text-xs text-emerald-400 group-hover:underline flex items-center gap-1 mt-4">
                  View docs <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </a>

            </div>
          </section>

          {/* Model Activity Feed */}
          <section className="bg-[#111111] border border-[#1F1F1F] rounded-xl overflow-hidden">
            <div className="p-5 border-b border-[#1F1F1F] flex justify-between items-center bg-[#151515]">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <History className="h-4.5 w-4.5 text-electric-blue" />
                Global Activity Feed
              </h3>
            </div>
            
            <div className="divide-y divide-[#1F1F1F]">
              
              <div className="p-4 flex items-center justify-between hover:bg-[#151515] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-electric-blue/10 flex items-center justify-center text-electric-blue">
                    <Plus className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-white">New deployment triggered: <span className="font-bold">Llama-3-8B-Instruct</span></p>
                    <p className="text-[10px] text-[#c3c5d8]/50 mt-0.5">2 minutes ago • Ops-Team-Alpha</p>
                  </div>
                </div>
                <span className="font-mono text-[9px] font-bold text-[#c3c5d8]/60 px-2 py-0.5 bg-[#1A1A1A] border border-[#1F1F1F] rounded">
                  SUCCESS
                </span>
              </div>

              <div className="p-4 flex items-center justify-between hover:bg-[#151515] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-white">Latency spike detected on <span className="font-bold">Gemini 1.5 Pro</span> (US-East-1)</p>
                    <p className="text-[10px] text-[#c3c5d8]/50 mt-0.5">14 minutes ago • System Alert</p>
                  </div>
                </div>
                <span className="font-mono text-[9px] font-bold text-amber-400 px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded">
                  MONITORING
                </span>
              </div>

              <div className="p-4 flex items-center justify-between hover:bg-[#151515] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-accent/10 flex items-center justify-center text-violet-accent">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-white">Updated cost policies for <span className="font-bold">GPT-4o</span></p>
                    <p className="text-[10px] text-[#c3c5d8]/50 mt-0.5">1 hour ago • Finance-Lead</p>
                  </div>
                </div>
                <span className="font-mono text-[9px] font-bold text-[#c3c5d8]/60 px-2 py-0.5 bg-[#1A1A1A] border border-[#1F1F1F] rounded">
                  CONFIG
                </span>
              </div>

            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
