
import Layout from "@/components/layout/Layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

export default function ReturnPolicy() {
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
              <BreadcrumbLink>Chính sách đổi trả</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Chính sách đổi trả</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Điều kiện đổi trả</h2>
              <p className="text-gray-600 mb-3">
                GreenLeaf chấp nhận đổi trả sản phẩm trong các trường hợp sau:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Sản phẩm bị lỗi hoặc hỏng hóc do nhà sản xuất</li>
                <li>Sản phẩm không đúng với mô tả trên website</li>
                <li>Sản phẩm giao không đúng số lượng hoặc chủng loại đã đặt</li>
                <li>Sản phẩm còn trong thời hạn đổi trả (3 ngày đối với thực phẩm tươi, 7 ngày đối với các sản phẩm khác)</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Quy trình đổi trả</h2>
              <p className="text-gray-600 mb-3">
                Để thực hiện đổi trả sản phẩm, quý khách vui lòng thực hiện các bước sau:
              </p>
              <ol className="list-decimal pl-6 text-gray-600 space-y-2">
                <li>Liên hệ với GreenLeaf qua số hotline 1900.xxxx hoặc email support@greenleaf.vn</li>
                <li>Cung cấp thông tin đơn hàng và lý do đổi trả</li>
                <li>Nhận hướng dẫn đóng gói và gửi trả sản phẩm</li>
                <li>Gửi sản phẩm về địa chỉ do GreenLeaf chỉ định</li>
                <li>Nhận sản phẩm thay thế hoặc hoàn tiền theo thỏa thuận</li>
              </ol>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. Chi phí đổi trả</h2>
              <p className="text-gray-600 mb-3">
                Các chi phí phát sinh trong quá trình đổi trả sẽ được áp dụng như sau:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Lỗi từ phía GreenLeaf: GreenLeaf sẽ chịu toàn bộ chi phí đổi trả</li>
                <li>Lỗi từ phía khách hàng (đổi ý, không thích sản phẩm): Khách hàng chịu chi phí vận chuyển hai chiều</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Hoàn tiền</h2>
              <p className="text-gray-600">
                Thời gian hoàn tiền sẽ được thực hiện trong vòng 7-14 ngày làm việc kể từ khi GreenLeaf nhận được sản phẩm trả lại và xác nhận tình trạng sản phẩm đáp ứng điều kiện đổi trả. Hình thức hoàn tiền sẽ được thực hiện theo phương thức thanh toán ban đầu của đơn hàng.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
