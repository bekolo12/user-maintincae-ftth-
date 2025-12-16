import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

// --- Shared Components ---

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-white/10 p-3 rounded-lg shadow-xl backdrop-blur-md z-50">
        <p className="text-slate-400 text-xs font-medium mb-1">{label}</p>
        {payload.map((p: any, idx: number) => (
          <p key={idx} className="text-white font-bold text-sm flex justify-between gap-4" style={{ color: p.color || p.fill }}>
            <span>{p.name}:</span>
            <span>{p.value.toLocaleString()}</span>
          </p>
        ))}
        {payload.length > 1 && (
           <div className="mt-2 pt-2 border-t border-white/10">
             <p className="text-white font-bold text-sm flex justify-between gap-4">
               <span>Total:</span>
               <span>{payload.reduce((acc: number, curr: any) => acc + curr.value, 0).toLocaleString()}</span>
             </p>
           </div>
        )}
      </div>
    );
  }
  return null;
};

interface ChartProps {
  data: any[];
  dataKey?: string;
  nameKey?: string;
  colors?: string[];
}

// --- New Generic Charts (For Pro Dashboard) ---

export const GenericBarChart = ({ data, dataKey = "value", nameKey = "name" }: ChartProps) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.5} />
      <XAxis 
        dataKey={nameKey} 
        tick={{ fill: '#94a3b8', fontSize: 11 }} 
        axisLine={false} 
        tickLine={false}
        dy={10}
      />
      <YAxis 
        tick={{ fill: '#94a3b8', fontSize: 11 }} 
        axisLine={false} 
        tickLine={false} 
      />
      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
      <Bar dataKey={dataKey} radius={[6, 6, 0, 0]}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color || entry.fill || '#3b82f6'} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export const GenericDonutChart = ({ data, dataKey = "value", nameKey = "name" }: ChartProps) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        paddingAngle={5}
        dataKey={dataKey}
        nameKey={nameKey}
        stroke="none"
        label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
          const RADIAN = Math.PI / 180;
          const radius = outerRadius + 20;
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          const y = cy + radius * Math.sin(-midAngle * RADIAN);
          
          if (percent < 0.05) return null;

          return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={11} fontWeight="bold">
              {`${(percent * 100).toFixed(0)}%`}
            </text>
          );
        }}
        labelLine={{ stroke: '#94a3b8' }}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color || entry.fill || '#3b82f6'} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      <Legend 
        verticalAlign="bottom" 
        height={36} 
        iconType="circle"
        formatter={(value) => <span className="text-slate-400 text-xs ml-1">{value}</span>}
      />
    </PieChart>
  </ResponsiveContainer>
);

export const CityStatusStackedChart = ({ data }: ChartProps) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
      <XAxis 
        dataKey="city" 
        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} 
        axisLine={false} 
        tickLine={false}
        dy={10}
      />
      <YAxis 
        tick={{ fill: '#94a3b8', fontSize: 11 }} 
        axisLine={false} 
        tickLine={false} 
      />
      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
      <Legend 
        verticalAlign="top" 
        align="right"
        height={36} 
        iconType="circle"
        formatter={(value) => <span className="text-slate-300 text-sm ml-1 font-medium">{value}</span>}
      />
      <Bar dataKey="Done" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} />
      <Bar dataKey="Closed" stackId="a" fill="#3B82F6" radius={[0, 0, 0, 0]} />
      <Bar dataKey="Postpone" stackId="a" fill="#F59E0B" radius={[0, 0, 0, 0]} />
      <Bar dataKey="Cancelled" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

export const SubAreaStatusStackedChart = ({ data }: ChartProps) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
      <XAxis 
        dataKey="subArea" 
        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} 
        axisLine={false} 
        tickLine={false}
        dy={10}
      />
      <YAxis 
        tick={{ fill: '#94a3b8', fontSize: 11 }} 
        axisLine={false} 
        tickLine={false} 
      />
      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
      <Legend 
        verticalAlign="top" 
        align="right"
        height={36} 
        iconType="circle"
        formatter={(value) => <span className="text-slate-300 text-sm ml-1 font-medium">{value}</span>}
      />
      <Bar dataKey="Done" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} />
      <Bar dataKey="Closed" stackId="a" fill="#3B82F6" radius={[0, 0, 0, 0]} />
      <Bar dataKey="Postpone" stackId="a" fill="#F59E0B" radius={[0, 0, 0, 0]} />
      <Bar dataKey="Cancelled" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

// --- Restored Legacy Charts (For User Maintenance Dashboard) ---

export const TicketStatusChart = ({ data }: ChartProps) => (
  <ResponsiveContainer width="100%" height={250}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        paddingAngle={5}
        dataKey="value"
        nameKey="name"
        label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
          const RADIAN = Math.PI / 180;
          const radius = outerRadius + 20;
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          const y = cy + radius * Math.sin(-midAngle * RADIAN);
          
          if (percent < 0.05) return null;

          return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={11} fontWeight="bold">
              {`${(percent * 100).toFixed(0)}%`}
            </text>
          );
        }}
        labelLine={{ stroke: '#94a3b8' }}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      <Legend 
        layout="vertical" 
        verticalAlign="middle" 
        align="right"
        iconType="circle"
        wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
      />
    </PieChart>
  </ResponsiveContainer>
);

export const SLAComplianceChart = ({ data }: ChartProps) => (
  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.1} />
      <XAxis type="number" hide />
      <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#9ca3af', fontSize: 11 }} />
      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
      <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
         {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export const SubAreaChart = ({ data }: ChartProps) => (
  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
      <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
      <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

export const ResolutionTimeChart = ({ data }: ChartProps) => (
  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
      <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
         {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export const ClosureRateChart = ({ data }: ChartProps) => (
  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
      <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
      <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

export const TicketAgeChart = ({ data }: ChartProps) => (
  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
      <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
      <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

export const DataQualityChart = ({ data }: ChartProps) => (
  <ResponsiveContainer width="100%" height={250}>
    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
      <PolarGrid opacity={0.2} />
      <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 11 }} />
      <PolarRadiusAxis angle={30} domain={[0, 2000]} tick={false} axisLine={false} />
      <Radar name="Missing Data" dataKey="A" stroke="#ef4444" fill="#ef4444" fillOpacity={0.4} />
      <Tooltip content={<CustomTooltip />} />
    </RadarChart>
  </ResponsiveContainer>
);