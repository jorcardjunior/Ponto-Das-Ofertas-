import { Skeleton } from '@/components/Skeleton';

export default function ProdutosLoading() {
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

        {/* Products page content skeleton */}
        <div className="flex-1 p-6">
          {/* Product table container — matches ProductTable layout exactly */}
          <div className="overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm">
            {/* Table header: title + count + search bar */}
            <div className="flex flex-col gap-4 border-b border-border/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Skeleton className="h-5 w-28 mb-1.5" />
                <Skeleton className="h-3.5 w-40" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-72 rounded-xl" />
                <Skeleton className="h-9 w-32 rounded-lg" />
              </div>
            </div>

            {/* Table column headers */}
            <div className="border-b border-border/50 bg-muted/20 px-4 py-3.5">
              <div className="flex gap-4">
                <Skeleton className="h-3.5 w-16" />
                <Skeleton className="h-3.5 w-14" />
                <Skeleton className="h-3.5 w-20" />
                <Skeleton className="h-3.5 w-12 ml-auto" />
                <Skeleton className="h-3.5 w-14 ml-auto" />
                <Skeleton className="h-3.5 w-12 ml-auto" />
              </div>
            </div>

            {/* Table rows — matching ProductTable's actual columns */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="border-b border-border/30 last:border-b-0 px-4 py-3.5"
              >
                <div className="flex gap-4 items-center">
                  {/* Produto name + SKU */}
                  <div className="min-w-0 flex-1">
                    <Skeleton className="h-4 w-36 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  {/* Canal (marketplace badge) */}
                  <Skeleton className="h-5 w-20 rounded-full" />
                  {/* Categoria (dot + text) */}
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-2.5 w-2.5 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  {/* Preço */}
                  <Skeleton className="h-4 w-20 ml-auto" />
                  {/* Estoque badge */}
                  <Skeleton className="h-6 w-10 rounded-lg ml-auto" />
                  {/* Ações */}
                  <div className="flex gap-1 ml-auto">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-border/50 px-5 py-3">
              <Skeleton className="h-4 w-32" />
              <div className="flex items-center gap-1">
                <Skeleton className="h-8 w-8 rounded-lg" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 min-w-[32px] rounded-lg" />
                ))}
                <Skeleton className="h-8 w-8 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
