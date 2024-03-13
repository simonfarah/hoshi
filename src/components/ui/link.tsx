'use client';

import NextLink from 'next/link';
import * as React from 'react';
import { type VariantProps } from 'cva';
import { buttonVariants } from '#/components/ui/button';
import { cx } from '#/lib/utils';

type LinkProps = React.ComponentPropsWithoutRef<typeof NextLink> &
  VariantProps<typeof buttonVariants>;

export const Link = React.forwardRef<
  React.ElementRef<typeof NextLink>,
  LinkProps
>(({ className, variant = 'link', size, ...props }, ref) => (
  <NextLink
    ref={ref}
    className={cx(buttonVariants({ variant, size, className }))}
    {...props}
  />
));
Link.displayName = NextLink.displayName;
