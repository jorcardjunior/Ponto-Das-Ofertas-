import { Skeleton } from '@/components/Skeleton';

export default function CategoriasLoading() {
  return (
    <div className="animate-skeleton-in flex min-h-screen bg-background">
      {/* Sidebar skeleton */}
      <div className="hidden lg:flex flex-col w-64 border-r border-border bg-card/50 p-4 gap-3">
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-44" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-40" />
      </div>

      {/* Main content skeleton */}
      <div className="flex-1 flex flex-col">
        {/* Header skeleton */}
        <div className="h-14 border-b border-border bg-card/50 px-6 flex items-center justify-between">
          <Skeleton className="h-5 w-48" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* Categories page content skeleton */}
        <div className="flex-1 p-6 space-y-6">
          {/* Page title */}
          <Skeleton className="h-7 w-44" />

          {/* Category manager section — matches CategoryManager layout */}
          <div className="space-y-4">
            {/* Input + color picker + add button */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
              <Skeleton className="h-10 w-32 rounded-lg" />
            </div>

            {/* Category cards grid — 3 columns on lg, 2 on sm */}
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-border/50 bg-card px-4 py-3 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-3 w-3 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-3.5 w-3.5 rounded opacity-30" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
