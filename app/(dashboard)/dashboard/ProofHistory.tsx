import { createClient } from '@/lib/supabase/server';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export async function ProofHistoryTable({ userId }: { userId: string }) {
  const supabase = createClient();
  
  const { data: proofs } = await supabase
    .from('zkp_proofs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Statement</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {proofs?.map((proof) => (
          <TableRow key={proof.id}>
            <TableCell className="font-medium">{proof.statement}</TableCell>
            <TableCell>
              {new Date(proof.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}