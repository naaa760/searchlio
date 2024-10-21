import { createClient } from '@/lib/supabase/server';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export async function VerificationChart({ userId }: { userId: string }) {
  const supabase = createClient();
  
  const { data } = await supabase
    .from('zkp_verifications')
    .select('verified_at, is_valid')
    .eq('user_id', userId)
    .order('verified_at', { ascending: true })
    .limit(20);

  const chartData = data?.map(verification => ({
    date: new Date(verification.verified_at).toLocaleDateString(),
    success: verification.is_valid ? 1 : 0,
    failure: verification.is_valid ? 0 : 1
  })) || [];

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="success" 
            stroke="#10b981" 
            name="Successful" 
          />
          <Line 
            type="monotone" 
            dataKey="failure" 
            stroke="#ef4444" 
            name="Failed" 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}