"use client";

import {
  IconCalendarSearch,
  IconCalendarUser,
  IconDashboard,
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
      url: "/",
      icon: IconDashboard,
    },
    {
      name: "Driver Management",
      url: "/driver",
      icon: IconUsersGroup,
    },
    {
      name: "Deals Management",
      url: "/deals",
      icon: IconCalendarUser,
    },
    {
      name: "Marketplace Management",
      url: "/marketplace",
      icon: IconCalendarSearch,
    },
    {
      name: "Support",
      url: "/support",
      icon: IconMessage,
    },
    {
      name: "Terms & Conditions",
      url: "/user",
      icon: IconNotes,
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
            <div className="flex items-center justify-center px-8 pb-2">
              <Link
                href="/"
                className="block w-28 duration-300 rounded-full overflow-hidden"
              >
                <Image
                  src={logo}
                  className="w-full h-full"
                  width={300}
                  height={300}
                  alt="Marbapp logo"
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
