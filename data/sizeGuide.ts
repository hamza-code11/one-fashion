// data/sizeGuide.ts

import { MeasurementGuide, SizeChartRow } from '../types/SizeGuide';

export const measurementGuides: MeasurementGuide[] = [
  {
    icon: 'height',
    title: 'Height',
    description: 'Measure from top of head to floor, barefoot.',
  },
  {
    icon: 'chest',
    title: 'Chest',
    description: 'Measure around the fullest part of the chest.',
  },
  {
    icon: 'weight',
    title: 'Weight',
    description: 'Use a recent, accurate weight reading.',
  },
];

export const sizeChart: SizeChartRow[] = [
  { id: 1, size: '0-3M', height: '53–58 cm', weight: '4–6 kg', chest: '40 cm' },
  { id: 2, size: '3-6M', height: '58–65 cm', weight: '6–7.5 kg', chest: '44 cm' },
  { id: 3, size: '6-12M', height: '65–74 cm', weight: '7.5–9 kg', chest: '47 cm' },
  { id: 4, size: '12-18M', height: '74–80 cm', weight: '9–11 kg', chest: '50 cm' },
  { id: 5, size: '18-24M', height: '80–86 cm', weight: '11–12.5 kg', chest: '52 cm' },
  { id: 6, size: '2-3Y', height: '86–96 cm', weight: '12.5–14 kg', chest: '54 cm' },
  { id: 7, size: '3-4Y', height: '96–104 cm', weight: '14–16 kg', chest: '56 cm' },
  { id: 8, size: '4-5Y', height: '104–110 cm', weight: '16–18 kg', chest: '58 cm' },
  { id: 9, size: '5-6Y', height: '110–116 cm', weight: '18–20 kg', chest: '60 cm' },
  { id: 10, size: '6-7Y', height: '116–122 cm', weight: '20–22 kg', chest: '62 cm' },
  { id: 11, size: '7-8Y', height: '122–128 cm', weight: '22–25 kg', chest: '64 cm' },
  { id: 12, size: '8-9Y', height: '128–134 cm', weight: '25–28 kg', chest: '66 cm' },
  { id: 13, size: '9-10Y', height: '134–140 cm', weight: '28–31 kg', chest: '68 cm' },
  { id: 14, size: '10-11Y', height: '140–146 cm', weight: '31–34 kg', chest: '70 cm' },
  { id: 15, size: '11-12Y', height: '146–152 cm', weight: '34–37 kg', chest: '72 cm' },
];