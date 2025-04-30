
import Layout from "@/components/layout/Layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

export default function PaymentPolicy() {
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
              <BreadcrumbLink>Chính sách thanh toán</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Chính sách thanh toán</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Phương thức thanh toán</h2>
              <p className="text-gray-600 mb-3">
                GreenLeaf hỗ trợ nhiều phương thức thanh toán để quý khách có thể lựa chọn theo nhu cầu:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Thanh toán khi nhận hàng (COD)</li>
                <li>Thanh toán qua thẻ tín dụng/ghi nợ (Visa, MasterCard, JCB)</li>
                <li>Thanh toán qua ví điện tử (MoMo, ZaloPay, VNPay)</li>
                <li>Thanh toán qua chuyển khoản ngân hàng</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Quy trình thanh toán</h2>
              <p className="text-gray-600">
                Tùy theo phương thức thanh toán mà quý khách lựa chọn, quy trình thanh toán sẽ được thực hiện theo các bước tương ứng. Đối với thanh toán trực tuyến, GreenLeaf sử dụng các cổng thanh toán được bảo mật theo tiêu chuẩn quốc tế để đảm bảo an toàn thông tin cho khách hàng.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. Hóa đơn thanh toán</h2>
              <p className="text-gray-600">
                Sau khi đặt hàng thành công, quý khách sẽ nhận được email xác nhận đơn hàng kèm theo thông tin chi tiết về các sản phẩm đã mua và tổng số tiền thanh toán. GreenLeaf cũng sẽ gửi hóa đơn điện tử qua email sau khi đơn hàng được giao thành công.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Bảo mật thông tin thanh toán</h2>
              <p className="text-gray-600">
                GreenLeaf cam kết bảo mật thông tin thanh toán của khách hàng theo quy định của pháp luật. Chúng tôi không lưu trữ thông tin thẻ tín dụng/ghi nợ của khách hàng trên hệ thống của mình. Tất cả các giao dịch thanh toán đều được thực hiện thông qua các cổng thanh toán có chứng chỉ bảo mật PCI DSS.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Chính sách hoàn tiền</h2>
              <p className="text-gray-600">
                Trong trường hợp khách hàng đã thanh toán nhưng muốn hủy đơn hàng hoặc đổi trả sản phẩm, GreenLeaf sẽ hoàn tiền theo chính sách đổi trả. Thời gian hoàn tiền phụ thuộc vào phương thức thanh toán ban đầu và thường mất từ 7-14 ngày làm việc.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
