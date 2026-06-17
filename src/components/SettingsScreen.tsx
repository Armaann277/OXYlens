import React, { useState } from 'react';
import { 
  Plus, 
  ChevronRight, 
  Settings as SettingsIcon, 
  Building, 
  CreditCard, 
  ShieldCheck, 
  Key, 
  ScrollText, 
  Bell, 
  Webhook, 
  Check, 
  Eye, 
  EyeOff, 
  Save, 
  RefreshCw,
  Database,
  CloudLightning,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { ScreenId } from '../types';
import Sidebar from './Sidebar';
import Header from './Header';

interface SettingsScreenProps {
  onNavigate: (screenId: ScreenId) => void;
}

type TabId = 'profile' | 'billing' | 'security' | 'api' | 'webhooks' | 'firebase';

export default function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  const [activeTab, setActiveTab] = useState<TabId>('profile');
  
  // Profile parameters
  const [displayName, setDisplayName] = useState('OxyLens HQ');
  const [workspaceUrl, setWorkspaceUrl] = useState('oxylens.ai/quantum-lead');
  const [corpDomain, setCorpDomain] = useState('oxylens.ai');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Firebase Config parameters
  const metaEnv = (import.meta as any).env || {};
  const [fbApiKey, setFbApiKey] = useState(metaEnv.VITE_FIREBASE_API_KEY || localStorage.getItem('VITE_FIREBASE_API_KEY') || '');
  const [fbAuthDomain, setFbAuthDomain] = useState(metaEnv.VITE_FIREBASE_AUTH_DOMAIN || localStorage.getItem('VITE_FIREBASE_AUTH_DOMAIN') || '');
  const [fbProjectId, setFbProjectId] = useState(metaEnv.VITE_FIREBASE_PROJECT_ID || localStorage.getItem('VITE_FIREBASE_PROJECT_ID') || '');
  const [fbStorageBucket, setFbStorageBucket] = useState(metaEnv.VITE_FIREBASE_STORAGE_BUCKET || localStorage.getItem('VITE_FIREBASE_STORAGE_BUCKET') || '');
  const [fbMessagingSenderId, setFbMessagingSenderId] = useState(metaEnv.VITE_FIREBASE_MESSAGING_SENDER_ID || localStorage.getItem('VITE_FIREBASE_MESSAGING_SENDER_ID') || '');
  const [fbAppId, setFbAppId] = useState(metaEnv.VITE_FIREBASE_APP_ID || localStorage.getItem('VITE_FIREBASE_APP_ID') || '');

  // Security policies
  const [governanceLevel, setGovernanceLevel] = useState<'strict' | 'flexible' | 'relaxed'>('flexible');
  const [piiFiltering, setPiiFiltering] = useState(true);

  // API credentials toggles
  const [showSecret, setShowSecret] = useState(false);
  
  // Webhook settings
  const [webhookUrl, setWebhookUrl] = useState('https://events.oxylens.ai/v1/alert-bridge');

  const handleSave = () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }, 800);
  };

  const handleSaveFirebase = () => {
    setIsSaving(true);
    setSaveSuccess(false);

    // Save parameters to localStorage so client can pick them up dynamically on next boot
    localStorage.setItem('VITE_FIREBASE_API_KEY', fbApiKey);
    localStorage.setItem('VITE_FIREBASE_AUTH_DOMAIN', fbAuthDomain);
    localStorage.setItem('VITE_FIREBASE_PROJECT_ID', fbProjectId);
    localStorage.setItem('VITE_FIREBASE_STORAGE_BUCKET', fbStorageBucket);
    localStorage.setItem('VITE_FIREBASE_MESSAGING_SENDER_ID', fbMessagingSenderId);
    localStorage.setItem('VITE_FIREBASE_APP_ID', fbAppId);

    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        // Refresh to re-initialize firebase config
        window.location.reload();
      }, 1000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#e5e2e1] flex animate-fade-in">
      <Sidebar activeScreen="settings" onNavigate={onNavigate} />

      <div className="flex-1 ml-64 min-h-screen flex flex-col">
        <Header onNavigate={onNavigate} placeholderText="Search workspace configurations..." />

        <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
          
          {/* Page row block heading */}
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-[#571bc1]" />
              Settings
            </h1>
            <p className="text-xs text-[#c3c5d8]/60 mt-0.5">Configure your organizational profiles, Firebase parameters, security guidelines, and webhook bridges.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            
            {/* Secondary local settings tab bar */}
            <div className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-3.5 space-y-4">
              
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#c3c5d8]/40 font-bold block px-3 mb-2 font-mono">Workspace</span>
                <div className="space-y-0.5">
                  <button 
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all text-left cursor-pointer ${activeTab === 'profile' ? 'bg-[#1C1B1B] text-white border-l-2 border-l-[#571bc1]' : 'text-[#c3c5d8]/70 hover:bg-[#151515] hover:text-white'}`}
                  >
                    <Building className="h-4 w-4" />
                    Organization Profile
                  </button>
                  <button 
                    onClick={() => setActiveTab('billing')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all text-left cursor-pointer ${activeTab === 'billing' ? 'bg-[#1C1B1B] text-white border-l-2 border-l-[#571bc1]' : 'text-[#c3c5d8]/70 hover:bg-[#151515] hover:text-white'}`}
                  >
                    <CreditCard className="h-4 w-4" />
                    Billing & Subscription
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#c3c5d8]/40 font-bold block px-3 mb-2 font-mono">Integrations & DB</span>
                <div className="space-y-0.5">
                  <button 
                    onClick={() => setActiveTab('firebase')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all text-left cursor-pointer ${activeTab === 'firebase' ? 'bg-[#1C1B1B] text-white border-l-2 border-l-[#571bc1]' : 'text-[#c3c5d8]/70 hover:bg-[#151515] hover:text-white'}`}
                  >
                    <Database className="h-4 w-4" />
                    Firebase Database
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#c3c5d8]/40 font-bold block px-3 mb-2 font-mono">Governance</span>
                <div className="space-y-0.5">
                  <button 
                    onClick={() => setActiveTab('security')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all text-left cursor-pointer ${activeTab === 'security' ? 'bg-[#1C1B1B] text-white border-l-2 border-l-[#571bc1]' : 'text-[#c3c5d8]/70 hover:bg-[#151515] hover:text-white'}`}
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Security Policies
                  </button>
                  <button 
                    onClick={() => setActiveTab('api')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all text-left cursor-pointer ${activeTab === 'api' ? 'bg-[#1C1B1B] text-white border-l-2 border-l-[#571bc1]' : 'text-[#c3c5d8]/70 hover:bg-[#151515] hover:text-white'}`}
                  >
                    <Key className="h-4 w-4" />
                    API Management
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#c3c5d8]/40 font-bold block px-3 mb-2 font-mono">Advanced</span>
                <div className="space-y-0.5">
                  <button 
                    onClick={() => setActiveTab('webhooks')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all text-left cursor-pointer ${activeTab === 'webhooks' ? 'bg-[#1C1B1B] text-white border-l-2 border-l-[#571bc1]' : 'text-[#c3c5d8]/70 hover:bg-[#151515] hover:text-white'}`}
                  >
                    <Webhook className="h-4 w-4" />
                    Webhooks & Events
                  </button>
                </div>
              </div>

            </div>

            {/* Active Config Section Card */}
            <div className="lg:col-span-3 bg-[#111111] border border-[#1F1F1F] rounded-xl p-6 min-h-[380px]">
              
              {/* Profile Config */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1.5 font-sans">Organization Profile</h3>
                    <p className="text-xs text-[#c3c5d8]/60 font-light font-sans">Custom configurations for corporate names, display attributes, and DNS records.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-wider text-[#c3c5d8]/60 font-medium font-mono">Display Name</label>
                      <input 
                        className="bg-[#0A0A0A] border border-[#1F1F1F] text-xs font-medium text-white px-3.5 py-2.5 rounded-lg focus:border-[#571bc1] focus:ring-1 focus:ring-[#571bc1]/30 outline-none w-full transition-all"
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-wider text-[#c3c5d8]/60 font-medium font-mono">Workspace URL</label>
                      <input 
                        className="bg-[#0A0A0A] border border-[#1F1F1F] text-xs font-medium text-white px-3.5 py-2.5 rounded-lg focus:border-[#571bc1] focus:ring-1 focus:ring-[#571bc1]/30 outline-none w-full transition-all"
                        type="text"
                        value={workspaceUrl}
                        onChange={(e) => setWorkspaceUrl(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-wider text-[#c3c5d8]/60 font-medium font-mono">Corporate Domain</label>
                      <input 
                        className="bg-[#0A0A0A] border border-[#1F1F1F] text-xs font-medium text-white px-3.5 py-2.5 rounded-lg focus:border-[#571bc1] focus:ring-1 focus:ring-[#571bc1]/30 outline-none w-full transition-all"
                        type="text"
                        value={corpDomain}
                        onChange={(e) => setCorpDomain(e.target.value)}
                      />
                    </div>

                  </div>

                  <div className="pt-4 border-t border-[#1F1F1F] flex items-center gap-3">
                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-[#571bc1] text-white px-4 py-2 text-xs font-bold rounded-lg hover:bg-opacity-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {isSaving ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                      <span>Save Changes</span>
                    </button>
                    {saveSuccess && (
                      <span className="text-emerald-400 text-xs font-bold flex items-center gap-1 font-sans">
                        <Check className="h-4 w-4" /> Parameters synced successfully!
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Firebase Database Config Tab */}
              {activeTab === 'firebase' && (
                <div className="space-y-6">
                  <div className="border-b border-[#1F1F1F] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1.5 font-sans">Firebase Sync & Orchestration</h3>
                      <p className="text-xs text-[#c3c5d8]/60 font-light font-sans">Optionally map OxyLens to your native Firebase production app instance for secure Google Auth and Firestore persistence.</p>
                    </div>
                    
                    <div className="inline-flex items-center gap-1.5 bg-[#1F1F1F] px-2.5 py-1 rounded-full text-[10px] font-medium text-white self-start">
                      {localStorage.getItem('VITE_FIREBASE_PROJECT_ID') || metaEnv.VITE_FIREBASE_PROJECT_ID ? (
                        <>
                          <CheckCircle className="h-3 w-3 text-emerald-400" />
                          <span className="text-emerald-400 font-mono text-[9px]">Custom DB Ingress Active</span>
                        </>
                      ) : (
                        <>
                          <CloudLightning className="h-3 w-3 text-amber-500" />
                          <span className="text-amber-500 font-sans text-[10px]">Utilizing Local Sandboxing</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="bg-[#0A0A0A] p-4 rounded-xl border border-[#1f1f1f] text-xs space-y-2">
                    <p className="text-white font-semibold font-sans">User Data Tracking Scheme (OxyLens Project):</p>
                    <p className="text-[#c3c5d8]/80 leading-relaxed font-sans">
                      OxyLens synchronizes active administrator logging profiles to your Firestore collection <code className="font-mono text-[#A855F7] bg-[#111] px-1 py-0.5 rounded">users/</code> and persists every real-time search question / source citation dynamically inside <code className="font-mono text-[#A855F7] bg-[#111] px-1 py-0.5 rounded">search_queries/</code>.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-wider text-[#c3c5d8]/70 font-mono font-semibold text-left block">API Key (apiKey)</label>
                      <input 
                        className="bg-[#0A0A0A] border border-[#1F1F1F] text-xs font-mono text-white px-3.5 py-2.5 rounded-lg focus:border-[#571bc1] focus:ring-1 focus:ring-[#571bc1]/30 outline-none w-full transition-all"
                        type="password"
                        placeholder="AIzaSy..."
                        value={fbApiKey}
                        onChange={(e) => setFbApiKey(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-wider text-[#c3c5d8]/70 font-mono font-semibold text-left block">Project ID (projectId)</label>
                      <input 
                        className="bg-[#0A0A0A] border border-[#1F1F1F] text-xs font-mono text-white px-3.5 py-2.5 rounded-lg focus:border-[#571bc1] focus:ring-1 focus:ring-[#571bc1]/30 outline-none w-full transition-all"
                        type="text"
                        placeholder="oxylens-db-12345"
                        value={fbProjectId}
                        onChange={(e) => setFbProjectId(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-wider text-[#c3c5d8]/70 font-mono font-semibold text-left block">Auth Domain (authDomain)</label>
                      <input 
                        className="bg-[#0A0A0A] border border-[#1F1F1F] text-xs font-mono text-white px-3.5 py-2.5 rounded-lg focus:border-[#571bc1] focus:ring-1 focus:ring-[#571bc1]/30 outline-none w-full transition-all"
                        type="text"
                        placeholder="oxylens-db-12345.firebaseapp.com"
                        value={fbAuthDomain}
                        onChange={(e) => setFbAuthDomain(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-wider text-[#c3c5d8]/70 font-mono font-semibold text-left block">Storage Bucket (storageBucket)</label>
                      <input 
                        className="bg-[#0A0A0A] border border-[#1F1F1F] text-xs font-mono text-white px-3.5 py-2.5 rounded-lg focus:border-[#571bc1] focus:ring-1 focus:ring-[#571bc1]/30 outline-none w-full transition-all"
                        type="text"
                        placeholder="oxylens-db-12345.appspot.com"
                        value={fbStorageBucket}
                        onChange={(e) => setFbStorageBucket(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-wider text-[#c3c5d8]/70 font-mono font-semibold text-left block">Messaging Sender ID</label>
                      <input 
                        className="bg-[#0A0A0A] border border-[#1F1F1F] text-xs font-mono text-white px-3.5 py-2.5 rounded-lg focus:border-[#571bc1] focus:ring-1 focus:ring-[#571bc1]/30 outline-none w-full transition-all"
                        type="text"
                        placeholder="80621453298"
                        value={fbMessagingSenderId}
                        onChange={(e) => setFbMessagingSenderId(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-wider text-[#c3c5d8]/70 font-mono font-semibold text-left block">App ID (appId)</label>
                      <input 
                        className="bg-[#0A0A0A] border border-[#1F1F1F] text-xs font-mono text-white px-3.5 py-2.5 rounded-lg focus:border-[#571bc1] focus:ring-1 focus:ring-[#571bc1]/30 outline-none w-full transition-all"
                        type="text"
                        placeholder="1:80621453298:web:75a2d61c..."
                        value={fbAppId}
                        onChange={(e) => setFbAppId(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#1F1F1F] flex items-center gap-3">
                    <button 
                      onClick={handleSaveFirebase}
                      disabled={isSaving}
                      className="bg-[#571bc1] text-white px-4 py-2 text-xs font-bold rounded-lg hover:bg-opacity-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {isSaving ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                      <span>Apply & Connect Database</span>
                    </button>
                    {saveSuccess && (
                      <span className="text-emerald-400 text-xs font-bold flex items-center gap-1 font-sans">
                        <Check className="h-4 w-4" /> Firebase configuration saved. Re-booting app...
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Billing Info */}
              {activeTab === 'billing' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1.5 font-sans">Billing & Subscription</h3>
                    <p className="text-xs text-[#c3c5d8]/60 font-light font-sans">Monitor monthly invoice iterations, manage payment sources, and update tier levels.</p>
                  </div>

                  <div className="bg-[#0A0A0A] p-4 rounded-xl border border-[#1F1F1F] flex justify-between items-center text-xs">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded font-mono">Active Plan</span>
                      <h4 className="text-sm font-bold text-white mt-1.5 font-sans">Enterprise Cloud (Pro-Plus)</h4>
                      <p className="text-xs text-[#c3c5d8]/70 mt-1 font-sans">Unlimited model instances • Up to 10M requests daily.</p>
                    </div>

                    <button 
                      onClick={() => alert("Billing upgrade portal loading...")}
                      className="bg-[#1C1B1B] border border-[#2E2E2E] px-3.5 py-2.5 text-xs text-white rounded-lg hover:bg-[#151515] transition-colors cursor-pointer"
                    >
                      Upgrade Plan
                    </button>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#c3c5d8]/60 font-medium font-mono">Payment Method</span>
                    <div className="p-3.5 bg-[#0A0A0A] rounded-lg border border-[#1F1F1F] flex justify-between items-center text-xs">
                      <span className="font-mono font-semibold text-white font-sans">•••• •••• •••• 4821 • VISA</span>
                      <button className="text-white hover:underline cursor-pointer">Change</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Security governance */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1.5 font-sans">Security Policies</h3>
                    <p className="text-xs text-[#c3c5d8]/60 font-light font-sans">Configure high-level parameters for PII filtration, user proxy restrictions, and regulatory thresholds.</p>
                  </div>

                  <div className="space-y-4">
                    
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-wider text-[#c3c5d8]/60 font-medium block font-mono text-left">Compliance Governance Strength</label>
                      <div className="grid grid-cols-3 gap-2 p-1 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg">
                        <button 
                          onClick={() => setGovernanceLevel('strict')}
                          className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${governanceLevel === 'strict' ? 'bg-[#571bc1] text-white' : 'text-[#c3c5d8]/50 hover:text-white'}`}
                        >
                          Strict
                        </button>
                        <button 
                          onClick={() => setGovernanceLevel('flexible')}
                          className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${governanceLevel === 'flexible' ? 'bg-[#571bc1] text-white' : 'text-[#c3c5d8]/50 hover:text-white'}`}
                        >
                          Flexible
                        </button>
                        <button 
                          onClick={() => setGovernanceLevel('relaxed')}
                          className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${governanceLevel === 'relaxed' ? 'bg-[#571bc1] text-white' : 'text-[#c3c5d8]/50 hover:text-white'}`}
                        >
                          Relaxed
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-[#0A0A0A] rounded-xl border border-[#1F1F1F] hover:border-[#2E2E2E] transition-all text-xs">
                      <div>
                        <div className="text-xs font-bold text-white font-sans">Enterprise PII Filtering</div>
                        <p className="text-[11px] text-[#c3c5d8]/60 mt-0.5 font-sans">Scans prompts for emails, telephone data, and SSNs to scrub before sending to exterior providers.</p>
                      </div>

                      <button 
                        onClick={() => setPiiFiltering(!piiFiltering)}
                        className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${piiFiltering ? 'bg-[#571bc1]' : 'bg-[#1F1F1F]'}`}
                      >
                        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${piiFiltering ? 'left-4.5' : 'left-0.5'}`} />
                      </button>
                    </div>

                  </div>
                </div>
              )}

              {/* API management */}
              {activeTab === 'api' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1.5 font-sans">API Management</h3>
                    <p className="text-xs text-[#c3c5d8]/60 font-light font-sans">Access credentials, generate new developer tokens, and view access scope configurations.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-wider text-[#c3c5d8]/60 font-semibold block font-mono text-left">Enterprise Master Key</label>
                      <div className="flex gap-2">
                        <div className="flex-1 bg-[#0A0A0A] border border-[#1F1F1F] px-3.5 py-2.5 rounded-lg flex items-center justify-between font-mono text-xs text-white">
                          <span>{showSecret ? 'sk_live_285741775q_l9xy3lp01q7z9w' : '•••••••••••••••••••••••••••••••••••••••'}</span>
                          <button 
                            type="button" 
                            onClick={() => setShowSecret(!showSecret)}
                            className="text-[#c3c5d8] hover:text-white p-1 cursor-pointer"
                          >
                            {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        <button 
                          onClick={() => alert("Enterprise master key rotated.")}
                          className="bg-[#1C1B1B] text-white border border-[#2E2E2E] px-3 font-semibold text-xs rounded-lg hover:bg-[#1A1A1A] transition-colors shrink-0 cursor-pointer"
                        >
                          Rotate Key
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Webhooks config */}
              {activeTab === 'webhooks' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1.5 font-sans">Webhooks & Event Bridges</h3>
                    <p className="text-xs text-[#c3c5d8]/60 font-light font-sans">Send real-time alerts and token limit notifications directly to your custom webhook recipient tunnels.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-wider text-[#c3c5d8]/60 font-medium block font-mono text-left">Payload URL</label>
                      <input 
                        className="bg-[#0A0A0A] border border-[#1F1F1F] text-xs font-medium text-white px-3.5 py-2.5 rounded-lg focus:border-[#571bc1] focus:ring-1 focus:ring-[#571bc1]/30 outline-none w-full transition-all font-mono"
                        type="text"
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                      />
                    </div>

                    <button 
                      onClick={() => alert("Ping test packet sent successfully to webhook gateway.")}
                      className="border border-[#1F1F1F] bg-[#0F0F0F] hover:bg-[#151515] px-4 py-2.5 text-xs text-white rounded-lg font-bold cursor-pointer font-sans"
                    >
                      Test Webhook Delivery
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
