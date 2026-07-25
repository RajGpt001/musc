export interface SizeChartRow {
  size: string;
  chest: number; // inches
  waist: number;
  hips?: number;
  inseam?: number;
}

export interface SizeChart {
  id: string;
  name: string;
  rows: SizeChartRow[];
  guideInstructions: string;
}

export const sizeCharts: Record<string, SizeChart> = {
  'tops-mens': {
    id: 'tops-mens',
    name: 'Men\'s Tops (Hoodies & Tees)',
    guideInstructions: 'Chest: Measure around the fullest part of your chest, keeping the tape horizontal. Waist: Measure around the narrowest part of your waist.',
    rows: [
      { size: 'S', chest: 36, waist: 30 },
      { size: 'M', chest: 39, waist: 32 },
      { size: 'L', chest: 42, waist: 34 },
      { size: 'XL', chest: 45, waist: 36 },
      { size: 'XXL', chest: 48, waist: 38 },
    ]
  },
  'bottoms-mens': {
    id: 'bottoms-mens',
    name: 'Men\'s Bottoms (Shorts)',
    guideInstructions: 'Waist: Measure around your natural waistline. Hips: Measure around the fullest part of your hips. Inseam: Measure from top of inside thigh down to the ankle.',
    rows: [
      { size: 'S', chest: 0, waist: 30, hips: 37, inseam: 7 },
      { size: 'M', chest: 0, waist: 32, hips: 39, inseam: 7 },
      { size: 'L', chest: 0, waist: 34, hips: 41, inseam: 7.5 },
      { size: 'XL', chest: 0, waist: 36, hips: 43, inseam: 7.5 },
      { size: 'XXL', chest: 0, waist: 38, hips: 45, inseam: 8 },
    ]
  },
  'bottoms-womens': {
    id: 'bottoms-womens',
    name: 'Women\'s Bottoms (Leggings)',
    guideInstructions: 'Waist: Measure around the narrowest part of your waist. Hips: Measure around the fullest part of your hips.',
    rows: [
      { size: 'XS', chest: 0, waist: 24, hips: 34, inseam: 27 },
      { size: 'S', chest: 0, waist: 26, hips: 36, inseam: 27.5 },
      { size: 'M', chest: 0, waist: 28, hips: 38, inseam: 28 },
      { size: 'L', chest: 0, waist: 30, hips: 40, inseam: 28.5 },
      { size: 'XL', chest: 0, waist: 33, hips: 43, inseam: 29 },
    ]
  }
};
