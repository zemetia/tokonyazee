import Link from "next/link";
import { getFeaturedProducts, products } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";

export default function Home() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-white to-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-700">
                🐝 100% Madu Alami Indonesia
              </span>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Manisnya Madu{" "}
                <span className="text-amber-600">Asli dari Alam</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
                Temukan madu hutan liar, klengkeng, randu, dan multiflora
                pilihan — dikumpulkan langsung dari peternak lebah lokal,
                tanpa campuran, tanpa pemanis buatan.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="#produk"
                  className="inline-flex items-center justify-center rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-amber-700 active:scale-[0.98]"
                >
                  Belanja Sekarang
                </Link>
                <Link
                  href="#tentang"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-amber-600 px-6 py-3 font-semibold text-amber-600 transition-all hover:bg-amber-50 active:scale-[0.98]"
                >
                  Tentang Kami
                </Link>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="flex aspect-square items-center justify-center rounded-3xl bg-gradient-to-br from-amber-200 to-amber-400 shadow-xl">
                <svg
                  className="h-48 w-48 text-amber-700 opacity-80 sm:h-64 sm:w-64"
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
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-white p-4 shadow-lg">
                <p className="text-sm font-semibold text-gray-900">
                  {products.length} Varian Madu
                </p>
                <p className="text-xs text-gray-500">Siap kirim ke seluruh Indonesia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About strip */}
      <section id="tentang" className="bg-amber-600">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
            {[
              { icon: "🐝", title: "Alami", desc: "Tanpa campuran & pemanis buatan" },
              { icon: "🏡", title: "Peternak Lokal", desc: "Dari peternak lebah Indonesia" },
              { icon: "🚚", title: "Fresh Delivery", desc: "Pengiriman cepat & aman" },
            ].map((item) => (
              <div key={item.title}>
                <div className="text-3xl">{item.icon}</div>
                <h3 className="mt-2 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-amber-100">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section id="produk" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Produk Unggulan
            </h2>
            <p className="mt-2 text-gray-600">Madu pilihan terbaik dari TokonyaZee</p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products
            .filter((p) => !p.featured)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>
    </>
  );
}
