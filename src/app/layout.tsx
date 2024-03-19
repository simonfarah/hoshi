import { type Metadata, type Viewport } from 'next';
import { type ReactNode } from 'react';
import { Toaster } from 'sonner';
import { APP_TITLE } from '#/lib/constants';
import { cx } from '#/lib/utils';
import { fontDefault, fontDisplay } from '#/styles/fonts';
import '#/styles/globals.css';
import { TRPCReactProvider } from '#/trpc/react';

export const metadata: Metadata = {
  title: {
    default: APP_TITLE,
    template: `%s - ${APP_TITLE}`,
  },
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'mask-icon',
      url: '/safari-pinned-tab.svg',
      color: '#121212',
    },
  ],
  manifest: '/site.webmanifest',
  other: {
    'msapplication-config': '/browserconfig.xml',
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cx(
          fontDefault.variable,
          fontDisplay.variable,
          'bg-background font-default text-foreground selection:bg-primary/90 selection:text-primary-foreground',
        )}
      >
        <Toaster
          position="top-center"
          className="toaster group"
          toastOptions={{
            classNames: {
              toast:
                'group toast group-[.toaster]:items-start group-[.toaster]:font-default group-[.toaster]:shadow-md',
              title: 'group-[.toast]:-mt-0.5',
            },
          }}
          pauseWhenPageIsHidden
          richColors
        />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
