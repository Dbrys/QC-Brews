'use client';
import Link from 'next/link';
import BeerIcon from '@/icons/beerIcon';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <h1 className="text-6xl font-bold tracking-tight">QC Brews</h1>
        <div className="flex gap-4 items-center">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/overview"
          >
            <BeerIcon style={{ fontSize: '20px' }} />
            <span>Visit now</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
