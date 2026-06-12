export interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  content_type: 'text' | 'table' | 'chart';
  data?: any;
  timestamp: string;
  conversation_id: string;
}

export interface DashboardKPI {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface DashboardData {
  kpis: DashboardKPI[];
  recent_activity: { id: number; action: string; time: string }[];
  alerts: { id: string; severity: 'high' | 'medium' | 'low'; message: string; category: string }[];
}

export interface Report {
  id: string;
  title: string;
  category: string;
  date: string;
}
