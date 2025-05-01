
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardErrorStateProps {
  onRetry: () => void;
  error?: Error | unknown;
}

const DashboardErrorState = ({ onRetry, error }: DashboardErrorStateProps) => {
  // Xác định thông báo lỗi để hiển thị
  const errorMessage = error instanceof Error 
    ? error.message 
    : "Không thể tải thông tin thống kê";

  return (
    <div className="bg-white border border-red-200 rounded-lg p-6 text-center max-w-lg mx-auto my-8">
      <div className="flex justify-center mb-4">
        <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
          <AlertCircle className="h-6 w-6 text-red-500" />
        </div>
      </div>
      
      <h1 className="text-xl font-semibold text-red-600 mb-2">Đã xảy ra lỗi</h1>
      
      <p className="text-gray-600 mb-4">
        {errorMessage}. Vui lòng thử lại sau hoặc liên hệ đội kỹ thuật nếu lỗi vẫn tiếp tục.
      </p>
      
      <div className="space-x-3">
        <Button 
          onClick={onRetry}
          className="bg-primary hover:bg-primary/90 flex items-center"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Tải lại trang
        </Button>
        
        <Button variant="outline" asChild>
          <Link to="/admin" className="flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Về trang chủ Admin
          </Link>
        </Button>
      </div>
      
      <div className="mt-4 text-xs text-gray-500 border-t border-gray-200 pt-4">
        Mã lỗi: {Math.random().toString(36).substring(2, 10).toUpperCase()}
      </div>
    </div>
  );
};

export default DashboardErrorState;
