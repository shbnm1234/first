
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, Search, MoreHorizontal, Edit, Trash2, Calendar, User, ImageIcon, Film, FileText, Upload, X } from "lucide-react";
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
  category: string;
  order: number;
  isPublished: boolean;
  createdAt: number;
  updatedAt: number;
}

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
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

  const categories = ["عمومی", "آموزشی", "تحقیقاتی", "خبری", "فنی"];

  const filteredArticles = articles.filter((article: Article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "published" && article.isPublished) ||
                         (statusFilter === "draft" && !article.isPublished);
    const matchesCategory = categoryFilter === "all" || article.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
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
      category: 'عمومی',
      order: 0,
      isPublished: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    } as Article);
    setShowEditor(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">مقالات</h1>
          <p className="text-gray-600 mt-1">مدیریت مقالات و محتوای ارشیو - مانند نوشته‌های وردپرس</p>
        </div>
        
        <Button onClick={handleNew} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 ml-2" />
          افزودن مقاله جدید
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>همه مقالات</CardTitle>
              <CardDescription>
                مدیریت و ویرایش مقالات با ویرایشگر پیشرفته
              </CardDescription>
            </div>
            
            <div className="flex items-center space-x-4 rtl:space-x-reverse gap-3">
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
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">همه دسته‌ها</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

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
                  <TableHead className="w-12"></TableHead>
                  <TableHead>عنوان</TableHead>
                  <TableHead>نویسنده</TableHead>
                  <TableHead>دسته‌بندی</TableHead>
                  <TableHead>وضعیت</TableHead>
                  <TableHead>تاریخ انتشار</TableHead>
                  <TableHead className="text-left">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.map((article: Article) => (
                  <TableRow key={article.id}>
                    <TableCell>
                      {article.featuredImageUrl && (
                        <img src={article.featuredImageUrl} alt="" className="w-10 h-10 rounded object-cover" />
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{article.title}</div>
                        <div className="text-sm text-gray-500 mt-1 line-clamp-1">{article.summary}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <User className="w-4 h-4 ml-2 text-gray-400" />
                        {article.author}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{article.category}</Badge>
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
          categories={categories}
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
  categories: string[];
  onClose: () => void;
  onSave: () => void;
}

function ArticleEditor({ article, magazines, categories, onClose, onSave }: ArticleEditorProps) {
  const [formData, setFormData] = useState(article);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'pdf' = 'image') => {
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
    const url = await handleFileUpload(e, 'image');
    if (url) {
      setFormData({ ...formData, featuredImageUrl: url });
    }
  };

  const insertMedia = (type: 'image' | 'video' | 'pdf') => {
    const input = document.createElement('input');
    input.type = 'file';
    
    if (type === 'image') {
      input.accept = 'image/*';
    } else if (type === 'video') {
      input.accept = 'video/*';
    } else if (type === 'pdf') {
      input.accept = '.pdf';
    }
    
    input.onchange = async (e: any) => {
      const url = await handleFileUpload(e, type);
      if (url) {
        let html = '';
        
        if (type === 'image') {
          html = `<img src="${url}" alt="تصویر" style="max-width: 100%; height: auto; margin: 1rem 0;" />`;
        } else if (type === 'video') {
          html = `<video controls style="max-width: 100%; margin: 1rem 0;"><source src="${url}"></video>`;
        } else if (type === 'pdf') {
          html = `<a href="${url}" target="_blank" style="color: #2563eb; text-decoration: underline; display: inline-flex; align-items: center; gap: 0.5rem;"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/></svg>دانلود فایل PDF</a>`;
        }
        
        setFormData({ ...formData, content: formData.content + html });
      }
    };
    
    input.click();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {article.id ? 'ویرایش مقاله' : 'افزودن مقاله جدید'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Title */}
          <div>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="عنوان مقاله را اینجا بنویسید"
              className="text-2xl font-bold border-0 shadow-none focus-visible:ring-0 px-0"
            />
          </div>

          {/* Toolbar for Media */}
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border">
            <span className="text-sm font-medium text-gray-700 ml-3">افزودن رسانه:</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => insertMedia('image')}
              disabled={uploading}
            >
              <ImageIcon className="w-4 h-4 ml-2" />
              تصویر
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => insertMedia('video')}
              disabled={uploading}
            >
              <Film className="w-4 h-4 ml-2" />
              ویدیو
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => insertMedia('pdf')}
              disabled={uploading}
            >
              <FileText className="w-4 h-4 ml-2" />
              PDF
            </Button>
            {uploading && <span className="text-sm text-gray-500 mr-auto">در حال آپلود...</span>}
          </div>

          {/* Content Editor */}
          <div className="border rounded-lg p-4 min-h-[400px]">
            <RichTextEditor
              content={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              onImageInsert={() => insertMedia('image')}
            />
          </div>

          {/* Excerpt/Summary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">خلاصه مقاله</label>
            <textarea
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              placeholder="خلاصه‌ای کوتاه از مقاله..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows={3}
            />
          </div>

          {/* Sidebar Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Featured Image */}
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">تصویر شاخص</label>
              <div className="space-y-3">
                {formData.featuredImageUrl && (
                  <div className="relative inline-block">
                    <img src={formData.featuredImageUrl} alt="تصویر شاخص" className="max-w-xs rounded-lg border" />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, featuredImageUrl: '' })}
                      className="absolute top-2 left-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <div className="flex gap-2">
                  <Input
                    type="url"
                    value={formData.featuredImageUrl}
                    onChange={(e) => setFormData({ ...formData, featuredImageUrl: e.target.value })}
                    placeholder="یا آدرس تصویر را وارد کنید"
                  />
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
                    onClick={() => document.getElementById('featured-upload')?.click()}
                    disabled={uploading}
                  >
                    <Upload className="w-4 h-4 ml-2" />
                    آپلود
                  </Button>
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

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">دسته‌بندی</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Magazine */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">مجله مرتبط (اختیاری)</label>
              <select
                value={formData.magazineId}
                onChange={(e) => setFormData({ ...formData, magazineId: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value={0}>بدون مجله</option>
                {magazines.map(mag => (
                  <option key={mag.id} value={mag.id}>{mag.title}</option>
                ))}
              </select>
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ترتیب نمایش</label>
              <Input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                min={0}
              />
            </div>
          </div>

          {/* Publish Status */}
          <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="published"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="published" className="text-sm font-medium text-gray-700">
              {formData.isPublished ? 'منتشر شده' : 'پیش‌نویس'} - 
              <span className="text-gray-500 mr-2">
                با فعال کردن این گزینه، مقاله برای عموم قابل مشاهده خواهد بود
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={() => saveMutation.mutate(formData)}
              disabled={saveMutation.isPending || uploading || !formData.title}
              className="bg-green-600 hover:bg-green-700"
            >
              {saveMutation.isPending ? 'در حال ذخیره...' : formData.isPublished ? 'انتشار' : 'ذخیره پیش‌نویس'}
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              disabled={saveMutation.isPending}
            >
              انصراف
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
