import Image from 'next/image';
import { Product } from '../lib/schemas/product.schema';
import { formatCurrency } from '../lib/utils/formatCurrency';

export const ProductCard = ({
  product: { thumbnail, title, price },
}: {
  product: Product;
}) => {
  return (
    <div className="flex h-[300px] w-[300px] flex-col gap-4 bg-gray-200 p-4">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-orange-100/60 px-4 py-1 text-sm">
          Select color
        </span>
        <button className="rounded-full bg-white/60 px-4 py-1 text-sm">
          Customize
        </button>
      </div>
      <div className="relative w-full flex-1">
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="300px"
          className="object-contain"
        />
      </div>
      <div className="flex items-center gap-3 bg-white p-3">
        <div>
          <div className="group relative">
            <p className="max-w-[180px] truncate text-sm font-medium">
              {title}
            </p>
            <div className="invisible absolute bottom-full left-0 z-10 mb-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white group-hover:visible">
              {title}
            </div>
          </div>
          <p className="text-sm text-gray-400">{`From ${formatCurrency(price)}`}</p>
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
