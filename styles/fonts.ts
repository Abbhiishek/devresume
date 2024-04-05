import {
  EB_Garamond,
  Faustina,
  Inter,
  Kanit,
  Lora,
  Shadows_Into_Light,
  Silkscreen,
  Work_Sans,
} from 'next/font/google';
import localFont from 'next/font/local';

export const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});
export const cal = localFont({
  src: './CalSans-SemiBold.otf',
  variable: '--font-cal',
  weight: '600',
  display: 'swap',
});

export const calTitle = localFont({
  src: './CalSans-SemiBold.otf',
  variable: '--font-title',
  weight: '600',
  display: 'swap',
});
export const lora = Lora({
  variable: '--font-title',
  subsets: ['latin'],
  weight: '600',
  display: 'swap',
});
export const work = Work_Sans({
  variable: '--font-title',
  subsets: ['latin'],
  weight: '600',
  display: 'swap',
});

export const garamond = EB_Garamond({
  variable: '--font-title',
  subsets: ['latin'],
  weight: '600',
  display: 'swap',
});

export const shadowIntoLight = Shadows_Into_Light({
  variable: '--font-title',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export const futura = Faustina({
  variable: '--font-title',
  weight: '600',
  subsets: ['vietnamese'],
  display: 'swap',
});

export const kanit = Kanit({
  variable: '--font-title',
  weight: '600',
  subsets: ['latin', 'latin-ext', 'vietnamese', 'thai'],
  display: 'swap',
});

export const silkscreen = Silkscreen({
  variable: '--font-title',
  weight: '700',
  subsets: ['latin'],
  display: 'swap',
});

export const fontList = [
  {
    name: 'Cal Sans',
    value: 'font-cal',
  },
  {
    name: 'Lora',
    value: 'font-lora',
  },
  {
    name: 'Work Sans',
    value: 'font-work',
  },
  {
    name: 'Shadows Into Light',
    value: 'font-shadow-into-light',
  },
  {
    name: 'EB Garamond',
    value: 'font-garamond',
  },
  {
    name: 'Faustina',
    value: 'font-futura',
  },
  {
    name: 'Kanit',
    value: 'font-kanit',
  },
  {
    name: 'Silkscreen',
    value: 'font-silkscreen',
  },
];

export const fontMapper = {
  'font-cal': calTitle.variable,
  'font-lora': lora.variable,
  'font-work': work.variable,
  'font-shadow-into-light': shadowIntoLight.variable,
  'font-garamond': garamond.variable,
  'font-futura': futura.variable,
  'font-helvetica': futura.variable,
  'font-silkscreen': silkscreen.variable,
  'font-kanit': kanit.variable,
} as Record<string, string>;

//font-futura
//font-helvetica
