import { Skeleton, SkeletonCard, SkeletonTable, SkeletonChart } from '@/components/Skeleton';

export default function DashboardLoading() {
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
        <div className="mt-auto">
          <Skeleton className="h-4 w-28" />
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="flex-1 flex flex-col">
        {/* Header skeleton */}
        <div className="h-14 border-b border-border bg-card/50 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 lg:hidden" />
            <Skeleton className="h-5 w-48" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-24 hidden sm:block" />
          </div>
        </div>

        {/* Dashboard content skeleton */}
        <div className="flex-1 p-6 space-y-6">
          {/* Welcome banner */}
          <div className="rounded-xl border border-border bg-card p-6">
            <Skeleton className="h-7 w-56 mb-2" />
            <Skeleton className="h-4 w-80" />
          </div>

          {/* Metric cards row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>

          {/* Table + Chart grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SkeletonTable rows={5} />
            </div>
            <SkeletonChart />
          </div>
        </div>
      </div>
    </div>
  );
}
