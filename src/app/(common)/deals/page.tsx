"use client";
import { MyPagination } from "@/components/shared/MyPagination";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PromoCard } from "../cards/PromoCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MyModal } from "@/components/shared/MyModal";
import { AddDealsForm } from "@/components/forms/AddDealsForm";

const DriverPage = () => {
  const [open, setOpen] = useState(false);
  const statData = [
    {
      title: "Total Offers",
      count: 2348,
    },
    {
      title: "Active Offers",
      count: 1523,
    },
    {
      title: "Expired Offers",
      count: 12,
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
        <div className="flex flex-col gap-8">
          <PromoCard
            badge="Service"
            title="20% Off Premium Car Wash"
            description="Get your vehicle professionally detailed at Elite Auto Spa"
            promoCode="ELITE20"
            expiresDate="Feb 15"
          />

          <PromoCard
            badge="Maintenance"
            title="Free Oil Change Check"
            description="Complimentary oil inspection with any service booking"
            promoCode="OILFREE"
            expiresDate="Feb 20"
          />

          <PromoCard
            badge="Repair"
            title="15% Off Brake Service"
            description="Save on brake pad replacement and inspection"
            promoCode="BRAKE15"
            expiresDate="Mar 01"
          />

          <PromoCard
            badge="Detailing"
            title="30% Off Interior Cleaning"
            description="Deep interior cleaning for a fresher ride"
            promoCode="CLEAN30"
            expiresDate="Mar 10"
          />
        </div>{" "}
        <MyPagination />
      </div>
      <MyModal open={open} onOpenChange={setOpen}>
        <AddDealsForm />
      </MyModal>
    </div>
  );
};

export default DriverPage;
