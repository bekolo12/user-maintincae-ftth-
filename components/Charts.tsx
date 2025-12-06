import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  AreaChart, Area, CartesianGrid, 
} from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-white/20 p-3 rounded-lg shadow-xl backdrop-blur-sm">
        <p className="text-gray-300 text-sm font-medium mb-1">{label}</p>
        <p className="text-cyan-400 font-bold text-lg">
          {payload[0].value}
          {payload[0].name === 'value' ? '' : ` ${payload[0].name || ''}`}
        </p>
      </div>
    );
  }
  return null;
};

interface ChartProps {
  data: any[];
}

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
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      <Legend verticalAlign="bottom" height={36} iconType="circle" />
    </PieChart>
  </ResponsiveContainer>
);

export const SLAComplianceChart = ({ data }: ChartProps) => (
  <ResponsiveContainer width="100%" height={250}>
    <BarChart
      layout="vertical"
      data={data}
      margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
    >
      <XAxis type="number" hide />
      <YAxis 
        dataKey="name" 
        type="category" 
        tick={{ fill: '#94a3b8', fontSize: 11 }} 
        width={80}
      />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export const SubAreaChart = ({ data }: ChartProps) => (
  <ResponsiveContainer width="100%" height={280}>
    <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
      <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="value" fill="rgba(6, 182, 212, 0.8)" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

export const ResolutionTimeChart = ({ data }: ChartProps) => (
  <ResponsiveContainer width="100%" height={280}>
    <BarChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
      <XAxis type="number" hide />
      <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 11 }} width={60} />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
         {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export const ClosureRateChart = ({ data }: ChartProps) => (
  <ResponsiveContainer width="100%" height={280}>
    <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
      <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]}>
        {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.value < 50 ? '#ef4444' : (entry.value === 100 ? '#22c55e' : '#f59e0b')} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export const TicketAgeChart = ({ data }: ChartProps) => (
  <ResponsiveContainer width="100%" height={220}>
    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
      <defs>
        <linearGradient id="colorAge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
      <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
      <Tooltip content={<CustomTooltip />} />
      <Area type="monotone" dataKey="value" stroke="#06b6d4" fillOpacity={1} fill="url(#colorAge)" />
    </AreaChart>
  </ResponsiveContainer>
);

export const DataQualityChart = ({ data }: ChartProps) => (
  <ResponsiveContainer width="100%" height={220}>
    <BarChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
        <XAxis type="number" hide />
        <YAxis dataKey="subject" type="category" tick={{ fill: '#94a3b8', fontSize: 11 }} width={50} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="A" name="Issues" radius={[0, 4, 4, 0]} barSize={15}>
             {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : (index === 1 ? '#f59e0b' : '#3b82f6')} />
            ))}
        </Bar>
    </BarChart>
  </ResponsiveContainer>
);