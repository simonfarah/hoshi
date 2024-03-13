'use client';

import { toast } from 'sonner';
import { Icons } from '#/components/icons';
import { Button } from '#/components/ui/button';

export function OAuth() {
  return (
    <div className="flex items-center space-x-2">
      <Button
        className="w-full"
        variant="outline"
        onClick={() => toast.warning('GitHub auth is not yet available')}
      >
        <Icons.gitHub className="mr-2 h-4 w-4" />
        GitHub
      </Button>

      <Button
        className="w-full"
        variant="outline"
        onClick={() => toast.warning('Google auth is not yet available')}
      >
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  );
}
