import { KPI, Team, AIModel, UsageIdentity, Activity } from './types';

export const dashboardKPIs: KPI[] = [
  {
    title: 'Total AI Requests',
    value: '12,847',
    change: '+12%',
    trend: 'up',
    iconName: 'api',
  },
  {
    title: 'Monthly AI Spend',
    value: '$2,431',
    change: '+4%',
    trend: 'down', // meaning increased cost
    iconName: 'payments',
  },
  {
    title: 'Active AI Users',
    value: '214',
    change: '+18%',
    trend: 'up',
    iconName: 'person',
  },
  {
    title: 'Estimated Productivity Gain',
    value: '+37%',
    change: 'Target Met',
    trend: 'neutral',
    iconName: 'bolt',
  },
];

export const mockUsageAnalytics30D = [
  { day: '01 May', requests: 12000, spend: 220 },
  { day: '03 May', requests: 13500, spend: 235 },
  { day: '05 May', requests: 11000, spend: 210 },
  { day: '08 May', requests: 15000, spend: 280 },
  { day: '10 May', requests: 14200, spend: 260 },
  { day: '13 May', requests: 17800, spend: 310 },
  { day: '15 May', requests: 16500, spend: 290 },
  { day: '18 May', requests: 19500, spend: 350 },
  { day: '20 May', requests: 18200, spend: 330 },
  { day: '22 May', requests: 21000, spend: 380 },
  { day: '25 May', requests: 20500, spend: 370 },
  { day: '27 May', requests: 23000, spend: 410 },
  { day: '29 May', requests: 22400, spend: 400 },
];

export const mockModelShares = [
  { name: 'GPT-4o (OpenAI)', share: 42, color: '#2E62FF' },
  { name: 'Claude 3.5 Sonnet (Anthropic)', share: 28, color: '#8B5CF6' },
  { name: 'Gemini 1.5 Pro (Google)', share: 18, color: '#EC4899' },
  { name: 'Open Source (Llama 3 / Mistral)', share: 12, color: '#10B981' },
];

export const mockTeamAdoptions = [
  { team: 'Engineering', rate: 94 },
  { team: 'Sales', rate: 65 },
  { team: 'Marketing', rate: 42 },
  { team: 'Operations', rate: 28 },
];

export const mockActivities: Activity[] = [
  {
    id: 'act-1',
    user: 'John D.',
    action: 'used GPT-4o to generate React hooks for authentication.',
    time: '2 mins ago',
    team: 'Engineering',
    icon: 'code',
    color: 'text-[#2E62FF]',
  },
  {
    id: 'act-2',
    user: 'Sarah K.',
    action: 'summarized customer interviews via Claude Sonnet.',
    time: '14 mins ago',
    team: 'Product',
    icon: 'summarize',
    color: 'text-[#8B5CF6]',
  },
  {
    id: 'act-3',
    user: 'Mark L.',
    action: 'drafted ad copy iterations for Q3 campaign.',
    time: '45 mins ago',
    team: 'Marketing',
    icon: 'campaign',
    color: 'text-orange-400',
  },
  {
    id: 'act-4',
    user: 'Anita V.',
    action: 'translated technical documentation to Spanish.',
    time: '1 hour ago',
    team: 'Operations',
    icon: 'translate',
    color: 'text-emerald-400',
  },
];

export const mockTeams: Team[] = [
  {
    id: 'TEAM-ENG-001',
    name: 'Engineering',
    memberCount: 44,
    avatars: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop'
    ],
    primaryModel: 'GPT-4 Turbo (Custom)',
    monthlySpend: 12450.00,
    spendChange: '-2.4% vs last mo.',
    riskStatus: 'Stable',
  },
  {
    id: 'TEAM-SAL-042',
    name: 'Sales & Growth',
    memberCount: 114,
    avatars: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop'
    ],
    primaryModel: 'Claude 3.5 Sonnet',
    monthlySpend: 45820.12,
    spendChange: '+18.5% vs last mo.',
    riskStatus: 'High Load',
  },
  {
    id: 'TEAM-MAR-088',
    name: 'Creative & Marketing',
    memberCount: 14,
    avatars: [
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=100&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=100&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop'
    ],
    primaryModel: 'Stable Diffusion XL',
    monthlySpend: 8122.00,
    spendChange: 'Stable vs last mo.',
    riskStatus: 'Quota Alert',
  },
  {
    id: 'TEAM-SEC-911',
    name: 'InfoSec Operations',
    memberCount: 7,
    avatars: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop'
    ],
    primaryModel: 'Llama 3 (Local-70B)',
    monthlySpend: 2450.00,
    spendChange: '-12% (Optimized)',
    riskStatus: 'Stable',
  },
];

export const mockModels: AIModel[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI • Multimodal',
    status: 'Healthy',
    latency: 324,
    costPer1k: 0.005,
    load: 78,
    version: 'v2024-05-13',
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic • Intelligence Focus',
    status: 'Healthy',
    latency: 412,
    costPer1k: 0.003,
    load: 42,
    version: 'v1.0.0',
  },
  {
    id: 'gemini-1-5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google • Long Context',
    status: 'Degraded',
    latency: 892,
    costPer1k: 0.0035,
    load: 95,
    version: 'v1.5_PRO',
  },
  {
    id: 'llama-3-70b',
    name: 'Llama 3 (70B)',
    provider: 'Meta • Self-Hosted',
    status: 'Healthy',
    latency: 156,
    costPer1k: 0.0001,
    load: 15,
    version: 'ON-PREM-NODE-4',
  },
];

export const mockUsageIdentities: UsageIdentity[] = [
  {
    id: 'id-1',
    name: 'engineering-lead-01',
    role: 'Core Engine Team',
    apiKey: 'sk_live_...4f2a',
    tokens24h: '412.4M',
    cost: 2140.00,
    errorRate: 0.02,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
  },
  {
    id: 'id-2',
    name: 'customer-success-bot',
    role: 'Automations Hub',
    apiKey: 'sk_live_...9x3l',
    tokens24h: '182.1M',
    cost: 890.45,
    errorRate: 1.45,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop',
  },
  {
    id: 'id-3',
    name: 'marketing-copy-gen',
    role: 'Internal Tools',
    apiKey: 'sk_live_...0p1q',
    tokens24h: '12.5M',
    cost: 120.20,
    errorRate: 0.00,
    status: 'Paused',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
  },
  {
    id: 'id-4',
    name: 'analyst-external-api',
    role: 'Partner Sandbox',
    apiKey: 'sk_test_...7z9w',
    tokens24h: '4.2M',
    cost: 22.00,
    errorRate: 12.8,
    status: 'Throttled',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop',
  },
];
