import { Suspense } from 'react';
import { getStats } from '@/lib/stats';
import { auth } from '@clerk/nextjs/server';

import { Card } from '@/components/ui/card';
import { NotificationProvider } from '@/components/notifications/NotificationsProvider';
import { Stats } from '@/components/dashboard/Stats';
import { ProofGenerator } from '@/components/zkp/ProofGenerator';
import { ProofVerifier } from '@/components/zkp/ProofVerifier';
import { VerificationChart } from './VerificationChart';
import { redirect } from 'next/navigation';
import { ProofTimeline } from '@/components/dashboard/ProofTimeline';

export default async function DashboardPage() {
  const { userId } = auth();
  if (!userId) redirect('/sign-in');

  const stats = await getStats(userId);

  return (
    <NotificationProvider>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">ZKP Dashboard</h1>
        </div>

        <Suspense fallback={<div>Loading stats...</div>}>
          <Stats initialStats={stats} />
        </Suspense>

        <div className="grid gap-6 md:grid-cols-2">
          <ProofGenerator />
          <ProofVerifier />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <Suspense fallback={<div>Loading chart...</div>}>
              <VerificationChart userId={userId} />
            </Suspense>
          </Card>
          
          <Suspense fallback={<div>Loading timeline...</div>}>
            <ProofTimeline />
          </Suspense>
        </div>
      </div>
    </NotificationProvider>
  );
}