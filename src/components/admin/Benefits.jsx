import React from 'react';
import PageHeader from '../ui/PageHeader';
import EmptyState from '../ui/EmptyState';

const Benefits = () => {
  return (
    <div className="p-6">
      <PageHeader
        title="Benefits"
        description="Manage employee benefits and enrollment."
      />
      <EmptyState
        title="Benefits Administration"
        message="This feature is under construction. Check back soon!"
      />
    </div>
  );
};

export default Benefits;
