'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/store/cart-store';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function SuccessPage() {
  const clearCart = useCart((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-4">
      <CheckCircle2 className="h-24 w-24 text-green-500" />
      <div className="text-center">
        <h1 className="text-4xl font-bold">Payment Successful!</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Thank you for your purchase
        </p>
      </div>

      <Link href="/">
        <Button size="lg">Continue Shopping</Button>
      </Link>
    </div>
  );
}