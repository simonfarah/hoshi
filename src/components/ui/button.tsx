import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'cva';
import { Icons } from '#/components/icons';
import { cva, cx } from '#/lib/utils';

export const buttonVariants = cva({
  base: 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    variant: {
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      outline:
        'border border-border text-secondary-foreground hover:bg-secondary',
      ghost: 'text-secondary-foreground hover:bg-secondary',
      destructive: 'bg-red-500 text-white',
      link: 'text-primary underline-offset-[25%] hover:underline',
    },
    size: {
      sm: 'h-8 px-3 text-xs',
      md: 'h-9 px-4',
      lg: 'h-10 px-8',
      icon: 'h-9 w-9',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
  compoundVariants: [
    {
      variant: 'link',
      className: 'h-auto px-0 py-0',
    },
  ],
});

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant,
      size,
      isLoading,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        type="button"
        className={cx(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4" />}
        {children}
      </Comp>
    );
  },
);
Button.displayName = 'Button';
