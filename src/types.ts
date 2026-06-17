export type ScreenId = 'dashboard' | 'teams' | 'models' | 'usage' | 'settings';

export interface KPI {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  iconName: string;
}

export interface ModelUsage {
  name: string;
  share: number;
  color: string;
}

export interface TeamAdoption {
  team: string;
  rate: number;
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  time: string;
  team: string;
  icon: string;
  color: string;
}

export interface SpendInsight {
  label: string;
  value: string;
  cost: string;
  color: string;
}

export interface SecurityRisk {
  label: string;
  status: string;
  type: 'stable' | 'alarm' | 'neutral';
}

export interface Team {
  id: string;
  name: string;
  memberCount: number;
  avatars: string[];
  primaryModel: string;
  monthlySpend: number;
  spendChange: string;
  riskStatus: 'Stable' | 'High Load' | 'Quota Alert';
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  status: 'Healthy' | 'Degraded';
  latency: number;
  costPer1k: number;
  load: number;
  version: string;
}

export interface UsageIdentity {
  id: string;
  name: string;
  role: string;
  apiKey: string;
  tokens24h: string;
  cost: number;
  errorRate: number;
  status: 'Active' | 'Paused' | 'Throttled';
  avatar: string;
}
