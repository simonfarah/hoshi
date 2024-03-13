import { type ReactNode } from 'react';
import { Icons } from '#/components/icons';
import { Link } from '#/components/ui/link';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <div className="flex min-h-svh items-center justify-center p-5">
        <div className="absolute left-px top-5 sm:left-5">
          <Link href="/" variant="ghost">
            <Icons.chevronLeft className="mr-1 h-4 w-4" />
            Home
          </Link>
        </div>

        <div className="max-w-md flex-1 py-14">{children}</div>
      </div>
    </main>
  );
}
