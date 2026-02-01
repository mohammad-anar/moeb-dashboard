import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { IconBell } from "@tabler/icons-react";
import { User } from "lucide-react";
import Link from "next/link";

export function SiteHeader() {
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar:
        "https://i.ibb.co.com/VWkMFBWM/pngtree-user-icon-png-image-1796659.jpg",
    },
  };
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 text-black" />
        {/* <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        /> */}
        <h1 className="text-base font-medium">Documents</h1>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className={
                  " hover:bg-gray-100 duration-300 cursor-pointer rounded-md p-3"
                }
              >
                <div className="relative ">
                  <div className="w-5 h-5 rounded-full bg-red-500 absolute -right-2 -top-1 flex items-center justify-center">
                    <span className="text-[10px] text-white">5</span>
                  </div>
                  <IconBell size={28} className="h-full" />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <div className="px-2">
                <h4 className="font-bold text-lg">Notification</h4>
              </div>
              <DropdownMenuSeparator />
              <div className="px-2 max-h-[200px] overflow-y-auto">
                <div className="flex items-center  gap-3 bg-my-primary/10 hover:bg-gray-100 duration-300 rounded-md px-3 p-2 cursor-pointer">
                  <User />
                  <div>
                    <h4 className="text-sm  font-bold">New order</h4>
                    <p className="text-sm">2 min ago</p>
                  </div>
                </div>
                {/*  */}
                <div className="flex items-center  gap-3 hover:bg-gray-100 duration-300 rounded-md px-3 p-2 cursor-pointer">
                  <User />
                  <div>
                    <h4 className="text-sm  font-bold">New order</h4>
                    <p className="text-sm">2 min ago</p>
                  </div>
                </div>
                {/*  */}
                <div className="flex items-center  gap-3 hover:bg-gray-100 duration-300 rounded-md px-3 p-2 cursor-pointer">
                  <User />
                  <div>
                    <h4 className="text-sm  font-bold">New order</h4>
                    <p className="text-sm">2 min ago</p>
                  </div>
                </div>
                {/*  */}
                <div className="flex items-center  gap-3 hover:bg-gray-100 duration-300 rounded-md px-3 p-2 cursor-pointer">
                  <User />
                  <div>
                    <h4 className="text-sm  font-bold">New order</h4>
                    <p className="text-sm">2 min ago</p>
                  </div>
                </div>
                {/*  */}
                <div className="flex items-center  gap-3 hover:bg-gray-100 duration-300 rounded-md px-3 p-2 cursor-pointer">
                  <User />
                  <div>
                    <h4 className="text-sm  font-bold">New order</h4>
                    <p className="text-sm">2 min ago</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end p-2 pr-5">
                <Link
                  href={"/notifications"}
                  className="text-sm underline text-blue-500 hover:text-primary"
                >
                  See All
                </Link>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <NavUser user={data?.user} />
        </div>
      </div>
    </header>
  );
}
