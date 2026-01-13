import React, { useState, useMemo } from 'react';
import { AllocationRule, PerformanceMetric, RoutingConfig } from '../types';

// --- MOCK DATA ---
const mockRules: AllocationRule[] = [
  {
    id: 'r1',
    partner: 'ghnbulky',
    city_id: 'SGN',
    group_service: 'WAREHOUSE',
    enabled: true,
    index: 3,
    seller: '84933479619',
    seller_name: 'okmua.com.vn',
    type: 'seller_phone',
    vendor_id: 'aura',
    weight: { from: 20 }
  },
  {
    id: 'r2',
    partner: 'ghnbulky',
    city_id: 'SGN',
    group_service: 'WAREHOUSE',
    enabled: true,
    index: 1, // Lower index usually means higher static priority
    vendor_id: 'flexichain',
    weight: { from: 0 }
  },
  {
    id: 'r3',
    partner: 'ghnbulky',
    city_id: 'HAN',
    group_service: 'WAREHOUSE',
    enabled: true,
    index: 2,
    vendor_id: 'teraco',
    weight: { from: 0 }
  }
];

// Reusing metrics from PerformanceDashboard context
const mockMetrics: Record<string, PerformanceMetric> = {
  'aura': { vendorId: '1', vendorName: 'Vendor Aura (HCM)', outboundOtp: 98.2, inboundOtp: 99.5, avgProcessingTime: 1.2, returnTat: 22, backlog: 45, status: 'Healthy' },
  'teraco': { vendorId: '2', vendorName: 'Vendor Teraco (HN)', outboundOtp: 94.5, inboundOtp: 96.0, avgProcessingTime: 3.5, returnTat: 48, backlog: 120, status: 'Critical' },
  'flexichain': { vendorId: '3', vendorName: 'FlexiChain Node 1', outboundOtp: 95.1, inboundOtp: 99.8, avgProcessingTime: 0.8, returnTat: 18, backlog: 80, status: 'Warning' },
};

// --- COMPONENT ---

