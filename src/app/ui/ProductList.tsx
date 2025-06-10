'use client';

import { useCallback, useState } from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from '@/app/lib/schemas/product.schema';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { fetchProducts } from '../lib/fetchers/products';

export const ProductList = ({
  initialProducts,
}: {
  initialProducts: Product[];
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  // memoize this callback as it is passed into the useInfiniteScroll hook and used as a dependency
  const productsFetcher = useCallback(
    async (page: number, abortSignal: AbortSignal) => {
      try {
        // see also:
        // - https://www.robinwieruch.de/next-server-actions-fetch-data/
        // - https://nextjs.org/docs/pages/building-your-application/data-fetching/client-side

        // TODO use react-query to get loading and error states
        const newProducts = await fetchProducts(page, abortSignal);
        setProducts((prev) => [...prev, ...newProducts]);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    },
    [],
  );
  const [observerTargetRef] = useInfiniteScroll(productsFetcher);

  return (
    <>
      <div className="mb-32 flex flex-wrap gap-4">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      <div ref={observerTargetRef}>
        <span>ref</span>
      </div>
      {/* {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>} */}
    </>
  );
};
