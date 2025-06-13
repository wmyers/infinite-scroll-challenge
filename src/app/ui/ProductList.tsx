'use client';

import { useCallback, useState } from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from '@/app/lib/schemas/product.schema';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { fetchProducts } from '../lib/data/products';

export const ProductList = ({
  initialProducts,
}: {
  initialProducts: Product[];
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  // memoize this callback as it is passed into the useInfiniteScroll hook and used as a dependency
  // NB any error with this function will be caught by the useInfiniteScroll hook
  const productsFetcher = useCallback(
    async (page: number, abortSignal: AbortSignal) => {
      const newProducts = await fetchProducts(page, abortSignal);
      setProducts((prev) => [...prev, ...newProducts]);
    },
    [],
  );
  const [observerTargetRef, _, isLoading, isError] =
    useInfiniteScroll<HTMLDivElement>(productsFetcher);

  return (
    <>
      <div className="mb-32 flex flex-wrap gap-4">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      <div ref={observerTargetRef} className="h-1" />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: Uh oh</p>}
    </>
  );
};
