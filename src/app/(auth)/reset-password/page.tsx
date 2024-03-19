import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import { validateRequest } from '#/lib/auth/validate-request';
import { REDIRECTS } from '#/lib/constants';
import { ForgotPasswordForm } from './_components/forgot-password-form';

export const metadata: Metadata = {
  title: 'Forgot Password',
};

export default async function ForgotPasswordPage() {
  const { user } = await validateRequest();

  if (user) {
    if (user.emailVerified) {
      redirect(REDIRECTS.afterSignIn);
    }

    redirect(REDIRECTS.toVerify);
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl">Reset your password</h1>

        <p className="mt-px text-lg text-muted-foreground">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>
      </div>

      <ForgotPasswordForm />
    </div>
  );
}
