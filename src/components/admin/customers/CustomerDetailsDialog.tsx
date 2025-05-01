
import { 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/format";
import { toast } from "sonner";
import CustomerStats from "./CustomerStats";

interface RecentOrder {
  id: string;
  date: string;
  amount: number;
  status: string;
}

interface Customer {
  id: number | string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateJoined: string;
  status: string;
  orderCount: number;
  totalSpent: number;
  recentOrders: RecentOrder[];
}

interface CustomerDetailsDialogProps {
  customer: Customer;
  onUpdateStatus: (customerId: number | string, newStatus: string) => void;
}

const CustomerDetailsDialog = ({ customer, onUpdateStatus }: CustomerDetailsDialogProps) => {
  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>Thông tin khách hàng</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6 mt-4">
        {/* Thông tin khách hàng */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{customer.name}</h3>
              <p className={cn(
                "px-2 py-0.5 rounded-full text-xs font-medium w-fit mt-1",
                customer.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
              )}>
                {customer.status === "active" ? "Hoạt động" : "Không hoạt động"}
              </p>
            </div>
            
            <div className="ml-auto">
              {customer.status === "active" ? (
                <Button 
                  variant="outline" 
                  onClick={() => onUpdateStatus(customer.id, "inactive")}
                  className="text-red-500"
                >
                  Vô hiệu hóa
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={() => onUpdateStatus(customer.id, "active")}
                  className="text-green-500"
                >
                  Kích hoạt
                </Button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span>{customer.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{customer.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{customer.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>Tham gia ngày {customer.dateJoined}</span>
            </div>
          </div>
        </div>
        
        {/* Thống kê */}
        <CustomerStats 
          orderCount={customer.orderCount}
          totalSpent={customer.totalSpent}
        />
        
        {/* Đơn hàng gần đây */}
        <div>
          <h3 className="font-medium mb-2">Đơn hàng gần đây</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã đơn hàng</TableHead>
                <TableHead>Ngày đặt</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Giá trị</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customer.recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium",
                      order.status === "Đã giao" && "bg-green-100 text-green-800",
                      order.status === "Đang xử lý" && "bg-blue-100 text-blue-800",
                      order.status === "Đang vận chuyển" && "bg-yellow-100 text-yellow-800",
                      order.status === "Đã hủy" && "bg-red-100 text-red-800"
                    )}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(order.amount)}</TableCell>
                </TableRow>
              ))}
              {customer.recentOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                    Khách hàng chưa có đơn hàng nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Các action */}
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => toast.info("Chức năng đang phát triển")}>
            <Mail className="h-4 w-4 mr-2" />
            Gửi email
          </Button>
          <DialogClose asChild>
            <Button>Đóng</Button>
          </DialogClose>
        </div>
      </div>
    </DialogContent>
  );
};

export default CustomerDetailsDialog;
