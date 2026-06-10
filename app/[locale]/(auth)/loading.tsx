import { Skeleton } from '@/components/Skeleton';

export default function AuthLoading() {
  return (
    <main className="animate-skeleton-in relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4">
      {/* Background gradients (matching login page) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.08)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(var(--primary)/0.05)_0%,_transparent_50%)]" />

      <div className="relative w-full max-w-md space-y-6">
        {/* Form card skeleton */}
        <div className="rounded-2xl border border-border/50 bg-card/95 p-8 shadow-xl backdrop-blur-xl">
          {/* Logo + brand */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>

          {/* Title + subtitle */}
          <div className="mt-6 space-y-2">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>

          {/* Form fields */}
          <div className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-14" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>

          {/* Footer link */}
          <div className="mt-6 flex justify-center">
            <Skeleton className="h-4 w-40" />
          </div>
        </div>

        {/* Feature badges */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-4 py-3 backdrop-blur-sm">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-4 py-3 backdrop-blur-sm">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-4 py-3 backdrop-blur-sm">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>
    </main>
  );
}
