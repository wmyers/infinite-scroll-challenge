'use server';

// * This Server Function is unnecessary - keeping for reference purposes only

import type { Product } from '@/app/lib/schemas/product.schema';
import { fetchProducts } from '../data/products';

type GetProductsResponse = {
  products?: Product[];
  error?: string;
};

/**
 * This Server Function (previously known as Server Action) calls a fetcher
 * function that is also called for client-side fetching. But it avoids a compile
 * error for optional client side fetch properties, which occurs if the fetch
 * command is 'in' the Server Function.
 *
 *
 * A few other thoughts:
 *  - NextJS doesn't recommend Server Functions (Actions) for fetching data
 *  - But keeping this initial server-side fetch in a Server Function makes this
 *    easier to read in the Server Component
 *  - Also I am transforming the response to a products/error format in the
 *    same way that NextJS recommends returning Action state to then be used
 *    by the useActionState hook (when using Server Actions with form mutations)
 *  - Saying all this it might be better to stream the initial data of the Server
 *    Component into the client side anyway (using <Suspense>)
 *
 */

export async function getProducts(): Promise<GetProductsResponse> {
  try {
    const products = await fetchProducts();
    return { products };
  } catch (error) {
    return {
      error:
        (error as { message: string })?.message ||
        'Fetch products: Something went wrong',
    };
  }
}
