'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { type z } from 'zod';
import { Button } from '#/components/ui/button';
import { Input } from '#/components/ui/input';
import { Label } from '#/components/ui/label';
import { forgotPasswordSchema } from '#/lib/validators/auth';
import { api } from '#/trpc/react';

type FormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { mutate: sendPasswordResetEmail, isLoading } =
    api.auth.sendPasswordResetEmail.useMutation({
      onSuccess: (res) => {
        toast.success(res.success);
        reset({ email: '' });
      },
      onError: (e) => {
        toast.error(e.message);
      },
    });

  return (
    <form
      onSubmit={handleSubmit((data) => sendPasswordResetEmail(data))}
      className="space-y-4"
    >
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

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
        isLoading={isLoading}
      >
        Send reset email
      </Button>
    </form>
  );
}
