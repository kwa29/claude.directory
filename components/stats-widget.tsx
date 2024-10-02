import React from 'react';

interface StatsWidgetProps {
  title: string;
  value: string;
}

const StatsWidget: React.FC<StatsWidgetProps> = ({ title, value }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-3xl font-bold text-indigo-600">{value}</p>
    </div>
  );
};

export default StatsWidget;