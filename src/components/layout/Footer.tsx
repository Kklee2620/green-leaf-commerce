
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribing(false);
      toast({
        title: "Đăng ký thành công!",
        description: "Cảm ơn bạn đã đăng ký nhận bản tin.",
      });
      setEmail("");
    }, 800);
  };
  
  return (
    <footer className="bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">Về chúng tôi</h3>
            <p className="text-gray-600 mb-4">
              GreenLeaf cung cấp thực phẩm tươi sạch, an toàn và thân thiện với môi trường.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-600 hover:text-primary">Sản phẩm</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-primary">Giới thiệu</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-primary">Liên hệ</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-primary">Blog</Link></li>
            </ul>
          </div>
          
          {/* Policies */}
          <div>
            <h3 className="font-bold text-lg mb-4">Chính sách</h3>
            <ul className="space-y-2">
              <li><Link to="/shipping-policy" className="text-gray-600 hover:text-primary">Chính sách vận chuyển</Link></li>
              <li><Link to="/return-policy" className="text-gray-600 hover:text-primary">Chính sách đổi trả</Link></li>
              <li><Link to="/payment-policy" className="text-gray-600 hover:text-primary">Chính sách thanh toán</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-600 hover:text-primary">Chính sách bảo mật</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Đăng ký nhận tin</h3>
            <p className="text-gray-600 mb-3">
              Nhận thông tin về sản phẩm mới và khuyến mãi.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Email của bạn"
                required
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="btn-primary"
                disabled={isSubscribing}
              >
                {isSubscribing ? "Đang xử lý..." : "Đăng ký"}
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} GreenLeaf. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex space-x-4">
            <img src="https://via.placeholder.com/40x25" alt="Visa" className="h-6" />
            <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="h-6" />
            <img src="https://via.placeholder.com/40x25" alt="PayPal" className="h-6" />
            <img src="https://via.placeholder.com/40x25" alt="Momo" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
}
