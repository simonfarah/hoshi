'use client';

import * as React from 'react';
import { cx } from '#/lib/utils';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cx(
        'cursor-pointer text-sm font-medium leading-none',
        className,
      )}
      onMouseDown={(event) => {
        // only prevent text selection if clicking inside the label itself
        const target = event.target as HTMLElement;
        if (target.closest('button, input, select, textarea')) return;

        props.onMouseDown?.(event);
        // prevent text selection when double clicking label
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }}
      {...props}
    />
  ),
);
Label.displayName = 'Label';
