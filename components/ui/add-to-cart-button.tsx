"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/store/cart-store";

type Props = {
  product: {
    id: string;
    name: string;
    price: number;
  };
};

export default function AddToCartButton({ product }: Props) {
  const addItem = useCart((state) => state.addItem);

  return (
    <Button
      size="sm"
      onClick={() =>
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
        })
      }
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      Add to cart
    </Button>
  );
}
