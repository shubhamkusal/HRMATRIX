import React from 'react';
import PageHeader from '../ui/PageHeader';
import EmptyState from '../ui/EmptyState';

const Recruitment = () => {
  return (
    <div className="p-6">
      <PageHeader
        title="Recruitment"
        description="Manage job openings, candidates, and the hiring pipeline."
      />
      <EmptyState
        title="Recruitment Module"
        message="This feature is under construction. Check back soon!"
      />
    </div>
  );
};

export default Recruitment;
