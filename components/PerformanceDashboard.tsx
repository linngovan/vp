import React from 'react';
import { PerformanceMetric } from '../types';

const mockMetrics: PerformanceMetric[] = [
  { vendorId: '1', vendorName: 'Vendor Aura (HCM)', outboundOtp: 98.2, inboundOtp: 99.5, avgProcessingTime: 1.2, returnTat: 22, backlog: 45, status: 'Healthy' },
  { vendorId: '2', vendorName: 'Vendor Teraco (HN)', outboundOtp: 94.5, inboundOtp: 96.0, avgProcessingTime: 3.5, returnTat: 48, backlog: 120, status: 'Critical' },
  { vendorId: '3', vendorName: 'FlexiChain Node 1', outboundOtp: 99.1, inboundOtp: 99.8, avgProcessingTime: 0.8, returnTat: 18, backlog: 12, status: 'Healthy' },
  { vendorId: '4', vendorName: 'SaoViet Logistics', outboundOtp: 96.8, inboundOtp: 97.2, avgProcessingTime: 2.1, returnTat: 26, backlog: 55, status: 'Warning' },
];

const MetricCard: React.FC<{ title: string; value: string; trend: string; trendUp: boolean; icon: string; color: string }> = ({ title, value, trend, trendUp, icon, color }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-transparent hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${color}`}>
        <i className={`fas ${icon} text-lg`}></i>
      </div>
      <div className={`px-2 py-1 rounded-md text-xs font-bold ${trendUp ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
        {trend}
      </div>
    </div>
    <div className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-1">{title}</div>
    <div className="text-2xl font-bold text-brand-dark">{value}</div>
  </div>
);

const PerformanceDashboard: React.FC = () => {
  return (
    <main className="flex-1 h-full overflow-y-auto bg-brand-light flex flex-col relative">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 bg-transparent z-10">
        <div>
           <span className="text-gray-500 text-sm md:hidden mb-1 block">Monitoring</span>
           <h1 className="text-2xl font-bold text-brand-dark">Performance Monitor</h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">
          <i className="fas fa-circle text-red-500 text-[6px] mr-1"></i>
          <span>Home</span>
          <span>/</span>
          <span className="text-gray-800 font-medium">Performance</span>
        </div>
      </header>

      <div className="px-4 md:px-8 pb-8 flex-1 max-w-7xl mx-auto w-full">
        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <MetricCard 
            title="Avg Outbound OTP" 
            value="97.8%" 
            trend="+2.4%" 
            trendUp={true} 
            icon="fa-box-open"
            color="bg-brand-purple"
          />
          <MetricCard 
            title="Avg Inbound OTP" 
            value="98.2%" 
            trend="+1.1%" 
            trendUp={true} 
            icon="fa-dolly"
            color="bg-blue-500"
          />
          <MetricCard 
            title="Avg Return TAT" 
            value="26.5h" 
            trend="-2.5h" 
            trendUp={false} // False here is actually bad in context, but visually red is simpler for 'down'
            icon="fa-undo"
            color="bg-orange-500"
          />
          <MetricCard 
            title="Total Backlog" 
            value="232" 
            trend="+12" 
            trendUp={false} 
            icon="fa-exclamation-triangle"
            color="bg-red-500"
          />
        </div>

        {/* Charts & Breakdown Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Chart 1: Volume Trend */}
          <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-brand-dark text-lg">Weekly Volume Trend</h3>
              <button className="text-brand-purple bg-brand-light px-3 py-1 rounded-lg text-xs font-bold hover:bg-purple-100">Last 7 Days</button>
            </div>
            {/* Simple SVG Line Chart */}
            <div className="h-64 w-full relative">
               <svg viewBox="0 0 800 200" className="w-full h-full overflow-visible">
                 {/* Grid lines */}
                 <line x1="0" y1="0" x2="800" y2="0" stroke="#f3f4f6" strokeWidth="1" />
                 <line x1="0" y1="50" x2="800" y2="50" stroke="#f3f4f6" strokeWidth="1" />
                 <line x1="0" y1="100" x2="800" y2="100" stroke="#f3f4f6" strokeWidth="1" />
                 <line x1="0" y1="150" x2="800" y2="150" stroke="#f3f4f6" strokeWidth="1" />
                 
                 {/* Data Line */}
                 <path 
                   d="M0,150 Q100,100 133,120 T266,80 T400,60 T533,90 T666,40 T800,20" 
                   fill="none" 
                   stroke="#4318ff" 
                   strokeWidth="4"
                   strokeLinecap="round"
                 />
                 {/* Area under curve (optional gradient effect simulated with opacity) */}
                 <path 
                   d="M0,150 Q100,100 133,120 T266,80 T400,60 T533,90 T666,40 T800,20 V200 H0 Z" 
                   fill="#4318ff" 
                   opacity="0.1" 
                 />
                 
                 {/* Points */}
                 <circle cx="0" cy="150" r="4" fill="white" stroke="#4318ff" strokeWidth="3" />
                 <circle cx="133" cy="120" r="4" fill="white" stroke="#4318ff" strokeWidth="3" />
                 <circle cx="266" cy="80" r="4" fill="white" stroke="#4318ff" strokeWidth="3" />
                 <circle cx="400" cy="60" r="4" fill="white" stroke="#4318ff" strokeWidth="3" />
                 <circle cx="533" cy="90" r="4" fill="white" stroke="#4318ff" strokeWidth="3" />
                 <circle cx="666" cy="40" r="4" fill="white" stroke="#4318ff" strokeWidth="3" />
                 <circle cx="800" cy="20" r="4" fill="white" stroke="#4318ff" strokeWidth="3" />
               </svg>
               <div className="flex justify-between text-xs text-gray-400 mt-2">
                 <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
               </div>
            </div>
          </div>

          {/* Chart 2: Top Issues */}
          <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col">
            <h3 className="font-bold text-brand-dark text-lg mb-6">SLA Breaches Breakdown</h3>
            <div className="flex-1 flex flex-col justify-center gap-6">
                {/* Custom Progress Bars */}
                <div>
                   <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-600">Late Pickups</span>
                      <span className="font-bold text-brand-dark">45%</span>
                   </div>
                   <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '45%'}}></div>
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-600">Inventory Missing</span>
                      <span className="font-bold text-brand-dark">25%</span>
                   </div>
                   <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-brand-purple h-2 rounded-full" style={{width: '25%'}}></div>
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-600">Damaged</span>
                      <span className="font-bold text-brand-dark">15%</span>
                   </div>
                   <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-orange-400 h-2 rounded-full" style={{width: '15%'}}></div>
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-600">Wrong Label</span>
                      <span className="font-bold text-brand-dark">10%</span>
                   </div>
                   <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-red-400 h-2 rounded-full" style={{width: '10%'}}></div>
                   </div>
                </div>
            </div>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-brand-dark text-lg">Vendor Performance Report</h3>
                <button className="text-gray-400 hover:text-brand-purple"><i className="fas fa-download"></i></button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Vendor Name</th>
                            <th className="px-6 py-4">Outbound OTP</th>
                            <th className="px-6 py-4">Inbound OTP</th>
                            <th className="px-6 py-4">Return TAT</th>
                            <th className="px-6 py-4">Backlog</th>
                            <th className="px-6 py-4 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {mockMetrics.map((m, i) => (
                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-brand-dark">{m.vendorName}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                            <div 
                                                className={`h-1.5 rounded-full ${m.outboundOtp > 98 ? 'bg-green-500' : m.outboundOtp > 95 ? 'bg-orange-400' : 'bg-red-500'}`} 
                                                style={{width: `${m.outboundOtp}%`}}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-medium">{m.outboundOtp}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-700">{m.inboundOtp}%</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{m.returnTat} hrs</td>
                                <td className="px-6 py-4 text-sm font-bold text-brand-dark">{m.backlog}</td>
                                <td className="px-6 py-4 text-right">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                        m.status === 'Healthy' ? 'bg-green-100 text-green-800' :
                                        m.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {m.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

      </div>
    </main>
  );
};

export default PerformanceDashboard;