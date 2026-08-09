"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";

function formatPrice(price: number): string {
  return `Rp ${price.toLocaleString("id-ID")}`;
}

export default function CheckoutPage() {
  const { items, cartTotal, cartCount, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock checkout — no backend yet. Clear cart and show confirmation.
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-24 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-10 w-10 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900">
          Pesanan Diterima!
        </h1>
        <p className="mt-3 max-w-md text-gray-600">
          Terima kasih, {form.name || "pelanggan"}! Pesanan Anda sedang kami
          proses. Tim kami akan menghubungi Anda via WhatsApp di{" "}
          <span className="font-semibold text-gray-900">{form.phone || "nomor Anda"}</span>{" "}
          untuk konfirmasi pembayaran & pengiriman.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-amber-700"
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Keranjang Kosong</h1>
        <p className="mt-2 text-gray-500">
          Tambahkan produk terlebih dahulu sebelum checkout.
        </p>
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
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
        Checkout
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2">
          <div className="rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900">Data Pengiriman</h2>
            <div className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Nama Lengkap
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nama penerima"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  No. WhatsApp
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="08xxxxxxxxxx"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Alamat Lengkap
                </label>
                <textarea
                  id="address"
                  name="address"
                  required
                  value={form.address}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Alamat pengiriman lengkap"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
              </div>
              <div>
                <label
                  htmlFor="notes"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Catatan (opsional)
                </label>
                <input
                  id="notes"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Catatan untuk penjual"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center rounded-lg bg-amber-600 px-5 py-3.5 font-semibold text-white shadow-sm transition-all hover:bg-amber-700 active:scale-[0.98]"
          >
            Buat Pesanan ({cartCount} item)
          </button>
        </form>

        {/* Order summary */}
        <div className="h-fit rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-lg font-bold text-gray-900">Ringkasan Pesanan</h2>
          <ul className="mt-4 divide-y divide-gray-200">
            {items.map((item) => (
              <li
                key={item.product.id}
                className="flex items-center justify-between py-3 text-sm"
              >
                <span className="text-gray-700">
                  {item.product.name}{" "}
                  <span className="text-gray-400">× {item.quantity}</span>
                </span>
                <span className="font-medium text-gray-900">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
            <span className="font-bold text-gray-900">Total</span>
            <span className="text-2xl font-extrabold text-amber-700">
              {formatPrice(cartTotal)}
            </span>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            Pembayaran & ongkir dikonfirmasi via WhatsApp setelah pesanan dibuat.
          </p>
        </div>
      </div>
    </div>
  );
}
