import React from 'react';
import StatCard from './StatCard';
import VendorRow from './VendorRow';
import { Vendor } from '../types';

const vendors: Vendor[] = [
  {
    id: '1',
    name: 'Vendor Aura',
    tag: 'aura',
    transitVendors: ['AMILO', 'FLEXICHAIN', 'FLEXICHAIN_SGN', 'SAOVIET', 'DUCLONG_SGN'],
    warehouseIds: ['WH_185', 'WH_SS7_PHAN_VAN_TRI', 'WH_M14_LAZADA', 'WH_NGUYEN_THI_SANG'],
    status: 'ENABLED',
  },
  {
    id: '2',
    name: 'Vendor Teraco',
    tag: 'teraco',
    transitVendors: ['DANGMINH', 'CARESHIP'],
    warehouseIds: ['WH_HUB_THANH_TRI'],
    status: 'ENABLED',
  },
];

const Dashboard: React.FC = () => {
  return (
    <main className="flex-1 h-full overflow-y-auto bg-brand-light flex flex-col relative">
      {/* Top Header */}
      <header className="flex items-center justify-between px-8 py-6 bg-transparent z-10">
        <div>
           <span className="text-gray-500 text-sm md:hidden mb-1 block">Operation Config</span>
           <h1 className="text-2xl font-bold text-brand-dark">Ops Configuration</h1>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">
          <i className="fas fa-circle text-red-500 text-[6px] mr-1"></i>
          <span>Home</span>
          <span>/</span>
          <span className="text-gray-800 font-medium">Ops Configuration</span>
        </div>
      </header>

      {/* Content Body */}
      <div className="px-4 md:px-8 pb-8 flex-1 max-w-7xl mx-auto w-full">
        {/* Page Title Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-brand-dark mb-1">Warehouse Vendor Management</h2>
          <p className="text-brand-secondary">Manage and monitor all warehouse vendors</p>
        </div>

        {/* Stats Cards Row */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatCard 
            icon="fa-truck" 
            value={11} 
            label="Active Vendors" 
            subLabel="out of 11 total vendors" 
          />
          <StatCard 
            icon="fa-link" 
            value={33} 
            label="Transit Connections" 
            subLabel="total transit relationships" 
          />
        </section>

        {/* Action Button Row */}
        <div className="flex justify-end mb-6">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all active:scale-95">
            <i className="fas fa-plus"></i>
            Create New Vendor
          </button>
        </div>

        {/* Data Table Section */}
        <section className="w-full">
          {/* Table Header (Visual only, aligned with grid) */}
          <div className="hidden xl:grid grid-cols-12 gap-4 px-6 mb-3 text-sm font-bold text-gray-500 uppercase tracking-wider">
            <div className="col-span-3">Vendor Details</div>
            <div className="col-span-3">Transit Vendors</div>
            <div className="col-span-4">Warehouse IDs</div>
            <div className="col-span-2 text-right">Status</div>
          </div>

          {/* Rows */}
          <div className="space-y-4">
            {vendors.map((vendor) => (
              <VendorRow key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;