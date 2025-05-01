
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import CategoryForm from "@/components/admin/categories/CategoryForm";
import CategoriesTable from "@/components/admin/categories/CategoriesTable";

interface Category {
  id: number | string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Giả lập dữ liệu danh mục
  useEffect(() => {
    // Giả lập API request
    setTimeout(() => {
      const mockCategories = [
        {
          id: 1,
          name: "Rau củ",
          slug: "rau-cu",
          description: "Các loại rau củ tươi, sạch, an toàn cho sức khỏe",
          image: "/placeholder.svg",
          productCount: 42
        },
        {
          id: 2,
          name: "Trái cây",
          slug: "trai-cay",
          description: "Các loại trái cây tươi, ngọt, giàu vitamin",
          image: "/placeholder.svg",
          productCount: 35
        },
        {
          id: 3,
          name: "Thực phẩm tươi sống",
          slug: "thuc-pham-tuoi-song",
          description: "Thịt, cá, hải sản tươi ngon từ các vùng miền",
          image: "/placeholder.svg",
          productCount: 28
        },
        {
          id: 4,
          name: "Đồ khô",
          slug: "do-kho",
          description: "Các loại hạt, ngũ cốc, gia vị,...",
          image: "/placeholder.svg",
          productCount: 17
        },
        {
          id: 5,
          name: "Đồ uống",
          slug: "do-uong",
          description: "Nước giải khát, nước ép, sữa,...",
          image: "/placeholder.svg",
          productCount: 23
        },
      ];
      
      setCategories(mockCategories);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Xử lý thêm danh mục mới
  const handleAddCategory = (data: any) => {
    const newCategory = {
      id: Date.now(),
      name: data.name,
      slug: data.slug,
      description: data.description,
      image: data.image || "/placeholder.svg",
      productCount: 0
    };
    
    setCategories([...categories, newCategory]);
    toast.success("Đã thêm danh mục mới thành công!");
  };
  
  // Xử lý xóa danh mục
  const handleDeleteCategory = (categoryId: number | string) => {
    setCategories(categories.filter(cat => cat.id !== categoryId));
    toast.success("Đã xóa danh mục thành công!");
  };
  
  // Xử lý chỉnh sửa danh mục
  const handleEditCategory = (data: any, categoryId: number | string) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId ? { 
        ...cat, 
        name: data.name,
        slug: data.slug,
        description: data.description,
        image: data.image || cat.image
      } : cat
    ));
    
    toast.success("Đã cập nhật danh mục thành công!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Quản lý danh mục</h1>
          <p className="text-gray-500">Quản lý các danh mục sản phẩm</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex gap-2">
              <PlusCircle className="h-4 w-4" />
              Thêm danh mục
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Thêm danh mục mới</DialogTitle>
            </DialogHeader>
            <CategoryForm onSubmit={handleAddCategory} />
          </DialogContent>
        </Dialog>
      </div>
      
      <CategoriesTable 
        categories={categories}
        isLoading={isLoading}
        onDelete={handleDeleteCategory}
        onEdit={handleEditCategory}
      />
    </div>
  );
}
