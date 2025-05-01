
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
import ProductForm from "@/components/admin/products/ProductForm";
import ProductsTable from "@/components/admin/products/ProductsTable";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description?: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Giả lập dữ liệu sản phẩm
  useEffect(() => {
    // Giả lập API request
    setTimeout(() => {
      const mockProducts = [
        {
          id: "prod-001",
          name: "Cải xanh hữu cơ",
          category: "Rau củ",
          price: 25000,
          stock: 120,
          image: "/placeholder.svg"
        },
        {
          id: "prod-002",
          name: "Cà chua hữu cơ",
          category: "Rau củ",
          price: 35000,
          stock: 75,
          image: "/placeholder.svg"
        },
        {
          id: "prod-003",
          name: "Táo Fuji",
          category: "Trái cây",
          price: 65000,
          stock: 50,
          image: "/placeholder.svg"
        },
        {
          id: "prod-004",
          name: "Thịt bò Úc",
          category: "Thực phẩm tươi sống",
          price: 320000,
          stock: 25,
          image: "/placeholder.svg"
        },
        {
          id: "prod-005",
          name: "Hạt điều rang muối",
          category: "Đồ khô",
          price: 120000,
          stock: 60,
          image: "/placeholder.svg"
        },
      ];
      
      setProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Xử lý thêm sản phẩm mới
  const handleAddProduct = (data: any) => {
    const newProduct = {
      id: `prod-${Math.floor(Math.random() * 1000)}`,
      name: data.name,
      category: data.category,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
      image: data.image || "/placeholder.svg",
      description: data.description
    };
    
    setProducts([...products, newProduct]);
    toast.success("Đã thêm sản phẩm mới thành công!");
  };
  
  // Xử lý xóa sản phẩm
  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId));
    toast.success("Đã xóa sản phẩm thành công!");
  };
  
  // Xử lý chọn sản phẩm để chỉnh sửa
  const handleEditSelect = (product: Product) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };
  
  // Xử lý cập nhật sản phẩm
  const handleUpdateProduct = (data: any) => {
    if (selectedProduct) {
      const updatedProducts = products.map(product =>
        product.id === selectedProduct.id
          ? {
              ...product,
              name: data.name,
              category: data.category,
              price: parseFloat(data.price),
              stock: parseInt(data.stock),
              image: data.image || product.image,
              description: data.description
            }
          : product
      );
      
      setProducts(updatedProducts);
      setIsEditDialogOpen(false);
      setSelectedProduct(null);
      toast.success("Đã cập nhật sản phẩm thành công!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
          <p className="text-gray-500">Quản lý các sản phẩm trong hệ thống</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex gap-2">
              <PlusCircle className="h-4 w-4" />
              Thêm sản phẩm
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Thêm sản phẩm mới</DialogTitle>
            </DialogHeader>
            <ProductForm onSubmit={handleAddProduct} />
          </DialogContent>
        </Dialog>
      </div>
      
      <ProductsTable 
        products={products}
        isLoading={isLoading}
        onDelete={handleDeleteProduct}
        onEdit={handleEditSelect}
      />
      
      {/* Dialog chỉnh sửa sản phẩm */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <ProductForm 
              initialValues={{
                name: selectedProduct.name,
                category: selectedProduct.category,
                price: selectedProduct.price.toString(),
                stock: selectedProduct.stock.toString(),
                description: selectedProduct.description || "",
                image: selectedProduct.image
              }}
              onSubmit={handleUpdateProduct}
              isEdit={true}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
