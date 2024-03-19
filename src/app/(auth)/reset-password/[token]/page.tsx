import { type Metadata } from 'next';
import { ResetPasswordForm } from './_components/reset-password-form';

export const metadata: Metadata = {
  title: 'Reset Password',
};

type ResetPasswordPageProps = {
  params: {
    token: string;
  };
};

export default function ResetPasswordPage({
  params: { token },
}: ResetPasswordPageProps) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl">Reset your password</h1>

        <p className="mt-px text-lg text-muted-foreground">
          Enter your new password.
        </p>
      </div>

      <ResetPasswordForm token={token} />
    </div>
  );
}
