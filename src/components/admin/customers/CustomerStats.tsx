
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { formatCurrency } from "@/utils/format";

interface CustomerStatsProps {
  orderCount: number;
  totalSpent: number;
}

const CustomerStats = ({ orderCount, totalSpent }: CustomerStatsProps) => {
  const averagePerOrder = totalSpent / (orderCount || 1);

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-gray-500">Tổng đơn hàng</div>
          <div className="text-2xl font-bold">{orderCount}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-gray-500">Tổng chi tiêu</div>
          <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-gray-500">Trung bình/đơn</div>
          <div className="text-2xl font-bold">
            {formatCurrency(averagePerOrder)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerStats;
