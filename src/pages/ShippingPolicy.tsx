
import Layout from "@/components/layout/Layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

export default function ShippingPolicy() {
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
              <BreadcrumbLink>Chính sách vận chuyển</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Chính sách vận chuyển</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Phạm vi áp dụng</h2>
              <p className="text-gray-600">
                Chính sách vận chuyển này áp dụng cho tất cả các đơn hàng được đặt trên trang web chính thức của GreenLeaf và được giao đến các tỉnh thành trên toàn quốc.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Thời gian giao hàng</h2>
              <p className="text-gray-600 mb-3">
                GreenLeaf cam kết giao hàng trong thời gian nhanh nhất có thể. Thời gian giao hàng dự kiến như sau:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Khu vực nội thành Hà Nội và TP.HCM: 1-2 ngày làm việc</li>
                <li>Các tỉnh thành khác: 2-5 ngày làm việc</li>
                <li>Khu vực vùng sâu, vùng xa: 5-7 ngày làm việc</li>
              </ul>
              <p className="text-gray-600 mt-3">
                Lưu ý: Thời gian giao hàng có thể bị ảnh hưởng bởi các yếu tố khách quan như thời tiết, thiên tai hoặc các sự kiện bất khả kháng khác.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. Phí vận chuyển</h2>
              <p className="text-gray-600 mb-3">
                Phí vận chuyển được tính dựa trên khoảng cách, trọng lượng và kích thước của đơn hàng:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Đơn hàng có giá trị từ 300.000đ trở lên: Miễn phí vận chuyển toàn quốc</li>
                <li>Đơn hàng dưới 300.000đ: Phí vận chuyển là 30.000đ</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Quy trình giao hàng</h2>
              <p className="text-gray-600 mb-3">
                Quy trình giao hàng của GreenLeaf được thực hiện như sau:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Sau khi đơn hàng được xác nhận, GreenLeaf sẽ đóng gói sản phẩm và bàn giao cho đơn vị vận chuyển</li>
                <li>Khách hàng sẽ nhận được thông báo qua SMS hoặc email khi đơn hàng được giao cho đơn vị vận chuyển</li>
                <li>Đơn vị vận chuyển sẽ liên hệ với khách hàng trước khi giao hàng</li>
                <li>Khách hàng vui lòng kiểm tra tình trạng sản phẩm trước khi nhận hàng</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Chính sách hỗ trợ</h2>
              <p className="text-gray-600">
                Nếu quý khách có bất kỳ thắc mắc nào liên quan đến đơn hàng hoặc vận chuyển, vui lòng liên hệ với GreenLeaf qua số hotline 1900.xxxx hoặc email support@greenleaf.vn. Chúng tôi sẽ hỗ trợ quý khách trong thời gian sớm nhất có thể.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
