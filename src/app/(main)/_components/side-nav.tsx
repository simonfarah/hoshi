import { Icons } from '#/components/icons';
import { Logo } from '#/components/logo';
import { Link } from '#/components/ui/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '#/components/ui/tooltip';

export function SideNav() {
  return (
    <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r border-border">
      <div className="border-b border-border p-2">
        <Link href="/dashboard" variant="outline" size="icon">
          <Logo className="h-5 w-5" />
        </Link>
      </div>

      <TooltipProvider>
        <nav className="grid gap-1 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/dashboard" variant="ghost" size="icon">
                <Icons.home className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Home
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/dashboard" variant="ghost" size="icon">
                <Icons.link className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Link
            </TooltipContent>
          </Tooltip>
        </nav>

        <nav className="mt-auto grid gap-1 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/dashboard" variant="ghost" size="icon">
                <Icons.settings className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Settings
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/dashboard" variant="ghost" size="icon">
                <Icons.signOut className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Sign out
            </TooltipContent>
          </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  );
}
