'use client';

import type { Product } from '@/lib/types';
import { useCart } from '@/hooks/useCart';
import Button from './Button';

function formatPrice(price: number): string {
  return `Rp ${price.toLocaleString('id-ID')}`;
}

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
      {/* Image placeholder */}
      <div className="relative aspect-square overflow-hidden bg-amber-50">
        <div className="absolute inset-0 flex items-center justify-center bg-amber-100 text-amber-700">
          <div className="text-center">
            <svg
              className="mx-auto h-16 w-16 opacity-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
            <p className="mt-1 text-sm font-medium opacity-70">{product.name}</p>
          </div>
        </div>
        {/* Category badge */}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-amber-800 shadow-sm backdrop-blur-sm">
          {product.weight}
        </span>
        {product.featured && (
          <span className="absolute right-3 top-3 rounded-full bg-amber-500 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
            Unggulan
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-600">{product.description}</p>

        {/* Price and stock */}
        <div className="mt-auto pt-4">
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-bold text-amber-700">{formatPrice(product.price)}</span>
            <span className="text-xs text-gray-500">Stok: {product.stock}</span>
          </div>

          <Button
            variant="primary"
            className="mt-3 w-full"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
              />
            </svg>
            Tambah ke Keranjang
          </Button>
        </div>
      </div>
    </div>
  );
}