const SmartRouting: React.FC = () => {
  // State for Configuration
  const [config, setConfig] = useState<RoutingConfig>({
    weightOtp: 8,
    weightBacklog: 6,
    weightStatic: 2,
    backlogThreshold: 100
  });

  // State for Simulation Input
  const [simCity, setSimCity] = useState('SGN');
  const [simWeight, setSimWeight] = useState(25);
  const [simSeller, setSimSeller] = useState('84933479619');

  // --- LOGIC ENGINE ---
  const simulationResults = useMemo(() => {
    // 1. Hard Constraint Filter
    const eligibleRules = mockRules.filter(rule => {
      if (!rule.enabled) return false;
      if (rule.city_id !== simCity) return false;
      
      // Weight Check
      if (rule.weight?.from && simWeight < rule.weight.from) return false;
      if (rule.weight?.to && simWeight > rule.weight.to) return false;

      // Seller Check (If rule has seller, input must match. If rule has no seller, it applies to all)
      if (rule.seller && rule.seller !== simSeller) return false;

      return true;
    });

    // 2. Score Calculation
    const scoredVendors = eligibleRules.map(rule => {
      const metric = mockMetrics[rule.vendor_id];
      if (!metric) return { rule, score: -1, details: 'No Metrics' };

      // Circuit Breaker
      if (metric.backlog > config.backlogThreshold) {
        return { rule, metric, score: -999, details: 'Circuit Breaker: Backlog Exceeded', isBreach: true };
      }

      // Normal Scoring
      // Score = (OTP * W_OTP) - (Backlog/10 * W_Backlog) + ((10-Index) * W_Static)
      // Normalize OTP to 0-10 scale usually, but here we keep 0-100 and adjust weight
      
      const scoreOtp = (metric.outboundOtp - 90) * config.weightOtp; // Reward > 90%
      const scoreBacklog = (metric.backlog / 10) * config.weightBacklog; // Penalty per 10 orders
      const scoreStatic = (5 - rule.index) * config.weightStatic * 5; // Reward low index (high priority)

      const totalScore = 100 + scoreOtp - scoreBacklog + scoreStatic;

      return {
        rule,
        metric,
        score: parseFloat(totalScore.toFixed(1)),
        breakdown: { scoreOtp, scoreBacklog, scoreStatic },
        details: 'Active',
        isBreach: false
      };
    });

    // 3. Sort by Score
    return scoredVendors.sort((a, b) => b.score - a.score);

  }, [config, simCity, simWeight, simSeller]);

  return (
    <main className="flex-1 h-full overflow-y-auto bg-brand-light flex flex-col relative">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 bg-transparent z-10">
        <div>
           <span className="text-gray-500 text-sm md:hidden mb-1 block">Operation Config</span>
           <h1 className="text-2xl font-bold text-brand-dark">Smart Routing Engine</h1>
        </div>
      </header>

      <div className="px-4 md:px-8 pb-8 flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Configuration */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-brand-dark text-lg mb-1">Routing Weights</h3>
            <p className="text-xs text-gray-500 mb-6">Adjust how the algorithm prioritizes vendors.</p>
            
            <div className="space-y-6">
              {/* OTP Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-bold text-gray-700">Performance (OTP)</label>
                  <span className="text-sm font-bold text-brand-purple">{config.weightOtp}/10</span>
                </div>
                <input 
                  type="range" min="0" max="10" step="1" 
                  value={config.weightOtp}
                  onChange={(e) => setConfig({...config, weightOtp: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-purple"
                />
                <p className="text-xs text-gray-400 mt-1">Higher weight prioritizes vendors with high OTP.</p>
              </div>

              {/* Backlog Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-bold text-gray-700">Load Balancing (Backlog)</label>
                  <span className="text-sm font-bold text-red-500">{config.weightBacklog}/10</span>
                </div>
                <input 
                  type="range" min="0" max="10" step="1" 
                  value={config.weightBacklog}
                  onChange={(e) => setConfig({...config, weightBacklog: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
                <p className="text-xs text-gray-400 mt-1">Higher weight penalizes vendors with backlog.</p>
              </div>

              {/* Static Index Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-bold text-gray-700">Static Priority (Index)</label>
                  <span className="text-sm font-bold text-gray-500">{config.weightStatic}/10</span>
                </div>
                <input 
                  type="range" min="0" max="10" step="1" 
                  value={config.weightStatic}
                  onChange={(e) => setConfig({...config, weightStatic: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-500"
                />
                <p className="text-xs text-gray-400 mt-1">Respect the manual 'index' in JSON config.</p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                 <div className="flex justify-between mb-2">
                  <label className="text-sm font-bold text-red-600">Circuit Breaker (Max Backlog)</label>
                  <span className="text-sm font-bold text-red-600">{config.backlogThreshold} orders</span>
                </div>
                <input 
                  type="number" 
                  value={config.backlogThreshold}
                  onChange={(e) => setConfig({...config, backlogThreshold: parseInt(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-brand-purple"
                />
                <p className="text-xs text-gray-400 mt-1">Vendors exceeding this backlog are automatically skipped.</p>
              </div>
            </div>
          </div>

          {/* Raw Rule Viewer (Mini) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm overflow-hidden">
             <h3 className="font-bold text-brand-dark text-md mb-4">Active Rules (JSON)</h3>
             <div className="bg-gray-50 rounded-lg p-3 overflow-x-auto">
               <pre className="text-[10px] text-gray-600 leading-relaxed">
                 {JSON.stringify(mockRules.map(r => ({...r, id: undefined})), null, 2)}
               </pre>
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Simulation */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Simulation Inputs */}
          <div className="bg-brand-dark rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
            <h2 className="text-xl font-bold mb-6 relative z-10"><i className="fas fa-vial mr-2"></i>Routing Simulator</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
              <div>
                <label className="text-xs font-bold text-gray-300 uppercase block mb-2">City ID</label>
                <select 
                  value={simCity} 
                  onChange={(e) => setSimCity(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-sm focus:outline-none focus:bg-white/20 transition-colors"
                >
                  <option value="SGN" className="text-brand-dark">SGN (Ho Chi Minh)</option>
                  <option value="HAN" className="text-brand-dark">HAN (Ha Noi)</option>
                </select>
              </div>
              
              <div>
                <label className="text-xs font-bold text-gray-300 uppercase block mb-2">Order Weight (kg)</label>
                <input 
                  type="number" 
                  value={simWeight}
                  onChange={(e) => setSimWeight(parseInt(e.target.value))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-sm focus:outline-none focus:bg-white/20 transition-colors"
                />
              </div>

               <div>
                <label className="text-xs font-bold text-gray-300 uppercase block mb-2">Seller ID / Phone</label>
                <input 
                  type="text" 
                  value={simSeller}
                  onChange={(e) => setSimSeller(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-sm focus:outline-none focus:bg-white/20 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Simulation Results */}
          <div className="bg-white rounded-2xl p-6 shadow-sm flex-1">
             <h3 className="font-bold text-brand-dark text-lg mb-4">Allocation Result</h3>
             
             {simulationResults.length === 0 ? (
               <div className="text-center py-12 text-gray-400">
                 <i className="fas fa-search mb-3 text-2xl"></i>
                 <p>No vendors match the hard constraints (City, Weight, Seller).</p>
               </div>
             ) : (
               <div className="space-y-3">
                 {simulationResults.map((res, idx) => (
                   <div 
                    key={res.rule.vendor_id}
                    className={`relative border rounded-xl p-4 transition-all ${
                      idx === 0 && !res.isBreach
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-md transform scale-[1.01]' 
                        : res.isBreach
                          ? 'border-red-200 bg-red-50 opacity-75'
                          : 'border-gray-200 hover:border-brand-purple'
                    }`}
                   >
                     {/* Winner Badge */}
                     {idx === 0 && !res.isBreach && (
                       <div className="absolute -top-3 -right-3 bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                         <i className="fas fa-check"></i>
                       </div>
                     )}

                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        {/* Left: Info */}
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-brand-dark text-lg">{res.metric?.vendorName || res.rule.vendor_id}</h4>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Idx: {res.rule.index}</span>
                            {res.isBreach && <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded font-bold">CIRCUIT BREAKER</span>}
                          </div>
                          
                          <div className="flex gap-4 mt-2 text-sm text-gray-500">
                             <span className={res.metric && res.metric.outboundOtp > 98 ? "text-emerald-600 font-medium" : ""}>
                               <i className="fas fa-clock mr-1"></i>OTP: {res.metric?.outboundOtp}%
                             </span>
                             <span className={res.metric && res.metric.backlog > 80 ? "text-red-600 font-bold" : ""}>
                               <i className="fas fa-boxes mr-1"></i>Backlog: {res.metric?.backlog}
                             </span>
                          </div>
                        </div>

                        {/* Right: Score */}
                        <div className="text-right">
                           <div className="text-3xl font-bold text-brand-dark">{res.score}</div>
                           <div className="text-xs font-bold text-gray-400 uppercase">Fitness Score</div>
                        </div>
                     </div>

                     {/* Score Breakdown Bar (Visual Debugging) */}
                     {!res.isBreach && res.breakdown && (
                       <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-3 gap-2 text-[10px]">
                          <div className="text-center">
                            <div className="text-gray-400 mb-1">OTP Bonus</div>
                            <div className="font-bold text-emerald-600">+{res.breakdown.scoreOtp.toFixed(1)}</div>
                          </div>
                          <div className="text-center border-l border-gray-100">
                            <div className="text-gray-400 mb-1">Backlog Penalty</div>
                            <div className="font-bold text-red-500">-{res.breakdown.scoreBacklog.toFixed(1)}</div>
                          </div>
                           <div className="text-center border-l border-gray-100">
                            <div className="text-gray-400 mb-1">Priority Bonus</div>
                            <div className="font-bold text-blue-500">+{res.breakdown.scoreStatic.toFixed(1)}</div>
                          </div>
                       </div>
                     )}
                   </div>
                 ))}
               </div>
             )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SmartRouting;