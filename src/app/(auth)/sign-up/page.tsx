import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Link } from '#/components/ui/link';
import { validateRequest } from '#/lib/auth/validate-request';
import { APP_TITLE, REDIRECTS } from '#/lib/constants';
import { OAuth } from '../_components/oauth';
import { SignUpForm } from './_components/sign-up-form';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default async function SignUpPage() {
  const { user } = await validateRequest();

  if (user) {
    if (user.emailVerified) {
      redirect(REDIRECTS.afterSignIn);
    }

    redirect(REDIRECTS.toVerify);
  }

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold">Create your {APP_TITLE} account</h1>

        <p className="mt-px text-lg text-muted-foreground">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-lg">
            Sign in
          </Link>
        </p>
      </div>

      <OAuth />

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>

      <SignUpForm />
    </div>
  );
}
