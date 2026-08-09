import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, products } from "@/lib/data";
import AddToCartButton from './AddToCartButton';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Produk Tidak Ditemukan — TokonyaZee" };
  return {
    title: `${product.name} — TokonyaZee`,
    description: product.description,
  };
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.id }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-amber-600">
          Beranda
        </Link>
        <span className="mx-2">/</span>
        <Link href="/#produk" className="hover:text-amber-600">
          Produk
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Image placeholder */}
        <div className="flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-300">
          <svg
            className="h-40 w-40 text-amber-700 opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.2}
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <span className="inline-flex w-fit rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
            {product.weight}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            {product.description}
          </p>

          <div className="mt-6 flex items-baseline gap-4">
            <span className="text-3xl font-extrabold text-amber-700">
              Rp {product.price.toLocaleString("id-ID")}
            </span>
            <span className="text-sm text-gray-500">
              {product.stock > 0 ? `Stok: ${product.stock}` : "Stok Habis"}
            </span>
          </div>

          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>

          <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5">
            <h2 className="font-bold text-gray-900">Keunggulan Produk</h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>✓ Dikemas higienis & aman</li>
              <li>✓ Pengiriman ke seluruh Indonesia</li>
              <li>✓ Cocok untuk konsumsi harian & kesehatan</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related products */}
      <div className="mt-16">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Produk Lainnya
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <Link
              key={p.id}
              href={`/produk/${p.id}`}
              className="group rounded-xl border border-gray-200 p-4 transition-all hover:border-amber-300 hover:shadow-md"
            >
              <div className="flex aspect-square items-center justify-center rounded-lg bg-amber-50">
                <svg
                  className="h-12 w-12 text-amber-400"
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
              <h3 className="mt-3 font-bold text-gray-900 group-hover:text-amber-700">
                {p.name}
              </h3>
              <p className="mt-1 text-sm font-semibold text-amber-700">
                Rp {p.price.toLocaleString("id-ID")}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
