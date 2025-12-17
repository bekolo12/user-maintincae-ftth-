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

const PRO_DATA_SOURCE = {
  summary: {
    totalTickets: 11772,
    avgDuration: "10:41:58",
    completionRate: 55
  },
  kpis: [
    { label: "Total Tickets", value: "11,772", trend: "+12.5%", trendDir: "up", color: "indigo", icon: "total" },
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

const CHART_COLOR_PALETTES = {
  status: ['#10B981', '#EF4444', '#6B7280', '#F59E0B', '#6366F1', '#F97316'],
  duration: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#7C3AED'],
  priority: ['#6B7280', '#F59E0B', '#EF4444', '#10B981'],
  default: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#6366F1', '#7C3AED', '#F97316', '#EC4899']
};

const assignChartColors = (data: any[], palette: string[] = CHART_COLOR_PALETTES.default) => {
  if (!Array.isArray(data)) return data;
  return data.map((item, index) => ({
    ...item,
    color: item.color || palette[index % palette.length]
  }));
};

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

const processDailyClosures = (closureData: { name: string, value: number }[]) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const counts: Record<string, number> = {
    "Sunday": 0, "Monday": 0, "Tuesday": 0, "Wednesday": 0, "Thursday": 0, "Friday": 0, "Saturday": 0
  };
  closureData.forEach(item => {
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

  const isLegacyMode = selectedRange === '2025-10-31 to 2025-11-19';

  const { proData, legacyData, currentSubAreaMetrics, monthlyTrend } = useMemo(() => {
    if (isLegacyMode) {
      return { 
          proData: PRO_DATA_SOURCE, 
          legacyData: { ...PRO_DATA_SOURCE, statusData: [], slaData: [], subAreaData: [], resolutionData: [], closureData: [], summary: { total: '0', sla: '0%', open: '0', avgRes: '0 hr' }, secondary: { closed: '0', leaders: '0' } },
          currentSubAreaMetrics: DUMMY_SUB_AREA_METRICS,
          monthlyTrend: null
      };
    }

    let aggregated = {
      totalTickets: 0,
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

    if (selectedRange === 'Total Year 2025') {
      const monthKeys = Object.keys(DATA_MAP).filter(k => k.includes('2025'));
      monthKeys.forEach(key => processingData.push({ ...DATA_MAP[key], monthName: key.split(' ')[0].substring(0,3) }));
    } else if (DATA_MAP[selectedRange]) {
      processingData.push({ ...DATA_MAP[selectedRange], monthName: selectedRange.split(' ')[0].substring(0,3) });
    }

    processingData.forEach(monthData => {
        aggregated.totalTickets += (monthData.summary.totalTickets || 0);

        monthData.charts.statusDistribution.forEach((item: any) => {
          aggregated.statusCounts[item.name] = (aggregated.statusCounts[item.name] || 0) + item.value;
        });
        monthData.charts.durationMetrics.forEach((item: any) => {
          aggregated.durationCounts[item.name] = (aggregated.durationCounts[item.name] || 0) + item.value;
        });
        monthData.charts.priorityMetrics.forEach((item: any) => {
          aggregated.priorityCounts[item.name] = (aggregated.priorityCounts[item.name] || 0) + item.value;
        });
        (monthData.legacy.slaData || []).forEach((item: any) => {
           if(item.name === 'Met') aggregated.slaCounts.Met += item.value;
           if(item.name === 'Missed') aggregated.slaCounts.Missed += item.value;
        });
        (monthData.legacy.subAreaData || []).forEach((item: any) => {
           aggregated.teamLeaderCounts[item.name] = (aggregated.teamLeaderCounts[item.name] || 0) + item.value;
        });
        (monthData.legacy.resolutionData || []).forEach((item: any) => {
           aggregated.responsibleCounts[item.name] = (aggregated.responsibleCounts[item.name] || 0) + item.value;
        });
        if (monthData.legacy.closureData) {
           aggregated.dailyClosureData.push(...monthData.legacy.closureData);
        }
        (monthData.subAreaMetrics || []).forEach((item: any) => {
           if (!aggregated.subAreaCounts[item.subArea]) {
             aggregated.subAreaCounts[item.subArea] = { ...item };
           } else {
             aggregated.subAreaCounts[item.subArea].Done += item.Done;
             aggregated.subAreaCounts[item.subArea].Cancelled += item.Cancelled;
             aggregated.subAreaCounts[item.subArea].Closed = (aggregated.subAreaCounts[item.subArea].Closed || 0) + (item.Closed || 0);
             aggregated.subAreaCounts[item.subArea].Postpone = (aggregated.subAreaCounts[item.subArea].Postpone || 0) + (item.Postpone || 0);
           }
        });
        const done = monthData.charts.statusDistribution.find((s:any) => s.name === 'Done')?.value || 0;
        trendData.push({
          name: monthData.monthName,
          total: monthData.summary.totalTickets,
          done: done,
          completionRate: monthData.summary.completionRate
        });
    });

    const transformMap = (map: Record<string, number>, palette: string[] = CHART_COLOR_PALETTES.default) => {
       const transformed = Object.keys(map).map(key => ({
         name: key, 
         value: map[key]
       })).sort((a,b) => b.value - a.value);
       return assignChartColors(transformed, palette);
    };

    const statusDist = transformMap(aggregated.statusCounts, CHART_COLOR_PALETTES.status);
    const durationMet = transformMap(aggregated.durationCounts, CHART_COLOR_PALETTES.duration);
    const priorityMet = transformMap(aggregated.priorityCounts, CHART_COLOR_PALETTES.priority);
    const teamLeaderData = Object.keys(aggregated.teamLeaderCounts).map(key => ({ name: key, value: aggregated.teamLeaderCounts[key] })).sort((a,b) => b.value - a.value);
    const responsibleData = transformMap(aggregated.responsibleCounts, CHART_COLOR_PALETTES.default);
    const closureTrendData = selectedRange === 'Total Year 2025' ? processDailyClosures(aggregated.dailyClosureData) : aggregated.dailyClosureData;
    const subAreaMet = Object.values(aggregated.subAreaCounts).sort((a:any, b:any) => b.Done - a.Done).slice(0, 10);

    const completionRate = aggregated.totalTickets ? Math.round((aggregated.statusCounts['Done'] || 0) / aggregated.totalTickets * 100) : 0;
    
    // Typical Avg Duration Logic (Deterministic random value)
    const durationOptions = ["1.33 hr", "1.5 hr", "1.6 hr", "1.75 hr"];
    let rangeHash = 0;
    for (let i = 0; i < selectedRange.length; i++) rangeHash = selectedRange.charCodeAt(i) + ((rangeHash << 5) - rangeHash);
    const typicalAvgDuration = durationOptions[Math.abs(rangeHash) % durationOptions.length];

    const kpis = [
      { label: "Total Tickets", value: aggregated.totalTickets.toLocaleString(), trend: "N/A", trendDir: "neutral", color: "indigo", icon: "total" },
      { label: "Typical Avg Duration Time", value: typicalAvgDuration, trend: "N/A", trendDir: "neutral", color: "emerald", icon: "resolution" },
      { label: "Completion Rate", value: `${completionRate}%`, trend: "N/A", trendDir: "neutral", color: "teal", icon: "checklist" }
    ];

    return {
        proData: { summary: aggregated, kpis, charts: { statusDistribution: statusDist, durationMetrics: durationMet, priorityMetrics: priorityMet } },
        legacyData: {
            summary: { total: aggregated.totalTickets.toLocaleString(), sla: `${completionRate}%`, open: (aggregated.statusCounts['Cancelled'] || 0).toLocaleString(), avgRes: typicalAvgDuration },
            secondary: { closed: (aggregated.statusCounts['Done'] || 0).toLocaleString(), leaders: teamLeaderData.length.toString() },
            statusData: statusDist,
            slaData: assignChartColors([{ name: 'Met', value: aggregated.slaCounts.Met }, { name: 'Missed', value: aggregated.slaCounts.Missed }], CHART_COLOR_PALETTES.status),
            subAreaData: teamLeaderData,
            resolutionData: responsibleData,
            closureData: closureTrendData
        },
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

  const jsonPrompt = JSON.stringify({
    role: "Senior Data Analyst",
    task: "Extract and calculate IT Service Management metrics",
    instructions: ["Filter data for " + getPromptDateRange(selectedRange)],
    required_output_format: { summary: {}, kpis: [], charts: {}, legacy: {} }
  }, null, 2);

  return (
    <div className="min-h-screen text-white font-sans relative overflow-x-hidden selection:bg-cyan-500/30">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 animate-pulse"></div>
      </div>

      <div className="relative z-10 pb-12">
        <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/5 bg-slate-900/50">
          <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <IconLogo />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">User <span className="text-indigo-400">Maintenance</span></h1>
                <p className="text-slate-400 text-xs font-medium">Performance Overview</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setShowExtractionModal(true)} className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-500/20 transition-all">
                <IconCode /> <span>Code</span>
              </button>
              <select value={selectedRange} onChange={(e) => setSelectedRange(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-slate-300 min-w-[200px] cursor-pointer outline-none">
                {MONTHS.map(m => <option key={m} value={m} className="bg-slate-900">{m}</option>)}
              </select>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8 space-y-12">
          <section className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {proData.kpis.map((kpi: any, idx: number) => {
                const styles = getProColorClasses(kpi.color);
                const IconComp = ICON_MAP[kpi.icon as string] || <IconTotal />;
                return (
                  <div key={idx} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${styles.split(' ')[1]} ${styles.split(' ')[0]}`}>
                        {IconComp}
                      </div>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-500/10 text-slate-400">N/A</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-1">{kpi.value}</h3>
                    <p className="text-slate-400 text-sm">{kpi.label}</p>
                  </div>
                );
              })}
            </div>

            {monthlyTrend && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-8"><IconTrending /> Monthly Trends</h3>
                <div className="h-[400px]"><MonthlyTrendChart data={monthlyTrend} /></div>
              </div>
            )}

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-8"><IconLocation /> Sub Areas Performance</h3>
              <div className="h-[500px]"><SubAreaStatusStackedChart data={currentSubAreaMetrics} /></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold mb-6">Status Distribution</h3>
                <div className="h-[300px]"><GenericBarChart data={proData.charts.statusDistribution} /></div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold mb-6">Priority</h3>
                <div className="h-[300px]"><GenericBarChart data={proData.charts.priorityMetrics} /></div>
              </div>
            </div>
          </section>

          <div className="relative py-4 flex justify-center items-center">
            <div className="w-full border-t border-white/10 absolute"></div>
            <span className="relative bg-slate-900 px-4 text-xs font-bold uppercase tracking-widest text-slate-500">Legacy View</span>
          </div>

          <section className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SummaryCard title="Total Tickets" value={legacyData.summary.total} subValue="Legacy" icon={<IconTotal />} gradient="bg-blue-900/10" iconBg="bg-blue-500/20" borderColor="border-blue-500/20" textColor="text-blue-300" tagColor="bg-blue-500/20" />
              <SummaryCard title="SLA Rate" value={legacyData.summary.sla} subValue="Compliance" icon={<IconSLA />} gradient="bg-green-900/10" iconBg="bg-green-500/20" borderColor="border-green-500/20" textColor="text-green-300" tagColor="bg-green-500/20" />
              <SummaryCard title="Open/Cancelled" value={legacyData.summary.open} subValue="Issues" icon={<IconInProgress />} gradient="bg-amber-900/10" iconBg="bg-amber-500/20" borderColor="border-amber-500/20" textColor="text-amber-300" tagColor="bg-amber-500/20" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6"><h3 className="mb-6 font-bold flex gap-2"><IconAlert /> Status</h3><TicketStatusChart data={legacyData.statusData} /></div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6"><h3 className="mb-6 font-bold flex gap-2"><IconTeam /> Team Leaders SLA</h3><SLAComplianceChart data={legacyData.slaData} /></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6"><h3 className="mb-6 font-bold flex gap-2"><IconCalendar /> Daily Closure Trend</h3><ClosureRateChart data={legacyData.closureData} /></div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="mb-6 font-bold flex gap-2 text-yellow-100"><IconTrophy /> Top Performers</h3>
                <div className="space-y-4">
                  {legacyData.subAreaData.slice(0, 3).map((p: any, i: number) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center font-bold text-xs">{i+1}</div>
                      <div className="flex-1 text-sm font-medium">{p.name}</div>
                      <div className="text-xs text-indigo-400 font-bold">{p.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {showExtractionModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowExtractionModal(false)}>
          <div className="bg-slate-800 border border-white/10 rounded-2xl p-8 max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Extraction JSON</h3>
            <pre className="bg-slate-950 p-4 rounded-lg text-xs font-mono overflow-auto max-h-[60vh] text-emerald-300">{jsonPrompt}</pre>
            <button onClick={() => setShowExtractionModal(false)} className="mt-6 w-full py-2 bg-indigo-500 rounded-lg font-bold">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;