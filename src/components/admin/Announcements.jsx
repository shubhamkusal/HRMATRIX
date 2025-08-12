import React from 'react';
import PageHeader from '../ui/PageHeader';
import EmptyState from '../ui/EmptyState';

const Announcements = () => {
  return (
    <div className="p-6">
      <PageHeader
        title="Announcements"
        description="Create and manage company-wide announcements."
      />
      <EmptyState
        title="Announcements"
        message="This feature is under construction. Check back soon!"
      />
    </div>
  );
};

export default Announcements;
