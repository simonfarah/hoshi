import { redirect } from 'next/navigation';
import { validateRequest } from '#/lib/auth/validate-request';
import { REDIRECTS } from '#/lib/constants';

export default async function SettingsPage() {
  const { user } = await validateRequest();

  if (!user) {
    redirect(REDIRECTS.toSignIn);
  }

  if (!user.emailVerified) {
    redirect(REDIRECTS.toVerify);
  }

  return <h1 className="text-2xl">Settings</h1>;
}
