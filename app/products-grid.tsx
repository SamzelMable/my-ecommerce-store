import AddToCartButton from '@/components/add-to-cart-button';

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
};

export default async function ProductsGrid() {
  const { createServerSupabaseClient } = await import("@/lib/supabase/server");
  const supabase = await createServerSupabaseClient();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (!products || products.length === 0) {
    return (
      <p className="text-center text-muted-foreground">No products found.</p>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <h2 className="mb-8 text-3xl font-bold">All Products</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
          >
            <div className="aspect-square w-full bg-muted">
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <span className="text-5xl font-bold text-gray-400">
                  {product.name.charAt(0)}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold tracking-tight">{product.name}</h3>
              {product.description && (
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
              )}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-bold">${product.price}</span>
                <AddToCartButton
                  product={{
                    id: product.id,
                    name: product.name,
                    price: Number(product.price),
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
