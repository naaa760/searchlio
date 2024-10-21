import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/server';
import { StatsCard } from '@/app/(dashboard)/dashboard/StatusCard';
import { Shield, CheckCircle2, Activity, Clock } from 'lucide-react';
import type { DashboardStats } from '@/app/types/zkp';

export function Stats({ initialStats }: { initialStats: DashboardStats }) {
  const [stats, setStats] = useState(initialStats);
  const supabase = createClient();

  useEffect(() => {
    const proofChannel = supabase
      .channel('proof-stats')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'zkp_proofs',
        },
        (payload) => {
          setStats((current) => ({
            ...current,
            proofCount: current.proofCount + (payload.eventType === 'INSERT' ? 1 : -1),
          }));
        }
      )
      .subscribe();

    const verificationChannel = supabase
      .channel('verification-stats')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'zkp_verifications',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newVerification = payload.new as any;
            setStats((current) => ({
              ...current,
              verificationCount: current.verificationCount + 1,
              successRate: calculateNewSuccessRate(
                current.verificationCount,
                current.successRate,
                newVerification.is_valid
              ),
            }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(proofChannel);
      supabase.removeChannel(verificationChannel);
    };
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Proofs"
        value={stats.proofCount}
        icon={Shield}
        description="Total proofs generated"
      />
      <StatsCard
        title="Verifications"
        value={stats.verificationCount}
        icon={CheckCircle2}
        description="Total verification attempts"
      />
      <StatsCard
        title="Success Rate"
        value={`${stats.successRate}%`}
        icon={Activity}
        description="Proof verification success rate"
      />
      <StatsCard
        title="Active Challenges"
        value={stats.activeChallenges || 0}
        icon={Clock}
        description="Currently active challenges"
      />
    </div>
  );
}
function calculateNewSuccessRate(verificationCount: number, successRate: number, is_valid: any): number {
    throw new Error('Function not implemented.');
}

