"use client";
import { MyPagination } from "@/components/shared/MyPagination";
import { MarketplaceTable } from "@/components/tables/MarketplaceTable";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const MarketplacePage = () => {
  const statData = [
    {
      title: "Total Item",
      count: 2348,
    },
    {
      title: "Active Sold",
      count: 1523,
    },
    {
      title: "Not Sold",
      count: 12,
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
        {statData.map((item, index) => (
          <Card key={index} className="@container/card">
            <CardHeader>
              <CardDescription>{item.title}</CardDescription>
              <CardTitle className="text-3xl font-bold tabular-nums ">
                {item.count}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      {/* tables */}
      <div className="mt-10">
        <MarketplaceTable
          handleView={handleView}
          handleSuspend={handleSuspend}
        />
        <MyPagination />
      </div>
    </div>
  );
};

export default MarketplacePage;
