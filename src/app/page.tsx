import { ProductList } from './ui/ProductList';
import { Suspense, useEffect, useState } from 'react';
import { fetchProducts } from './lib/data/products';
import { ErrorBoundary } from './ui/ErrorBoundary';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to load products'),
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadProducts();
  }, []);

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <>
      <main className="h-screen max-h-screen grow bg-gray-100 px-20 py-12">
        <section className="h-full">
          <div className="mb-20 text-5xl font-extralight text-black">
            <span>Home Office</span>
            <p>Essentials.</p>
          </div>

          <ErrorBoundary fallback={<div>Error loading products</div>}>
            <Suspense fallback={<div>Loading...</div>}>
              {isLoading ? (
                <div>Loading products...</div>
              ) : (
                <ProductList initialProducts={products} />
              )}
            </Suspense>
          </ErrorBoundary>
        </section>
      </main>
    </>
  );
}
