// app/orders/page.tsx
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("clerk_user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-4xl py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Orders</h1>
        <UserButton afterSignOutUrl="/" />
      </div>

      {!orders || orders.length === 0 ? (
        <p className="text-center text-xl text-muted-foreground py-20">
          No orders yet. Go buy something!
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="rounded-lg border bg-card p-6">
              <div className="mb-4 flex justify-between">
                <div>
                  <p className="font-semibold">
                    Order #{order.id.slice(0, 8)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
                <p className="text-2xl font-bold">
                  ${(order.total_cents / 100).toFixed(2)}
                </p>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {order.items.map((item: any, i: number) => (
                  <div key={i} className="text-center">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="h-32 w-full rounded object-cover"
                      />
                    ) : (
                      <div className="bg-muted flex h-32 items-center justify-center rounded">
                        <span className="text-3xl">{item.name[0]}</span>
                      </div>
                    )}
                    <p className="mt-2 text-sm">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
