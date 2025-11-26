import * as React from 'react';
import ProfileClient from './ProfileClient';

const DetailItem = ({ label, value }: { label: string, value: string | undefined }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
    </div>
);


export default function ProfilePage() {
  return (
    <React.Suspense fallback={<div />}>
      <ProfileClient />
    </React.Suspense>
  );
}
