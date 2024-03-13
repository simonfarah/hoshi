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
import { verifyEmailSchema } from '#/lib/validators/auth';
import { api } from '#/trpc/react';

type FormData = z.infer<typeof verifyEmailSchema>;

export function VerifyEmailForm() {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(verifyEmailSchema),
  });

  const { mutate: verifyEmail, isLoading } = api.auth.verifyEmail.useMutation({
    onSuccess: (res) => {
      toast.success(res.success);
      router.push(REDIRECTS.afterVerify);
      router.refresh();
    },
    onError: (e) => {
      toast.error(e.message);
      reset({ code: '' });
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => verifyEmail(data))}
      className="space-y-4"
    >
      <div className="space-y-1">
        <Label htmlFor="code">Code</Label>

        <Input
          id="code"
          type="text"
          disabled={isLoading}
          {...register('code')}
        />

        {errors.code && (
          <p className="text-sm text-destructive">{errors.code.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
        isLoading={isLoading}
      >
        Verify email
      </Button>
    </form>
  );
}
