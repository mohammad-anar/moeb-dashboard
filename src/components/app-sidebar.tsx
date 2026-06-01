"use client";

import {
  IconCalendarSearch,
  IconCalendarUser,
  IconDashboard,
  IconMapPin,
  IconMessage,
  IconNotes,
  IconUsersGroup,
} from "@tabler/icons-react";
import * as React from "react";

import logo from "@/assets/logo.png";
import { NavDocuments } from "@/components/nav-documents";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

const data = {
  documents: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      name: "Driver Management",
      url: "/dashboard/driver",
      icon: IconUsersGroup,
    },
    {
      name: "Job Management",
      url: "/dashboard/job",
      icon: IconCalendarSearch,
    },
    {
      name: "Deals Management",
      url: "/dashboard/deals",
      icon: IconCalendarUser,
    },
    {
      name: "Marketplace Management",
      url: "/dashboard/marketplace",
      icon: IconCalendarSearch,
    },
    {
      name: "Support",
      url: "/dashboard/support",
      icon: IconMessage,
    },
    {
      name: "Terms & Conditions",
      url: "/dashboard/terms-and-condition",
      icon: IconNotes,
    },
    {
      name: "Service Area",
      url: "/dashboard/service-area",
      icon: IconMapPin,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* <SidebarMenuButton asChild className=" flex items-center border"> */}
            <div className="flex items-center justify-center pb-2">
              <Link
                href="/"
                className="block w-full duration-300  overflow-hidden"
              >
                <Image
                  src={logo}
                  className="w-full h-full"
                  width={300}
                  height={300}
                  alt="Ekkali logo"
                />
              </Link>
            </div>
            {/* </SidebarMenuButton> */}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavDocuments items={data.documents} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
    </Sidebar>
  );
}
