
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Home, Package, MapPin, CreditCard, User, Settings } from "lucide-react";

export default function Account() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "Nguyễn Văn A",
    email: "example@gmail.com",
    phone: "0123456789"
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profileData);
  
  // Simulated orders data
  const orders = [
    { id: "ORD123456", date: "15/04/2023", status: "Đã giao", total: 560000 },
    { id: "ORD123455", date: "02/04/2023", status: "Đã giao", total: 780000 },
    { id: "ORD123450", date: "25/03/2023", status: "Đã giao", total: 320000 }
  ];
  
  // Simulated addresses
  const addresses = [
    { id: 1, name: "Nhà riêng", recipient: "Nguyễn Văn A", phone: "0123456789", address: "123 Đường Lê Lợi, Quận 1, TP. HCM", isDefault: true },
    { id: 2, name: "Văn phòng", recipient: "Nguyễn Văn A", phone: "0987654321", address: "456 Đường Nguyễn Huệ, Quận 1, TP. HCM", isDefault: false }
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmitProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form
    if (!editForm.name.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập họ và tên.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setProfileData(editForm);
      setIsEditing(false);
      toast({
        title: "Cập nhật thành công",
        description: "Thông tin tài khoản của bạn đã được cập nhật.",
      });
    }, 500);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="h-4 w-4 mr-1" />
                Trang chủ
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Tài khoản</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Tài khoản của tôi</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-md shadow-sm p-4">
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setActiveTab("profile")}
                    className={`flex items-center w-full px-3 py-2 rounded-md ${
                      activeTab === "profile" ? "bg-primary text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    <User className="h-5 w-5 mr-3" />
                    Thông tin tài khoản
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab("orders")}
                    className={`flex items-center w-full px-3 py-2 rounded-md ${
                      activeTab === "orders" ? "bg-primary text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    <Package className="h-5 w-5 mr-3" />
                    Đơn hàng của tôi
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab("addresses")}
                    className={`flex items-center w-full px-3 py-2 rounded-md ${
                      activeTab === "addresses" ? "bg-primary text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    <MapPin className="h-5 w-5 mr-3" />
                    Sổ địa chỉ
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab("payment")}
                    className={`flex items-center w-full px-3 py-2 rounded-md ${
                      activeTab === "payment" ? "bg-primary text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    <CreditCard className="h-5 w-5 mr-3" />
                    Phương thức thanh toán
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab("settings")}
                    className={`flex items-center w-full px-3 py-2 rounded-md ${
                      activeTab === "settings" ? "bg-primary text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    <Settings className="h-5 w-5 mr-3" />
                    Cài đặt
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-md shadow-sm p-6">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Thông tin tài khoản</h2>
                  
                  {!isEditing ? (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                        <div>
                          <p className="text-sm text-gray-500">Họ và tên</p>
                          <p className="font-medium">{profileData.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{profileData.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Số điện thoại</p>
                          <p className="font-medium">{profileData.phone || "Chưa cập nhật"}</p>
                        </div>
                      </div>
                      
                      <Button onClick={() => setIsEditing(true)}>
                        Chỉnh sửa thông tin
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitProfile}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Họ và tên</Label>
                          <Input
                            id="name"
                            name="name"
                            value={editForm.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={editForm.email}
                            onChange={handleInputChange}
                            disabled
                            className="bg-gray-100"
                          />
                          <p className="text-xs text-gray-500">Email không thể thay đổi</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Số điện thoại</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={editForm.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <Button type="submit">Lưu thay đổi</Button>
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => {
                            setIsEditing(false);
                            setEditForm(profileData);
                          }}
                        >
                          Hủy
                        </Button>
                      </div>
                    </form>
                  )}
                  
                  <div className="mt-10 pt-6 border-t">
                    <h3 className="font-semibold mb-4">Đổi mật khẩu</h3>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Mật khẩu mới</Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                        />
                      </div>
                      
                      <Button>Cập nhật mật khẩu</Button>
                    </form>
                  </div>
                </div>
              )}
              
              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Đơn hàng của tôi</h2>
                  
                  {orders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-2">Mã đơn hàng</th>
                            <th className="text-left py-3 px-2">Ngày đặt</th>
                            <th className="text-left py-3 px-2">Trạng thái</th>
                            <th className="text-left py-3 px-2">Tổng tiền</th>
                            <th className="text-center py-3 px-2">Hành động</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map(order => (
                            <tr key={order.id} className="border-b">
                              <td className="py-3 px-2 font-medium">{order.id}</td>
                              <td className="py-3 px-2">{order.date}</td>
                              <td className="py-3 px-2">
                                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                  {order.status}
                                </span>
                              </td>
                              <td className="py-3 px-2">{order.total.toLocaleString()}₫</td>
                              <td className="py-3 px-2 text-center">
                                <Button variant="outline" size="sm">Chi tiết</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                      <p>Bạn chưa có đơn hàng nào.</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Sổ địa chỉ</h2>
                    <Button>Thêm địa chỉ mới</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map(address => (
                      <div key={address.id} className="border rounded-md p-4 relative">
                        {address.isDefault && (
                          <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
                            Mặc định
                          </span>
                        )}
                        <h3 className="font-medium mb-1">{address.name}</h3>
                        <p className="text-sm text-gray-700 mb-1">{address.recipient}</p>
                        <p className="text-sm text-gray-700 mb-2">{address.phone}</p>
                        <p className="text-sm text-gray-700 mb-3">{address.address}</p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Chỉnh sửa</Button>
                          {!address.isDefault && (
                            <Button size="sm" variant="outline">Đặt làm mặc định</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Payment Tab */}
              {activeTab === "payment" && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Phương thức thanh toán</h2>
                  
                  <div className="text-center py-8">
                    <CreditCard className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                    <p className="text-gray-600 mb-4">Bạn chưa lưu phương thức thanh toán nào.</p>
                    <Button>Thêm phương thức thanh toán</Button>
                  </div>
                </div>
              )}
              
              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Cài đặt</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Thông báo</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="emailNotifications">Thông báo qua email</Label>
                          <input type="checkbox" id="emailNotifications" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="orderUpdates">Cập nhật đơn hàng</Label>
                          <input type="checkbox" id="orderUpdates" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="promotions">Ưu đãi và khuyến mãi</Label>
                          <input type="checkbox" id="promotions" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="font-medium mb-3">Bảo mật tài khoản</h3>
                      <Button variant="destructive" size="sm">Xóa tài khoản</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
