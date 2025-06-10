import { ProductList } from './ui/ProductList';
import { getProducts } from './lib/actions/products';

export default async function Page() {
  const initialProducts = await getProducts();

  return (
    <>
      <main className="h-screen max-h-screen grow bg-gray-100 px-20 py-12">
        <section className="h-full">
          <div className="mb-20 text-5xl font-extralight text-black">
            <span>Home Office</span>
            <p>Essentials.</p>
          </div>

          <ProductList initialProducts={initialProducts} />

          {/* <p className="mb-4 text-4xl font-light">See more produce</p>
          <button className="rounded-full bg-gray-200 px-8 py-2">
            <Image
              src="/arrow-right.svg"
              alt="Arrow right icon"
              width={24}
              height={24}
            />
          </button> */}
        </section>
      </main>
    </>
  );
}
