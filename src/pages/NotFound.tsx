
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle, Home, ShoppingBag, ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-2">
            Không tìm thấy trang bạn yêu cầu
          </p>
          <p className="text-gray-500 mb-8">
            Đường dẫn <span className="font-semibold">{location.pathname}</span> không tồn tại hoặc đã được di chuyển.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
            <Button asChild className="flex items-center">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Về trang chủ
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex items-center">
              <Link to="/products">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Xem sản phẩm
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              className="flex items-center"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
