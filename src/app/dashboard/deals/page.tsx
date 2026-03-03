/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { MyPagination } from "@/components/shared/MyPagination";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PromoCard } from "../../../components/cards/PromoCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MyModal } from "@/components/shared/MyModal";
import { AddDealsForm } from "@/components/forms/AddDealsForm";
import {
  useGetAllDealsQuery,
  useGetDealsStatsQuery,
} from "@/redux/service/deals/dealsApi";
import { Skeleton } from "@/components/ui/skeleton";

const DealsPage = () => {
  const [open, setOpen] = useState(false);

  // api
  const { data: statsData, isLoading: statsLoading } =
    useGetDealsStatsQuery(undefined);

  const { data: dealsData, isLoading: dealsLoading } = useGetAllDealsQuery({});

  const data = statsData?.data || {};
  const statData = [
    {
      title: "Total Offers",
      count: data?.totalOffers?.total || 0,
    },
    {
      title: "Active Offers",
      count: data?.activeOffers?.total || 0,
    },
    {
      title: "Expired Offers",
      count: data?.expiredOffers?.total || 0,
    },
  ];

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div className="mb-10">
          <h4 className="text-[36px]">Deals Management</h4>
          <p>Manage and monitor deals management</p>
        </div>
        <Button onClick={() => setOpen(!open)} className="bg-primary">
          Add Deals
        </Button>
      </div>

      {/* Top cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="@container/card">
                <CardHeader>
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-8 w-3/4" />
                </CardHeader>
              </Card>
            ))
          : statData.map((item, index) => (
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

      {/* Deals list */}
      <div className="mt-10">
        <div className="flex flex-col gap-8">
          {dealsLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="p-5">
                  <Skeleton className="h-6 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-1" />
                  <Skeleton className="h-4 w-1/2" />
                </Card>
              ))
            : dealsData?.data?.map((deals: any, index: number) => (
                <PromoCard
                  key={index}
                  badge="Service"
                  title={deals?.title || "20% Off Premium Car Wash"}
                  description={
                    deals?.description ||
                    "Get your vehicle professionally detailed at Elite Auto Spa"
                  }
                  promoCode={deals?.promoCode || "ELITE20"}
                  expiresDate={deals?.expireDate || "Feb 15"}
                />
              ))}
        </div>
        <MyPagination />
      </div>

      <MyModal open={open} onOpenChange={setOpen}>
        <AddDealsForm />
      </MyModal>
    </div>
  );
};

export default DealsPage;
