import React from 'react';

const PageHeader = ({ title, description, children }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {description && <p className="text-gray-600 mt-2">{description}</p>}
      </div>
      <div className="flex items-center space-x-3 mt-4 sm:mt-0">
        {children}
      </div>
    </div>
  );
};

export default PageHeader;
