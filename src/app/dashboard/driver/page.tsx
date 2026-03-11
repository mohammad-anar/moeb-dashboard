"use client";
import { DriverView } from "@/components/page/driverManagement/DriverView";
import { MyPagination } from "@/components/shared/MyPagination";
import { DriverTable } from "@/components/tables/DriverTable";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetAllDriversQuery,
  useGetDriverStatsQuery,
} from "@/redux/service/driver/driverApi";
import { useState } from "react";

const DriverPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: driverStats, isLoading } = useGetDriverStatsQuery(undefined);

  const { data: drivers, isLoading: isDriversLoading } = useGetAllDriversQuery({
    page: currentPage,
    limit,
  });

  console.log(drivers);

  const statData = [
    {
      title: "Total Drivers",
      count: driverStats?.data?.totalDrivers?.total ?? 0,
    },
    {
      title: "Pending Drivers",
      count: driverStats?.data?.pendingDrivers?.total ?? 0,
    },
    {
      title: "Suspended Drivers",
      count: driverStats?.data?.suspendedDrivers?.total ?? 0,
    },
  ];

  
  return (
    <div className="p-5">
      <div className="mb-10">
        <h4 className="text-[36px]">Driver Management</h4>
        <p>Manage and monitor all users on your platform</p>
      </div>
      {/* top cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? // Render 4 skeleton cards while loading
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="@container/card">
                <CardHeader>
                  <Skeleton className="h-4 w-3/4 mb-2" /> {/* Title */}
                  <Skeleton className="h-8 w-1/2" /> {/* Count */}
                </CardHeader>
              </Card>
            ))
          : // Render actual stat cards
            statData.map((item, index) => (
              <Card key={index} className="@container/card">
                <CardHeader>
                  <CardDescription>{item.title}</CardDescription>
                  <CardTitle className="text-3xl font-bold tabular-nums">
                    {item.count}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
      </div>
      {/* tables */}
      <div className="mt-10">
        <DriverTable
          drivers={drivers?.data}
          isLoading={isDriversLoading}
        />
        <MyPagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={drivers?.pagination?.totalPage}
        />
      </div>
    </div>
  );
};

export default DriverPage;
