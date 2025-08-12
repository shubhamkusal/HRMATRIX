import React from 'react';
import PageHeader from '../ui/PageHeader';
import EmptyState from '../ui/EmptyState';

const Reports = () => {
  return (
    <div className="p-6">
      <PageHeader
        title="Reports"
        description="Generate and view various HR reports."
      />
      <EmptyState
        title="Reporting"
        message="This feature is under construction. Check back soon!"
      />
    </div>
  );
};

export default Reports;
