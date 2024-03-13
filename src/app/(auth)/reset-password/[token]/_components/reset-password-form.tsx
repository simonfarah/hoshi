'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { type z } from 'zod';
import { Button } from '#/components/ui/button';
import { Input } from '#/components/ui/input';
import { Label } from '#/components/ui/label';
import { REDIRECTS } from '#/lib/constants';
import { resetPasswordSchema } from '#/lib/validators/auth';
import { api } from '#/trpc/react';

type FormData = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate: resetPassword, isLoading } =
    api.auth.resetPassword.useMutation({
      onSuccess: (res) => {
        toast.success(res.success);
        router.push(REDIRECTS.toSignIn);
        router.refresh();
      },
      onError: (e) => {
        toast.error(e.message);
        reset({ password: '', confirmPassword: '' });
      },
    });

  return (
    <form
      onSubmit={handleSubmit((data) =>
        resetPassword({ data, verificationToken: token }),
      )}
      className="space-y-4"
    >
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>

        <Input
          id="password"
          type="password"
          disabled={isLoading}
          {...register('password')}
        />

        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="confirmPassword">Confirm password</Label>

        <Input
          id="confirmPassword"
          type="password"
          disabled={isLoading}
          {...register('confirmPassword')}
        />

        {errors.confirmPassword && (
          <p className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
        isLoading={isLoading}
      >
        Reset password
      </Button>
    </form>
  );
}
