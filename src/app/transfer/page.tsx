
import * as React from 'react';
import TransferClient from "./TransferClient";

export default function TransferPage() {
  return (
    <React.Suspense fallback={<div />}>
      <TransferClient />
    </React.Suspense>
  );
}
export const dynamic = 'force-dynamic';
