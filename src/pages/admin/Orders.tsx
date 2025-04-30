
import { useState, useEffect } from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search, Eye, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Giả lập dữ liệu đơn hàng
  useEffect(() => {
    // Giả lập API request
    setTimeout(() => {
      const mockOrders = [
        {
          id: "ORD-1234",
          customer: {
            name: "Nguyễn Văn A",
            email: "nguyenvana@example.com",
            phone: "0901234567",
            address: "123 Đường Lê Lợi, Quận 1, TP HCM"
          },
          date: "2023-05-12",
          status: "Đã giao",
          amount: 450000,
          paymentMethod: "COD",
          items: [
            { id: 1, name: "Cải xanh hữu cơ", price: 25000, quantity: 2 },
            { id: 2, name: "Cà chua hữu cơ", price: 35000, quantity: 1 },
            { id: 3, name: "Táo Fuji", price: 65000, quantity: 5 }
          ]
        },
        {
          id: "ORD-1233",
          customer: {
            name: "Trần Thị B",
            email: "tranthib@example.com",
            phone: "0907654321",
            address: "456 Đường Nguyễn Huệ, Quận 1, TP HCM"
          },
          date: "2023-05-12",
          status: "Đang xử lý",
          amount: 780000,
          paymentMethod: "Banking",
          items: [
            { id: 4, name: "Thịt bò Úc", price: 320000, quantity: 2 },
            { id: 5, name: "Hạt điều rang muối", price: 120000, quantity: 1 }
          ]
        },
        {
          id: "ORD-1232",
          customer: {
            name: "Lê Văn C",
            email: "levanc@example.com",
            phone: "0901112222",
            address: "789 Đường Cách Mạng Tháng 8, Quận 3, TP HCM"
          },
          date: "2023-05-11",
          status: "Đã hủy",
          amount: 320000,
          paymentMethod: "COD",
          items: [
            { id: 6, name: "Cà rốt hữu cơ", price: 40000, quantity: 3 },
            { id: 7, name: "Ổi", price: 50000, quantity: 4 }
          ]
        },
        {
          id: "ORD-1231",
          customer: {
            name: "Phạm Thị D",
            email: "phamthid@example.com",
            phone: "0903334444",
            address: "101 Đường Nam Kỳ Khởi Nghĩa, Quận 3, TP HCM"
          },
          date: "2023-05-11",
          status: "Đã giao",
          amount: 560000,
          paymentMethod: "Banking",
          items: [
            { id: 8, name: "Gạo ST25", price: 180000, quantity: 2 },
            { id: 9, name: "Đường organic", price: 100000, quantity: 2 }
          ]
        },
        {
          id: "ORD-1230",
          customer: {
            name: "Hoàng Văn E",
            email: "hoangvane@example.com",
            phone: "0905556666",
            address: "202 Đường Hai Bà Trưng, Quận 1, TP HCM"
          },
          date: "2023-05-10",
          status: "Đã giao",
          amount: 910000,
          paymentMethod: "COD",
          items: [
            { id: 10, name: "Sữa chua", price: 35000, quantity: 10 },
            { id: 11, name: "Bánh mì", price: 20000, quantity: 8 }
          ]
        },
        {
          id: "ORD-1229",
          customer: {
            name: "Trịnh Thị F",
            email: "trinhthif@example.com",
            phone: "0907778888",
            address: "303 Đường Nguyễn Đình Chiểu, Quận 3, TP HCM"
          },
          date: "2023-05-10",
          status: "Đang vận chuyển",
          amount: 470000,
          paymentMethod: "Banking",
          items: [
            { id: 12, name: "Rau muống", price: 15000, quantity: 2 },
            { id: 13, name: "Thịt heo", price: 220000, quantity: 2 }
          ]
        },
      ];
      
      setOrders(mockOrders);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Xử lý lọc đơn hàng
  const filteredOrders = orders.filter(order => {
    // Lọc theo từ khóa tìm kiếm
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Lọc theo trạng thái
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Cập nhật trạng thái đơn hàng
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    toast.success(`Đã cập nhật trạng thái đơn hàng thành "${newStatus}"`);
    setSelectedOrder(null);
  };

  // Format giá tiền
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
        <p className="text-gray-500">Quản lý và theo dõi các đơn đặt hàng</p>
      </div>
      
      {/* Tìm kiếm và lọc */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Tìm kiếm đơn hàng theo mã hoặc khách hàng..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select 
          defaultValue="all" 
          onValueChange={(value) => setStatusFilter(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tất cả trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="Đang xử lý">Đang xử lý</SelectItem>
            <SelectItem value="Đang vận chuyển">Đang vận chuyển</SelectItem>
            <SelectItem value="Đã giao">Đã giao</SelectItem>
            <SelectItem value="Đã hủy">Đã hủy</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Danh sách đơn hàng */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách đơn hàng</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã đơn hàng</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Ngày đặt</TableHead>
                <TableHead>Phương thức</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Giá trị</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    Đang tải dữ liệu...
                  </TableCell>
                </TableRow>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>{order.customer.name}</div>
                      <div className="text-sm text-gray-500">{order.customer.email}</div>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell>
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        order.status === "Đã giao" && "bg-green-100 text-green-800",
                        order.status === "Đang xử lý" && "bg-blue-100 text-blue-800",
                        order.status === "Đang vận chuyển" && "bg-yellow-100 text-yellow-800",
                        order.status === "Đã hủy" && "bg-red-100 text-red-800"
                      )}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>{formatCurrency(order.amount)}</TableCell>
                    <TableCell className="text-right">
                      <Dialog onOpenChange={(open) => open && setSelectedOrder(order)}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Chi tiết
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Chi tiết đơn hàng #{selectedOrder?.id}</DialogTitle>
                          </DialogHeader>
                          
                          {selectedOrder && (
                            <div className="space-y-6 mt-4">
                              {/* Thông tin khách hàng và đơn hàng */}
                              <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <h3 className="font-medium">Thông tin khách hàng</h3>
                                  <div className="text-sm space-y-1">
                                    <p><span className="font-medium">Tên:</span> {selectedOrder.customer.name}</p>
                                    <p><span className="font-medium">Email:</span> {selectedOrder.customer.email}</p>
                                    <p><span className="font-medium">Số điện thoại:</span> {selectedOrder.customer.phone}</p>
                                    <p><span className="font-medium">Địa chỉ:</span> {selectedOrder.customer.address}</p>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <h3 className="font-medium">Thông tin đơn hàng</h3>
                                  <div className="text-sm space-y-1">
                                    <p><span className="font-medium">Mã đơn hàng:</span> {selectedOrder.id}</p>
                                    <p><span className="font-medium">Ngày đặt:</span> {selectedOrder.date}</p>
                                    <p><span className="font-medium">Phương thức thanh toán:</span> {selectedOrder.paymentMethod}</p>
                                    <p>
                                      <span className="font-medium">Trạng thái:</span> 
                                      <span className={cn(
                                        "ml-2 px-2 py-0.5 rounded-full text-xs font-medium",
                                        selectedOrder.status === "Đã giao" && "bg-green-100 text-green-800",
                                        selectedOrder.status === "Đang xử lý" && "bg-blue-100 text-blue-800",
                                        selectedOrder.status === "Đang vận chuyển" && "bg-yellow-100 text-yellow-800",
                                        selectedOrder.status === "Đã hủy" && "bg-red-100 text-red-800"
                                      )}>
                                        {selectedOrder.status}
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
                                    {selectedOrder.items.map((item) => (
                                      <TableRow key={item.id}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                                        <TableCell className="text-right">{item.quantity}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(item.price * item.quantity)}</TableCell>
                                      </TableRow>
                                    ))}
                                    <TableRow>
                                      <TableCell colSpan={3} className="text-right font-medium">Tổng cộng</TableCell>
                                      <TableCell className="text-right font-medium">{formatCurrency(selectedOrder.amount)}</TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </div>
                              
                              {/* Các action */}
                              <div className="flex justify-end gap-2 pt-4">
                                <DialogClose asChild>
                                  <Button variant="outline">Đóng</Button>
                                </DialogClose>
                                
                                {selectedOrder.status === "Đang xử lý" && (
                                  <>
                                    <Button 
                                      className="bg-yellow-500 hover:bg-yellow-600" 
                                      onClick={() => updateOrderStatus(selectedOrder.id, "Đang vận chuyển")}
                                    >
                                      Chuyển sang vận chuyển
                                    </Button>
                                    <Button 
                                      variant="destructive" 
                                      onClick={() => updateOrderStatus(selectedOrder.id, "Đã hủy")}
                                    >
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Hủy đơn
                                    </Button>
                                  </>
                                )}
                                
                                {selectedOrder.status === "Đang vận chuyển" && (
                                  <Button 
                                    className="bg-green-500 hover:bg-green-600" 
                                    onClick={() => updateOrderStatus(selectedOrder.id, "Đã giao")}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Xác nhận đã giao
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                    Không tìm thấy đơn hàng nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
