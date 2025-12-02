export interface ChartDataPoint {
  name: string;
  value: number;
  fill?: string;
  fullMark?: number; // Used for radar/polar comparison
}

export interface SlaDataPoint {
  name: string;
  value: number;
  color: string;
}

export interface AgeDataPoint {
  range: string;
  value: number;
}

export interface Recommendation {
  text: string;
}

export interface TeamMember {
  rank: number;
  name: string;
  metric: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  colorClass: string;
  badge: string;
}