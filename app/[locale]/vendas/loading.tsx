import { Skeleton, SkeletonCard, SkeletonTable, SkeletonChart } from '@/components/Skeleton';

export default function VendasLoading() {
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

        {/* Sales page content skeleton */}
        <div className="flex-1 p-6 space-y-6">
          {/* Page title */}
          <Skeleton className="h-7 w-32" />

          {/* Summary stats row — total vendas, receita, ticket médio, etc. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>

          {/* Main content: Sales table + SalesChart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sales table — 2/3 width */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden">
                {/* Table header: title + search */}
                <div className="flex flex-col gap-4 border-b border-border/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <Skeleton className="h-5 w-24 mb-1.5" />
                    <Skeleton className="h-3.5 w-36" />
                  </div>
                  <Skeleton className="h-9 w-64 rounded-xl" />
                </div>

                {/* Table column headers */}
                <div className="border-b border-border/50 bg-muted/20 px-4 py-3.5">
                  <div className="flex gap-4">
                    <Skeleton className="h-3.5 w-20" />
                    <Skeleton className="h-3.5 w-16" />
                    <Skeleton className="h-3.5 w-24" />
                    <Skeleton className="h-3.5 w-16 ml-auto" />
                    <Skeleton className="h-3.5 w-14 ml-auto" />
                  </div>
                </div>

                {/* Table rows */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="border-b border-border/30 last:border-b-0 px-4 py-3.5"
                  >
                    <div className="flex gap-4 items-center">
                      {/* Product name */}
                      <div className="min-w-0 flex-1">
                        <Skeleton className="h-4 w-32 mb-1" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      {/* Channel badge */}
                      <Skeleton className="h-5 w-20 rounded-full" />
                      {/* Date */}
                      <Skeleton className="h-4 w-20" />
                      {/* Quantity */}
                      <Skeleton className="h-4 w-12 ml-auto" />
                      {/* Total */}
                      <Skeleton className="h-4 w-20 ml-auto" />
                    </div>
                  </div>
                ))}

                {/* Pagination */}
                <div className="flex items-center justify-between border-t border-border/50 px-5 py-3">
                  <Skeleton className="h-4 w-32" />
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-8 min-w-[32px] rounded-lg" />
                    ))}
                    <Skeleton className="h-8 w-8 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>

            {/* SalesChart — 1/3 width */}
            <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
              {/* Chart header: TrendingUp icon + title */}
              <div className="flex items-center gap-2 mb-1">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-5 w-32" />
              </div>
              {/* Subtitle: total sales + revenue */}
              <Skeleton className="h-3.5 w-48 mb-6" />

              {/* Bar chart — 12 monthly bars */}
              <div className="flex items-end gap-1.5 h-32">
                {Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="flex-1 rounded-md"
                    style={{ height: `${20 + Math.random() * 80}%` }}
                  />
                ))}
              </div>

              {/* Month labels */}
              <div className="flex gap-1.5 mt-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton key={i} className="flex-1 h-2 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
