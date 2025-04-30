
import Layout from "@/components/layout/Layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
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
              <BreadcrumbLink>Chính sách bảo mật</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Chính sách bảo mật</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Thông tin thu thập</h2>
              <p className="text-gray-600 mb-3">
                GreenLeaf thu thập các thông tin sau từ khách hàng:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Thông tin cá nhân: Họ tên, số điện thoại, email, địa chỉ</li>
                <li>Thông tin thanh toán: Thông tin thẻ tín dụng/ghi nợ, tài khoản ngân hàng</li>
                <li>Thông tin giao dịch: Lịch sử mua hàng, sản phẩm đã xem</li>
                <li>Thông tin thiết bị: IP, loại thiết bị, trình duyệt</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Mục đích thu thập thông tin</h2>
              <p className="text-gray-600 mb-3">
                Chúng tôi thu thập thông tin của khách hàng nhằm các mục đích sau:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Xử lý đơn hàng và thanh toán</li>
                <li>Vận chuyển và giao nhận sản phẩm</li>
                <li>Cung cấp dịch vụ chăm sóc khách hàng</li>
                <li>Gửi thông tin khuyến mãi, sản phẩm mới (khi được sự đồng ý)</li>
                <li>Phân tích hành vi người dùng để cải thiện dịch vụ</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. Bảo vệ thông tin</h2>
              <p className="text-gray-600">
                GreenLeaf áp dụng các biện pháp an toàn để bảo vệ thông tin cá nhân của khách hàng khỏi việc truy cập, sử dụng hoặc tiết lộ trái phép. Chúng tôi sử dụng công nghệ mã hóa SSL để bảo vệ thông tin nhạy cảm trong quá trình truyền tải dữ liệu.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Chia sẻ thông tin</h2>
              <p className="text-gray-600">
                GreenLeaf chỉ chia sẻ thông tin khách hàng với các bên thứ ba trong các trường hợp sau:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Đối tác vận chuyển để giao hàng</li>
                <li>Đối tác thanh toán để xử lý giao dịch</li>
                <li>Cơ quan nhà nước có thẩm quyền khi có yêu cầu</li>
                <li>Nhà cung cấp dịch vụ phân tích và tiếp thị (đã ký hợp đồng bảo mật)</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Quyền của khách hàng</h2>
              <p className="text-gray-600">
                Khách hàng có các quyền sau liên quan đến thông tin cá nhân của mình:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Truy cập và xem thông tin đã cung cấp</li>
                <li>Cập nhật hoặc chỉnh sửa thông tin</li>
                <li>Yêu cầu xóa thông tin</li>
                <li>Từ chối nhận thông tin quảng cáo, khuyến mãi</li>
              </ul>
              <p className="text-gray-600 mt-3">
                Để thực hiện các quyền trên, vui lòng liên hệ với GreenLeaf qua email privacy@greenleaf.vn hoặc gọi số hotline 1900.xxxx.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
