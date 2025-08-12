import React from 'react';
import PageHeader from '../ui/PageHeader';
import EmptyState from '../ui/EmptyState';

const Analytics = () => {
  return (
    <div className="p-6">
      <PageHeader
        title="Analytics"
        description="Visualize and analyze HR data and metrics."
      />
      <EmptyState
        title="HR Analytics"
        message="This feature is under construction. Check back soon!"
      />
    </div>
  );
};

export default Analytics;
