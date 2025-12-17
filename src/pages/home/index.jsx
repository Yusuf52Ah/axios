import { useProducts } from "@/components/hooks/queries/product";

export default function HomePage() {
  const { data, isLoading, isError, error } = useProducts();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      {data && 
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-2">{product.title }</h2>
              <p className="text-gray-700 mb-4">${product.price}</p>
            </div>
          ))}
        </div>
      }
    </div>
  );
}
