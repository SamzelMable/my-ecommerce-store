// app/success/page.tsx
'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/store/cart-store';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

export default function SuccessPage() {
  const { items, clearCart } = useCart();
  const { user } = useUser();

  useEffect(() => {
    if (items.length > 0 && user) {
      // Save order to Supabase
      fetch('/api/save-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerk_user_id: user.id,
          items,
          total_cents: items.reduce((sum, i) => sum + i.price * i.quantity * 100, 0),
        }),
      });
      
      clearCart();
    }
  }, [items, user, clearCart]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-4">
      <CheckCircle2 className="h-24 w-24 text-green-500" />
      <div className="text-center">
        <h1 className="text-4xl font-bold">Payment Successful!</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Thank you for your purchase! Your order has been saved.
        </p>
      </div>
      <div className="flex gap-4">
        <Link href="/orders">
          <Button size="lg">View Orders</Button>
        </Link>
        <Link href="/">
          <Button variant="outline" size="lg">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
}