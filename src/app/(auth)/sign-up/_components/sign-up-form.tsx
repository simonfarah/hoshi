'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { type z } from 'zod';
import { Button } from '#/components/ui/button';
import { Checkbox } from '#/components/ui/checkbox';
import { Input } from '#/components/ui/input';
import { Label } from '#/components/ui/label';
import { Link } from '#/components/ui/link';
import { APP_TITLE } from '#/lib/constants';
import { REDIRECTS } from '#/lib/constants';
import { signUpSchema } from '#/lib/validators/auth';
import { api } from '#/trpc/react';

type FormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  });

  const { mutate: signUp, isLoading } = api.auth.signUp.useMutation({
    onSuccess: (res) => {
      toast.success(res.success);
      router.push(REDIRECTS.toVerify);
      router.refresh();
    },
    onError: (e) => {
      toast.error(e.message);
      reset({
        email: '',
        password: '',
        confirmPassword: '',
        termsOfService: false,
      });
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => signUp(data))} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          disabled={isLoading}
          {...register('email')}
        />

        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

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

      <p className="my-1 text-muted-foreground">
        By registering, you agree to the processing of your personal data by{' '}
        {APP_TITLE} as described in the{' '}
        <Link href="#" className="text-base">
          Privacy Policy
        </Link>
        .
      </p>

      <div className="space-y-1">
        <Label htmlFor="termsOfService" className="flex items-center">
          <Checkbox
            id="termsOfService"
            disabled={isLoading}
            {...register('termsOfService')}
          />

          <span className="ml-2">
            I&apos;ve read and agree to the{' '}
            <Link href="#">Terms of Service</Link>
          </span>
        </Label>

        {errors.termsOfService && (
          <p className="text-sm text-destructive">
            {errors.termsOfService.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
        isLoading={isLoading}
      >
        Sign up
      </Button>
    </form>
  );
}
