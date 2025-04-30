
import Layout from "@/components/layout/Layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Check } from "lucide-react";

export default function About() {
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
              <BreadcrumbLink>Giới thiệu</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">Về GreenLeaf</h1>
        
        {/* Hero section */}
        <div className="relative rounded-lg overflow-hidden mb-12">
          <img 
            src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80" 
            alt="GreenLeaf store" 
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-8 text-white max-w-2xl">
              <h2 className="text-2xl font-bold mb-2">Thực phẩm tươi sạch, chất lượng cao</h2>
              <p>Chúng tôi cam kết cung cấp những sản phẩm hữu cơ tươi ngon nhất từ nông trại đến bàn ăn của bạn.</p>
            </div>
          </div>
        </div>
        
        {/* Our Story */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Câu chuyện của chúng tôi</h2>
          <div className="max-w-3xl mx-auto text-gray-700">
            <p className="mb-4">
              GreenLeaf được thành lập vào năm 2015 với sứ mệnh đơn giản nhưng đầy tham vọng: mang những sản phẩm hữu cơ, tươi ngon và bền vững đến cho mọi gia đình Việt Nam. Chúng tôi bắt đầu từ một cửa hàng nhỏ tại Quận 1, TP.HCM với chỉ vài loại rau củ hữu cơ từ các nông trại địa phương.
            </p>
            <p className="mb-4">
              Trải qua hơn 8 năm phát triển, GreenLeaf đã trở thành một trong những chuỗi cửa hàng thực phẩm hữu cơ lớn nhất Việt Nam, với hơn 15 cửa hàng trên toàn quốc và hệ thống thương mại điện tử phục vụ khách hàng trên khắp cả nước.
            </p>
            <p>
              Chúng tôi tự hào về mối quan hệ gần gũi với hơn 100 nông trại và nhà cung cấp địa phương, những người chia sẻ tầm nhìn của chúng tôi về một hệ thống thực phẩm lành mạnh, bền vững và công bằng. Mỗi sản phẩm trên kệ của chúng tôi đều được lựa chọn cẩn thận, đảm bảo đạt tiêu chuẩn chất lượng cao nhất và được sản xuất theo phương pháp có trách nhiệm với môi trường và xã hội.
            </p>
          </div>
        </div>
        
        {/* Values */}
        <div className="bg-gray-50 py-12 px-4 rounded-lg mb-16">
          <h2 className="text-2xl font-bold mb-10 text-center">Giá trị cốt lõi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/2454/2454282.png" 
                  alt="Leaf icon" 
                  className="h-8 w-8"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">Bền vững</h3>
              <p className="text-gray-700">
                Chúng tôi cam kết giảm thiểu tác động môi trường thông qua việc hỗ trợ các phương pháp canh tác bền vững và giảm thiểu chất thải.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/3373/3373082.png" 
                  alt="Quality icon" 
                  className="h-8 w-8"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">Chất lượng</h3>
              <p className="text-gray-700">
                Chúng tôi không bao giờ thỏa hiệp về chất lượng, luôn đảm bảo mọi sản phẩm đều đạt tiêu chuẩn cao nhất về hương vị và dinh dưỡng.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/1534/1534959.png" 
                  alt="Community icon" 
                  className="h-8 w-8"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">Cộng đồng</h3>
              <p className="text-gray-700">
                Chúng tôi tin vào việc xây dựng mối quan hệ bền chặt với nông dân, nhà cung cấp và khách hàng để tạo nên một cộng đồng thực phẩm lành mạnh.
              </p>
            </div>
          </div>
        </div>
        
        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Tại sao chọn GreenLeaf?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start">
              <div className="mr-3 mt-1 text-primary">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Chất lượng đảm bảo</h3>
                <p className="text-gray-700">Tất cả sản phẩm đều được kiểm tra chất lượng nghiêm ngặt trước khi đến tay khách hàng.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 mt-1 text-primary">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Giao hàng nhanh chóng</h3>
                <p className="text-gray-700">Hệ thống logistics hiện đại giúp sản phẩm đến tay bạn trong ngày, đảm bảo độ tươi ngon.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 mt-1 text-primary">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Sản phẩm hữu cơ</h3>
                <p className="text-gray-700">Chúng tôi ưu tiên các sản phẩm được canh tác hữu cơ, không sử dụng hóa chất độc hại.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 mt-1 text-primary">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Hỗ trợ nông dân địa phương</h3>
                <p className="text-gray-700">Chúng tôi làm việc trực tiếp với nông dân địa phương, đảm bảo họ nhận được giá trị xứng đáng.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 mt-1 text-primary">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Đa dạng sản phẩm</h3>
                <p className="text-gray-700">Từ rau củ, trái cây đến thực phẩm khô và đồ tươi sống, chúng tôi đáp ứng mọi nhu cầu.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 mt-1 text-primary">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Dịch vụ khách hàng tận tâm</h3>
                <p className="text-gray-700">Đội ngũ nhân viên được đào tạo chuyên nghiệp, luôn sẵn sàng hỗ trợ mọi thắc mắc.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Đội ngũ của chúng tôi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Nguyễn Văn A", position: "Giám đốc điều hành", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
              { name: "Trần Thị B", position: "Giám đốc vận hành", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
              { name: "Lê Văn C", position: "Quản lý chuỗi cung ứng", avatar: "https://randomuser.me/api/portraits/men/68.jpg" },
              { name: "Phạm Thị D", position: "Giám đốc marketing", avatar: "https://randomuser.me/api/portraits/women/17.jpg" }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <img 
                  src={member.avatar} 
                  alt={member.name}
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                />
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-primary text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Hãy trở thành một phần của hành trình xanh</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Khám phá các sản phẩm chất lượng cao của chúng tôi và tham gia vào quá trình xây dựng một tương lai thực phẩm bền vững hơn.
          </p>
          <a href="/products" className="inline-block bg-white text-primary font-medium px-6 py-3 rounded-md hover:bg-gray-100 transition">
            Mua sắm ngay
          </a>
        </div>
      </div>
    </Layout>
  );
}
