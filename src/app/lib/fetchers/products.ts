import type { Product } from '@/app/lib/schemas/product.schema';

const PRODUCT_PAGE_SIZE = 10;

export async function fetchProducts(
  page = 1,
  abortSignal?: AbortSignal,
): Promise<Product[]> {
  try {
    const options = abortSignal ? { signal: abortSignal } : undefined;
    const response = await fetch(
      `https://dummyjson.com/products?limit=${PRODUCT_PAGE_SIZE}&skip=${(page - 1) * PRODUCT_PAGE_SIZE}`,
      options,
    );
    const isOK = response.ok;
    const status = response.status;
    const data = await response.json();
    // we can do additional error logging here if required
    if (!isOK) {
      console.error(`ERROR fetchProducts ${status} `);
    }
    return data.products;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw new Error(`Failed to fetch products. ${error}`);
  }
}
