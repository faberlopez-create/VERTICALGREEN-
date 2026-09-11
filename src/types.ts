export type ActiveTab = 'dashboard' | 'control-iot' | 'planes' | 'perfil';

export interface PlantLevel {
  id: string;
  number: string;
  name: string;
  category: string;
  statusBadge: string;
  badgeType: 'optimal' | 'growing' | 'hydrated';
  soilMoisture: number;
  lightLuxPct: number;
  lightStatus: string;
  temperature: number;
  tempStatus: string;
  nextCycle?: string;
  statusNote: string;
  statusSecondary?: string;
}

export interface HardwareLog {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'success' | 'info' | 'system';
}

export interface SecurityIncident {
  id: string;
  timestamp: string;
  event: string;
  ip: string;
  status: 'blocked' | 'verified' | 'neutral';
}
