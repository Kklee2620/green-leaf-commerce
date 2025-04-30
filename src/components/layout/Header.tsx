
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, ShoppingBag, Heart, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const { cart, openCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, would navigate to search results page
    console.log("Searching for:", searchQuery);
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-primary font-bold text-2xl">GreenLeaf</span>
          </Link>
          
          {/* Search Bar - Hidden on mobile */}
          <form 
            onSubmit={handleSearch} 
            className="hidden md:flex flex-1 max-w-md mx-4"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Bạn muốn tìm gì hôm nay?"
                className="w-full py-2 pl-4 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
          
          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/account" className="text-gray-700 hover:text-primary hidden sm:block">
              <User size={24} />
            </Link>
            <Link to="/wishlist" className="text-gray-700 hover:text-primary hidden sm:block">
              <Heart size={24} />
            </Link>
            <button 
              onClick={openCart} 
              className="text-gray-700 hover:text-primary relative"
            >
              <ShoppingBag size={24} />
              {cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
            <button 
              onClick={toggleMenu} 
              className="text-gray-700 hover:text-primary md:hidden"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            <form 
              onSubmit={handleSearch} 
              className="mb-4"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Bạn muốn tìm gì hôm nay?"
                  className="w-full py-2 pl-4 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
            <nav className="space-y-2">
              <Link to="/products" className="block py-2 hover:text-primary">Sản phẩm</Link>
              <Link to="/categories" className="block py-2 hover:text-primary">Danh mục</Link>
              <Link to="/account" className="block py-2 hover:text-primary">Tài khoản</Link>
              <Link to="/wishlist" className="block py-2 hover:text-primary">Yêu thích</Link>
              <Link to="/contact" className="block py-2 hover:text-primary">Liên hệ</Link>
            </nav>
          </div>
        )}
        
        {/* Category Navigation - Desktop only */}
        <nav className="hidden md:flex items-center space-x-8 py-3 text-sm font-medium">
          <Link to="/products" className="hover:text-primary">Tất cả sản phẩm</Link>
          <Link to="/categories/rau-cu" className="hover:text-primary">Rau củ</Link>
          <Link to="/categories/trai-cay" className="hover:text-primary">Trái cây</Link>
          <Link to="/categories/thuc-pham-tuoi-song" className="hover:text-primary">Thực phẩm tươi sống</Link>
          <Link to="/categories/do-kho" className="hover:text-primary">Đồ khô</Link>
          <Link to="/categories/do-uong" className="hover:text-primary">Đồ uống</Link>
        </nav>
      </div>
    </header>
  );
}
