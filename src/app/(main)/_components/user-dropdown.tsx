'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type User } from 'lucia';
import { toast } from 'sonner';
import { Button } from '#/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu';
import { DASHBOARD_NAV_LINKS, REDIRECTS } from '#/lib/constants';
import { api } from '#/trpc/react';

type UserDropdownProps = {
  user: User;
};

export function UserDropdown({ user }: UserDropdownProps) {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          {user.email[0]!.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <div className="p-2">
          <p className="w-[200px] truncate text-sm text-muted-foreground">
            {user.email}
          </p>
        </div>

        <DropdownMenuSeparator />

        {DASHBOARD_NAV_LINKS.map((link) => (
          <DropdownMenuItem asChild>
            <Link key={link.name} href={link.href}>
              {link.name}
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer focus:bg-red-500 focus:text-white"
          onSelect={(event) => {
            event.preventDefault();
            signOut();
          }}
          disabled={isLoading}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
