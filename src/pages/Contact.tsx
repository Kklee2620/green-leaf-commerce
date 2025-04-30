
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Home, Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc.",
        variant: "destructive"
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập địa chỉ email hợp lệ.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Gửi thành công",
        description: "Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi sớm nhất có thể.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };
  
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
              <BreadcrumbLink>Liên hệ</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Liên hệ với chúng tôi</h1>
        
        <div className="flex flex-col md:flex-row gap-12">
          {/* Contact Info */}
          <div className="md:w-1/3">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Thông tin liên hệ</h2>
                <p className="text-gray-600 mb-6">
                  Hãy liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi nào. Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất.
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-3">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Địa chỉ</h3>
                  <p className="text-gray-600">123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-3">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:contact@greenleaf.com" className="hover:text-primary">
                      contact@greenleaf.com
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-3">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Điện thoại</h3>
                  <p className="text-gray-600">
                    <a href="tel:+84901234567" className="hover:text-primary">
                      +84 (0) 90 123 4567
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-3">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Giờ làm việc</h3>
                  <p className="text-gray-600">Thứ Hai - Thứ Bảy: 8:00 - 20:00</p>
                  <p className="text-gray-600">Chủ Nhật: 8:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Gửi tin nhắn cho chúng tôi</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nhập họ và tên của bạn"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Nhập địa chỉ email của bạn"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Số điện thoại
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Nhập số điện thoại của bạn"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                      Tiêu đề
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Nhập tiêu đề"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Nội dung <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Nhập nội dung tin nhắn của bạn"
                    rows={5}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}
                </Button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Map */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Vị trí của chúng tôi</h2>
          <div className="aspect-[16/9] bg-gray-200 rounded-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241674197086!2d106.69901437465221!3d10.779668089258593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4670702e31%3A0xe4f9836b8c3b35bf!2sHo%20Chi%20Minh%20City%20Hall!5e0!3m2!1sen!2s!4v1709777845294!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="GreenLeaf location"
            ></iframe>
          </div>
        </div>
      </div>
    </Layout>
  );
}
