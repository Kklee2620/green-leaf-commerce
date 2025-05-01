
import { Button } from "@/components/ui/button";

interface DashboardErrorStateProps {
  onRetry: () => void;
}

const DashboardErrorState = ({ onRetry }: DashboardErrorStateProps) => {
  return (
    <div className="text-center py-10">
      <h1 className="text-2xl font-semibold text-red-500 mb-2">Đã xảy ra lỗi</h1>
      <p className="text-gray-600 mb-4">Không thể tải thông tin thống kê. Vui lòng thử lại sau.</p>
      <Button onClick={onRetry}>Tải lại trang</Button>
    </div>
  );
};

export default DashboardErrorState;
