export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'men' | 'women' | 'hoodie' | 'tee' | 'leggings' | 'shorts' | 'accessories';
  description: string;
  colors: { id: string; name: string; hex: string }[];
  sizes: string[];
  sizeChartId: string;
  fabricComposition: string;
  isNew: boolean;
  isSale: boolean;
  isBestseller: boolean;
  images?: string[];
}
