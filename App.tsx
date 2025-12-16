import React, { useState, useMemo } from 'react';
import { 
  IconLogo, IconCalendar, IconTotal, IconResolution, 
  IconCheckList, IconTrending, IconAlert, IconChart, IconSLA,
  IconInProgress, IconTeam, IconLocation, IconTrophy, IconCode
} from './components/Icons';
import { 
  GenericBarChart, GenericDonutChart,
  TicketStatusChart, SLAComplianceChart, SubAreaChart,
  ResolutionTimeChart, ClosureRateChart, TicketAgeChart, DataQualityChart
} from './components/Charts';
import SummaryCard from './components/SummaryCard';
import {
  DATA_JAN_2025, DATA_FEB_2025, DATA_MAR_2025, DATA_APR_2025,
  DATA_MAY_2025, DATA_JUN_2025, DATA_JUL_2025, DATA_AUG_2025,
  DATA_SEP_2025, DATA_OCT_2025, DATA_NOV_2025, DATA_DEC_2025
} from './Data';

// --- ICON MAPPING ---
// Allows JSON data to reference icons by string name
const ICON_MAP: Record<string, React.ReactNode> = {
  total: <IconTotal />,
  resolution: <IconResolution />,
  calendar: <IconCalendar />,
  checklist: <IconCheckList />,
  trending: <IconTrending />,
  alert: <IconAlert />,
  chart: <IconChart />,
  sla: <IconSLA />,
  inprogress: <IconInProgress />,
  team: <IconTeam />,
  location: <IconLocation />,
  trophy: <IconTrophy />
};

// --- DATA DEFINITIONS ---

// 1. LEGACY DATA (The original "User Maintenance Dashboard" - Oct 31 - Nov 19)
const LEGACY_DATA_SOURCE = {
  summary: {
    total: '3,906',
    sla: '96.69%',
    open: '542',
    avgRes: '3.66 hrs'
  },
  secondary: {
    closed: '1,725',
    avgAge: '35.5',
    oldest: '61',
    leaders: '10'
  },
  statusData: [
    { name: 'Closed', value: 1725, color: '#22c55e' },
    { name: 'Open', value: 542, color: '#f59e0b' },
    { name: 'Other', value: 1639, color: '#94a3b8' },
  ],
  slaData: [
    { name: 'اريج فايز', value: 100, color: '#22c55e' },
    { name: 'غيث محمد', value: 100, color: '#22c55e' },
    { name: 'محمد اسماعيل', value: 100, color: '#22c55e' },
    { name: 'Unassigned', value: 96.69, color: '#f59e0b' },
    { name: 'طه خيري', value: 85.88, color: '#ef4444' },
  ],
  subAreaData: [
    { name: 'Samarra', value: 1201 },
    { name: 'Tikrit', value: 890 },
    { name: 'Al-Dour', value: 650 },
    { name: 'Baiji', value: 580 },
    { name: 'Shirqat', value: 394 },
  ],
  resolutionData: [
    { name: 'Tikrit', value: 61.46, color: '#ef4444' },
    { name: 'Shirqat', value: 25.3, color: '#f59e0b' },
    { name: 'Baiji', value: 18.5, color: '#f59e0b' },
    { name: 'Al-Dour', value: 12.2, color: '#22c55e' },
    { name: 'Samarra', value: 8.4, color: '#22c55e' },
  ],
  closureData: [
    { name: 'بهاء حسين', value: 100 },
    { name: 'غيث محمد', value: 100 },
    { name: 'مصطفى تحسين', value: 100 },
    { name: 'أحمد خالد', value: 75 },
    { name: 'Unassigned', value: 38.5 },
  ],
  ageData: [
    { name: '0-7d', value: 450 },
    { name: '8-14d', value: 380 },
    { name: '15-30d', value: 520 },
    { name: '31-45d', value: 420 },
    { name: '46-61d', value: 155 },
  ],
  qualityData: [
    { subject: 'Status', A: 1673, fullMark: 2000 },
    { subject: 'Leader', A: 1452, fullMark: 2000 },
    { subject: 'SubArea', A: 191, fullMark: 2000 },
    { subject: 'Dates', A: 36, fullMark: 2000 },
    { subject: 'Dups', A: 33, fullMark: 2000 },
  ]
};

