import { Product } from '../lib/schemas/product.schema';
import { formatCurrency } from '../lib/utils/formatCurrency';

export const ProductCard = ({
  product: { thumbnail, title, price },
}: {
  product: Product;
}) => {
  return (
    <div className="flex h-[300px] w-[300px] flex-col gap-3 bg-gray-200 p-4">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-orange-100/60 px-4 py-1 text-sm">
          Select color
        </span>
        <button className="rounded-full bg-white/60 px-4 py-1 text-sm">
          Customize
        </button>
      </div>
      <div className="relative w-full flex-1">
        <div className="absolute inset-0 bg-gray-200" />
        <div className="relative mx-auto h-0 w-[160px] pb-[160px]">
          <img
            src={thumbnail}
            alt={title}
            className="absolute inset-0 h-full w-full object-contain"
            loading="lazy"
            width={160}
            height={160}
          />
        </div>
      </div>
      <div className="flex items-center gap-3 bg-white px-[10px] py-2">
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
        <img
          src="/shopping-cart.svg"
          alt="Shopping cart icon"
          className="ml-1 mr-2 h-6 w-6"
        />
      </div>
    </div>
  );
};
