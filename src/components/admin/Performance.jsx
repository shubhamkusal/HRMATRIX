import React from 'react';
import PageHeader from '../ui/PageHeader';
import EmptyState from '../ui/EmptyState';

const Performance = () => {
  return (
    <div className="p-6">
      <PageHeader
        title="Performance"
        description="Track employee performance, reviews, and goals."
      />
      <EmptyState
        title="Performance Management"
        message="This feature is under construction. Check back soon!"
      />
    </div>
  );
};

export default Performance;
