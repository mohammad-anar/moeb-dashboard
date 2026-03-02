"use client";
import { AnalyticsChart1 } from "@/components/charts/AreaChart";
import { SectionCards } from "@/components/section-cards";
import {
  useGetAllStatsQuery,
  useGetMonthlyTrendsQuery,
} from "@/redux/service/dashboard-stats/analyticsApi";
import { Skeleton } from "@/components/ui/skeleton";

const MainPage = () => {
  const { data: allStats, isLoading: allStatsLoading } = useGetAllStatsQuery(
    {},
  );
  const { data: monthlyTrends, isLoading: monthlyTrendsLoading } =
    useGetMonthlyTrendsQuery({});

  if (allStatsLoading || monthlyTrendsLoading) {
    return <DashboardLoader />;
  }
  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards data={allStats} />
          </div>
          <div className="p-5">
            <AnalyticsChart1 data={monthlyTrends} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;

export function DashboardLoader() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        {/* Section Cards Skeleton */}
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-5">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Chart Skeleton */}
        <div className="p-5">
          <Skeleton className="h-80 rounded-lg" />
          <div className="mt-5 grid grid-cols-2 gap-5">
            <Skeleton className="h-80 rounded-lg" />
            <Skeleton className="h-80 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
