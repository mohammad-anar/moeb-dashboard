import {
  IconClock,
  IconTarget,
  IconTrendingDown,
  IconTrendingUp,
  IconUser,
  IconUsersGroup,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
  const statisticsData = [
    {
      id: 1,
      amount: 412,
      icon: IconUser,
      percentage: "+23%",
      description: "Total registered drivers",
      bgColor: "purple-100",
      iconColor: "purple",
    },
    {
      id: 2,
      amount: 4,
      icon: IconClock,
      percentage: "+12%",
      description: "Pending drivers approvals",
      bgColor: "gray-100",
      iconColor: "gray",
    },
    {
      id: 3,
      amount: 142,
      icon: IconUsersGroup,
      percentage: "+23%",
      description: "Active job offers",
      bgColor: "blue-100",
      iconColor: "blue",
    },
    {
      id: 4,
      amount: 321,
      icon: IconTarget,
      percentage: "+4%",
      description: "Total Marketplace listings",
      bgColor: "orange-100",
      iconColor: "orange",
    },
  ];

  const bgColorMap: Record<string, string> = {
    "purple-100": "bg-purple-100",
    "gray-100": "bg-gray-100",
    "blue-100": "bg-blue-100",
    "orange-100": "bg-orange-100",
  };
  return (
    <div className=" *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4  *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {statisticsData?.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card key={index} className="@container/card">
            <CardHeader>
              <CardDescription>
                <div
                  className={`w-10 h-10 ${bgColorMap[item.bgColor]} rounded-md flex items-center justify-center`}
                >
                  <Icon color={item.iconColor} />
                </div>
              </CardDescription>
              <CardTitle className="text-4xl font-bold tabular-nums ">
                {String(item.amount).padStart(2, "0")}
              </CardTitle>
              <CardAction>
                <Badge
                  variant={"outline"}
                  className="bg-green-200 text-green-600 border-green-600"
                >
                  {item.percentage}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="text-muted-foreground">{item.description}</div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
