
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Home, SlidersHorizontal, X } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { useProducts } from "@/hooks/useProducts";
import { useCategories, useCategoryBySlug } from "@/hooks/useCategories";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";

export default function ProductList() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [sortOption, setSortOption] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Fetch category if slug provided
  const { data: category } = useCategoryBySlug(slug || '');
  
  // Fetch all categories for filtering
  const { data: categoriesData } = useCategories();
  
  // Build query parameters for API request
  const queryParams = {
    category: slug && slug !== 'all' ? slug : undefined,
    sort: sortOption,
    page: currentPage,
    limit: 12,
    priceMin: priceRange[0],
    priceMax: priceRange[1],
    search: searchParams.get('q') || undefined
  };
  
  // Fetch products
  const { 
    data: productsData,
    isLoading,
    isError
  } = useProducts(queryParams);
  
  const products = productsData?.products || [];
  const totalPages = productsData?.totalPages || 1;
  
  const currentCategory = category || { name: "Tất cả sản phẩm", slug: "all" };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    setCurrentPage(1);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
    // Debounce this in a real implementation
  };
  
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const handleCheckboxChange = (value: string, checked: boolean, paramName: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (checked) {
      params.append(paramName, value);
    } else {
      // Remove the specific value
      const values = params.getAll(paramName).filter(v => v !== value);
      params.delete(paramName);
      values.forEach(v => params.append(paramName, v));
    }
    
    setSearchParams(params);
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
            
            {/* Categories Filter (only when on the main products page) */}
            {(!slug || slug === 'all') && categoriesData && (
              <div className="mb-6">
                <h3 className="font-medium mb-3">Danh mục</h3>
                <div className="space-y-2">
                  {categoriesData.map(cat => (
                    <div key={cat.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`category-${cat.id}`}
                        checked={searchParams.getAll('categories').includes(cat.slug)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange(cat.slug, checked as boolean, 'categories')
                        }
                      />
                      <label htmlFor={`category-${cat.id}`}>{cat.name}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                  <Checkbox 
                    id="in-stock" 
                    checked={searchParams.getAll('stock').includes('in_stock')}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('in_stock', checked as boolean, 'stock')
                    }
                  />
                  <label htmlFor="in-stock">Còn hàng</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="out-of-stock"
                    checked={searchParams.getAll('stock').includes('out_of_stock')}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('out_of_stock', checked as boolean, 'stock')
                    }
                  />
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
                    <Checkbox 
                      id={`rating-${rating}`}
                      checked={searchParams.getAll('rating').includes(rating.toString())}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange(rating.toString(), checked as boolean, 'rating')
                      }
                    />
                    <label htmlFor={`rating-${rating}`} className="flex items-center">
                      {rating}★ trở lên
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply Filters Button - Mobile Only */}
            <button 
              className="lg:hidden w-full btn-primary"
              onClick={toggleFilter}
            >
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
            ) : isError ? (
              <div className="text-center py-10">
                <p className="text-red-500">Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.</p>
                <Button 
                  className="mt-4"
                  onClick={() => window.location.reload()}
                >
                  Tải lại
                </Button>
              </div>
            ) : (
              <>
                {products.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {products.map((product: Product) => (
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
            {!isLoading && !isError && products.length > 0 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-1">
                  <Button 
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                  >
                    Trước
                  </Button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Logic to display page numbers around the current page
                    let pageNum = i + 1;
                    if (totalPages > 5) {
                      if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                    }
                    
                    return (
                      <Button 
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  
                  <Button 
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                  >
                    Sau
                  </Button>
                </div>
              </div>
            )}
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
