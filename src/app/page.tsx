import { ProductList } from './ui/ProductList';
import { Suspense } from 'react';
import { fetchProducts } from './lib/data/products';
import { ErrorBoundary } from './ui/ErrorBoundary';

export default async function Page() {
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
              <ProductList initialProducts={await fetchProducts()} />
            </Suspense>
          </ErrorBoundary>
        </section>
      </main>
    </>
  );
}
