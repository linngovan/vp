import React, { useState } from 'react';
import IconSidebar from './components/IconSidebar';
import NavigationSidebar from './components/NavigationSidebar';
import Dashboard from './components/Dashboard';
import PerformanceDashboard from './components/PerformanceDashboard';
import SmartRouting from './components/SmartRouting';
import { PageType } from './types';

function App() {
  const [activePage, setActivePage] = useState<PageType>('ROUTING');

  return (
    <div className="flex h-screen overflow-hidden bg-brand-light">
      <IconSidebar />
      <NavigationSidebar activePage={activePage} onNavigate={setActivePage} />
      
      {activePage === 'CONFIG' && <Dashboard />}
      {activePage === 'PERFORMANCE' && <PerformanceDashboard />}
      {activePage === 'ROUTING' && <SmartRouting />}
    </div>
  );
}

export default App;