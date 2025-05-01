
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend: {
    value: string;
    isPositive: boolean;
    description: string;
  };
}

const StatCard = ({ title, value, icon: Icon, trend }: StatCardProps) => {
  const TrendIcon = trend.isPositive ? 
    require("lucide-react").ArrowUpRight : 
    require("lucide-react").ArrowDownRight;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${trend.isPositive ? 'text-green-500' : 'text-red-500'} flex items-center mt-1`}>
          <TrendIcon className="h-3 w-3 mr-1" />
          {trend.value} {trend.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
