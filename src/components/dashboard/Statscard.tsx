import React from 'react';
import { StatsCardProps } from '@/types';

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  trend,
}) => {
  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-500',
  };

  const trendIcons = {
    up: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
    down: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"
        />
      </svg>
    ),
    neutral: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 12h14"
        />
      </svg>
    ),
  };

  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <div className="mt-2">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        {change !== undefined && trend && (
          <div className={`flex items-center mt-1 ${trendColors[trend]}`}>
            {trendIcons[trend]}
            <span className="text-sm ml-1">
              {change}% {trend === 'up' ? 'increase' : trend === 'down' ? 'decrease' : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;