// 2. PRO DATA (Oct 31 - Nov 19)
const PRO_DATA_SOURCE = {
  summary: {
    totalTickets: 11772,
    avgDuration: "10:41:58",
    totalTime: "69,204 hrs",
    completionRate: 55
  },
  kpis: [
    { label: "Total Tickets", value: "11,772", trend: "+12.5%", trendDir: "up", color: "indigo", icon: "total" },
    { label: "Avg Duration", value: "10:41:58", trend: "-2.3%", trendDir: "down", color: "emerald", icon: "resolution" },
    { label: "Total Time Spent", value: "69,204 hrs", trend: "0%", trendDir: "neutral", color: "blue", icon: "calendar" },
    { label: "Completion Rate", value: "55%", trend: "+5.1%", trendDir: "up", color: "teal", icon: "checklist" }
  ],
  charts: {
    statusDistribution: [
      { name: "Done", value: 6468, color: "#10b981" },
      { name: "Cancelled", value: 4275, color: "#ef4444" },
      { name: "Closed", value: 646, color: "#6366f1" },
      { name: "Postpone", value: 372, color: "#f59e0b" },
      { name: "Change Team", value: 6, color: "#ec4899" },
      { name: "New", value: 3, color: "#3b82f6" },
      { name: "Re-Open", value: 2, color: "#8b5cf6" }
    ],
    durationMetrics: [
      { name: "<1Hr", value: 5674, color: "#22d3ee" },
      { name: "1-2Hr", value: 510, color: "#38bdf8" },
      { name: "2-3Hr", value: 142, color: "#60a5fa" },
      { name: "3-4Hr", value: 49, color: "#818cf8" },
      { name: ">5Hr", value: 93, color: "#c084fc" }
    ],
    priorityMetrics: [
      { name: "Low Priority", value: 11335, color: "#94a3b8" },
      { name: "Urgent", value: 374, color: "#ef4444" },
      { name: "High Priority", value: 47, color: "#f97316" },
      { name: "Medium", value: 16, color: "#eab308" }
    ]
  }
};

const MONTHS = [
  'January 2025', 'February 2025', 'March 2025', 'April 2025', 
  'May 2025', 'June 2025', 'July 2025', 'August 2025', 
  'September 2025', 'October 2025', 'November 2025', 'December 2025'
];

const DATA_MAP: Record<string, any> = {
  'January 2025': DATA_JAN_2025,
  'February 2025': DATA_FEB_2025,
  'March 2025': DATA_MAR_2025,
  'April 2025': DATA_APR_2025,
  'May 2025': DATA_MAY_2025,
  'June 2025': DATA_JUN_2025,
  'July 2025': DATA_JUL_2025,
  'August 2025': DATA_AUG_2025,
  'September 2025': DATA_SEP_2025,
  'October 2025': DATA_OCT_2025,
  'November 2025': DATA_NOV_2025,
  'December 2025': DATA_DEC_2025,
};

function convertToHours(timeStr: string): string {
  if (!timeStr) return "0 hrs";
  
  // Check for "X days, HH:MM:SS" format
  // Example: "3576 days, 15:57:36"
  const dayMatch = timeStr.match(/(\d+)\s*days?,\s*(\d+):(\d+):(\d+)/);
  if (dayMatch) {
    const days = parseInt(dayMatch[1], 10);
    const hours = parseInt(dayMatch[2], 10);
    // Rough calculation: days * 24 + hours. We ignore minutes/seconds for the summary.
    const totalHours = (days * 24) + hours;
    return `${totalHours.toLocaleString()} hrs`;
  }
  
  // Check for just "HH:MM:SS" which is less than a day
  if (timeStr.match(/^\d+:\d+:\d+$/)) {
     // Usually means less than 24 hours if it's duration, but let's check
     const parts = timeStr.split(':');
     return `${parseInt(parts[0], 10)} hrs`;
  }

  // If already contains "hrs", return as is
  if (timeStr.includes('hrs')) return timeStr;

  return timeStr;
}

