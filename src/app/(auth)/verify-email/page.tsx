import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import { validateRequest } from '#/lib/auth/validate-request';
import { APP_TITLE, REDIRECTS } from '#/lib/constants';
import { VerifyEmailForm } from './_components/verify-email-form';

export const metadata: Metadata = {
  title: 'Verify Email',
};

export default async function VerifyEmailPage() {
  const { user } = await validateRequest();

  if (!user) {
    redirect(REDIRECTS.toSignIn);
  }

  if (user.emailVerified) {
    redirect(REDIRECTS.afterSignIn);
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl">Verify your {APP_TITLE} account</h1>

        <p className="mt-px text-lg text-muted-foreground">
          We sent you an email with a code. Please enter it below to verify your
          account.
        </p>
      </div>

      <VerifyEmailForm />
    </div>
  );
}
