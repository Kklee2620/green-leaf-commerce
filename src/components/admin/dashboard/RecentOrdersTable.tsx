
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/utils/format";
import { cn } from "@/lib/utils";

interface Order {
  id: string;
  customer: string;
  date: string;
  status: string;
  amount: number;
}

interface RecentOrdersTableProps {
  orders: Order[] | undefined;
}

const RecentOrdersTable = ({ orders }: RecentOrdersTableProps) => {
  const getStatusClassName = (status: string) => {
    return cn(
      "px-2 py-1 rounded-full text-xs font-medium",
      status === "Đã giao" && "bg-green-100 text-green-800",
      status === "Đang xử lý" && "bg-blue-100 text-blue-800",
      status === "Đã hủy" && "bg-red-100 text-red-800"
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Mã đơn hàng</TableHead>
          <TableHead>Khách hàng</TableHead>
          <TableHead>Ngày đặt</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead className="text-right">Giá trị</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{new Date(order.date).toLocaleDateString('vi-VN')}</TableCell>
              <TableCell>
                <span className={getStatusClassName(order.status)}>
                  {order.status}
                </span>
              </TableCell>
              <TableCell className="text-right">{formatCurrency(order.amount)}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-6 text-gray-500">
              Không có đơn hàng nào
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default RecentOrdersTable;
