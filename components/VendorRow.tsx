import React from 'react';
import { Vendor } from '../types';

interface VendorRowProps {
  vendor: Vendor;
}

const VendorRow: React.FC<VendorRowProps> = ({ vendor }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-transparent hover:border-brand-light p-6 mb-4 grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-4 items-start transition-all hover:shadow-md">
      {/* Vendor Details */}
      <div className="col-span-1 xl:col-span-3">
        <div className="flex flex-row xl:flex-col items-center xl:items-start justify-between xl:justify-start">
            <h3 className="font-bold text-brand-dark text-lg">{vendor.name}</h3>
            <span className="xl:mt-2 px-3 py-1 bg-purple-50 text-brand-purple text-xs font-bold rounded-md uppercase tracking-wide">
            # {vendor.tag}
            </span>
        </div>
      </div>

      {/* Transit Vendors */}
      <div className="col-span-1 xl:col-span-3">
        <div className="xl:hidden text-xs font-bold text-gray-400 mb-2 uppercase">Transit Vendors</div>
        <div className="flex flex-wrap gap-2">
          {vendor.transitVendors.map((tv, idx) => (
            <span key={idx} className="px-2.5 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded shadow-sm">
              {tv}
            </span>
          ))}
        </div>
      </div>

      {/* Warehouse IDs */}
      <div className="col-span-1 xl:col-span-4">
        <div className="xl:hidden text-xs font-bold text-gray-400 mb-2 uppercase">Warehouse IDs</div>
        <div className="flex flex-wrap gap-2">
          {vendor.warehouseIds.map((wh, idx) => (
            <span key={idx} className="px-2.5 py-1 bg-orange-400 text-white text-[10px] font-bold rounded shadow-sm">
              {wh}
            </span>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="col-span-1 xl:col-span-2 flex justify-start xl:justify-end items-center h-full pt-2 xl:pt-0">
        <button 
          className={`text-white text-xs font-bold pl-3 pr-1 py-1 rounded-full flex items-center gap-2 transition-transform hover:scale-105 ${
            vendor.status === 'ENABLED' ? 'bg-emerald-500' : 'bg-red-500'
          }`}
        >
          {vendor.status}
          <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
        </button>
      </div>
    </div>
  );
};

export default VendorRow;