'use client';

import * as React from 'react';
import { Icons } from '#/components/icons';
import { cx } from '#/lib/utils';

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <div className="relative flex items-center">
      <input
        ref={ref}
        type="checkbox"
        className={cx(
          'peer h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-sm border border-primary bg-transparent checked:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />

      <div className="pointer-events-none absolute inset-0 m-px text-primary-foreground opacity-0 transition-opacity peer-checked:opacity-100">
        <Icons.check className="h-full w-full" />
      </div>
    </div>
  ),
);
Checkbox.displayName = 'Checkbox';
