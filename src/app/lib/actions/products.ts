'use server';

import type { Product } from '@/app/lib/schemas/product.schema';
import { fetchProducts } from '../fetchers/products';

export async function getProducts(): Promise<Product[]> {
  return await fetchProducts();
}
