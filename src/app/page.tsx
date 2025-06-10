import { ProductList } from './ui/ProductList';
import { getProducts } from './lib/actions/products';

export default async function Page() {
  const { products, error } = await getProducts();

  return (
    <>
      <main className="h-screen max-h-screen grow bg-gray-100 px-20 py-12">
        <section className="h-full">
          <div className="mb-20 text-5xl font-extralight text-black">
            <span>Home Office</span>
            <p>Essentials.</p>
          </div>

          {products && <ProductList initialProducts={products} />}
          {error && (
            <p className="text-red-500">Error fetching products: {error}</p>
          )}
        </section>
      </main>
    </>
  );
}
