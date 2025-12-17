import React, { useState, useMemo } from 'react';
import { 
  IconLogo, IconCalendar, IconTotal, IconResolution, 
  IconCheckList, IconTrending, IconAlert, IconChart, IconSLA,
  IconInProgress, IconTeam, IconLocation, IconTrophy, IconCode
} from './components/Icons';
import { 
  GenericBarChart, GenericDonutChart, SubAreaStatusStackedChart,
  TicketStatusChart, SLAComplianceChart, SubAreaChart,
  ResolutionTimeChart, ClosureRateChart, MonthlyTrendChart
} from './components/Charts';
import SummaryCard from './components/SummaryCard';
import {
  DATA_JAN_2025, DATA_FEB_2025, DATA_MAR_2025, DATA_APR_2025,
  DATA_MAY_2025, DATA_JUN_2025, DATA_JUL_2025, DATA_AUG_2025,
  DATA_SEP_2025, DATA_OCT_2025, DATA_NOV_2025, DATA_DEC_2025
} from './Data';

// --- ICON MAPPING ---
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

const DUMMY_SUB_AREA_METRICS = [
  { subArea: "Karrada", Done: 120, Cancelled: 40, Closed: 10, Postpone: 5 },
  { subArea: "Mansour", Done: 95, Cancelled: 30, Closed: 8, Postpone: 2 },
  { subArea: "Adhamiya", Done: 80, Cancelled: 25, Closed: 5, Postpone: 1 },
  { subArea: "Dora", Done: 150, Cancelled: 60, Closed: 12, Postpone: 8 },
  { subArea: "Zayuna", Done: 70, Cancelled: 20, Closed: 6, Postpone: 3 },
  { subArea: "Sadr City", Done: 200, Cancelled: 80, Closed: 15, Postpone: 10 },
  { subArea: "Jadriya", Done: 60, Cancelled: 15, Closed: 4, Postpone: 1 },
  { subArea: "Karkh", Done: 110, Cancelled: 35, Closed: 9, Postpone: 4 }
];

// 1. LEGACY DATA (Fallback)
const LEGACY_DATA_SOURCE = {
  summary: {
    total: '3,906',
    sla: '96.69%',
    open: '542',
    avgRes: '3.66 hrs'
  },
  secondary: {
    closed: '1,725',
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
    { name: 'بهاء حسين', value: 950, color: '#3B82F6' },
    { name: 'غيث محمد', value: 820, color: '#10B981' },
    { name: 'مصطفى تحسين', value: 750, color: '#F59E0B' },
    { name: 'أحمد خالد', value: 600, color: '#6366F1' },
    { name: 'Unassigned', value: 180, color: '#EF4444' },
  ],
  closureData: [
    { name: 'بهاء حسين', value: 100 },
    { name: 'غيث محمد', value: 100 },
    { name: 'مصطفى تحسين', value: 100 },
    { name: 'أحمد خالد', value: 75 },
    { name: 'Unassigned', value: 38.5 },
  ],
  cityMetrics: [
    { city: "Baghdad", Done: 1800, Cancelled: 350, Closed: 120, Postpone: 45 },
    { city: "Basra", Done: 1100, Cancelled: 180, Closed: 85, Postpone: 30 },
    { city: "Erbil", Done: 950, Cancelled: 120, Closed: 70, Postpone: 25 },
    { city: "Mosul", Done: 850, Cancelled: 110, Closed: 60, Postpone: 20 },
    { city: "Najaf", Done: 500, Cancelled: 60, Closed: 40, Postpone: 15 },
    { city: "Karbala", Done: 450, Cancelled: 55, Closed: 35, Postpone: 10 },
    { city: "Kirkuk", Done: 420, Cancelled: 50, Closed: 30, Postpone: 10 }
  ],
  subAreaMetrics: DUMMY_SUB_AREA_METRICS
};

// 2. PRO DATA (Structure)
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
    statusDistribution: [],
    durationMetrics: [],
    priorityMetrics: [],
    cityMetrics: [],
    subAreaMetrics: []
  }
};

