import React from 'react';
import PageHeader from '../ui/PageHeader';
import EmptyState from '../ui/EmptyState';

const Tasks = () => {
  return (
    <div className="p-6">
      <PageHeader
        title="Tasks"
        description="Manage and track tasks across the organization."
      />
      <EmptyState
        title="Task Management"
        message="This feature is under construction. Check back soon!"
      />
    </div>
  );
};

export default Tasks;
