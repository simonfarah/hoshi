'use client';

import { usePathname } from 'next/navigation';
import { Link } from '#/components/ui/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '#/components/ui/tooltip';
import { DASHBOARD_NAV_LINKS } from '#/lib/constants';

export function SideNav() {
  const pathname = usePathname();

  return (
    <aside>
      <TooltipProvider>
        <nav className="grid gap-1">
          {DASHBOARD_NAV_LINKS.map((link) => (
            <Tooltip key={link.name}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  variant={pathname === link.href ? 'secondary' : 'ghost'}
                  size="icon"
                >
                  <link.icon className="h-5 w-5" />
                </Link>
              </TooltipTrigger>

              <TooltipContent side="right" sideOffset={5}>
                {link.name}
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </TooltipProvider>
    </aside>
  );
}
