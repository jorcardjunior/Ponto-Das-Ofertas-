import { Skeleton, SkeletonCard, SkeletonTable } from '@/components/Skeleton';

export default function Loading() {
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

        {/* Page content skeleton */}
        <div className="flex-1 p-6 space-y-6">
          {/* Title */}
          <Skeleton className="h-8 w-64" />

          {/* Metric cards row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>

          {/* Table section */}
          <SkeletonTable rows={5} />
        </div>
      </div>
    </div>
  );
}
