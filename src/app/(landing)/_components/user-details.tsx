'use client';

import { useRouter } from 'next/navigation';
import { type User } from 'lucia';
import { toast } from 'sonner';
import { Button } from '#/components/ui/button';
import { REDIRECTS } from '#/lib/constants';
import { api } from '#/trpc/react';

type UserDetailsProps = {
  user: User;
};

export function UserDetails({ user }: UserDetailsProps) {
  const router = useRouter();

  const { mutate: signOut, isLoading } = api.auth.signOut.useMutation({
    onSuccess: (res) => {
      toast.success(res.success);
      router.push(REDIRECTS.afterSignOut);
      router.refresh();
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return (
    <div className="space-y-4 text-center">
      <h1 className="text-3xl font-bold">Welcome back!</h1>

      <div className="rounded-md bg-primary/90 p-3 text-left text-primary-foreground">
        <pre>{JSON.stringify(user, undefined, 2)}</pre>
      </div>

      <Button
        variant="destructive"
        onClick={() => signOut()}
        disabled={isLoading}
        isLoading={isLoading}
      >
        Sign out
      </Button>
    </div>
  );
}
