import React from 'react';

const Loader: React.FC = () => {
  return (
    <div
      className="flex items-center justify-center h-96"
      role="status"
      aria-label="Loading"
    >
      <div className="ease-linear rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500 h-12 w-12 animate-spin"></div>
    </div>
  );
};

export default Loader;