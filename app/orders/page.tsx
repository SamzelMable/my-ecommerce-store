// app/orders/page.tsx
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs"; // ← UserButton is client component, import from main package

export default async function OrdersPage() {
  const supabase = await createServerSupabaseClient();

  // Get the current user from Supabase (Clerk is synced)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Fetch orders for this Clerk user
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("clerk_user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-4xl py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Orders</h1>
        {/* UserButton is a client component – wrap in its own component if needed, but works here too */}
        <UserButton afterSignOutUrl="/" />
      </div>

      {!orders || orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">No orders yet.</p>
          <a href="/" className="mt-4 inline-block text-blue-600 hover:underline">
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-xl p-6 bg-card shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="font-semibold text-lg">
                    Order #{order.id.slice(0, 8)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <p className="text-2xl font-bold">
                  ${(order.total_cents / 100).toFixed(2)}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} className="text-center">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-32 object-cover rounded-lg shadow"
                      />
                    ) : (
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-32 flex items-center justify-center">
                        <span className="text-3xl font-bold text-gray-400">
                          {item.name[0]}
                        </span>
                      </div>
                    )}
                    <p className="mt-2 font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
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