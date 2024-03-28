import { type ReactNode } from 'react';
import { SideNav } from './_components/side-nav';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid h-svh w-full pl-[53px]">
      <SideNav />

      <div className="flex flex-col">
        {/* <header className="sticky top-0 z-10 flex h-[53px] items-center border-b border-border bg-background px-4">
          <h1 className="text-xl font-semibold">Playground</h1>
        </header> */}

        <main className="overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
}
