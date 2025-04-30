
import { Product, Category } from "@/types";

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: "cat-1",
    name: "Rau củ",
    slug: "rau-cu",
    imageUrl: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "cat-2",
    name: "Trái cây",
    slug: "trai-cay",
    imageUrl: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "cat-3",
    name: "Thực phẩm tươi sống",
    slug: "thuc-pham-tuoi-song",
    imageUrl: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "cat-4",
    name: "Đồ khô",
    slug: "do-kho",
    imageUrl: "https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "cat-5",
    name: "Đồ uống",
    slug: "do-uong",
    imageUrl: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "cat-6",
    name: "Thực phẩm chức năng",
    slug: "thuc-pham-chuc-nang",
    imageUrl: "https://images.unsplash.com/photo-1577948000111-9c970dfe3743?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
  }
];

// Mock Featured Products
export const mockFeaturedProducts: Product[] = [
  {
    id: "prod-1",
    name: "Rau cải ngọt hữu cơ",
    slug: "rau-cai-ngot-huu-co",
    description: "Rau cải ngọt hữu cơ tươi ngon, không thuốc trừ sâu, an toàn cho sức khỏe.",
    price: 25000,
    imageUrl: "https://images.unsplash.com/photo-1576181256399-834e3b3a49bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    stockStatus: "in_stock",
    averageRating: 4.5,
    reviewCount: 28,
    category: "Rau củ"
  },
  {
    id: "prod-2",
    name: "Cam sành Hòa Bình",
    slug: "cam-sanh-hoa-binh",
    description: "Cam sành Hòa Bình mọng nước, ngọt thanh, giàu vitamin C.",
    price: 59000,
    originalPrice: 75000,
    imageUrl: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    stockStatus: "in_stock",
    averageRating: 4.8,
    reviewCount: 42,
    category: "Trái cây"
  },
  {
    id: "prod-3",
    name: "Thịt bò Úc nhập khẩu",
    slug: "thit-bo-uc-nhap-khau",
    description: "Thịt bò Úc nhập khẩu, thớ mềm, vân mỡ đều, hương vị thơm ngon.",
    price: 289000,
    imageUrl: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    stockStatus: "in_stock",
    averageRating: 4.7,
    reviewCount: 19,
    category: "Thực phẩm tươi sống"
  },
  {
    id: "prod-4",
    name: "Hạt điều rang muối",
    slug: "hat-dieu-rang-muoi",
    description: "Hạt điều rang muối giòn rụm, béo ngậy, thơm ngon.",
    price: 120000,
    originalPrice: 150000,
    imageUrl: "https://images.unsplash.com/photo-1563292769-4e05bf792f04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    stockStatus: "low_stock",
    averageRating: 4.9,
    reviewCount: 56,
    category: "Đồ khô"
  },
  {
    id: "prod-5",
    name: "Nước ép táo hữu cơ",
    slug: "nuoc-ep-tao-huu-co",
    description: "Nước ép táo hữu cơ 100%, không đường, không chất bảo quản.",
    price: 45000,
    imageUrl: "https://images.unsplash.com/photo-1576673442511-7e39b6545c87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    stockStatus: "in_stock",
    averageRating: 4.3,
    reviewCount: 31,
    category: "Đồ uống"
  }
];

// Mock New Arrivals
export const mockNewArrivals: Product[] = [
  {
    id: "prod-6",
    name: "Bơ sáp Đắk Lắk",
    slug: "bo-sap-dak-lak",
    description: "Bơ sáp Đắk Lắk tự nhiên, béo ngậy, cực kỳ thơm ngon.",
    price: 69000,
    imageUrl: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    stockStatus: "in_stock",
    averageRating: 4.6,
    reviewCount: 12,
    category: "Trái cây"
  },
  {
    id: "prod-7",
    name: "Bông cải xanh hữu cơ",
    slug: "bong-cai-xanh-huu-co",
    description: "Bông cải xanh hữu cơ tươi ngon, giàu dinh dưỡng.",
    price: 35000,
    imageUrl: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    stockStatus: "in_stock",
    averageRating: 4.4,
    reviewCount: 8,
    category: "Rau củ"
  },
  {
    id: "prod-8",
    name: "Cá hồi tươi Na Uy",
    slug: "ca-hoi-tuoi-na-uy",
    description: "Cá hồi tươi nhập khẩu từ Na Uy, thịt đỏ hồng, béo ngậy.",
    price: 199000,
    originalPrice: 250000,
    imageUrl: "https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    stockStatus: "in_stock",
    averageRating: 4.9,
    reviewCount: 15,
    category: "Thực phẩm tươi sống"
  },
  {
    id: "prod-9",
    name: "Gạo lứt hữu cơ",
    slug: "gao-lut-huu-co",
    description: "Gạo lứt hữu cơ giàu dinh dưỡng, hương vị đậm đà.",
    price: 85000,
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    stockStatus: "in_stock",
    averageRating: 4.2,
    reviewCount: 24,
    category: "Đồ khô"
  },
  {
    id: "prod-10",
    name: "Trà xanh matcha organic",
    slug: "tra-xanh-matcha-organic",
    description: "Trà xanh matcha organic, nguyên chất từ Nhật Bản.",
    price: 160000,
    originalPrice: 190000,
    imageUrl: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    stockStatus: "out_of_stock",
    averageRating: 4.8,
    reviewCount: 38,
    category: "Đồ uống"
  }
];

// Mock Hero Carousel Slides
export const mockHeroSlides = [
  {
    id: "slide-1",
    imageUrl: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    linkUrl: "/products",
    title: "Thực phẩm hữu cơ",
    description: "Lựa chọn an toàn và bền vững cho sức khỏe gia đình bạn"
  },
  {
    id: "slide-2",
    imageUrl: "https://images.unsplash.com/photo-1595436252084-45ba66c8b909?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    linkUrl: "/categories/trai-cay",
    title: "Trái cây tươi",
    description: "Nguồn vitamin tự nhiên cho cả gia đình"
  },
  {
    id: "slide-3",
    imageUrl: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    linkUrl: "/categories/thuc-pham-tuoi-song",
    title: "Thịt tươi sống",
    description: "Thịt tươi sống nhập khẩu từ các trang trại hàng đầu thế giới"
  }
];

// Mock Promo Banner
export const mockPromoBanner = {
  id: "banner-1",
  imageUrl: "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
  linkUrl: "/products",
  altText: "Khuyến mãi mùa hè - Giảm giá đến 30%"
};
