import type { Product } from './types';

export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Apex Adapt Hoodie',
    price: 2999,
    category: 'hoodie',
    description: 'Engineered for optimal thermoregulation during warmups. Featuring our signature mid-weight compression fleece.',
    colors: [
      { id: 'blk', name: 'Onyx Black', hex: '#111111' },
      { id: 'vlt', name: 'Volt Green', hex: '#B8FF3C' },
      { id: 'gry', name: 'Concrete Grey', hex: '#888888' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sizeChartId: 'tops-mens',
    fabricComposition: '80% Cotton, 20% Recycled Polyester',
    isNew: true,
    isSale: false,
    isBestseller: true
  },
  {
    id: 'prod-002',
    name: 'Velocity Tech Tee',
    price: 1499,
    category: 'tee',
    description: 'Ultra-lightweight, moisture-wicking fabric for high-intensity output.',
    colors: [
      { id: 'wht', name: 'Optic White', hex: '#F7F7F5' },
      { id: 'blk', name: 'Onyx Black', hex: '#111111' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sizeChartId: 'tops-mens',
    fabricComposition: '90% Nylon, 10% Elastane',
    isNew: false,
    isSale: false,
    isBestseller: true
  },
  {
    id: 'prod-003',
    name: 'Resilience Pro Leggings',
    price: 3499,
    category: 'leggings',
    description: 'Squat-proof, high-waisted compression leggings that move with you.',
    colors: [
      { id: 'blk', name: 'Onyx Black', hex: '#111111' },
      { id: 'red', name: 'Crimson Red', hex: '#E8352B' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    sizeChartId: 'bottoms-womens',
    fabricComposition: '75% Polyester, 25% Spandex',
    isNew: false,
    isSale: false,
    isBestseller: true
  },
  {
    id: 'prod-004',
    name: 'Command Training Shorts',
    price: 1999,
    category: 'shorts',
    description: '7-inch inseam shorts built for unrestricted mobility during lifts.',
    colors: [
      { id: 'blk', name: 'Onyx Black', hex: '#111111' },
      { id: 'vlt', name: 'Volt Green', hex: '#B8FF3C' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sizeChartId: 'bottoms-mens',
    fabricComposition: '88% Polyester, 12% Elastane',
    isNew: false,
    isSale: true,
    isBestseller: false
  },
  {
    id: 'prod-005',
    name: 'Apex Adapt Zip-Up',
    price: 3199,
    category: 'hoodie',
    description: 'Full-zip variant of our bestselling hoodie for easier layering.',
    colors: [
      { id: 'gry', name: 'Concrete Grey', hex: '#888888' },
      { id: 'blk', name: 'Onyx Black', hex: '#111111' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sizeChartId: 'tops-mens',
    fabricComposition: '80% Cotton, 20% Recycled Polyester',
    isNew: false,
    isSale: false,
    isBestseller: false
  }
];
