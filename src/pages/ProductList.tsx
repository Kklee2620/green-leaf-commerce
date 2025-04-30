
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Home, SlidersHorizontal, X } from "lucide-react";
import { mockCategories, mockFeaturedProducts } from "@/utils/mockData";
import { formatCurrency } from "@/utils/format";
import { Product } from "@/types";

export default function ProductList() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [sortOption, setSortOption] = useState("featured");

  const currentCategory = slug 
    ? mockCategories.find(cat => cat.slug === slug) 
    : { name: "Tất cả sản phẩm", slug: "all" };

  // Simulate API call
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setProducts(mockFeaturedProducts);
      setIsLoading(false);
    }, 500);
  }, [slug, searchParams]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    // In a real app, update searchParams and refetch
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
    // In a real app, debounce this and then update searchParams
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
            {slug && slug !== "all" ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/products">Sản phẩm</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>{currentCategory?.name}</BreadcrumbLink>
                </BreadcrumbItem>
              </>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbLink>Sản phẩm</BreadcrumbLink>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6">{currentCategory?.name}</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters - Mobile Toggle */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <button 
              onClick={toggleFilter}
              className="flex items-center px-4 py-2 border rounded-md"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Bộ lọc
            </button>
            <Select value={sortOption} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sắp xếp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Nổi bật</SelectItem>
                <SelectItem value="newest">Mới nhất</SelectItem>
                <SelectItem value="price-asc">Giá: Thấp đến cao</SelectItem>
                <SelectItem value="price-desc">Giá: Cao đến thấp</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sidebar Filters */}
          <div className={`
            lg:w-1/4 bg-white p-4 border rounded-md
            fixed lg:relative inset-0 z-40 transform transition-transform duration-300 ease-in-out
            ${isFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}>
            {/* Mobile filter header */}
            <div className="flex justify-between items-center lg:hidden mb-4 border-b pb-2">
              <h3 className="font-semibold">Bộ lọc</h3>
              <button onClick={toggleFilter}>
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Giá</h3>
              <Slider 
                defaultValue={[priceRange[0], priceRange[1]]} 
                min={0}
                max={1000000}
                step={10000}
                onValueChange={handlePriceChange}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatCurrency(priceRange[0])}</span>
                <span>{formatCurrency(priceRange[1])}</span>
              </div>
            </div>

            {/* Availability Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Tình trạng</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="in-stock" />
                  <label htmlFor="in-stock">Còn hàng</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="out-of-stock" />
                  <label htmlFor="out-of-stock">Hết hàng</label>
                </div>
              </div>
            </div>

            {/* Ratings Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Đánh giá</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(rating => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox id={`rating-${rating}`} />
                    <label htmlFor={`rating-${rating}`} className="flex items-center">
                      {rating}★ trở lên
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply Filters Button - Mobile Only */}
            <button className="lg:hidden w-full btn-primary">
              Áp dụng
            </button>
          </div>

          {/* Product Grid and Sorting */}
          <div className="lg:w-3/4">
            {/* Desktop Sorting */}
            <div className="hidden lg:flex justify-end mb-6">
              <Select value={sortOption} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Sắp xếp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Nổi bật</SelectItem>
                  <SelectItem value="newest">Mới nhất</SelectItem>
                  <SelectItem value="price-asc">Giá: Thấp đến cao</SelectItem>
                  <SelectItem value="price-desc">Giá: Cao đến thấp</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-gray-100 rounded-md p-4 h-72 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <>
                {products.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {products.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500">Không tìm thấy sản phẩm phù hợp.</p>
                  </div>
                )}
              </>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex space-x-1">
                <button className="px-4 py-2 border rounded-md disabled:opacity-50">
                  Trước
                </button>
                <button className="px-4 py-2 border rounded-md bg-primary text-white">
                  1
                </button>
                <button className="px-4 py-2 border rounded-md">
                  2
                </button>
                <button className="px-4 py-2 border rounded-md">
                  3
                </button>
                <button className="px-4 py-2 border rounded-md">
                  Sau
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Backdrop for mobile filters */}
        {isFilterOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={toggleFilter}
          />
        )}
      </div>
    </Layout>
  );
}
