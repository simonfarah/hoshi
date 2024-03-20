import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Link } from '#/components/ui/link';
import { validateRequest } from '#/lib/auth/validate-request';
import { REDIRECTS } from '#/lib/constants';
import { UserDetails } from './_components/user-details';

export const metadata: Metadata = {
  title: 'Home',
};

export default async function HomePage() {
  const { user } = await validateRequest();

  if (user && !user.emailVerified) {
    redirect(REDIRECTS.toVerify);
  }

  return (
    <section className="flex min-h-svh items-center justify-center p-5">
      {user ? (
        <UserDetails user={user} />
      ) : (
        <div className="flex items-center justify-center space-x-2">
          <Link href="/sign-up" variant="primary">
            Sign up
          </Link>

          <Link href="/sign-in" variant="outline">
            Sign in
          </Link>
        </div>
      )}
    </section>
  );
}
