'use client';
import { createContext, useContext, useCallback, useState } from 'react';
import { Toast } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

interface NotificationContextType {
  showNotification: (notification: Omit<Notification, 'id'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();

  const showNotification = useCallback(
    ({ title, description, type }: Omit<Notification, 'id'>) => {
      toast({
        title,
        description,
        variant: type === 'error' ? 'destructive' : 'default',
      });
    },
    [toast]
  );

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};