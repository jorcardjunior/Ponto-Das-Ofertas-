import { Skeleton } from '@/components/Skeleton';

export default function FornecedoresLoading() {
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

        {/* Suppliers page content skeleton */}
        <div className="flex-1 p-6">
          {/* SupplierManager card — matches the component layout exactly */}
          <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
            {/* Title + count + "Novo" button */}
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-5 w-32 mb-1.5" />
                <Skeleton className="h-3.5 w-28" />
              </div>
              <Skeleton className="h-9 w-20 rounded-lg" />
            </div>

            {/* Supplier cards list */}
            <div className="mt-4 space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-border/50 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    {/* Building2 icon */}
                    <Skeleton className="h-4 w-4" />
                    <div>
                      {/* Supplier name */}
                      <Skeleton className="h-4 w-36 mb-1" />
                      {/* Contact + product count */}
                      <Skeleton className="h-3 w-48" />
                    </div>
                  </div>
                  {/* Delete button (visible on hover in real UI) */}
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