const MONTHS = [
  'Total Year 2025',
  'January 2025', 'February 2025', 'March 2025', 'April 2025', 
  'May 2025', 'June 2025', 'July 2025', 'August 2025', 
  'September 2025', 'October 2025', 'November 2025', 'December 2025 (till 16-12-2025)'
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
  'December 2025 (till 16-12-2025)': DATA_DEC_2025,
};

// Helper: Convert "X days, HH:MM:SS" or "HH:MM:SS" to readable hrs string
function convertToHours(timeStr: string): string {
  if (!timeStr) return "0 hrs";
  const dayMatch = timeStr.match(/(\d+)\s*days?,\s*(\d+):(\d+):(\d+)/);
  if (dayMatch) {
    const days = parseInt(dayMatch[1], 10);
    const hours = parseInt(dayMatch[2], 10);
    const totalHours = (days * 24) + hours;
    return `${totalHours.toLocaleString()} hrs`;
  }
  if (timeStr.match(/^\d+:\d+:\d+$/)) {
     const parts = timeStr.split(':');
     return `${parseInt(parts[0], 10)} hrs`;
  }
  if (timeStr.includes('hrs')) return timeStr;
  return timeStr;
}

// Helper: Parse Duration to Number
const parseDurationToHours = (str: string) => {
  if (!str) return 0;
  const dayMatch = str.match(/(\d+)\s*days?,\s*(\d+):(\d+):(\d+)/);
  if (dayMatch) {
    const days = parseInt(dayMatch[1], 10);
    const hours = parseInt(dayMatch[2], 10);
    return (days * 24) + hours;
  }
  if (str.includes('hrs')) return parseInt(str.replace(' hrs', '').replace(/,/g, ''), 10);
  return 0;
};

// Helper: Process Daily Closure Data from Date strings to Day of Week
const processDailyClosures = (closureData: { name: string, value: number }[]) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const counts: Record<string, number> = {
    "Sunday": 0, "Monday": 0, "Tuesday": 0, "Wednesday": 0, "Thursday": 0, "Friday": 0, "Saturday": 0
  };

  closureData.forEach(item => {
    // Attempt to parse YYYY-MM-DD
    const d = new Date(item.name);
    if (!isNaN(d.getTime())) {
      const dayName = days[d.getDay()];
      counts[dayName] += item.value;
    }
  });

  return days.map(day => ({ name: day, value: counts[day] }));
};

const getPromptDateRange = (rangeValue: string) => {
  if (rangeValue === 'Total Year 2025') return "for the entire year 2025";
  return `for ${rangeValue}`;
};

