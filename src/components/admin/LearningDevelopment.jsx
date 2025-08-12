import React from 'react';
import PageHeader from '../ui/PageHeader';
import EmptyState from '../ui/EmptyState';

const LearningDevelopment = () => {
  return (
    <div className="p-6">
      <PageHeader
        title="Learning & Development"
        description="Manage training programs and employee development plans."
      />
      <EmptyState
        title="L & D Module"
        message="This feature is under construction. Check back soon!"
      />
    </div>
  );
};

export default LearningDevelopment;
