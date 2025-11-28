'use client';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      <XCircle className="h-24 w-24 text-red-500" />
      <div className="text-center">
        <h1 className="text-4xl font-bold">Payment Cancelled</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          No worries — your cart is still saved
        </p>
      </div>
      <Link href="/">
        <Button size="lg">Back to Store</Button>
      </Link>
    </div>
  );
}