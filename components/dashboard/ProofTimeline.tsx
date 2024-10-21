'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield, CheckCircle2, XCircle } from 'lucide-react';

interface TimelineEvent {
  id: string;
  type: 'proof' | 'verification';
  status?: boolean;
  timestamp: string;
  details: string;
}

export function ProofTimeline() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel('timeline')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'zkp_proofs',
        },
        (payload) => {
          const newEvent: TimelineEvent = {
            id: payload.new.id,
            type: 'proof',
            timestamp: payload.new.created_at,
            details: payload.new.statement,
          };
          setEvents((current) => [newEvent, ...current].slice(0, 10));
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'zkp_verifications',
        },
        (payload) => {
          const newEvent: TimelineEvent = {
            id: payload.new.id,
            type: 'verification',
            status: payload.new.is_valid,
            timestamp: payload.new.verified_at,
            details: `Verification ${payload.new.is_valid ? 'successful' : 'failed'}`,
          };
          setEvents((current) => [newEvent, ...current].slice(0, 10));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center space-x-4 border-l-2 border-muted pl-4"
              >
                {event.type === 'proof' ? (
                  <Shield className="h-4 w-4 text-blue-500" />
                ) : event.status ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{event.details}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(event.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}