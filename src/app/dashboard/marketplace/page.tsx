"use client";
import { MyPagination } from "@/components/shared/MyPagination";
import { MarketplaceTable } from "@/components/tables/MarketplaceTable";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetAllMarketPlaceQuery,
  useGetMarketPlaceStatsQuery,
} from "@/redux/service/marketPlace/marketPlaceApi";
import { useState } from "react";

const MarketplacePage = () => {
  const [currentPage, setCurrentpage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data: statsData, isLoading: statsLoading } =
    useGetMarketPlaceStatsQuery({});
  const data = statsData?.data;

  const { data: marketPlaceData, isLoading: marketPlaceLoading } =
    useGetAllMarketPlaceQuery({ page: currentPage, limit: limit });

  console.log(marketPlaceData);
  const statData = [
    {
      title: "Total Item",
      count: data?.totalItems?.total || 0,
    },
    {
      title: "Active Sold",
      count: data?.availableItems?.total || 0,
    },
    {
      title: "Not Sold",
      count: data?.soldItems?.total || 0,
    },
  ];

  const handleView = () => {
    console.log("click");
  };
  const handleSuspend = () => {
    console.log("click");
  };
  return (
    <div className="p-5">
      <div className="mb-10">
        <h4 className="text-[36px]">Marketplace </h4>
        <p>Manage and monitor all users on your platform</p>
      </div>
      {/* top cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <Card key={index}>
                <CardHeader>
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-8 w-3/4" />
                </CardHeader>
              </Card>
            ))
          : statData.map((item, index) => (
              <Card key={index}>
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
        <MarketplaceTable
          data={marketPlaceData?.data}
          marketPlaceLoading={marketPlaceLoading}
        />
        <MyPagination
          currentPage={currentPage}
          onPageChange={setCurrentpage}
          totalPages={marketPlaceData?.pagination?.totalPage}
        />
      </div>
    </div>
  );
};

export default MarketplacePage;
