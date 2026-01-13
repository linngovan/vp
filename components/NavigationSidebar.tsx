import React from 'react';
import { NavItem, PageType } from '../types';

const menuItems: NavItem[] = [
  { id: 'PERFORMANCE', icon: 'fa-chart-pie', label: 'Performance Monitor' },
  { id: 'ROUTING', icon: 'fa-network-wired', label: 'Smart Routing Engine', count: 1 },
  { id: 'CONFIG', icon: 'fa-truck', label: 'Warehouse Vendors' },
  { id: 'MOBILE', icon: 'fa-mobile-alt', label: 'Seller Mobile Config', count: 12 },
  { id: 'POLYGON', icon: 'fa-map-marker-alt', label: 'Polygon Locations', count: 8 },
  { id: 'HUBS', icon: 'fa-warehouse', label: 'Warehouse hubs' },
  { id: 'USERS', icon: 'fa-users', label: 'User Management', count: 12 },
];

interface NavigationSidebarProps {
  activePage: PageType;
  onNavigate: (page: PageType) => void;
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({ activePage, onNavigate }) => {
  // Helper to determine active state
  const isActive = (itemId: string) => {
    return itemId === activePage;
  };

  return (
    <aside className="h-full bg-white border-r border-gray-200 flex flex-col flex-shrink-0 w-72 shadow-sm z-10 hidden md:flex">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800 tracking-tight">Operation Config</h2>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto px-4 space-y-2 hide-scrollbar">
        {menuItems.map((item) => {
          const active = isActive(item.id);
          // Only allow navigation to pages we have implemented
          const isImplemented = ['PERFORMANCE', 'CONFIG', 'ROUTING'].includes(item.id);
          
          return (
            <button
              key={item.id}
              onClick={() => isImplemented && onNavigate(item.id as PageType)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group text-left ${
                active
                  ? 'active-gradient text-white shadow-lg shadow-indigo-500/30'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-brand-purple'
              } ${!isImplemented ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-6 flex justify-center ${active ? 'text-white' : 'text-gray-400 group-hover:text-brand-purple'}`}>
                   <i className={`fas ${item.icon} text-lg`}></i>
                </div>
                <span className={`font-medium text-sm ${active ? 'font-semibold' : ''}`}>{item.label}</span>
              </div>
              {item.count !== undefined && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  active 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Widgets */}
      <div className="p-4 grid grid-cols-2 gap-3 mt-auto border-t border-gray-100 bg-white">
        <div className="bg-gray-50 rounded-2xl p-3 flex flex-col items-center justify-center text-center h-24 hover:bg-gray-100 transition-colors cursor-pointer">
          <span className="text-2xl font-bold text-gray-800">45</span>
          <span className="text-[10px] uppercase font-bold text-gray-400 mt-1 tracking-wider">Total Rules</span>
        </div>
        <div className="bg-gray-50 rounded-2xl p-3 flex flex-col items-center justify-center text-center h-24 hover:bg-gray-100 transition-colors cursor-pointer">
          <span className="text-2xl font-bold text-gray-800">12</span>
          <span className="text-[10px] uppercase font-bold text-gray-400 mt-1 tracking-wider">Partners</span>
        </div>
      </div>
    </aside>
  );
};

export default NavigationSidebar;