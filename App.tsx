import React from 'react';
import { 
  IconLogo, IconCalendar, IconChart, IconTotal, IconSLA, IconInProgress, 
  IconResolution, IconAlert, IconTeam, IconLocation, IconTrophy, IconCheckList, IconTrending 
} from './components/Icons';
import SummaryCard from './components/SummaryCard';
import { 
  TicketStatusChart, SLAComplianceChart, SubAreaChart, 
  ResolutionTimeChart, ClosureRateChart, TicketAgeChart, DataQualityChart 
} from './components/Charts';

const App = () => {
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
                <p className="text-cyan-300 text-sm font-medium">Analytics & Performance Overview</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="bg-cyan-900/30 border border-cyan-500/30 rounded-lg px-4 py-2 flex items-center gap-3">
                <IconCalendar />
                <div className="text-left">
                  <p className="text-cyan-400 text-[10px] font-bold uppercase tracking-wider">Report Range</p>
                  <p className="text-white text-xs font-semibold">2025-10-31 to 2025-11-03</p>
                </div>
              </div>
              <div className="bg-green-900/30 border border-green-500/30 rounded-lg px-4 py-2 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-green-300 text-sm font-medium">Live Data</span>
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
            Executive Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SummaryCard 
              title="Total Tickets" 
              value="3,906" 
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
              value="96.69%" 
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
              value="542" 
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
              value="3.66 hrs" 
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
            { label: 'Closed Tickets', value: '1,725', sub: '44.2%', color: 'text-green-400' },
            { label: 'Avg Ticket Age', value: '35.5', sub: 'Days', color: 'text-blue-400' },
            { label: 'Oldest Ticket', value: '61', sub: 'Days', color: 'text-red-400' },
            { label: 'Team Leaders', value: '10', sub: 'Samarra', color: 'text-amber-400' },
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
            <TicketStatusChart />
            <div className="grid grid-cols-3 gap-2 mt-6">
               <div className="text-center p-2 rounded bg-green-500/10">
                 <div className="text-lg font-bold text-green-400">1,725</div>
                 <div className="text-xs text-green-200/70">Closed</div>
               </div>
               <div className="text-center p-2 rounded bg-amber-500/10">
                 <div className="text-lg font-bold text-amber-400">542</div>
                 <div className="text-xs text-amber-200/70">Open</div>
               </div>
               <div className="text-center p-2 rounded bg-gray-500/10">
                 <div className="text-lg font-bold text-gray-400">1,639</div>
                 <div className="text-xs text-gray-400/70">Other</div>
               </div>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-200">
              <IconTeam /> SLA Compliance by Team Leader
            </h3>
            <SLAComplianceChart />
          </div>
        </section>

        {/* Main Charts Row 2 */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-200">
              <IconLocation /> Tickets by Sub-Area
            </h3>
            <SubAreaChart />
          </div>
           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-200">
              <IconResolution /> Avg Resolution Time (Hours)
            </h3>
            <ResolutionTimeChart />
          </div>
        </section>

        {/* Closure & Top Performers */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
             <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-200">
              <IconChart /> Closure Rate by Team Leader
            </h3>
            <ClosureRateChart />
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
            <TicketAgeChart />
            <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-cyan-900/20 p-4 rounded-lg text-center border border-cyan-500/20">
                    <p className="text-2xl font-bold text-cyan-400">35.5</p>
                    <p className="text-xs text-cyan-200/70 uppercase">Avg Age (Days)</p>
                </div>
                <div className="bg-red-900/20 p-4 rounded-lg text-center border border-red-500/20">
                    <p className="text-2xl font-bold text-red-400">61</p>
                    <p className="text-xs text-red-200/70 uppercase">Oldest Ticket</p>
                </div>
            </div>
          </div>

           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-red-200">
              <IconAlert /> Data Quality Issues
            </h3>
            <DataQualityChart />
             <div className="space-y-3 mt-4">
               <div className="flex justify-between items-center text-sm p-2 bg-red-500/10 rounded border border-red-500/10">
                 <span className="text-gray-300">Missing Status</span>
                 <span className="font-bold text-red-400">1,673</span>
               </div>
               <div className="flex justify-between items-center text-sm p-2 bg-amber-500/10 rounded border border-amber-500/10">
                 <span className="text-gray-300">Missing Team Leader</span>
                 <span className="font-bold text-amber-400">1,452</span>
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
                 <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></span> Resolve oldest ticket (61 days)</li>
               </ul>
            </div>
             <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/30 border border-amber-500/20 rounded-2xl p-6 backdrop-blur-md">
               <h3 className="text-lg font-bold text-amber-300 mb-4 flex items-center gap-2"><IconTrending /> Performance</h3>
               <ul className="space-y-3 text-sm text-gray-300">
                 <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></span> Training for team leaders with low compliance</li>
                 <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></span> Process optimization for Tikrit (61.46 hrs resolution)</li>
                 <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></span> Review ticket assignment procedures</li>
               </ul>
            </div>
             <div className="bg-gradient-to-br from-green-900/30 to-green-950/30 border border-green-500/20 rounded-2xl p-6 backdrop-blur-md">
               <h3 className="text-lg font-bold text-green-300 mb-4 flex items-center gap-2"><IconTeam /> Resource Allocation</h3>
               <ul className="space-y-3 text-sm text-gray-300">
                 <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0"></span> Additional support for Samarra (1,201 tickets)</li>
                 <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0"></span> Review assignment process for Unassigned tickets</li>
                 <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0"></span> 10 team leaders in Samarra - highest coverage</li>
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