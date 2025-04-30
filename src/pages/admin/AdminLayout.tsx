
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

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Fake authentication check - in a real app would check if user is admin
  useEffect(() => {
    // Check if user is logged in as admin
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      // Redirect to login if not admin
      // navigate("/login");
      
      // For demo purposes, we'll just set them as admin
      localStorage.setItem("isAdmin", "true");
    }
  }, [navigate]);
  
  const menuItems = [
    { label: "Tổng quan", path: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Sản phẩm", path: "/admin/products", icon: <ShoppingBag className="h-5 w-5" /> },
    { label: "Đơn hàng", path: "/admin/orders", icon: <FileText className="h-5 w-5" /> },
    { label: "Danh mục", path: "/admin/categories", icon: <ChevronRight className="h-5 w-5" /> },
    { label: "Khách hàng", path: "/admin/customers", icon: <Users className="h-5 w-5" /> },
    { label: "Cài đặt", path: "/admin/settings", icon: <Settings className="h-5 w-5" /> },
  ];
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden p-4 bg-white border-b flex justify-between items-center">
        <Link to="/" className="text-primary font-bold text-lg">GreenLeaf Admin</Link>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </Button>
      </div>
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white border-r w-64 transition-all duration-300 ease-in-out",
          isSidebarOpen ? "block" : "hidden md:block"
        )}
      >
        <div className="p-4 hidden md:flex">
          <Link to="/" className="text-primary font-bold text-lg">GreenLeaf Admin</Link>
        </div>
        
        <Separator />
        
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                location.pathname === item.path
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <Separator />
        
        <div className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={() => {
              localStorage.removeItem("isAdmin");
              navigate("/");
            }}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Đăng xuất
          </Button>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
