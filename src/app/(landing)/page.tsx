import { type Metadata } from 'next';
import { Link } from '#/components/ui/link';

export const metadata: Metadata = {
  title: 'Home',
};

export default function HomePage() {
  return (
    <section className="flex min-h-svh items-center justify-center p-5">
      <div className="flex items-center justify-center space-x-2">
        <Link href="/sign-up" variant="primary">
          Sign up
        </Link>

        <Link href="/sign-in" variant="outline">
          Sign in
        </Link>
      </div>
    </section>
  );
}
