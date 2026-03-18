import React from 'react';

const LoadingSpinner = ({ size = 'medium', fullScreen = false, text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'h-6 w-6 border-2',
    medium: 'h-12 w-12 border-3',
    large: 'h-16 w-16 border-4',
    xlarge: 'h-20 w-20 border-4',
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    xlarge: 'text-xl',
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
        <div className={`${sizeClasses[size]} rounded-full border-t-transparent border-[#00d4ff] animate-spin`}></div>
        <p className={`mt-4 text-[#00d4ff] font-medium ${textSizes[size]}`}>{text}</p>
        <p className="text-gray-400 text-sm mt-2">Please wait while we process your request</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className={`${sizeClasses[size]} rounded-full border-t-transparent border-[#00d4ff] animate-spin`}></div>
      {text && <p className={`mt-3 text-[#00d4ff] font-medium ${textSizes[size]}`}>{text}</p>}
    </div>
  );
};

// Card Loading Skeleton
export const CardSkeleton = ({ count = 1 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-[#1e293b] rounded-xl p-5 animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <div className="h-10 w-10 bg-gray-700 rounded-lg"></div>
            <div className="h-6 w-20 bg-gray-700 rounded-full"></div>
          </div>
          <div className="h-4 w-3/4 bg-gray-700 rounded mb-3"></div>
          <div className="h-3 w-1/2 bg-gray-700 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 w-full bg-gray-700 rounded"></div>
            <div className="h-3 w-5/6 bg-gray-700 rounded"></div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-800">
            <div className="h-8 w-full bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Table Loading Skeleton
export const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, index) => (
              <th key={index} className="px-6 py-3">
                <div className="h-4 w-24 bg-gray-700 rounded"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-800">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  <div className={`h-3 ${colIndex === columns - 1 ? 'w-16' : 'w-32'} bg-gray-700 rounded`}></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Progress Bar Loader
export const ProgressLoader = ({ progress, label = 'Processing...' }) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-[#00d4ff]">{label}</span>
        <span className="text-gray-400">{progress}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;