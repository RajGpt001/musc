export interface Colorway {
  name: string;
  hex: string;
  textureUrl: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'hoodie' | 'tee' | 'leggings' | 'shorts';
  price: number;
  colorways: Colorway[];
  modelUrl: string;
  description: string;
  sizes: string[];
  tags: string[];
}