const getPromptDateRange = (rangeValue: string) => {
  if (rangeValue.includes(' to ')) {
    const parts = rangeValue.split(' to ');
    return `between '${parts[0]}' and '${parts[1]}'`;
  }
  
  // Handle "Month Year" e.g. "January 2025"
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const parts = rangeValue.split(' ');
  const monthIndex = monthNames.indexOf(parts[0]);
  const year = parseInt(parts[1]);
  
  if (monthIndex !== -1 && !isNaN(year)) {
    const startDate = new Date(year, monthIndex, 1);
    const endDate = new Date(year, monthIndex + 1, 0); // Last day of month
    
    const fmt = (d: Date) => d.toISOString().split('T')[0];
    return `between '${fmt(startDate)}' and '${fmt(endDate)}'`;
  }
  
  return `between '[START DATE]' and '[END DATE]'`;
};

const App = () => {
  const [selectedRange, setSelectedRange] = useState('2025-10-31 to 2025-11-19');
  const [showExtractionModal, setShowExtractionModal] = useState(false);

  // Helper to check if using Legacy Data (default view) or Monthly Reports
  const isLegacyMode = selectedRange === '2025-10-31 to 2025-11-19';

  const { proData, legacyData } = useMemo(() => {
    // 1. Default Legacy Range
    if (isLegacyMode) {
      return { proData: PRO_DATA_SOURCE, legacyData: LEGACY_DATA_SOURCE };
    }
    
    // 2. Monthly Data
    if (DATA_MAP[selectedRange]) {
      const source = DATA_MAP[selectedRange];
      
      // Transform Data to ensure 'hrs' format
      const transformedPro = {
        ...source,
        summary: {
            ...source.summary,
            totalTime: convertToHours(source.summary.totalTime)
        },
        kpis: source.kpis.map((k: any) => {
             if (k.label === 'Total Time Spent') {
                 return { ...k, value: convertToHours(k.value) };
             }
             return k;
        })
      };

      return {
        proData: transformedPro,
        legacyData: source.legacy
      };
    }

    // Fallback (should not happen with correct dropdown)
    return { proData: PRO_DATA_SOURCE, legacyData: LEGACY_DATA_SOURCE };
  }, [selectedRange, isLegacyMode]);

  const getProColorClasses = (color: string) => {
    const map: Record<string, string> = {
      indigo: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      teal: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
    };
    return map[color] || map.blue;
  };

  const jsonPrompt = `{
  "role": "Senior Data Analyst",
  "task": "Extract and calculate IT Service Management metrics from the attached dataset for a specific date range.",
  "instructions": [
    "1. Filter the dataset to include only rows where the 'Date' or 'Creation Date' column falls ${getPromptDateRange(selectedRange)}.",
    "2. Calculate the metrics required to populate the JSON structure defined below.",
    "3. Return ONLY the valid JSON object. Do not include markdown formatting or conversational text."
  ],
  "required_output_format": {
    "summary": {
      "totalTickets": "Number (Integer)",
      "avgDuration": "String (Format HH:MM:SS)",
      "totalTime": "String (Format HH:MM:SS)",
      "completionRate": "Number (Percentage Integer, e.g., 55)"
    },
    "kpis": [
      { "label": "Total Tickets", "value": "String", "trend": "String", "trendDir": "'up'|'down'|'neutral'", "color": "indigo", "icon": "total" },
      { "label": "Avg Duration", "value": "String", "trend": "String", "trendDir": "'up'|'down'|'neutral'", "color": "emerald", "icon": "resolution" },
      { "label": "Total Time Spent", "value": "String", "trend": "String", "trendDir": "'up'|'down'|'neutral'", "color": "blue", "icon": "calendar" },
      { "label": "Completion Rate", "value": "String", "trend": "String", "trendDir": "'up'|'down'|'neutral'", "color": "teal", "icon": "checklist" }
    ],
    "charts": {
      "statusDistribution": [
        { "name": "String (Done, Cancelled, etc)", "value": "Number", "color": "Hex String" }
      ],
      "durationMetrics": [
        { "name": "String (Range)", "value": "Number", "color": "Hex String" }
      ],
      "priorityMetrics": [
        { "name": "String (Priority)", "value": "Number", "color": "Hex String" }
      ]
    },
    "legacy": {
      "summary": {
        "total": "String",
        "sla": "String (%)",
        "open": "String",
        "avgRes": "String (hrs)"
      },
      "secondary": {
        "closed": "String",
        "avgAge": "String",
        "oldest": "String",
        "leaders": "String"
      },
      "statusData": [{ "name": "String", "value": "Number", "color": "Hex" }],
      "slaData": [{ "name": "String", "value": "Number", "color": "Hex" }],
      "subAreaData": [{ "name": "String", "value": "Number" }],
      "resolutionData": [{ "name": "String", "value": "Number", "color": "Hex" }],
      "closureData": [{ "name": "String", "value": "Number" }],
      "ageData": [{ "name": "String", "value": "Number" }],
      "qualityData": [
        { "subject": "String", "A": "Number", "fullMark": 2000 }
      ]
    }
  }
}`;

  return (
    <div className="min-h-screen text-white font-sans relative overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '5s' }}></div>
      </div>

      <div className="relative z-10 pb-12">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/5 bg-slate-900/50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/25">
                  <IconLogo />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-white">User <span className="text-indigo-400">Maintenance</span></h1>
                  <p className="text-slate-400 text-xs font-medium">Analytics & Performance Overview</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowExtractionModal(true)}
                  className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-500/20 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  <IconCode />
                  <span>Extraction Code</span>
                </button>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <IconCalendar />
                  </div>
                  <select 
                    value={selectedRange}
                    onChange={(e) => setSelectedRange(e.target.value)}
                    className="appearance-none bg-white/5 border border-white/10 rounded-lg pl-10 pr-10 py-2 text-sm text-slate-300 font-medium focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 hover:bg-white/10 transition-all cursor-pointer min-w-[260px]"
                  >
                    <option className="bg-slate-900" value="2025-10-31 to 2025-11-19">Legacy (Oct 31 - Nov 19)</option>
                    <optgroup className="bg-slate-900" label="Monthly Reports">
                      {MONTHS.map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </optgroup>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8 space-y-12">
          
          {/* =========================================
              PART 1: NEW DASHBOARD PRO
             ========================================= */}
          <section className="space-y-6">
            
            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {proData.kpis.map((kpi: any, idx: number) => {
                const styles = getProColorClasses(kpi.color);
                const IconComponent = ICON_MAP[kpi.icon as string] || <IconTotal />;
                return (
                  <div key={idx} className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:-translate-y-1 transition-transform duration-300 group`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${styles.split(' ')[1]} ${styles.split(' ')[0]}`}>
                        {IconComponent}
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${kpi.trendDir === 'up' ? 'text-emerald-400 bg-emerald-500/10' : kpi.trendDir === 'down' ? 'text-rose-400 bg-rose-500/10' : 'text-slate-400 bg-slate-500/10'}`}>
                        {kpi.trend}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-1">{kpi.value}</h3>
                    <p className="text-slate-400 text-sm">{kpi.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Charts (Status & Priority) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
                  Ticket Status Distribution
                </h3>
                <div className="h-[300px]">
                  <GenericBarChart data={proData.charts.statusDistribution} />
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                  Tickets by Priority
                </h3>
                <div className="h-[300px]">
                  <GenericBarChart data={proData.charts.priorityMetrics} />
                </div>
              </div>
            </div>

            {/* Charts (Duration) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                  Tickets by Duration Range
                </h3>
                <div className="h-[300px]">
                  <GenericBarChart data={proData.charts.durationMetrics} />
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                  Duration Distribution
                </h3>
                <div className="h-[300px]">
                  <GenericDonutChart data={proData.charts.durationMetrics} />
                </div>
              </div>
            </div>

            {/* Footer Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Highest Volume</p>
                <p className="text-emerald-400 font-bold text-lg">Done</p>
                <p className="text-slate-500 text-xs">{proData.charts.statusDistribution[0].value.toLocaleString()} tickets</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Most Critical</p>
                <p className="text-rose-400 font-bold text-lg">Urgent</p>
                <p className="text-slate-500 text-xs">{(proData.charts.priorityMetrics.find((p: any) => p.name === 'Urgent') || { value: 0 }).value.toLocaleString()} tickets</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Avg Speed</p>
                <p className="text-blue-400 font-bold text-lg">Fast</p>
                <p className="text-slate-500 text-xs">&lt;1 Hour ({proData.charts.durationMetrics[0].value.toLocaleString()})</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Priorities</p>
                <p className="text-amber-400 font-bold text-lg">4 Levels</p>
                <p className="text-slate-500 text-xs">Low to Urgent</p>
              </div>
            </div>
          </section>

          {/* =========================================
              DIVIDER
             ========================================= */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-slate-900 px-4 text-sm text-slate-400 uppercase tracking-widest font-semibold">Legacy Metrics</span>
            </div>
          </div>

          {/* =========================================
              PART 2: RESTORED LEGACY DASHBOARD
             ========================================= */}
          <section className="space-y-8 opacity-90 hover:opacity-100 transition-opacity duration-500">
            
             {/* Legacy Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SummaryCard 
                title="Total Tickets" 
                value={legacyData.summary.total} 
                subValue="Legacy Total" 
                icon={<IconTotal />} 
                gradient="bg-gradient-to-br from-blue-600/20 to-blue-900/20"
                iconBg="bg-blue-500/20"
                borderColor="border-blue-500/20"
                textColor="text-blue-300"
                tagColor="bg-blue-500/20"
              />
              <SummaryCard 
                title="SLA Compliance" 
                value={legacyData.summary.sla} 
                subValue="Excellent" 
                icon={<IconSLA />} 
                gradient="bg-gradient-to-br from-green-600/20 to-green-900/20"
                iconBg="bg-green-500/20"
                borderColor="border-green-500/20"
                textColor="text-green-300"
                tagColor="bg-green-500/20"
              />
              <SummaryCard 
                title="Open Tickets" 
                value={legacyData.summary.open} 
                subValue="In Progress" 
                icon={<IconInProgress />} 
                gradient="bg-gradient-to-br from-amber-600/20 to-amber-900/20"
                iconBg="bg-amber-500/20"
                borderColor="border-amber-500/20"
                textColor="text-amber-300"
                tagColor="bg-amber-500/20"
              />
              <SummaryCard 
                title="Avg Resolution" 
                value={legacyData.summary.avgRes} 
                subValue="Fast" 
                icon={<IconResolution />} 
                gradient="bg-gradient-to-br from-purple-600/20 to-purple-900/20"
                iconBg="bg-purple-500/20"
                borderColor="border-purple-500/20"
                textColor="text-purple-300"
                tagColor="bg-purple-500/20"
              />
            </div>

            {/* Legacy Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Closed Tickets', value: legacyData.secondary.closed, sub: '44.2%', color: 'text-green-400' },
                { label: 'Avg Ticket Age', value: legacyData.secondary.avgAge, sub: 'Days', color: 'text-blue-400' },
                { label: 'Oldest Ticket', value: legacyData.secondary.oldest, sub: 'Days', color: 'text-red-400' },
                { label: 'Team Leaders', value: legacyData.secondary.leaders ? legacyData.secondary.leaders.split(',').length : 'N/A', sub: 'Samarra', color: 'text-amber-400' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <p className={`text-3xl font-bold ${item.color} mb-1 overflow-hidden text-ellipsis whitespace-nowrap`}>{item.value}</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">{item.label}</p>
                  <p className="text-[10px] text-gray-500">{item.sub}</p>
                </div>
              ))}
            </div>

            {/* Legacy Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-200">
                  <IconAlert /> Ticket Status Distribution
                </h3>
                <TicketStatusChart data={legacyData.statusData} />
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-200">
                  <IconTeam /> SLA Compliance by Team Leader
                </h3>
                <SLAComplianceChart data={legacyData.slaData} />
              </div>
            </div>

            {/* Legacy Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-200">
                  {isLegacyMode ? <IconLocation /> : <IconTeam />} 
                  {isLegacyMode ? "Tickets by Sub-Area" : "Tickets by Team Leader"}
                </h3>
                <SubAreaChart data={legacyData.subAreaData} />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-200">
                  <IconResolution /> 
                  {isLegacyMode ? "Avg Resolution Time by Sub-Area (Hours)" : "Avg Resolution Time by Priority (Hours)"}
                </h3>
                <ResolutionTimeChart data={legacyData.resolutionData} />
              </div>
            </div>

            {/* Legacy Top Performers & Closure */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-200">
                  {isLegacyMode ? <IconChart /> : <IconCalendar />}
                  {isLegacyMode ? "Closure Rate by Team Leader" : "Daily Closure Trend"}
                </h3>
                <ClosureRateChart data={legacyData.closureData} />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-yellow-100">
                  <IconTrophy /> Top Performers
                </h3>
                <div className="space-y-4">
                  {[
                    { rank: 1, name: legacyData.subAreaData[0]?.name || 'N/A', score: '100%', medal: '🥇', border: 'border-yellow-500/50', bg: 'bg-yellow-500/10' },
                    { rank: 2, name: legacyData.subAreaData[1]?.name || 'N/A', score: '100%', medal: '🥈', border: 'border-gray-400/50', bg: 'bg-gray-400/10' },
                    { rank: 3, name: legacyData.subAreaData[2]?.name || 'N/A', score: '100%', medal: '🥉', border: 'border-amber-700/50', bg: 'bg-amber-700/10' }
                  ].map((p) => (
                    <div key={p.rank} className={`flex items-center gap-4 p-4 rounded-xl border-l-4 ${p.border} ${p.bg}`}>
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm">
                        {p.rank}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{p.name}</p>
                        <p className="text-xs opacity-70">SLA: {p.score}</p>
                      </div>
                      <span className="text-2xl">{p.medal}</span>
                    </div>
                  ))}
                  <div className="mt-6 p-4 bg-red-500/10 rounded-xl border border-red-500/30">
                      <p className="text-xs text-red-300 mb-1 flex items-center gap-1"><IconAlert /> Needs Attention</p>
                      <p className="font-semibold text-sm">Missed SLA</p>
                      <p className="text-red-400 text-sm font-bold">{legacyData.slaData.find((s:any) => s.name === 'Missed')?.value || 0} Tickets</p>
                  </div>
                </div>
              </div>
            </div>

             {/* Legacy Quality & Age */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-200">
                  <IconCalendar /> Ticket Age Analysis
                </h3>
                <TicketAgeChart data={legacyData.ageData} />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-red-200">
                  <IconAlert /> Data Quality Issues
                </h3>
                <DataQualityChart data={legacyData.qualityData} />
              </div>
            </div>

            {/* Legacy Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-red-900/30 to-red-950/30 border border-red-500/20 rounded-2xl p-6 backdrop-blur-md">
                 <h3 className="text-lg font-bold text-red-300 mb-4 flex items-center gap-2"><IconAlert /> Immediate Actions</h3>
                 <ul className="space-y-3 text-sm text-gray-300">
                   <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></span> Address Missed SLA tickets ({legacyData.slaData.find((s:any) => s.name === 'Missed')?.value || 0})</li>
                   <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></span> Investigate Cancelled tickets ({legacyData.statusData.find((s:any) => s.name === 'Cancelled')?.value || 0})</li>
                 </ul>
              </div>
               <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/30 border border-amber-500/20 rounded-2xl p-6 backdrop-blur-md">
                 <h3 className="text-lg font-bold text-amber-300 mb-4 flex items-center gap-2"><IconTrending /> Performance</h3>
                 <ul className="space-y-3 text-sm text-gray-300">
                   <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></span> Training for team leaders with low compliance</li>
                   <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></span> Process optimization for high volume areas</li>
                 </ul>
              </div>
               <div className="bg-gradient-to-br from-green-900/30 to-green-950/30 border border-green-500/20 rounded-2xl p-6 backdrop-blur-md">
                 <h3 className="text-lg font-bold text-green-300 mb-4 flex items-center gap-2"><IconTeam /> Resource Allocation</h3>
                 <ul className="space-y-3 text-sm text-gray-300">
                   <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0"></span> Additional support for {legacyData.subAreaData[0]?.name}</li>
                   <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0"></span> Review assignment process</li>
                 </ul>
              </div>
            </div>

          </section>

        </main>
      </div>

      {/* Extraction Code Modal */}
      {showExtractionModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setShowExtractionModal(false)}></div>
          <div className="relative bg-slate-800 border border-white/10 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <IconCode />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Data Extraction Prompt</h3>
                  <p className="text-sm text-slate-400">Copy this JSON to your AI assistant to extract data</p>
                </div>
              </div>
              <button 
                onClick={() => setShowExtractionModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <div className="relative group">
                <pre className="bg-slate-950 rounded-xl p-6 text-sm font-mono text-emerald-300 whitespace-pre-wrap break-all border border-white/5">
                  {jsonPrompt}
                </pre>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(jsonPrompt);
                  }}
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-md text-xs font-medium backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                  Copy JSON
                </button>
              </div>
            </div>
            
            <div className="p-6 border-t border-white/10 bg-slate-900/50 rounded-b-2xl flex justify-end">
              <button 
                onClick={() => setShowExtractionModal(false)}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;