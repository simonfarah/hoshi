import { Inter } from 'next/font/google';
import LocalFont from 'next/font/local';

export const fontDefault = Inter({
  subsets: ['latin'],
  variable: '--font-default',
});

export const fontDisplay = LocalFont({
  src: 'CalSans-SemiBold.ttf',
  variable: '--font-display',
});
