import React from 'react';
import StatsWidget from './stats-widget';
import ChartWidget from './chart-widget';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsWidget title="Total Users" value="1,234" />
        <StatsWidget title="Revenue" value="$12,345" />
        <StatsWidget title="Active Projects" value="42" />
      </div>
      <div className="mt-8">
        <ChartWidget />
      </div>
    </div>
  );
};

export default Dashboard;