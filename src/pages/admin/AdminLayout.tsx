
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isAdmin, isAuthenticated, logout, isLoading } = useAuth();
  
  // Xác thực admin
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      toast.error('Bạn không có quyền truy cập trang quản trị.');
      navigate('/login');
    }
  }, [isAdmin, isAuthenticated, isLoading, navigate]);
  
  // Nếu đang kiểm tra trạng thái xác thực, hiển thị loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  const menuItems = [
    { label: "Tổng quan", path: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Sản phẩm", path: "/admin/products", icon: <ShoppingBag className="h-5 w-5" /> },
    { label: "Đơn hàng", path: "/admin/orders", icon: <FileText className="h-5 w-5" /> },
    { label: "Danh mục", path: "/admin/categories", icon: <ChevronRight className="h-5 w-5" /> },
    { label: "Khách hàng", path: "/admin/customers", icon: <Users className="h-5 w-5" /> },
    { label: "Cài đặt", path: "/admin/settings", icon: <Settings className="h-5 w-5" /> },
  ];
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for larger screens */}
      <aside
        className={cn(
          "bg-white border-r border-gray-200 transition-all duration-300 ease-in-out h-screen fixed lg:sticky top-0 z-40",
          isSidebarOpen ? "w-64" : "w-20",
          "hidden md:block"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className={cn("flex items-center", isSidebarOpen ? "" : "justify-center w-full")}>
            {isSidebarOpen ? (
              <Link to="/" className="font-bold text-xl text-primary">
                Admin Panel
              </Link>
            ) : (
              <Link to="/" className="font-bold text-xl text-primary">
                AP
              </Link>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden md:flex"
          >
            {isSidebarOpen ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
        <div className="py-4">
          <nav className="space-y-1 px-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-2 py-3 text-sm font-medium rounded-md transition-colors",
                  location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-gray-100",
                  isSidebarOpen ? "justify-start" : "justify-center"
                )}
              >
                {item.icon}
                {isSidebarOpen && <span className="ml-3">{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-0 w-full border-t border-gray-200 p-4">
          <Button
            variant="ghost"
            className={cn(
              "flex items-center w-full text-red-500 hover:text-red-700 hover:bg-red-50",
              isSidebarOpen ? "justify-start" : "justify-center"
            )}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span className="ml-2">Đăng xuất</span>}
          </Button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" 
           style={{ display: isSidebarOpen ? "block" : "none" }}
           onClick={() => setIsSidebarOpen(false)}>
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg p-4"
             onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="font-bold text-xl text-primary">
              Admin Panel
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-2 py-3 text-sm font-medium rounded-md",
                  location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-gray-100"
                )}
                onClick={() => setIsSidebarOpen(false)}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="absolute bottom-0 w-full left-0 border-t border-gray-200 p-4">
            <Button
              variant="ghost"
              className="flex items-center w-full text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-2">Đăng xuất</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 h-16 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex-1 md:text-center text-right">
              <h2 className="text-lg font-semibold text-gray-800">
                {menuItems.find(
                  item => item.path === location.pathname || location.pathname.startsWith(`${item.path}/`)
                )?.label || 'Trang quản trị'}
              </h2>
            </div>
          </div>
        </header>
        
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
