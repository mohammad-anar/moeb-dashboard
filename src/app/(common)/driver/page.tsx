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

const DriverPage = () => {
  const statData = [
    {
      title: "Total Users",
      count: 2348,
    },
    {
      title: "Active this month",
      count: 1523,
    },
    {
      title: "Total Suspended",
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
        <DriverTable handleView={handleView} handleSuspend={handleSuspend} />
        <MyPagination />
      </div>
    </div>
  );
};

export default DriverPage;
