
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Calendar, User, FileText, Image as ImageIcon, Film, FileArchive } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import RichTextEditor from "@/components/editor/RichTextEditor";

interface Article {
  id: number;
  title: string;
  summary: string;
  content: string;
  author: string;
  publishDate: string;
  featuredImageUrl: string;
  magazineId: number;
  order: number;
  isPublished: boolean;
  createdAt: number;
  updatedAt: number;
}

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showEditor, setShowEditor] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  const { data: magazines = [] } = useQuery<any[]>({
    queryKey: ['/api/magazines'],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('خطا در حذف مقاله');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({
        title: "موفقیت",
        description: "مقاله با موفقیت حذف شد",
      });
    },
  });

  const filteredArticles = articles.filter((article: Article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "published" && article.isPublished) ||
                         (statusFilter === "draft" && !article.isPublished);
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setShowEditor(true);
  };

  const handleNew = () => {
    setEditingArticle({
      id: 0,
      title: '',
      summary: '',
      content: '',
      author: 'مدیر سیستم',
      publishDate: new Date().toISOString().split('T')[0],
      featuredImageUrl: '',
      magazineId: magazines[0]?.id || 1,
      order: 0,
      isPublished: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    } as Article);
    setShowEditor(true);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('fa-IR');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">مقالات</h1>
          <p className="text-gray-600 mt-1">مدیریت مقالات و محتوای ارشیو</p>
        </div>
        
        <Button onClick={handleNew} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 ml-2" />
          مقاله جدید
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>همه مقالات</CardTitle>
              <CardDescription>
                مدیریت و ویرایش مقالات ارشیو
              </CardDescription>
            </div>
            
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="جستجو در مقالات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 w-64"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">همه وضعیت‌ها</option>
                <option value="published">منتشر شده</option>
                <option value="draft">پیش‌نویس</option>
              </select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="bg-gray-200 h-4 w-2/5 rounded"></div>
                  <div className="bg-gray-200 h-4 w-24 rounded"></div>
                  <div className="bg-gray-200 h-4 w-20 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>عنوان</TableHead>
                  <TableHead>نویسنده</TableHead>
                  <TableHead>وضعیت</TableHead>
                  <TableHead>تاریخ انتشار</TableHead>
                  <TableHead className="text-left">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.map((article: Article) => (
                  <TableRow key={article.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {article.featuredImageUrl && (
                          <img src={article.featuredImageUrl} alt="" className="w-12 h-12 rounded object-cover" />
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{article.title}</div>
                          <div className="text-sm text-gray-500 mt-1">{article.summary}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="w-4 h-4 ml-2 text-gray-400" />
                        <span className="text-sm">{article.author}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={article.isPublished ? "default" : "secondary"}>
                        {article.isPublished ? "منتشر شده" : "پیش‌نویس"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 ml-2" />
                        {article.publishDate ? new Date(article.publishDate).toLocaleDateString('fa-IR') : '—'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(article)}>
                            <Edit className="w-4 h-4 ml-2" />
                            ویرایش
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => deleteMutation.mutate(article.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 ml-2" />
                            حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {filteredArticles.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">هیچ مقاله‌ای یافت نشد</h3>
          <p className="text-gray-500 mb-4">
            {searchQuery ? "جستجوی شما نتیجه‌ای نداشت" : "هنوز مقاله‌ای ایجاد نشده است"}
          </p>
          <Button onClick={handleNew}>
            <Plus className="w-4 h-4 ml-2" />
            ایجاد اولین مقاله
          </Button>
        </div>
      )}

      {showEditor && editingArticle && (
        <ArticleEditor
          article={editingArticle}
          magazines={magazines}
          onClose={() => {
            setShowEditor(false);
            setEditingArticle(null);
          }}
          onSave={() => {
            queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
            setShowEditor(false);
            setEditingArticle(null);
          }}
        />
      )}
    </div>
  );
}

interface ArticleEditorProps {
  article: Article;
  magazines: any[];
  onClose: () => void;
  onSave: () => void;
}

function ArticleEditor({ article, magazines, onClose, onSave }: ArticleEditorProps) {
  const [formData, setFormData] = useState(article);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: async (data: Article) => {
      const url = data.id ? `/api/articles/${data.id}` : '/api/articles';
      const method = data.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('خطا در ذخیره مقاله');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "موفقیت",
        description: "مقاله با موفقیت ذخیره شد",
      });
      onSave();
    },
    onError: (error: any) => {
      toast({
        title: "خطا",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('files', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('خطا در آپلود');
      
      const result = await response.json();
      const url = result.files?.[0]?.url || result.url || result.file?.url;
      
      if (!url) throw new Error('آدرس فایل پیدا نشد');
      
      return url;
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در آپلود فایل",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = await handleImageUpload(e);
    if (url) {
      setFormData({ ...formData, featuredImageUrl: url });
    }
  };

  const handleMediaInsert = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,video/*,.pdf';
    
    input.onchange = async (e: any) => {
      const url = await handleImageUpload(e);
      if (url) {
        const fileType = e.target.files[0].type;
        let html = '';
        
        if (fileType.startsWith('image/')) {
          html = `<img src="${url}" alt="تصویر" style="max-width: 100%; height: auto; margin: 1rem 0;" />`;
        } else if (fileType.startsWith('video/')) {
          html = `<video controls style="max-width: 100%; margin: 1rem 0;"><source src="${url}" type="${fileType}"></video>`;
        } else if (fileType === 'application/pdf') {
          html = `<a href="${url}" target="_blank" style="color: #2563eb; text-decoration: underline;">دانلود فایل PDF</a>`;
        }
        
        setFormData({ ...formData, content: formData.content + html });
      }
    };
    
    input.click();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {article.id ? 'ویرایش مقاله' : 'مقاله جدید'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">عنوان مقاله</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="عنوان مقاله را وارد کنید..."
              className="text-lg"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">خلاصه مقاله</label>
            <textarea
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              placeholder="خلاصه‌ای از مقاله را وارد کنید..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          {/* Content Editor */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">محتوای مقاله</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleMediaInsert}
                disabled={uploading}
              >
                <ImageIcon className="w-4 h-4 ml-2" />
                افزودن رسانه
              </Button>
            </div>
            <RichTextEditor
              content={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              onImageInsert={handleMediaInsert}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Featured Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">تصویر شاخص</label>
              <div className="space-y-2">
                <Input
                  type="url"
                  value={formData.featuredImageUrl}
                  onChange={(e) => setFormData({ ...formData, featuredImageUrl: e.target.value })}
                  placeholder="آدرس تصویر یا آپلود کنید"
                />
                <div className="flex items-center gap-2">
                  <input
                    id="featured-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFeaturedImageUpload}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('featured-upload')?.click()}
                    disabled={uploading}
                  >
                    <ImageIcon className="w-4 h-4 ml-2" />
                    آپلود تصویر
                  </Button>
                  {formData.featuredImageUrl && (
                    <img src={formData.featuredImageUrl} alt="پیش‌نمایش" className="h-12 rounded" />
                  )}
                </div>
              </div>
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نویسنده</label>
              <Input
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="نام نویسنده"
              />
            </div>

            {/* Publish Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">تاریخ انتشار</label>
              <Input
                type="date"
                value={formData.publishDate}
                onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
              />
            </div>

            {/* Magazine */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">مجله مرتبط</label>
              <select
                value={formData.magazineId}
                onChange={(e) => setFormData({ ...formData, magazineId: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {magazines.map(mag => (
                  <option key={mag.id} value={mag.id}>{mag.title}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Publish Status */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="published" className="text-sm text-gray-700">منتشر شود</label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={() => saveMutation.mutate(formData)}
              disabled={saveMutation.isPending || uploading}
              className="bg-green-600 hover:bg-green-700"
            >
              {saveMutation.isPending ? 'در حال ذخیره...' : 'ذخیره مقاله'}
            </Button>
            <Button variant="outline" onClick={onClose}>
              انصراف
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
