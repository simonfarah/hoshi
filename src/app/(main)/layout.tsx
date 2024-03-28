import { redirect } from 'next/navigation';
import { type ReactNode } from 'react';
import { Logo } from '#/components/logo';
import { Link } from '#/components/ui/link';
import { validateRequest } from '#/lib/auth/validate-request';
import { REDIRECTS } from '#/lib/constants';
import { SideNav } from './_components/side-nav';
import { UserDropdown } from './_components/user-dropdown';

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = await validateRequest();

  if (!user) {
    redirect(REDIRECTS.toSignIn);
  }

  if (!user.emailVerified) {
    redirect(REDIRECTS.toVerify);
  }

  return (
    <div className="relative">
      <header className="sticky top-0 flex h-14 items-center justify-between bg-background px-3">
        <Link href="/dashboard" className="ml-1.5">
          <Logo className="h-6 w-6" />
        </Link>

        <UserDropdown user={user} />
      </header>

      <div className="flex">
        <div className="sticky top-14 h-[calc(100svh-56px)] p-3">
          <SideNav />
        </div>

        <main className="min-h-[calc(100svh-56px)] flex-1 overflow-auto p-3 pl-8">
          {children}
        </main>
      </div>
    </div>
  );
}
