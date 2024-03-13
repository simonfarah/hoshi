import { Bricolage_Grotesque, Inter } from 'next/font/google';

export const fontDefault = Inter({
  subsets: ['latin'],
  variable: '--font-default',
});

export const fontDisplay = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  adjustFontFallback: false,
});
