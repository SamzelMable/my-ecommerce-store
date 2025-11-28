"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/lib/store/cart-store";

export default function CartSheet() {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice } =
    useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {getTotalItems() > 0 && (
            <Badge
              className="absolute -top-2 -right-2 px-2 py-1 text-xs"
              suppressHydrationWarning
            >
              {getTotalItems()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            {items.length === 0
              ? "Your cart is empty"
              : `${items.length} item(s)`}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-muted-foreground">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  −
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="mt-8 border-t pt-6">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>

            <Button
              className="mt-6 w-full"
              size="lg"
              disabled={items.length === 0}
              onClick={async () => {
                const res = await fetch("/api/checkout", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ items }),
                });
                const { url } = await res.json();
                window.location.href = url;
              }}
            >
              Checkout with Stripe
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
