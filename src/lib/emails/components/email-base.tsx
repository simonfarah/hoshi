import { type ReactNode } from 'react';
import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Tailwind,
} from '@react-email/components';
import { env } from '#/env';
import { APP_TITLE } from '#/lib/constants';

type EmailBaseProps = {
  children: ReactNode;
  preview: string;
};

export function EmailBase({ children, preview }: EmailBaseProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>

      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                background: '#ffffff',
                foreground: '#1a212d',
                primary: {
                  DEFAULT: '#121212',
                  foreground: '#ffffff',
                },
                secondary: {
                  DEFAULT: '#edf2f7',
                  foreground: '1a212d',
                },
                muted: {
                  DEFAULT: '#f8fafc',
                  foreground: '#4a5568',
                },
                border: '#cdd7e5',
              },
            },
          },
        }}
      >
        <Body className="mx-auto my-auto bg-background font-sans text-foreground">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-border px-10 py-5">
            <Img
              src={env.NEXT_PUBLIC_APP_URL + '/static/logo-foreground.png'}
              alt={APP_TITLE}
              width="28"
              height="28"
            />

            {children}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
