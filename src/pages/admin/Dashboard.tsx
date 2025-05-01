
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ShoppingBag,
  Users,
  CreditCard,
} from "lucide-react";
import { useDashboardStats } from "@/hooks/useDashboard";
import { formatCurrency } from "@/utils/format";
import DashboardLoadingSkeleton from "@/components/admin/dashboard/DashboardLoadingSkeleton";
import DashboardErrorState from "@/components/admin/dashboard/DashboardErrorState";
import StatCard from "@/components/admin/dashboard/StatCard";
import RecentOrdersTable from "@/components/admin/dashboard/RecentOrdersTable";

export default function AdminDashboard() {
  const { data: stats, isLoading, error, refetch } = useDashboardStats();

  if (isLoading) {
    return <DashboardLoadingSkeleton />;
  }
  
  if (error) {
    return <DashboardErrorState onRetry={() => window.location.reload()} />;
  }

  const statsCards = [
    {
      title: "Đơn hàng",
      value: stats?.totalOrders || 0,
      icon: ShoppingBag,
      trend: {
        value: "12%",
        isPositive: true,
        description: "so với tháng trước"
      }
    },
    {
      title: "Khách hàng",
      value: stats?.totalCustomers || 0,
      icon: Users,
      trend: {
        value: "8%",
        isPositive: true,
        description: "so với tháng trước"
      }
    },
    {
      title: "Doanh thu",
      value: formatCurrency(stats?.totalRevenue || 0),
      icon: CreditCard,
      trend: {
        value: "3%",
        isPositive: false,
        description: "so với tháng trước"
      }
    },
    {
      title: "Sản phẩm",
      value: stats?.totalProducts || 0,
      icon: ShoppingBag,
      trend: {
        value: "5%",
        isPositive: true,
        description: "so với tháng trước"
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tổng quan</h1>
        <p className="text-gray-500">Xem thống kê và hoạt động gần đây của cửa hàng</p>
      </div>
      
      {/* Stats overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>
      
      {/* Recent Orders */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Đơn hàng gần đây</CardTitle>
            <CardDescription>
              Danh sách 5 đơn hàng gần nhất trong hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentOrdersTable orders={stats?.recentOrders} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
