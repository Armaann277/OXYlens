import React, { useState } from 'react';
import { 
  Users, 
  Cpu, 
  Activity, 
  Terminal as TerminalIcon, 
  TrendingUp, 
  ChevronRight, 
  Download, 
  Plus, 
  Shield, 
  Lock, 
  X, 
  Filter, 
  Grid, 
  List, 
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { ScreenId, Team } from '../types';
import Sidebar from './Sidebar';
import Header from './Header';
import { mockTeams } from '../mockData';
import { BarChart, Bar, ResponsiveContainer, Tooltip } from 'recharts';

interface TeamsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export default function TeamsScreen({ onNavigate }: TeamsScreenProps) {
  const [selectedTeam, setSelectedTeam] = useState<Team>(mockTeams[0]);
  const [permEndpointAccess, setPermEndpointAccess] = useState(true);
  const [permObservability, setPermObservability] = useState(true);
  const [permissionFilters, setPermissionFilters] = useState<string[]>(['Full Access']);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // Operational health mock data that updates slightly based on team selection
  const makeHealthData = (teamName: string) => {
    const seed = teamName.charCodeAt(0) || 50;
    return [
      { name: 'A', val: (seed % 30) + 40 },
      { name: 'B', val: (seed % 40) + 50 },
      { name: 'C', val: (seed % 20) + 30 },
      { name: 'D', val: (seed % 50) + 45 },
      { name: 'E', val: (seed % 35) + 60 },
      { name: 'F', val: (seed % 45) + 55 },
      { name: 'G', val: (seed % 25) + 70 },
    ];
  };

  const currentHealth = makeHealthData(selectedTeam.name);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#e5e2e1] flex">
      {/* Sidebar navigation panel */}
      <Sidebar activeScreen="teams" onNavigate={onNavigate} />

      {/* Main workspace scrollable section */}
      <div className="flex-1 ml-64 min-h-screen flex flex-col">
        <Header onNavigate={onNavigate} />
        
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
          {/* Section Breadcrumbs and Title Info */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <nav className="flex items-center gap-1 text-[10px] text-[#c3c5d8]/60 uppercase tracking-widest mb-1.5 font-medium">
                <span className="hover:text-electric-blue cursor-pointer transition-colors" onClick={() => onNavigate('dashboard')}>Organization</span>
                <ChevronRight className="h-3 w-3 text-[#c3c5d8]/40" />
                <span className="text-white">Teams Management</span>
              </nav>
              
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                Organization Teams
                <span className="bg-[#1C1B1B] text-[#c3c5d8] text-[10px] uppercase font-mono px-2 py-0.5 rounded border border-[#2E2E2E]">
                  14 ACTIVE
                </span>
              </h2>
              <p className="text-xs text-[#c3c5d8]/80 mt-1 max-w-xl font-light">
                Manage cross-functional units, assign AI compute quotas, and monitor localized risk factors across your enterprise infrastructure.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button 
                onClick={() => alert("Audit log data compiling for export...")}
                className="border border-[#1F1F1F] bg-[#111111] hover:bg-[#1A1A1A] px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors cursor-pointer text-[#e5e2e1]"
              >
                <Download className="h-3.5 w-3.5" />
                Export Audit
              </button>
              <button 
                onClick={() => alert("Create team portal initiated.")}
                className="bg-white text-[#0A0A0A] hover:bg-opacity-95 px-4 py-2 text-xs font-bold rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                Create Team
              </button>
            </div>
          </div>

          {/* KPI Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Total Members card */}
            <div className="bg-[#111111] border border-[#1F1F1F] p-5 rounded-xl flex flex-col justify-between h-32 relative overflow-hidden group hover:border-[#2E2E2E] transition-all duration-300">
              <div className="relative z-10">
                <p className="text-[#c3c5d8]/70 text-xs font-medium flex items-center gap-1">
                  Total Members <Info className="h-3 w-3 text-electric-blue" />
                </p>
                <h3 className="text-3xl font-bold mt-2 text-white">1,248</h3>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 z-10 font-bold mt-2">
                <TrendingUp className="h-3.5 w-3.5" /> +12% MoM
              </div>
            </div>

            {/* Aggregated Compute card */}
            <div className="bg-[#111111] border border-[#1F1F1F] p-5 rounded-xl flex flex-col justify-between h-32 group hover:border-[#2E2E2E] transition-all duration-300">
              <div>
                <p className="text-[#c3c5d8]/70 text-xs font-medium">Aggregated Compute</p>
                <h3 className="text-3xl font-bold mt-2 text-white">84.2 <span className="text-sm font-normal text-[#c3c5d8]/50">PFLOPS</span></h3>
              </div>
              <div className="w-full bg-[#1A1A1A] h-1.5 rounded-full overflow-hidden mt-2 border border-[#1F1F1F]">
                <div className="bg-electric-blue h-full w-3/4 rounded-full transition-all duration-1000"></div>
              </div>
            </div>

            {/* Total Monthly Spend card */}
            <div className="bg-[#111111] border border-[#1F1F1F] p-5 rounded-xl flex flex-col justify-between h-32 group hover:border-[#2E2E2E] transition-all duration-300">
              <div>
                <p className="text-[#c3c5d8]/70 text-xs font-medium">Total Monthly Spend</p>
                <h3 className="text-3xl font-bold mt-2 text-white">$242.4K</h3>
              </div>
              <div className="text-[10px] font-mono text-[#c3c5d8]/50 uppercase tracking-widest font-semibold mt-2">
                Billing cycle ends in 4 days
              </div>
            </div>

            {/* System Risk Level card */}
            <div className="bg-[#111111] border border-[#1F1F1F] p-5 rounded-xl flex flex-col justify-between h-32 border-l-4 border-l-rose-500 group hover:border-[#2E2E2E] transition-all duration-300">
              <div>
                <p className="text-[#c3c5d8]/70 text-xs font-medium">System Risk Level</p>
                <h3 className="text-3xl font-bold mt-2 text-rose-400">Moderate</h3>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                <span className="text-[10px] font-mono text-rose-400 uppercase font-semibold">3 Anomalies Detected</span>
              </div>
            </div>

          </div>

          {/* Filter Bar */}
          <div className="bg-[#111111]/80 backdrop-blur-md p-3.5 rounded-xl border border-[#1F1F1F] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {permissionFilters.map((f, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1C1B1B] border border-[#2E2E2E] text-xs font-medium cursor-pointer hover:border-electric-blue transition-colors text-white"
                >
                  <span>AI Permission: {f}</span>
                  <X className="h-3.5 w-3.5 text-[#c3c5d8]/60 hover:text-white" onClick={() => setPermissionFilters([])} />
                </div>
              ))}
              <div 
                onClick={() => setPermissionFilters(['Full Access'])}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#1F1F1F] hover:border-[#2E2E2E] text-[#c3c5d8]/70 text-xs font-medium cursor-pointer transition-colors"
              >
                <SlidersHorizontal className="h-3 w-3" />
                <span>More Filters</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[#c3c5d8]/60 text-xs font-medium">Sort by: <span className="text-white">Monthly Spend</span></span>
              
              <div className="flex border border-[#1F1F1F] bg-[#0D0D0D] rounded-lg p-0.5">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1 rounded-md transition-all ${viewMode === 'grid' ? 'bg-[#1C1B1B] text-electric-blue' : 'text-[#c3c5d8]/60'}`}
                >
                  <Grid className="h-3.5 w-3.5" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1 rounded-md transition-all ${viewMode === 'list' ? 'bg-[#1C1B1B] text-electric-blue' : 'text-[#c3c5d8]/60'}`}
                >
                  <List className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Teams Table */}
          <div className="bg-[#111111] border border-[#1F1F1F] rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#161616] border-b border-[#1F1F1F]">
                    <th className="px-6 py-4 text-xs font-medium text-[#c3c5d8]/60 uppercase tracking-wider font-sans">Team Name</th>
                    <th className="px-6 py-4 text-xs font-medium text-[#c3c5d8]/60 uppercase tracking-wider font-sans">Member Count</th>
                    <th className="px-6 py-4 text-xs font-medium text-[#c3c5d8]/60 uppercase tracking-wider font-sans">Primary AI Model</th>
                    <th className="px-6 py-4 text-xs font-medium text-[#c3c5d8]/60 uppercase tracking-wider font-sans text-right">Monthly Spend</th>
                    <th className="px-6 py-4 text-xs font-medium text-[#c3c5d8]/60 uppercase tracking-wider font-sans">Risk Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1F1F1F]">
                  {mockTeams.map((team) => {
                    const isSelected = selectedTeam.id === team.id;
                    
                    return (
                      <tr 
                        key={team.id}
                        onClick={() => setSelectedTeam(team)}
                        className={`cursor-pointer transition-all duration-200 ${
                          isSelected ? 'bg-[#2E62FF]/5 border-l-2 border-l-electric-blue' : 'hover:bg-[#151515]'
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-[#2E62FF]/10 flex items-center justify-center text-electric-blue">
                              {team.name.startsWith('Eng') ? <TerminalIcon className="h-4 w-4" /> : <Users className="h-4 w-4" />}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white font-sans">{team.name}</div>
                              <div className="font-mono text-[9px] text-[#c3c5d8]/60 uppercase tracking-tighter">ID: {team.id}</div>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              {team.avatars.map((ava, i) => (
                                <img 
                                  key={i} 
                                  alt="Team Member" 
                                  className="w-6.5 h-6.5 rounded-full border border-[#0A0A0A] object-cover"
                                  src={ava}
                                />
                              ))}
                            </div>
                            <span className="font-mono text-[11px] text-[#c3c5d8]/60 font-medium">+{team.memberCount}</span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Cpu className="h-3.5 w-3.5 text-electric-blue" />
                            <span className="text-xs font-medium text-white">{team.primaryModel}</span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="font-mono text-xs font-bold text-white">
                            ${team.monthlySpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </div>
                          <div className={`text-[10px] font-mono ${team.spendChange.startsWith('-') ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {team.spendChange}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-tight uppercase border ${
                            team.riskStatus === 'Stable' 
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                              : team.riskStatus === 'High Load' 
                              ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                              : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              team.riskStatus === 'Stable' ? 'bg-emerald-400' : team.riskStatus === 'High Load' ? 'bg-rose-400' : 'bg-amber-400'
                            }`} />
                            {team.riskStatus}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="bg-[#0D0D0D] px-6 py-3.5 flex items-center justify-between border-t border-[#1F1F1F] text-xs text-[#c3c5d8]/50">
              <span>Showing 1 to 4 of 4 teams</span>
              <div className="flex gap-1">
                <button disabled className="p-1.5 border border-[#1F1F1F] rounded-md text-[#c3c5d8]/30">Back</button>
                <button className="px-3 py-1 bg-electric-blue text-white rounded-md font-semibold text-xs transition-all">1</button>
                <button className="p-1.5 border border-[#1F1F1F] rounded-md hover:bg-[#1C1B1B] text-[#e5e2e1]">Next</button>
              </div>
            </div>
          </div>

          {/* AI Permissions & Operational Health grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Detailed AI Permissions */}
            <div className="lg:col-span-2 bg-[#111111] border border-[#1F1F1F] p-5 rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-base font-bold text-white tracking-tight">Detailed AI Permissions</h4>
                <span className="text-xs text-electric-blue font-semibold bg-electric-blue/10 px-2.5 py-0.5 rounded-full">
                  Selection: {selectedTeam.name}
                </span>
              </div>

              <div className="space-y-4">
                
                {/* Rule 1 */}
                <div className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-xl border border-[#1F1F1F] hover:border-[#2E2E2E] transition-all">
                  <div className="flex gap-3 items-center">
                    <div className="p-2.5 bg-electric-blue/10 rounded-lg text-electric-blue">
                      <Cpu className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Raw Endpoint Access</div>
                      <div className="text-xs text-[#c3c5d8]/60 mt-0.5 font-light">
                        Allows team members to call base model APIs without proxy overhead.
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setPermEndpointAccess(!permEndpointAccess)}
                    className={`w-9 h-5 rounded-full transition-colors relative ${permEndpointAccess ? 'bg-electric-blue' : 'bg-[#1F1F1F]'}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${permEndpointAccess ? 'left-4.5' : 'left-0.5'}`} />
                  </button>
                </div>

                {/* Rule 2 */}
                <div className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-xl border border-[#1F1F1F] hover:border-[#2E2E2E] transition-all">
                  <div className="flex gap-3 items-center">
                    <div className="p-2.5 bg-violet-accent/10 rounded-lg text-violet-accent">
                      <Activity className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Inference Observability</div>
                      <div className="text-xs text-[#c3c5d8]/60 mt-0.5 font-light">
                        Real-time token and input logging stream enabled.
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setPermObservability(!permObservability)}
                    className={`w-9 h-5 rounded-full transition-colors relative ${permObservability ? 'bg-electric-blue' : 'bg-[#1F1F1F]'}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${permObservability ? 'left-4.5' : 'left-0.5'}`} />
                  </button>
                </div>

                {/* Rule 3 */}
                <div className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-xl border border-[#1F1F1F] opacity-40">
                  <div className="flex gap-3 items-center">
                    <div className="p-2.5 bg-rose-500/10 rounded-lg text-rose-400">
                      <Shield className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">GPU Cluster Management</div>
                      <div className="text-xs text-[#c3c5d8]/60 mt-0.5 font-light">
                        Provision, deploy, and configure dedicated compute instances.
                      </div>
                    </div>
                  </div>
                  
                  <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase italic">
                    Restricted
                  </span>
                </div>

              </div>
            </div>

            {/* Operational Health card */}
            <div className="bg-[#111111] border border-[#1F1F1F] p-5 rounded-xl flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-white tracking-tight mb-4 flex items-center gap-1.5">
                  Operational Health
                </h4>
                
                {/* Telemetry charts */}
                <div className="h-24 w-full mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={currentHealth}>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#111111', 
                          borderColor: '#1F1F1F', 
                          color: '#fff',
                          fontSize: '10px' 
                        }} 
                      />
                      <Bar dataKey="val" fill="#2E62FF" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-3.5 flex-1 flex flex-col justify-end">
                <div className="flex justify-between text-xs">
                  <span className="text-[#c3c5d8]/60">Average Latency</span>
                  <span className="font-mono text-white font-bold">124ms</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#c3c5d8]/60">Error Rate</span>
                  <span className="font-mono text-emerald-400 font-bold">0.02%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#c3c5d8]/60">Token Efficiency</span>
                  <span className="font-mono text-electric-blue font-bold">94.2%</span>
                </div>
                
                <button 
                  onClick={() => alert(`Reviewing health parameters for ${selectedTeam.name}...`)}
                  className="w-full py-2.5 border border-electric-blue text-electric-blue hover:bg-electric-blue/5 text-xs font-bold rounded-lg transition-all"
                >
                  View Health Audit
                </button>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
