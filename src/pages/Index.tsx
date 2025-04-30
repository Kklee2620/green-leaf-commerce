
import Layout from "@/components/layout/Layout";
import HeroCarousel from "@/components/home/HeroCarousel";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoBanner from "@/components/home/PromoBanner";
import { mockHeroSlides, mockCategories, mockFeaturedProducts, mockNewArrivals, mockPromoBanner } from "@/utils/mockData";

const Index = () => {
  return (
    <Layout>
      {/* Hero Carousel */}
      <HeroCarousel slides={mockHeroSlides} />
      
      {/* Categories */}
      <CategorySection categories={mockCategories} />
      
      {/* Featured Products */}
      <FeaturedProducts title="Sản phẩm nổi bật" products={mockFeaturedProducts} />
      
      {/* Promo Banner */}
      <PromoBanner banner={mockPromoBanner} />
      
      {/* New Arrivals */}
      <FeaturedProducts title="Sản phẩm mới" products={mockNewArrivals} />
    </Layout>
  );
};

export default Index;
