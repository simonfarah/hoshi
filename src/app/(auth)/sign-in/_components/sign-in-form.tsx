'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { type z } from 'zod';
import { Button } from '#/components/ui/button';
import { Input } from '#/components/ui/input';
import { Label } from '#/components/ui/label';
import { Link } from '#/components/ui/link';
import { REDIRECTS } from '#/lib/constants';
import { signInSchema } from '#/lib/validators/auth';
import { api } from '#/trpc/react';

type FormData = z.infer<typeof signInSchema>;

export function SignInForm() {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(signInSchema),
  });

  const { mutate: signIn, isLoading } = api.auth.signIn.useMutation({
    onSuccess: (res) => {
      toast.success(res.success);
      router.push(REDIRECTS.afterSignIn);
      router.refresh();
    },
    onError: (e) => {
      toast.error(e.message);
      reset({ password: '' });
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => signIn(data))} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          disabled={isLoading}
          {...register('email')}
        />

        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link href="/reset-password">Forgot password?</Link>
        </div>

        <Input
          id="password"
          type="password"
          disabled={isLoading}
          {...register('password')}
        />

        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
        isLoading={isLoading}
      >
        Sign in
      </Button>
    </form>
  );
}
