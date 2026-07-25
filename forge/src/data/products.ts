import type { Product } from './types';

export const products: Product[] = [
  {
    id: 'forge-hoodie-01',
    name: 'Apex Technical Hoodie',
    price: 120,
    category: 'hoodie',
    colorways: [
      { name: 'Onyx', hex: '#16161A', textureUrl: '' },
      { name: 'Bone', hex: '#E2E2DF', textureUrl: '' },
      { name: 'Acid', hex: '#C6FF3A', textureUrl: '' }
    ],
    modelUrl: '',
    description: 'Advanced performance apparel built for the modern athlete.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['new']
  },
  {
    id: 'forge-tee-01',
    name: 'Core Compression Tee',
    price: 55,
    category: 'tee',
    colorways: [
      { name: 'Onyx', hex: '#16161A', textureUrl: '' },
      { name: 'Crimson', hex: '#8B0000', textureUrl: '' }
    ],
    modelUrl: '',
    description: 'Second-skin fit for zero distractions.',
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['bestseller']
  },
  {
    id: 'forge-leggings-01',
    name: 'Seamless Power Leggings',
    price: 85,
    category: 'leggings',
    colorways: [
      { name: 'Onyx', hex: '#16161A', textureUrl: '' },
      { name: 'Slate', hex: '#4A4A52', textureUrl: '' }
    ],
    modelUrl: '',
    description: 'High-waisted support engineered for heavy lifts.',
    sizes: ['XS', 'S', 'M', 'L'],
    tags: ['limited']
  },
  {
    id: 'forge-shorts-01',
    name: 'Velocity 5" Shorts',
    price: 65,
    category: 'shorts',
    colorways: [
      { name: 'Bone', hex: '#E2E2DF', textureUrl: '' },
      { name: 'Acid', hex: '#C6FF3A', textureUrl: '' }
    ],
    modelUrl: '',
    description: 'Ultra-lightweight mobility.',
    sizes: ['S', 'M', 'L', 'XL'],
    tags: []
  },
  {
    id: 'forge-hoodie-02',
    name: 'Oversized Rest Day Hoodie',
    price: 110,
    category: 'hoodie',
    colorways: [
      { name: 'Slate', hex: '#4A4A52', textureUrl: '' },
      { name: 'Onyx', hex: '#16161A', textureUrl: '' }
    ],
    modelUrl: '',
    description: 'Premium heavyweight cotton for recovery.',
    sizes: ['M', 'L', 'XL', 'XXL'],
    tags: []
  },
  {
    id: 'forge-tee-02',
    name: 'Drop-Armhole Tank',
    price: 45,
    category: 'tee',
    colorways: [
      { name: 'Acid', hex: '#C6FF3A', textureUrl: '' },
      { name: 'Onyx', hex: '#16161A', textureUrl: '' }
    ],
    modelUrl: '',
    description: 'Maximum airflow during intense sessions.',
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['sold-out']
  },
  {
    id: 'forge-shorts-02',
    name: '2-in-1 Hybrid Shorts',
    price: 75,
    category: 'shorts',
    colorways: [
      { name: 'Onyx/Crimson', hex: '#2A0000', textureUrl: '' },
      { name: 'Onyx', hex: '#16161A', textureUrl: '' }
    ],
    modelUrl: '',
    description: 'Built-in compression liner for locked-in support.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['new']
  },
  {
    id: 'forge-leggings-02',
    name: 'Contour Ribbed Leggings',
    price: 90,
    category: 'leggings',
    colorways: [
      { name: 'Bone', hex: '#E2E2DF', textureUrl: '' },
      { name: 'Slate', hex: '#4A4A52', textureUrl: '' }
    ],
    modelUrl: '',
    description: 'Sculpting fit with textured ribbed fabric.',
    sizes: ['XS', 'S', 'M', 'L'],
    tags: []
  }
];
