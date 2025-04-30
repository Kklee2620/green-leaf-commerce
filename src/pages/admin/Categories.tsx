
import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null);

  // Form cho danh mục mới
  const form = useForm({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      image: ""
    }
  });
  
  // Form cho chỉnh sửa danh mục
  const editForm = useForm({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      image: ""
    }
  });
  
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
  
  // Tự động tạo slug từ tên
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');
  };
  
  // Xử lý khi tên thay đổi để cập nhật slug
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'name') {
        form.setValue('slug', generateSlug(value.name));
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);
  
  // Xử lý khi chỉnh sửa tên để cập nhật slug
  useEffect(() => {
    const subscription = editForm.watch((value, { name }) => {
      if (name === 'name') {
        editForm.setValue('slug', generateSlug(value.name));
      }
    });
    
    return () => subscription.unsubscribe();
  }, [editForm]);
  
  // Xử lý thêm danh mục mới
  const handleAddCategory = (data) => {
    const newCategory = {
      id: categories.length + 1,
      name: data.name,
      slug: data.slug,
      description: data.description,
      image: data.image || "/placeholder.svg",
      productCount: 0
    };
    
    setCategories([...categories, newCategory]);
    form.reset();
    toast.success("Đã thêm danh mục mới thành công!");
  };
  
  // Xử lý xoá danh mục
  const handleDeleteCategory = (categoryId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      setCategories(categories.filter(cat => cat.id !== categoryId));
      toast.success("Đã xóa danh mục thành công!");
    }
  };
  
  // Xử lý chuẩn bị chỉnh sửa danh mục
  const handlePrepareEdit = (category) => {
    setEditingCategory(category);
    editForm.reset(category);
  };
  
  // Xử lý chỉnh sửa danh mục
  const handleEditCategory = (data) => {
    setCategories(categories.map(cat => 
      cat.id === editingCategory.id ? { ...cat, ...data } : cat
    ));
    
    setEditingCategory(null);
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddCategory)} className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên danh mục</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập tên danh mục" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Slug tự động tạo từ tên" 
                          {...field} 
                          readOnly 
                          className="bg-gray-50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Nhập mô tả danh mục" 
                          className="resize-none" 
                          rows={4}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL hình ảnh</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập URL hình ảnh" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Hủy</Button>
                  </DialogClose>
                  <Button type="submit">Lưu danh mục</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Danh sách danh mục */}
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
                          <Form {...editForm}>
                            <form onSubmit={editForm.handleSubmit(handleEditCategory)} className="space-y-4 pt-4">
                              <FormField
                                control={editForm.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Tên danh mục</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Nhập tên danh mục" {...field} required />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={editForm.control}
                                name="slug"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="Slug tự động tạo từ tên" 
                                        {...field} 
                                        readOnly 
                                        className="bg-gray-50"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={editForm.control}
                                name="description"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Mô tả</FormLabel>
                                    <FormControl>
                                      <Textarea 
                                        placeholder="Nhập mô tả danh mục" 
                                        className="resize-none" 
                                        rows={4}
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={editForm.control}
                                name="image"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>URL hình ảnh</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Nhập URL hình ảnh" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button type="button" variant="outline">Hủy</Button>
                                </DialogClose>
                                <Button type="submit">Lưu thay đổi</Button>
                              </DialogFooter>
                            </form>
                          </Form>
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
    </div>
  );
}
