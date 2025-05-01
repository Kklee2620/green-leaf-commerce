
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import CategoryForm from "./CategoryForm";

interface Category {
  id: number | string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

interface CategoriesTableProps {
  categories: Category[];
  isLoading: boolean;
  onDelete: (id: number | string) => void;
  onEdit: (data: any, categoryId: number | string) => void;
}

const CategoriesTable = ({ categories, isLoading, onDelete, onEdit }: CategoriesTableProps) => {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  const handlePrepareEdit = (category: Category) => {
    setEditingCategory(category);
  };
  
  const handleEditSubmit = (data: any) => {
    if (editingCategory) {
      onEdit(data, editingCategory.id);
      setEditingCategory(null);
    }
  };
  
  const handleDeleteCategory = (categoryId: number | string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      onDelete(categoryId);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Danh sách danh mục</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hình ảnh</TableHead>
              <TableHead>Tên danh mục</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>Số SP</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  Đang tải dữ liệu...
                </TableCell>
              </TableRow>
            ) : categories.length > 0 ? (
              categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell className="max-w-xs truncate">{category.description}</TableCell>
                  <TableCell>{category.productCount}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handlePrepareEdit(category)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[550px]">
                        <DialogHeader>
                          <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
                        </DialogHeader>
                        {editingCategory && (
                          <CategoryForm 
                            initialValues={{
                              name: editingCategory.name,
                              slug: editingCategory.slug,
                              description: editingCategory.description,
                              image: editingCategory.image
                            }}
                            onSubmit={handleEditSubmit}
                            isEdit={true}
                          />
                        )}
                      </DialogContent>
                    </Dialog>

                    <Button 
                      variant="outline" 
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                  Không có danh mục nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CategoriesTable;
