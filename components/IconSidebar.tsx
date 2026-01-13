import React from 'react';

const IconSidebar: React.FC = () => {
  return (
    <aside className="w-20 h-full bg-brand-dark flex flex-col items-center py-6 flex-shrink-0 z-20">
      {/* Top Toggle Icon */}
      <div className="mb-8">
        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600/20 text-blue-500 hover:bg-blue-600/30 transition-colors">
          <i className="fas fa-chevron-right text-white text-lg"></i>
        </button>
      </div>

      {/* Navigation Icons */}
      <div className="flex-1 flex flex-col gap-6 w-full items-center">
        <button className="w-10 h-10 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
          <i className="fas fa-chart-bar text-white text-xl"></i>
        </button>
        
        <button className="w-10 h-10 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity relative">
          <i className="fas fa-map text-white text-xl"></i>
          {/* Notification Dot */}
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-brand-dark"></span>
        </button>

        <button className="w-10 h-10 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
          <i className="fas fa-robot text-white text-xl"></i>
        </button>
        
        <button className="w-10 h-10 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
          <i className="fas fa-box text-white text-xl"></i>
        </button>
      </div>

      {/* User Avatar Bottom */}
      <div className="mt-auto mb-2">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white/20 shadow-lg cursor-pointer hover:border-white transition-all">
          LL
        </div>
      </div>
    </aside>
  );
};

export default IconSidebar;