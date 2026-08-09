"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
function formatPrice(price: number): string {
  return `Rp ${price.toLocaleString('id-ID')}`;
}

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-24 text-center">
        <svg
          className="mb-6 h-24 w-24 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
          />
        </svg>
        <h1 className="text-2xl font-bold text-gray-900">Keranjang Kosong</h1>
        <p className="mt-2 text-gray-500">Yuk, mulai belanja madu favoritmu!</p>
        <Link
          href="/#produk"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-amber-700"
        >
          Lihat Produk
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Keranjang Belanja
          <span className="ml-2 text-lg font-normal text-gray-500">
            ({cartCount} item)
          </span>
        </h1>
        <button
          onClick={clearCart}
          className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
        >
          Kosongkan Keranjang
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Items */}
        <div className="lg:col-span-2">
          <ul className="divide-y divide-gray-100 rounded-xl border border-gray-200">
            {items.map((item) => (
              <li key={item.product.id} className="flex gap-5 p-5">
                <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-lg bg-amber-50">
                  <svg
                    className="h-10 w-10 text-amber-400"
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
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/produk/${item.product.id}`}
                        className="font-bold text-gray-900 hover:text-amber-700"
                      >
                        {item.product.name}
                      </Link>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.product.weight}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      aria-label={`Hapus ${item.product.name}`}
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                        aria-label="Kurangi jumlah"
                      >
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                      <span className="flex h-8 w-10 items-center justify-center text-sm font-medium text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.product.stock}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Tambah jumlah"
                      >
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>
                    <span className="text-lg font-bold text-amber-700">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Summary */}
        <div className="h-fit rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-lg font-bold text-gray-900">Ringkasan Belanja</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({cartCount} item)</span>
              <span className="font-medium text-gray-900">
                {formatPrice(cartTotal)}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Ongkos Kirim</span>
              <span className="font-medium text-gray-900">
                Dihitung saat checkout
              </span>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-5">
            <span className="font-bold text-gray-900">Total</span>
            <span className="text-2xl font-extrabold text-amber-700">
              {formatPrice(cartTotal)}
            </span>
          </div>
          <Link
            href="/checkout"
            className="mt-6 flex w-full items-center justify-center rounded-lg bg-amber-600 px-5 py-3 font-semibold text-white shadow-sm transition-all hover:bg-amber-700 active:scale-[0.98]"
          >
            Lanjut ke Checkout
          </Link>
          <Link
            href="/#produk"
            className="mt-3 flex w-full items-center justify-center rounded-lg border-2 border-amber-600 px-5 py-2.5 font-semibold text-amber-600 transition-all hover:bg-amber-50"
          >
            Lanjut Belanja
          </Link>
        </div>
      </div>
    </div>
  );
}
