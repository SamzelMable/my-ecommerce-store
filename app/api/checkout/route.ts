// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { useCart } from "@/lib/store/cart-store";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
});

export async function POST(request: Request) {
  const { items } = await request.json();

  const line_items = items.map((item: any) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
      },
      unit_amount: Math.round(item.price * 100), // Stripe uses cents
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
    metadata: {
      cart_items: JSON.stringify(
        items.map((i: any) => ({ id: i.id, quantity: i.quantity }))
      ),
    },
  });

  return NextResponse.json({ url: session.url });
}
