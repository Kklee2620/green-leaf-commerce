
import { useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";
import { formatCurrency } from "@/utils/format";

interface OrderItem {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
}

interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Order {
  id: string;
  customer: Customer;
  date: string;
  status: string;
  amount: number;
  paymentMethod: string;
  items: OrderItem[];
}

interface OrderDetailsDialogProps {
  order: Order;
  onUpdateStatus: (orderId: string, status: string) => void;
}

const OrderDetailsDialog = ({ order, onUpdateStatus }: OrderDetailsDialogProps) => {
  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>Chi tiết đơn hàng #{order?.id}</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6 mt-4">
        {/* Thông tin khách hàng và đơn hàng */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-medium">Thông tin khách hàng</h3>
            <div className="text-sm space-y-1">
              <p><span className="font-medium">Tên:</span> {order.customer.name}</p>
              <p><span className="font-medium">Email:</span> {order.customer.email}</p>
              <p><span className="font-medium">Số điện thoại:</span> {order.customer.phone}</p>
              <p><span className="font-medium">Địa chỉ:</span> {order.customer.address}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Thông tin đơn hàng</h3>
            <div className="text-sm space-y-1">
              <p><span className="font-medium">Mã đơn hàng:</span> {order.id}</p>
              <p><span className="font-medium">Ngày đặt:</span> {order.date}</p>
              <p><span className="font-medium">Phương thức thanh toán:</span> {order.paymentMethod}</p>
              <p>
                <span className="font-medium">Trạng thái:</span> 
                <span className={cn(
                  "ml-2 px-2 py-0.5 rounded-full text-xs font-medium",
                  order.status === "Đã giao" && "bg-green-100 text-green-800",
                  order.status === "Đang xử lý" && "bg-blue-100 text-blue-800",
                  order.status === "Đang vận chuyển" && "bg-yellow-100 text-yellow-800",
                  order.status === "Đã hủy" && "bg-red-100 text-red-800"
                )}>
                  {order.status}
                </span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Danh sách sản phẩm */}
        <div>
          <h3 className="font-medium mb-2">Sản phẩm</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sản phẩm</TableHead>
                <TableHead className="text-right">Đơn giá</TableHead>
                <TableHead className="text-right">Số lượng</TableHead>
                <TableHead className="text-right">Thành tiền</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.price * item.quantity)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} className="text-right font-medium">Tổng cộng</TableCell>
                <TableCell className="text-right font-medium">{formatCurrency(order.amount)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        {/* Các action */}
        <div className="flex justify-end gap-2 pt-4">
          <DialogClose asChild>
            <Button variant="outline">Đóng</Button>
          </DialogClose>
          
          {order.status === "Đang xử lý" && (
            <>
              <Button 
                className="bg-yellow-500 hover:bg-yellow-600" 
                onClick={() => onUpdateStatus(order.id, "Đang vận chuyển")}
              >
                Chuyển sang vận chuyển
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => onUpdateStatus(order.id, "Đã hủy")}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Hủy đơn
              </Button>
            </>
          )}
          
          {order.status === "Đang vận chuyển" && (
            <Button 
              className="bg-green-500 hover:bg-green-600" 
              onClick={() => onUpdateStatus(order.id, "Đã giao")}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Xác nhận đã giao
            </Button>
          )}
        </div>
      </div>
    </DialogContent>
  );
};

export default OrderDetailsDialog;