const App = () => {
  const [selectedRange, setSelectedRange] = useState('Total Year 2025');
  const [showExtractionModal, setShowExtractionModal] = useState(false);

  // Helper to check if using Legacy Data (default view) or Monthly Reports
  const isLegacyMode = selectedRange === '2025-10-31 to 2025-11-19';

  const { proData, legacyData, currentSubAreaMetrics, monthlyTrend } = useMemo(() => {
    // 1. Default Legacy Range (Fallback)
    if (isLegacyMode) {
      return { 
          proData: PRO_DATA_SOURCE, 
          legacyData: LEGACY_DATA_SOURCE,
          currentSubAreaMetrics: LEGACY_DATA_SOURCE.subAreaMetrics,
          monthlyTrend: null
      };
    }

    let aggregated = {
      totalTickets: 0,
      totalHours: 0,
      statusCounts: {} as Record<string, number>,
      durationCounts: {} as Record<string, number>,
      priorityCounts: {} as Record<string, number>,
      teamLeaderCounts: {} as Record<string, number>,
      responsibleCounts: {} as Record<string, number>,
      dailyClosureData: [] as { name: string, value: number }[],
      slaCounts: { Met: 0, Missed: 0 },
      subAreaCounts: {} as Record<string, any>
    };

    let trendData: any[] = [];
    let processingData: any[] = [];

    // Determine which data to process
    if (selectedRange === 'Total Year 2025') {
      const monthKeys = Object.keys(DATA_MAP).filter(k => k.includes('2025'));
      monthKeys.forEach(key => processingData.push({ ...DATA_MAP[key], monthName: key.split(' ')[0].substring(0,3) }));
    } else if (DATA_MAP[selectedRange]) {
      processingData.push({ ...DATA_MAP[selectedRange], monthName: selectedRange.split(' ')[0].substring(0,3) });
    } else {
      // Fallback if key missing
      processingData.push({ ...DATA_JAN_2025, monthName: 'Jan' }); 
    }

    // --- AGGREGATION LOGIC ---
    processingData.forEach(monthData => {
        // Summary
        aggregated.totalTickets += (monthData.summary.totalTickets || 0);
        aggregated.totalHours += parseDurationToHours(monthData.summary.totalTime);

        // Chart: Status
        monthData.charts.statusDistribution.forEach((item: any) => {
          aggregated.statusCounts[item.name] = (aggregated.statusCounts[item.name] || 0) + item.value;
        });
        // Chart: Duration
        monthData.charts.durationMetrics.forEach((item: any) => {
          aggregated.durationCounts[item.name] = (aggregated.durationCounts[item.name] || 0) + item.value;
        });
        // Chart: Priority
        monthData.charts.priorityMetrics.forEach((item: any) => {
          aggregated.priorityCounts[item.name] = (aggregated.priorityCounts[item.name] || 0) + item.value;
        });

        // Legacy: SLA
        (monthData.legacy.slaData || []).forEach((item: any) => {
           if(item.name === 'Met') aggregated.slaCounts.Met += item.value;
           if(item.name === 'Missed') aggregated.slaCounts.Missed += item.value;
        });

        // Legacy: MR Team Leader (stored in subAreaData in monthly JSONs)
        (monthData.legacy.subAreaData || []).forEach((item: any) => {
           aggregated.teamLeaderCounts[item.name] = (aggregated.teamLeaderCounts[item.name] || 0) + item.value;
        });

        // Legacy: MR Responsible
        (monthData.legacy.resolutionData || []).forEach((item: any) => {
           aggregated.responsibleCounts[item.name] = (aggregated.responsibleCounts[item.name] || 0) + item.value;
        });

        // Legacy: Daily Closures (Accumulate raw for processing)
        if (monthData.legacy.closureData) {
           aggregated.dailyClosureData.push(...monthData.legacy.closureData);
        }

        // Sub Area Metrics (New Dashboard)
        (monthData.subAreaMetrics || []).forEach((item: any) => {
           if (!aggregated.subAreaCounts[item.subArea]) {
             aggregated.subAreaCounts[item.subArea] = { ...item };
           } else {
             aggregated.subAreaCounts[item.subArea].Done += item.Done;
             aggregated.subAreaCounts[item.subArea].Cancelled += item.Cancelled;
             aggregated.subAreaCounts[item.subArea].Closed += item.Closed;
             aggregated.subAreaCounts[item.subArea].Postpone += item.Postpone;
           }
        });

        // Trend
        const done = monthData.charts.statusDistribution.find((s:any) => s.name === 'Done')?.value || 0;
        trendData.push({
          name: monthData.monthName,
          total: monthData.summary.totalTickets,
          done: done,
          completionRate: monthData.summary.completionRate
        });
    });

    // --- TRANSFORMATION ---
    const transformMap = (map: Record<string, number>, colorMapSource?: any[]) => {
       return Object.keys(map).map(key => ({
         name: key, 
         value: map[key],
         color: colorMapSource?.find((x:any) => x.name === key)?.color || '#94a3b8'
       })).sort((a,b) => b.value - a.value);
    };

    const statusDist = transformMap(aggregated.statusCounts, PRO_DATA_SOURCE.charts.statusDistribution);
    const durationMet = transformMap(aggregated.durationCounts, PRO_DATA_SOURCE.charts.durationMetrics);
    const priorityMet = transformMap(aggregated.priorityCounts, PRO_DATA_SOURCE.charts.priorityMetrics);
    
    // Team Leader (Sort desc, take top 10 for cleanliness, or all if needed)
    const teamLeaderData = Object.keys(aggregated.teamLeaderCounts)
      .map(key => ({ name: key, value: aggregated.teamLeaderCounts[key] }))
      .sort((a,b) => b.value - a.value);

    // Responsible
    const responsibleData = Object.keys(aggregated.responsibleCounts)
      .map(key => ({ name: key, value: aggregated.responsibleCounts[key], color: '#6366f1' }))
      .sort((a,b) => b.value - a.value);

    // Closure Trend (By Day of Week)
    const closureTrendData = processDailyClosures(aggregated.dailyClosureData);

    const subAreaMet = Object.values(aggregated.subAreaCounts).sort((a:any, b:any) => b.Done - a.Done).slice(0, 10);

    // Summary Calcs
    const totalHoursFormatted = `${aggregated.totalHours.toLocaleString()} hrs`;
    const avgDurationHours = aggregated.totalTickets ? Math.round(aggregated.totalHours / aggregated.totalTickets) : 0;
    const completionRate = aggregated.totalTickets ? Math.round((aggregated.statusCounts['Done'] || 0) / aggregated.totalTickets * 100) : 0;

    // SLA Data for Legacy
    const slaDataLegacy = [
        { name: 'Met', value: aggregated.slaCounts.Met, color: '#10B981' },
        { name: 'Missed', value: aggregated.slaCounts.Missed, color: '#EF4444' }
    ];

    const newProData = {
        summary: {
          totalTickets: aggregated.totalTickets,
          avgDuration: `${avgDurationHours} hrs`,
          totalTime: totalHoursFormatted,
          completionRate: completionRate
        },
        kpis: [
          { label: "Total Tickets", value: aggregated.totalTickets.toLocaleString(), trend: "N/A", trendDir: "neutral", color: "indigo", icon: "total" },
          { label: "Avg Duration", value: `${avgDurationHours} hrs`, trend: "N/A", trendDir: "neutral", color: "emerald", icon: "resolution" },
          { label: "Total Time Spent", value: totalHoursFormatted, trend: "N/A", trendDir: "neutral", color: "blue", icon: "calendar" },
          { label: "Completion Rate", value: `${completionRate}%`, trend: "N/A", trendDir: "neutral", color: "teal", icon: "checklist" }
        ],
        charts: {
          statusDistribution: statusDist,
          durationMetrics: durationMet,
          priorityMetrics: priorityMet
        }
    };

    const newLegacyData = {
        summary: {
            total: aggregated.totalTickets.toLocaleString(),
            sla: `${completionRate}%`,
            open: (aggregated.statusCounts['Cancelled'] || 0).toLocaleString(), // Mapping 'Cancelled' to Open/Issue for legacy view context or extracting real open if avail
            avgRes: `${avgDurationHours} hrs`
        },
        secondary: {
            closed: (aggregated.statusCounts['Done'] || 0).toLocaleString(),
            leaders: teamLeaderData.length.toString()
        },
        statusData: statusDist,
        slaData: slaDataLegacy,
        subAreaData: teamLeaderData, // Corrected: Showing Team Leaders here now
        resolutionData: responsibleData,
        closureData: closureTrendData
    };

    return {
        proData: newProData,
        legacyData: newLegacyData,
        currentSubAreaMetrics: subAreaMet,
        monthlyTrend: selectedRange === 'Total Year 2025' ? trendData : null
    };

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
    "2. Group metrics by 'MR Team Leader' for the 'subAreaData' field and 'MR Responsible' for the 'resolutionData' field.",
    "3. Calculate the metrics required to populate the JSON structure defined below.",
    "4. Return ONLY the valid JSON object. Do not include markdown formatting or conversational text."
  ],
  "required_output_format": {
    "summary": {
      "totalTickets": "Number (Integer)",
      "avgDuration": "String (Format HH:MM:SS)",
      "totalTime": "String (Format 'X days, HH:MM:SS')",
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
        { "name": "String (Done, Cancelled, Closed, Postpone, etc)", "value": "Number", "color": "Hex String" }
      ],
      "durationMetrics": [
        { "name": "String (Range)", "value": "Number", "color": "Hex String" }
      ],
      "priorityMetrics": [
        { "name": "String (Priority)", "value": "Number", "color": "Hex String" }
      ]
    },
    "cityMetrics": [
       { "city": "String (e.g. Baghdad)", "Done": "Number", "Cancelled": "Number", "Closed": "Number", "Postpone": "Number" }
    ],
    "subAreaMetrics": [
       { "subArea": "String (e.g. Karrada)", "Done": "Number", "Cancelled": "Number", "Closed": "Number", "Postpone": "Number" }
    ],
    "legacy": {
      "summary": {
        "total": "String",
        "sla": "String (%)",
        "open": "String",
        "avgRes": "String (hrs)"
      },
      "secondary": {
        "closed": "String",
        "leaders": "String (Top MR Team Leaders)"
      },
      "statusData": [{ "name": "String", "value": "Number", "color": "Hex" }],
      "slaData": [{ "name": "String (Met/Missed)", "value": "Number", "color": "Hex" }],
      "subAreaData": [{ "name": "String (Value from 'MR Team Leader' column)", "value": "Number" }],
      "resolutionData": [{ "name": "String (Value from 'MR Responsible' column)", "value": "Number", "color": "Hex" }],
      "closureData": [{ "name": "String (Date YYYY-MM-DD)", "value": "Number" }]
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
                  <p className="text-slate-400 text-xs font-medium">Analytics & Performance Overview - Projected Data</p>
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

            {/* === MONTHLY TREND CHART (Visible only for Total Year) === */}
            {monthlyTrend && (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-between mb-8">
                  <div>
                     <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                      <IconTrending />
                      Monthly Performance Trends
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">Comparision of Ticket Volumes and SLA Compliance across the year</p>
                  </div>
                </div>
                <div className="h-[400px] w-full bg-slate-900/30 rounded-xl border border-white/5 p-4">
                  <MonthlyTrendChart data={monthlyTrend} />
                </div>
              </div>
            )}

            {/* === SUB AREAS SECTION (New Chart) === */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                   <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <IconLocation />
                    Sub Areas Performance
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">Ticket distribution by Sub Area</p>
                </div>
                <div className="flex gap-2 text-xs font-medium bg-black/20 p-1 rounded-lg">
                   <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Done
                   </div>
                   <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/5">
                      <div className="w-2 h-2 rounded-full bg-rose-500"></div> Cancelled
                   </div>
                   <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/5">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div> Closed
                   </div>
                   <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/5">
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div> Postpone
                   </div>
                </div>
              </div>
              
              <div className="h-[500px] w-full bg-slate-900/30 rounded-xl border border-white/5 p-4">
                <SubAreaStatusStackedChart data={currentSubAreaMetrics || []} />
              </div>
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
                <p className="text-slate-500 text-xs">{proData.charts.statusDistribution[0]?.value?.toLocaleString() || 0} tickets</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Most Critical</p>
                <p className="text-rose-400 font-bold text-lg">Urgent</p>
                <p className="text-slate-500 text-xs">{(proData.charts.priorityMetrics.find((p: any) => p.name === 'Urgent') || { value: 0 }).value.toLocaleString()} tickets</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Avg Speed</p>
                <p className="text-blue-400 font-bold text-lg">Fast</p>
                <p className="text-slate-500 text-xs">&lt;1 Hour ({proData.charts.durationMetrics[0]?.value?.toLocaleString() || 0})</p>
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
                title="SLA Completion Rate" 
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
                value={legacyData.summary.avgRes.toString().includes('hrs') ? legacyData.summary.avgRes : `${legacyData.summary.avgRes} hrs`} 
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Team Leaders', value: legacyData.secondary.leaders ? legacyData.secondary.leaders : 'N/A', sub: 'Total Assigned', color: 'text-amber-400' },
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
                  <IconTeam /> SLA Completion Rate by Team Leader
                </h3>
                <SLAComplianceChart data={legacyData.slaData} />
              </div>
            </div>

            {/* Legacy Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-200">
                  <IconTeam /> 
                  MR Team Leader
                </h3>
                <SubAreaChart data={legacyData.subAreaData} />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-200">
                  <IconTeam /> 
                  MR Responsible Tickets
                </h3>
                <ResolutionTimeChart data={legacyData.resolutionData} />
              </div>
            </div>

            {/* Legacy Top Performers & Closure */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-200">
                  {isLegacyMode ? <IconChart /> : <IconCalendar />}
                  {isLegacyMode ? "Closure Rate by Team Leader" : "Daily Closure Trend (Day of Week)"}
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