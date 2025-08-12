import React from 'react';
import { Inbox } from 'lucide-react';

const EmptyState = ({ title, message, children }) => {
  return (
    <div className="text-center bg-white p-12 rounded-lg border-2 border-dashed border-gray-200">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
        <Inbox className="h-6 w-6 text-gray-400" />
      </div>
      <h3 className="mt-5 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{message}</p>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
};

export default EmptyState;
