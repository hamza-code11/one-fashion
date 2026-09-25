// types/SizeGuide.ts

export interface MeasurementGuide {
  icon: 'height' | 'chest' | 'weight';
  title: string;
  description: string;
}

export interface SizeChartRow {
  id: number;
  size: string;
  height: string;
  weight: string;
  chest: string;
}