import { Product } from './types';

export const products: Product[] = [
  {
    id: 'madu-hutan',
    name: 'Madu Hutan Liar',
    description:
      'Madu hutan asli dari lebah Apis dorsata, dikumpulkan dari hutan tropis Indonesia. Rasa kuat dan khas.',
    price: 85000,
    image: '/images/madu-hutan.jpg',
    category: 'madu_hutan',
    weight: '500ml',
    stock: 25,
    featured: true,
  },
  {
    id: 'madu-klengkeng',
    name: 'Madu Klengkeng Premium',
    description:
      'Madu dari nektar bunga klengkeng, rasa manis lembut dengan aroma khas. Cocok untuk sehari-hari.',
    price: 65000,
    image: '/images/madu-klengkeng.jpg',
    category: 'madu_klengkeng',
    weight: '500ml',
    stock: 40,
    featured: true,
  },
  {
    id: 'madu-randu',
    name: 'Madu Randu Organik',
    description:
      'Madu dari pohon randu/kapuk, berwarna gelap dengan rasa manis alami. Kaya antioksidan.',
    price: 55000,
    image: '/images/madu-randu.jpg',
    category: 'madu_randu',
    weight: '500ml',
    stock: 30,
    featured: true,
  },
  {
    id: 'madu-multiflora',
    name: 'Madu Multiflora',
    description:
      'Madu dari berbagai jenis bunga pilihan, rasa kompleks dan kaya nutrisi. Produk bestseller kami.',
    price: 75000,
    image: '/images/madu-multiflora.jpg',
    category: 'madu_multiflora',
    weight: '1L',
    stock: 15,
    featured: false,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.id === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
