import Image from 'next/image';
import { Product } from '../lib/schemas/product.schema';

export const ProductCard = ({
  product: { thumbnail, title, price },
}: {
  product: Product;
}) => {
  return (
    <div className="flex w-fit flex-col gap-4 bg-gray-200 p-4">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-orange-100/60 px-4 py-1 text-sm">
          Select color
        </span>
        <button className="rounded-full bg-white/60 px-4 py-1 text-sm">
          Customize
        </button>
      </div>
      <Image src={thumbnail} alt={title} width={400} height={400} />
      <div className="flex items-center gap-3 bg-white p-3">
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-gray-400">{`From ${price}`}</p>
        </div>
        <div className="ml-auto w-px self-stretch bg-gray-400" />
        <Image
          src="/shopping-cart.svg"
          alt="Shopping cart icon"
          className="ml-1 mr-2"
          width={24}
          height={24}
        />
      </div>
    </div>
  );
};
