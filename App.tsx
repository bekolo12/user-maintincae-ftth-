import React, { useState, useMemo } from 'react';
import { 
  IconLogo, IconCalendar, IconChart, IconTotal, IconSLA, IconInProgress, 
  IconResolution, IconAlert, IconTeam, IconLocation, IconTrophy, IconCheckList, IconTrending 
} from './components/Icons';
import SummaryCard from './components/SummaryCard';
import { 
  TicketStatusChart, SLAComplianceChart, SubAreaChart, 
  ResolutionTimeChart, ClosureRateChart, TicketAgeChart, DataQualityChart 
} from './components/Charts';

// --- DATA DEFINITIONS ---

// Original "Real" Data
const REAL_DATA = {
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

const MONTHS = [
  'January 2025', 'February 2025', 'March 2025', 'April 2025', 
  'May 2025', 'June 2025', 'July 2025', 'August 2025', 
  'September 2025', 'October 2025', 'November 2025'
];

const App = () => {
  const [selectedRange, setSelectedRange] = useState('2025-10-31 to 2025-11-03');

  // Generate simulated "Projected" data based on selection
  const currentData = useMemo(() => {
    if (selectedRange === '2025-10-31 to 2025-11-03') {
      return REAL_DATA;
    }

    // Deterministic random-ish simulation based on string length of month
    const factor = (selectedRange.length % 5) / 10 + 0.9; // 0.9 to 1.3
    const factor2 = 2 - factor;

    const simValue = (v: number) => Math.floor(v * factor);
    const simPct = (v: number) => Math.min(100, parseFloat((v * factor2).toFixed(2)));

    return {
      summary: {
        total: Math.floor(3906 * factor).toLocaleString(),
        sla: simPct(96.69) + '%',
        open: Math.floor(542 * factor2).toLocaleString(),
        avgRes: (3.66 * factor2).toFixed(2) + ' hrs'
      },
      secondary: {
        closed: Math.floor(1725 * factor).toLocaleString(),
        avgAge: (35.5 * factor2).toFixed(1),
        oldest: Math.floor(61 * factor2).toString(),
        leaders: '10'
      },
      statusData: REAL_DATA.statusData.map(d => ({ ...d, value: simValue(d.value) })),
      slaData: REAL_DATA.slaData.map(d => ({ ...d, value: simPct(d.value) })),
      subAreaData: REAL_DATA.subAreaData.map(d => ({ ...d, value: simValue(d.value) })),
      resolutionData: REAL_DATA.resolutionData.map(d => ({ ...d, value: parseFloat((d.value * factor2).toFixed(1)) })),
      closureData: REAL_DATA.closureData.map(d => ({ ...d, value: simPct(d.value) })),
      ageData: REAL_DATA.ageData.map(d => ({ ...d, value: simValue(d.value) })),
      qualityData: REAL_DATA.qualityData.map(d => ({ ...d, A: simValue(d.A) }))
    };
  }, [selectedRange]);

  const isProjected = selectedRange !== '2025-10-31 to 2025-11-03';

  return (
    <div className="min-h-screen text-white pb-12">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <IconLogo />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">FTTH Maintenance Dashboard</h1>
                <p className="text-cyan-300 text-sm font-medium flex items-center gap-2">
                  Analytics & Performance Overview
                  {isProjected && (
                    <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-xs font-bold border border-amber-500/30">
                      PROJECTED VALUES
                    </span>
                  )}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Dropdown Menu */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <IconCalendar />
                </div>
                <select 
                  value={selectedRange}
                  onChange={(e) => setSelectedRange(e.target.value)}
                  className="appearance-none bg-cyan-900/30 border border-cyan-500/30 rounded-lg pl-10 pr-10 py-2.5 text-white text-xs font-semibold focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all cursor-pointer min-w-[240px] hover:bg-cyan-900/40"
                >
                  <option className="bg-slate-800" value="2025-10-31 to 2025-11-03">2025-10-31 to 2025-11-03 (Current)</option>
                  <optgroup className="bg-slate-800" label="Projections 2025">
                    {MONTHS.map(month => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </optgroup>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-cyan-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>

              <div className={`border rounded-lg px-4 py-2 flex items-center gap-2 transition-colors ${isProjected ? 'bg-amber-900/30 border-amber-500/30' : 'bg-green-900/30 border-green-500/30'}`}>
                <span className="relative flex h-3 w-3">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isProjected ? 'bg-amber-400' : 'bg-green-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${isProjected ? 'bg-amber-500' : 'bg-green-500'}`}></span>
                </span>
                <span className={`text-sm font-medium ${isProjected ? 'text-amber-300' : 'text-green-300'}`}>
                  {isProjected ? 'Projected Data' : 'Live Data'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
        
        {/* Executive Summary */}
        <section>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-cyan-100">
            <IconChart />
            Executive Summary {isProjected && <span className="text-amber-400 text-sm font-normal">(Projected)</span>}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SummaryCard 
              title="Total Tickets" 
              value={currentData.summary.total} 
              subValue="Total" 
              icon={<IconTotal />} 
              gradient="bg-gradient-to-br from-blue-600/20 to-blue-900/20"
              iconBg="bg-blue-500/20"
              borderColor="border-blue-500/20"
              textColor="text-blue-300"
              tagColor="bg-blue-500/20"
            />
            <SummaryCard 
              title="SLA Compliance" 
              value={currentData.summary.sla} 
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
              value={currentData.summary.open} 
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
              value={currentData.summary.avgRes} 
              subValue="Fast" 
              icon={<IconResolution />} 
              gradient="bg-gradient-to-br from-purple-600/20 to-purple-900/20"
              iconBg="bg-purple-500/20"
              borderColor="border-purple-500/20"
              textColor="text-purple-300"
              tagColor="bg-purple-500/20"
            />
          </div>
        </section>

        {/* Secondary Stats Row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Closed Tickets', value: currentData.secondary.closed, sub: '44.2%', color: 'text-green-400' },
            { label: 'Avg Ticket Age', value: currentData.secondary.avgAge, sub: 'Days', color: 'text-blue-400' },
            { label: 'Oldest Ticket', value: currentData.secondary.oldest, sub: 'Days', color: 'text-red-400' },
            { label: 'Team Leaders', value: currentData.secondary.leaders, sub: 'Samarra', color: 'text-amber-400' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center backdrop-blur-sm hover:bg-white/10 transition-colors">
              <p className={`text-3xl font-bold ${item.color} mb-1`}>{item.value}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wide">{item.label}</p>
              <p className="text-[10px] text-gray-500">{item.sub}</p>
            </div>
          ))}
        </section>

        {/* Main Charts Row 1 */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-200">
              <IconAlert /> Ticket Status Distribution
            </h3>
            <TicketStatusChart data={currentData.statusData} />
            <div className="grid grid-cols-3 gap-2 mt-6">
               <div className="text-center p-2 rounded bg-green-500/10">
                 <div className="text-lg font-bold text-green-400">{currentData.statusData[0].value.toLocaleString()}</div>
                 <div className="text-xs text-green-200/70">Closed</div>
               </div>
               <div className="text-center p-2 rounded bg-amber-500/10">
                 <div className="text-lg font-bold text-amber-400">{currentData.statusData[1].value.toLocaleString()}</div>
                 <div className="text-xs text-amber-200/70">Open</div>
               </div>
               <div className="text-center p-2 rounded bg-gray-500/10">
                 <div className="text-lg font-bold text-gray-400">{currentData.statusData[2].value.toLocaleString()}</div>
                 <div className="text-xs text-gray-400/70">Other</div>
               </div>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-200">
              <IconTeam /> SLA Compliance by Team Leader
            </h3>
            <SLAComplianceChart data={currentData.slaData} />
          </div>
        </section>

        {/* Main Charts Row 2 */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-200">
              <IconLocation /> Tickets by Sub-Area
            </h3>
            <SubAreaChart data={currentData.subAreaData} />
          </div>
           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-200">
              <IconResolution /> Avg Resolution Time (Hours)
            </h3>
            <ResolutionTimeChart data={currentData.resolutionData} />
          </div>
        </section>

        {/* Closure & Top Performers */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
             <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-200">
              <IconChart /> Closure Rate by Team Leader
            </h3>
            <ClosureRateChart data={currentData.closureData} />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-yellow-100">
              <IconTrophy /> Top Performers
            </h3>
            <div className="space-y-4">
              {[
                { rank: 1, name: 'اريج فايز صكبان', score: '100%', medal: '🥇', border: 'border-yellow-500/50', bg: 'bg-yellow-500/10' },
                { rank: 2, name: 'غيث محمد جمعة', score: '100%', medal: '🥈', border: 'border-gray-400/50', bg: 'bg-gray-400/10' },
                { rank: 3, name: 'محمد اسماعيل ياسين', score: '100%', medal: '🥉', border: 'border-amber-700/50', bg: 'bg-amber-700/10' }
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
                  <p className="font-semibold text-sm">طه خيري عبد</p>
                  <p className="text-red-400 text-sm font-bold">SLA: 85.88%</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quality & Age */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-200">
              <IconCalendar /> Ticket Age Analysis
            </h3>
            <TicketAgeChart data={currentData.ageData} />
            <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-cyan-900/20 p-4 rounded-lg text-center border border-cyan-500/20">
                    <p className="text-2xl font-bold text-cyan-400">{currentData.secondary.avgAge}</p>
                    <p className="text-xs text-cyan-200/70 uppercase">Avg Age (Days)</p>
                </div>
                <div className="bg-red-900/20 p-4 rounded-lg text-center border border-red-500/20">
                    <p className="text-2xl font-bold text-red-400">{currentData.secondary.oldest}</p>
                    <p className="text-xs text-red-200/70 uppercase">Oldest Ticket</p>
                </div>
            </div>
          </div>

           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-red-200">
              <IconAlert /> Data Quality Issues
            </h3>
            <DataQualityChart data={currentData.qualityData} />
             <div className="space-y-3 mt-4">
               <div className="flex justify-between items-center text-sm p-2 bg-red-500/10 rounded border border-red-500/10">
                 <span className="text-gray-300">Missing Status</span>
                 <span className="font-bold text-red-400">{currentData.qualityData[0].A.toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center text-sm p-2 bg-amber-500/10 rounded border border-amber-500/10">
                 <span className="text-gray-300">Missing Team Leader</span>
                 <span className="font-bold text-amber-400">{currentData.qualityData[1].A.toLocaleString()}</span>
               </div>
             </div>
          </div>
        </section>

        {/* Recommendations */}
        <section>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-cyan-100">
            <IconCheckList /> Recommendations & Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-red-900/30 to-red-950/30 border border-red-500/20 rounded-2xl p-6 backdrop-blur-md">
               <h3 className="text-lg font-bold text-red-300 mb-4 flex items-center gap-2"><IconAlert /> Immediate Actions</h3>
               <ul className="space-y-3 text-sm text-gray-300">
                 <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></span> Address Unassigned tickets (38.5% closure rate)</li>
                 <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></span> Investigate طه خيري عبد's SLA compliance (85.88%)</li>
                 <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></span> Resolve oldest ticket ({currentData.secondary.oldest} days)</li>
               </ul>
            </div>
             <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/30 border border-amber-500/20 rounded-2xl p-6 backdrop-blur-md">
               <h3 className="text-lg font-bold text-amber-300 mb-4 flex items-center gap-2"><IconTrending /> Performance</h3>
               <ul className="space-y-3 text-sm text-gray-300">
                 <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></span> Training for team leaders with low compliance</li>
                 <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></span> Process optimization for Tikrit ({currentData.resolutionData[0].value} hrs resolution)</li>
                 <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></span> Review ticket assignment procedures</li>
               </ul>
            </div>
             <div className="bg-gradient-to-br from-green-900/30 to-green-950/30 border border-green-500/20 rounded-2xl p-6 backdrop-blur-md">
               <h3 className="text-lg font-bold text-green-300 mb-4 flex items-center gap-2"><IconTeam /> Resource Allocation</h3>
               <ul className="space-y-3 text-sm text-gray-300">
                 <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0"></span> Additional support for Samarra ({currentData.subAreaData[0].value} tickets)</li>
                 <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0"></span> Review assignment process for Unassigned tickets</li>
                 <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0"></span> {currentData.secondary.leaders} team leaders in Samarra - highest coverage</li>
               </ul>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-white/10 py-8 mt-12 bg-black/20">
        <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
          <p>© 2024 FTTH Maintenance Analytics Dashboard. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;