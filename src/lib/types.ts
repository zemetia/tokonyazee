export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'madu_hutan' | 'madu_klengkeng' | 'madu_randu' | 'madu_multiflora';
  weight: string; // e.g. "500ml", "1L"
  stock: number;
  featured: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
