import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { type Course, type Project, type Document, type MediaContent, type Magazine, type Article, type ArticleContent, type Slide, type Workshop, type WorkshopSection } from "@shared/schema";
import { Calendar, Edit, Eye, File, Folder, Image, Lock, LockOpen, MoreHorizontal, Plus, RefreshCw, Trash, Upload, Video, Copy, X, Zap, Info, Phone, Users, Building } from "lucide-react";
import WorkshopsTab from "../components/admin/WorkshopsTab";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("aboutus");

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-l min-h-screen">
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold text-gray-900">پنل مدیریت</h1>
            <p className="text-sm text-gray-600 mt-1">مدیریت محتوا و تنظیمات</p>
          </div>

          <nav className="p-4">
            <div className="space-y-1">
              {[
                { id: "courses", label: "دوره‌ها", icon: Video },
                { id: "projects", label: "پروژه‌ها", icon: Folder },
                { id: "documents", label: "آرشیو مقالات", icon: File },
                { id: "workshop-registrations", label: "ثبت‌نام کارگاه‌ها", icon: Edit },
                { id: "workshops", label: "کارگاه‌ها", icon: RefreshCw },
                { id: "webinars", label: "وبینارها", icon: Video },
                { id: "educational-videos", label: "ویدیوهای آموزشی", icon: Video },
                { id: "slides", label: "اسلایدهای صفحه اصلی", icon: Image },
                { id: "quickaccess", label: "دسترسی سریع", icon: Zap },
                { id: "magazines", label: "مجله‌ها", icon: Calendar },
                { id: "media", label: "کتابخانه رسانه", icon: Upload },
                { id: "aboutus", label: "درباره ما", icon: Building },
                { id: "contactus", label: "تماس با ما", icon: Phone },
                { id: "users", label: "کاربران", icon: Lock }
              ].map(tab => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-right transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {activeTab === "courses" && "دوره‌های آموزشی"}
              {activeTab === "projects" && "پروژه‌ها"}
              {activeTab === "documents" && "اسناد"}
              {activeTab === "workshops" && "کارگاه‌های آموزشی"}
              {activeTab === "webinars" && "وبینارهای آموزشی"}
              {activeTab === "educational-videos" && "ویدیوهای آموزشی"}
              {activeTab === "slides" && "اسلایدهای صفحه اصلی"}
              {activeTab === "quickaccess" && "مدیریت منوی دسترسی سریع"}
              {activeTab === "magazines" && "مجله‌ها"}
              {activeTab === "media" && "کتابخانه رسانه"}
              {activeTab === "aboutus" && "درباره ما"}
              {activeTab === "contactus" && "تماس با ما"}
              {activeTab === "users" && "مدیریت کاربران"}
            </h2>
          </div>

          <div className="space-y-6">
            {activeTab === "courses" && <CoursesTab />}
            {activeTab === "projects" && <ProjectsTab />}
              {activeTab === "documents" && <DocumentsTab />}
            {activeTab === "workshop-registrations" && <WorkshopRegistrationsTab />}
            {activeTab === "workshops" && <WorkshopsTab />}
            {activeTab === "webinars" && <WebinarsTab />}
            {activeTab === "educational-videos" && <EducationalVideosTab />}
            {activeTab === "slides" && <SlidesTab />}
            {activeTab === "quickaccess" && <QuickAccessTab />}
            {activeTab === "magazines" && <MagazinesTab />}
            {activeTab === "media" && <MediaTab />}
            {activeTab === "aboutus" && <AboutUsTab />}
            {activeTab === "contactus" && <ContactUsTab />}
            {activeTab === "users" && <UsersTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

function CoursesTab() {
  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ['/api/courses'],
    queryFn: () => fetch('/api/courses').then(res => res.json()),
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">دوره‌های آموزشی</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="h-4 w-4" />
            افزودن دوره جدید
          </button>
        </div>
      </div>

      <div className="p-6">
        {courses && courses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-2">عنوان</th>
                  <th className="text-right py-2">وضعیت</th>
                  <th className="text-right py-2">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.id} className="border-b">
                    <td className="py-3">{course.title}</td>
                    <td className="py-3">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        فعال
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded text-red-500">
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Video className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">هیچ دوره‌ای یافت نشد</h3>
            <p className="text-gray-600">برای شروع، دوره جدیدی اضافه کنید</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectsTab() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
    queryFn: () => fetch('/api/projects').then(res => res.json()),
  });

  if (isLoading) {
    return <div className="text-center py-8">در حال بارگذاری...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">پروژه‌ها</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="h-4 w-4" />
            افزودن پروژه جدید
          </button>
        </div>
      </div>

      <div className="p-6">
        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(project => (
              <div key={project.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-medium mb-2">{project.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">پروژه</span>
                  <div className="flex gap-1">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-red-500">
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Folder className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">هیچ پروژه‌ای یافت نشد</h3>
            <p className="text-gray-600">برای شروع، پروژه جدیدی اضافه کنید</p>
          </div>
        )}
      </div>
    </div>
  );
}

function DocumentsTab() {
  const { data: documents, isLoading } = useQuery<Document[]>({
    queryKey: ['/api/documents'],
    queryFn: () => fetch('/api/documents').then(res => res.json()),
  });

  if (isLoading) {
    return <div className="text-center py-8">در حال بارگذاری...</div>;
  }

  const [subTab, setSubTab] = useState<'articles'|'featured'>('articles');
  const endpoint = subTab === 'articles' ? '/api/articles' : '/api/documents/featured';
  const { data: items = [], isLoading: loadingItems } = useQuery<any[]>({
    queryKey: [endpoint],
    queryFn: () => fetch(endpoint).then(res => res.ok ? res.json() : []),
  });

  const qc = useQueryClient();

  function AddDocumentFormInline() {
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [loading, setLoading] = useState(false);
    const submit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
        const res = await fetch('/api/documents', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ title, excerpt, slug: title.toLowerCase().replace(/\s+/g,'-') }) });
        if (res.ok) { setTitle(''); setExcerpt(''); qc.invalidateQueries({ queryKey: ['/api/documents','/api/documents/featured','/api/articles'] }); }
        else alert('خطا در ایجاد');
      } catch { alert('ارتباط با سرور برقرار نشد'); } finally { setLoading(false); }
    };

    return (
      <form onSubmit={submit} className="flex gap-2">
        <input className="flex-1 border px-3 py-2 rounded" placeholder="عنوان" value={title} onChange={e=>setTitle(e.target.value)} />
        <input className="flex-1 border px-3 py-2 rounded" placeholder="خلاصه" value={excerpt} onChange={e=>setExcerpt(e.target.value)} />
        <button className="px-3 py-2 bg-blue-600 text-white rounded" disabled={loading}>{loading? 'در حال ارسال...' : 'افزودن'}</button>
      </form>
    );
  }

  function ToggleFeaturedInline({ item }: { item: any }) {
    const [loading, setLoading] = useState(false);
    const isFeatured = item.is_featured ?? item.isFeatured ?? false;
    const toggle = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/documents/${item.id}`, { method: 'PATCH', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ isFeatured: !isFeatured }) });
        if (res.ok) qc.invalidateQueries({ queryKey: ['/api/documents','/api/documents/featured','/api/articles'] });
        else alert('خطا');
      } catch { alert('خطا در ارتباط'); } finally { setLoading(false); }
    };
    return (
      <button onClick={toggle} className={`px-2 py-1 rounded ${isFeatured? 'bg-green-600 text-white':'border'}`} disabled={loading}>{isFeatured? 'حذف از منتخب' : 'انتخاب منتخب'}</button>
    );
  }

  if (loadingItems) return <div className="text-center py-8">در حال بارگذاری...</div>;

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button onClick={()=>setSubTab('articles')} className={`px-3 py-1 rounded ${subTab==='articles'? 'bg-blue-50 text-blue-600':'text-gray-600'}`}>مقالات</button>
            <button onClick={()=>setSubTab('featured')} className={`px-3 py-1 rounded ${subTab==='featured'? 'bg-blue-50 text-blue-600':'text-gray-600'}`}>مقالات منتخب</button>
          </div>
          <span className="text-sm text-gray-600">تعداد: {items.length}</span>
        </div>
      </div>

      <div className="p-6">
        <AddDocumentFormInline />

        <div className="mt-6 space-y-4">
          {items && items.length > 0 ? (
            items.map((it: any) => (
              <div key={it.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <File className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-medium">{it.title}</h3>
                    <p className="text-sm text-gray-600">{it.excerpt || it.description || ''}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded"><Eye className="h-4 w-4" /></button>
                  <button className="p-2 hover:bg-gray-100 rounded"><Edit className="h-4 w-4" /></button>
                  <button className="p-2 hover:bg-gray-100 rounded text-red-500"><Trash className="h-4 w-4" /></button>
                  <ToggleFeaturedInline item={it} />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <File className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">موردی یافت نشد</h3>
              <p className="text-gray-600">برای شروع، مورد جدیدی اضافه کنید</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function WorkshopRegistrationsTab() {
  const { data: registrations = [], isLoading } = useQuery<any[]>({ queryKey: ['/api/workshop-registrations'] });
  const { data: workshops = [] } = useQuery<any[]>({ queryKey: ['/api/workshops'] });
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: number) => fetch(`/api/workshop-registrations/${id}`, { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['/api/workshop-registrations'] })
  });

  if (isLoading) return <div className="text-center py-8">در حال بارگذاری...</div>;

  const getWorkshopName = (id: number) => workshops.find((w: any) => w.id === id)?.title || 'نامشخص';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">ثبت‌نام‌های کارگاه</h2>
        <span className="text-sm text-gray-600">تعداد: {registrations.length}</span>
      </div>
      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b bg-gray-50">لیست ثبت‌نام‌ها</div>
        <div className="divide-y">
          {registrations.map((r: any) => (
            <div key={r.id} className="p-4 flex items-center justify-between">
              <div>
                <div className="font-medium">{r.userName} — {r.userEmail}</div>
                <div className="text-sm text-gray-500">کارگاه: {getWorkshopName(r.workshopId)}</div>
              </div>
              <div>
                <button onClick={() => deleteMutation.mutate(r.id)} className="text-red-600">حذف</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlidesTab() {
  const { data: slides, isLoading } = useQuery<Slide[]>({
    queryKey: ['/api/slides'],
    queryFn: () => fetch('/api/slides').then(res => res.json()),
  });

  const queryClient = useQueryClient();

  const [showForm, setShowForm] = useState(false);
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    buttonText: '',
    buttonUrl: '',
    secondButtonText: '',
    secondButtonUrl: '',
    showButtons: true,
    showIcon: true,
    isActive: true,
    order: 0,
    gradientFrom: '',
    gradientTo: '',
    iconName: ''
  });

  const createMutation = useMutation({
    mutationFn: async (slideData: any) => {
      return apiRequest('/api/slides', {
        method: 'POST',
        body: JSON.stringify(slideData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/slides'] });
      setShowForm(false);
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...slideData }: any) => {
      return apiRequest(`/api/slides/${id}`, {
        method: 'PUT',
        body: JSON.stringify(slideData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/slides'] });
      setShowForm(false);
      setEditingSlide(null);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest(`/api/slides/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/slides'] });
    },
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      buttonText: '',
      buttonUrl: '',
      secondButtonText: '',
      secondButtonUrl: '',
      showButtons: true,
      showIcon: true,
      isActive: true,
      order: 0,
      gradientFrom: '',
      gradientTo: '',
      iconName: ''
    });
  };

  const handleEdit = (slide: Slide) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title,
      description: slide.description || '',
      imageUrl: slide.imageUrl || '',
      buttonText: slide.buttonText || '',
      buttonUrl: slide.buttonUrl || '',
      secondButtonText: (slide as any).secondButtonText || '',
      secondButtonUrl: (slide as any).secondButtonUrl || '',
      showButtons: (slide as any).showButtons !== false,
      showIcon: (slide as any).showIcon !== false,
      isActive: (slide.isActive ?? true) as boolean,
      order: slide.order || 0,
      gradientFrom: (slide as any).gradientFrom || '',
      gradientTo: (slide as any).gradientTo || '',
      iconName: (slide as any).iconName || ''
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSlide) {
      updateMutation.mutate({ id: editingSlide.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('آیا از حذف این اسلاید اطمینان دارید؟')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">در حال بارگذاری...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">مدیریت اسلایدها</h2>
            <button 
              onClick={() => {
                setShowForm(!showForm);
                setEditingSlide(null);
                resetForm();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              {showForm ? 'لغو' : 'افزودن اسلاید جدید'}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="p-6 border-t bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">
              {editingSlide ? 'ویرایش اسلاید' : 'افزودن اسلاید جدید'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    عنوان اسلاید
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    متن دکمه
                  </label>
                  <input
                    type="text"
                    value={formData.buttonText}
                    onChange={(e) => setFormData({...formData, buttonText: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  توضیحات
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    لینک دکمه اول
                  </label>
                  <input
                    type="text"
                    value={formData.buttonUrl}
                    onChange={(e) => setFormData({...formData, buttonUrl: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="/courses"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    متن دکمه دوم (اختیاری)
                  </label>
                  <input
                    type="text"
                    value={formData.secondButtonText}
                    onChange={(e) => setFormData({...formData, secondButtonText: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="درباره ما"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    لینک دکمه دوم (اختیاری)
                  </label>
                  <input
                    type="text"
                    value={formData.secondButtonUrl}
                    onChange={(e) => setFormData({...formData, secondButtonUrl: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="/about"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL تصویر (اختیاری)
                  </label>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="مثال: /uploads/image.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    لینک را از کتابخانه رسانه کپی کنید
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    رنگ شروع گرادیان
                  </label>
                  <select
                    value={formData.gradientFrom}
                    onChange={(e) => setFormData({...formData, gradientFrom: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">بدون گرادیان</option>
                    <option value="blue-500">آبی</option>
                    <option value="green-500">سبز</option>
                    <option value="purple-500">بنفش</option>
                    <option value="red-500">قرمز</option>
                    <option value="yellow-500">زرد</option>
                    <option value="pink-500">صورتی</option>
                    <option value="indigo-500">نیلی</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    رنگ پایان گرادیان
                  </label>
                  <select
                    value={formData.gradientTo}
                    onChange={(e) => setFormData({...formData, gradientTo: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">بدون گرادیان</option>
                    <option value="purple-600">بنفش تیره</option>
                    <option value="blue-600">آبی تیره</option>
                    <option value="green-600">سبز تیره</option>
                    <option value="red-600">قرمز تیره</option>
                    <option value="yellow-600">زرد تیره</option>
                    <option value="pink-600">صورتی تیره</option>
                    <option value="indigo-600">نیلی تیره</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    آیکون
                  </label>
                  <select
                    value={formData.iconName}
                    onChange={(e) => setFormData({...formData, iconName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">بدون آیکون</option>
                    <option value="GraduationCap">فارغ‌التحصیلی</option>
                    <option value="BookOpen">کتاب باز</option>
                    <option value="Rocket">موشک</option>
                    <option value="Star">ستاره</option>
                    <option value="Trophy">جام</option>
                    <option value="Target">هدف</option>
                    <option value="Lightbulb">لامپ</option>
                    <option value="Heart">قلب</option>
                    <option value="Globe">کره زمین</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ترتیب نمایش
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showButtons"
                    checked={formData.showButtons}
                    onChange={(e) => setFormData({...formData, showButtons: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="showButtons" className="mr-2 text-sm font-medium text-gray-700">
                    نمایش دکمه‌ها
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showIcon"
                    checked={formData.showIcon}
                    onChange={(e) => setFormData({...formData, showIcon: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="showIcon" className="mr-2 text-sm font-medium text-gray-700">
                    نمایش آیکون
                  </label>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="isActive" className="mr-2 text-sm font-medium text-gray-700">
                  اسلاید فعال باشد
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {createMutation.isPending || updateMutation.isPending ? 'در حال ذخیره...' : 
                   editingSlide ? 'بروزرسانی اسلاید' : 'ایجاد اسلاید'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingSlide(null);
                    resetForm();
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  لغو
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="p-6">
          {slides && slides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {slides.map(slide => (
                <div key={slide.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-medium">{slide.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      slide.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {slide.isActive ? 'فعال' : 'غیرفعال'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{slide.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">ترتیب: {slide.order}</span>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleEdit(slide)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(slide.id)}
                        className="p-1 hover:bg-gray-100 rounded text-red-500"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Image className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">هیچ اسلایدی یافت نشد</h3>
              <p className="text-gray-600">برای شروع، اسلاید جدیدی اضافه کنید</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MagazinesTab() {
  const { data: magazines, isLoading } = useQuery<Magazine[]>({
    queryKey: ['/api/magazines'],
    queryFn: () => fetch('/api/magazines').then(res => res.json()),
  });

  if (isLoading) {
    return <div className="text-center py-8">در حال بارگذاری...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">مجله‌ها</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="h-4 w-4" />
            افزودن مجله جدید
          </button>
        </div>
      </div>

      <div className="p-6">
        {magazines && magazines.length > 0 ? (
          <div className="space-y-4">
            {magazines.map(magazine => (
              <div key={magazine.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-medium">{magazine.title}</h3>
                    <p className="text-sm text-gray-600">{magazine.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded text-red-500">
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">هیچ مجله‌ای یافت نشد</h3>
            <p className="text-gray-600">برای شروع، مجله جدیدی اضافه کنید</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Users Tab Component
function UsersTab() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<number>(0);
  const [accessType, setAccessType] = useState<string>("granted");
  const [expiryDate, setExpiryDate] = useState<string>("");

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["/api/users"],
    queryFn: () => fetch('/api/users').then(res => res.json()),
  });

  const { data: courses = [], isLoading: coursesLoading } = useQuery({
    queryKey: ["/api/courses"],
    queryFn: () => fetch('/api/courses').then(res => res.json()),
  });

  const { data: userAccess = [], isLoading: accessLoading } = useQuery({
    queryKey: ["/api/users", selectedUserId, "course-access"],
    queryFn: () => fetch(`/api/users/${selectedUserId}/course-access`).then(res => res.json()),
    enabled: !!selectedUserId,
  });

  const grantAccessMutation = useMutation({
    mutationFn: async (data: { userId: number; courseId: number; accessType: string; expiryDate?: string }) => {
      return apiRequest(`/api/users/${data.userId}/grant-course-access`, {
        method: "POST",
        body: JSON.stringify({
          courseId: data.courseId,
          accessType: data.accessType,
          expiryDate: data.expiryDate,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users", selectedUserId, "course-access"] });
      setSelectedCourseId(0);
      setExpiryDate("");
    },
  });

  const revokeAccessMutation = useMutation({
    mutationFn: async (data: { userId: number; courseId: number }) => {
      return apiRequest(`/api/users/${data.userId}/revoke-course-access/${data.courseId}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users", selectedUserId, "course-access"] });
    },
  });

  const handleGrantAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUserId && selectedCourseId) {
      grantAccessMutation.mutate({
        userId: selectedUserId,
        courseId: selectedCourseId,
        accessType,
        expiryDate: expiryDate || undefined,
      });
    }
  };

  const handleRevokeAccess = (courseId: number) => {
    if (selectedUserId) {
      revokeAccessMutation.mutate({
        userId: selectedUserId,
        courseId,
      });
    }
  };

  if (usersLoading || coursesLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* User Selection */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">انتخاب کاربر</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(users as any[]).map((user: any) => (
            <div
              key={user.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedUserId === user.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedUserId(user.id)}
            >
              <h3 className="font-medium text-gray-900">
                {user.name || user.username}
              </h3>
              <p className="text-sm text-gray-600">@{user.username}</p>
              <div className="mt-2 flex gap-2">
                <span className={`px-2 py-1 text-xs rounded ${
                  user.role === 'admin' 
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.role === 'admin' ? 'مدیر' : 'کاربر'}
                </span>
                <span className={`px-2 py-1 text-xs rounded ${
                  user.subscriptionStatus === 'vip'
                    ? 'bg-purple-100 text-purple-800'
                    : user.subscriptionStatus === 'premium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.subscriptionStatus === 'vip' ? 'ویژه' : 
                   user.subscriptionStatus === 'premium' ? 'پریمیوم' : 'رایگان'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedUserId && (
        <>
          {/* Grant Access Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">اعطای دسترسی دوره</h2>
            <form onSubmit={handleGrantAccess} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  انتخاب دوره
                </label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                >
                  <option value={0}>انتخاب کنید...</option>
                  {(courses as any[]).map((course: any) => (
                    <option key={course.id} value={course.id}>
                      {course.title} - {course.accessLevel === 'free' ? 'رایگان' : 
                                       course.accessLevel === 'premium' ? 'پریمیوم' : 'ویژه'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نوع دسترسی
                </label>
                <select
                  value={accessType}
                  onChange={(e) => setAccessType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="granted">اعطا شده</option>
                  <option value="purchased">خریداری شده</option>
                  <option value="trial">آزمایشی</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تاریخ انقضا (اختیاری)
                </label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <button
                type="submit"
                disabled={grantAccessMutation.isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium disabled:opacity-50"
              >
                {grantAccessMutation.isPending ? "در حال اعطا..." : "اعطای دسترسی"}
              </button>
            </form>
          </div>

          {/* Current Access */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">دسترسی‌های فعلی</h2>
            {accessLoading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : (userAccess as any[]).length === 0 ? (
              <p className="text-gray-600 text-center py-4">
                هیچ دسترسی‌ای برای این کاربر وجود ندارد
              </p>
            ) : (
              <div className="space-y-3">
                {(userAccess as any[]).map((access: any) => {
                  const course = (courses as any[]).find((c: any) => c.id === access.courseId);
                  return (
                    <div
                      key={access.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {course?.title || `دوره شماره ${access.courseId}`}
                        </h3>
                        <div className="flex gap-2 mt-1">
                          <span className="text-sm text-gray-600">
                            نوع: {access.accessType === 'granted' ? 'اعطا شده' : 
                                  access.accessType === 'purchased' ? 'خریداری شده' : 'آزمایشی'}
                          </span>
                          {access.expiryDate && (
                            <span className="text-sm text-gray-600">
                              انقضا: {new Date(access.expiryDate).toLocaleDateString('fa-IR')}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRevokeAccess(access.courseId)}
                        disabled={revokeAccessMutation.isPending}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm disabled:opacity-50"
                      >
                        لغو دسترسی
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function MediaTab() {
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, name: 'course-cover.jpg', url: '/uploads/course-cover.jpg', type: 'image', size: '245 KB', uploadedAt: '1403/10/15' },
    { id: 2, name: 'slider-bg.png', url: '/uploads/slider-bg.png', type: 'image', size: '512 KB', uploadedAt: '1403/10/14' },
    { id: 3, name: 'document-sample.pdf', url: '/uploads/document-sample.pdf', type: 'document', size: '1.2 MB', uploadedAt: '1403/10/13' },
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const [showCopyDialog, setShowCopyDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setIsUploading(true);

      try {
        const formData = new FormData();
        Array.from(files).forEach(file => {
          formData.append('files', file);
        });

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          const newFiles = result.files.map((file: any, index: number) => ({
            id: uploadedFiles.length + index + 1,
            name: file.name,
            url: file.url,
            type: file.type,
            size: file.size,
            uploadedAt: new Date().toLocaleDateString('fa-IR')
          }));
          setUploadedFiles(prev => [...prev, ...newFiles]);
        } else {
          console.error('Upload failed:', response.statusText);
        }
      } catch (error) {
        console.error('Upload error:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  const deleteFile = (fileId: number) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">کتابخانه رسانه</h3>
              <p className="text-sm text-gray-600 mt-1">مدیریت تصاویر و فایل‌های سایت</p>
            </div>
            <div className="flex items-center gap-3">
              <label className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer flex items-center gap-2">
                <Upload className="h-4 w-4" />
                {isUploading ? 'در حال آپلود...' : 'آپلود فایل'}
                <input
                  type="file"
                  multiple
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="p-6">
          {uploadedFiles && uploadedFiles.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {uploadedFiles.map(file => (
                <div key={file.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    {file.type === 'image' ? (
                      <img 
                        src={file.url} 
                        alt={file.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const nextElement = e.currentTarget.nextElementSibling;
                          if (nextElement) {
                            nextElement.classList.remove('hidden');
                          }
                        }}
                      />
                    ) : (
                      <File className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-medium truncate" title={file.name}>{file.name}</h4>
                    <p className="text-xs text-gray-500">{file.size}</p>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setSelectedFile(file);
                          setShowCopyDialog(true);
                        }}
                        className="flex-1 px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                      >
                        کپی لینک
                      </button>
                      <button 
                        onClick={() => deleteFile(file.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Upload className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">هیچ فایلی آپلود نشده</h3>
              <p className="text-gray-600">برای شروع، فایل‌های خود را آپلود کنید</p>
            </div>
          )}
        </div>
      </div>

      {/* Copy Link Dialog */}
      {showCopyDialog && selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">کپی لینک فایل</h3>
              <button 
                onClick={() => setShowCopyDialog(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  لینک فایل:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={selectedFile.url}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(selectedFile.url)}
                    className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1"
                  >
                    <Copy className="h-4 w-4" />
                    کپی
                  </button>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                <p>از این لینک برای اضافه کردن تصویر به اسلایدها، نوشته‌ها یا هر جای دیگری استفاده کنید.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function QuickAccessTab() {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const { data: quickAccessItems, isLoading } = useQuery<any[]>({
    queryKey: ['/api/quick-access'],
    queryFn: () => fetch('/api/quick-access').then(res => res.json()),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => 
      fetch('/api/quick-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/quick-access'] });
      setShowForm(false);
      setEditingItem(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => 
      fetch(`/api/quick-access/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/quick-access'] });
      setShowForm(false);
      setEditingItem(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => 
      fetch(`/api/quick-access/${id}`, {
        method: 'DELETE'
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/quick-access'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      iconUrl: formData.get('iconUrl') as string,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      linkUrl: formData.get('linkUrl') as string,
      order: parseInt(formData.get('order') as string) || 0,
      isActive: formData.get('isActive') === 'on',
    };

    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">در حال بارگذاری...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">آیتم‌های دسترسی سریع</h3>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingItem(null);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          آیتم جدید
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-md font-semibold">
              {editingItem ? 'ویرایش آیتم' : 'افزودن آیتم جدید'}
            </h4>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingItem(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">آیکون</label>
                <div className="flex gap-2">
                  <input
                    name="iconUrl"
                    type="text"
                    defaultValue={editingItem?.iconUrl || ''}
                    placeholder="مثال: /uploads/icon.png"
                    className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => window.open('/admin-simple#media', '_blank')}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-1"
                  >
                    <Upload className="h-4 w-4" />
                    رسانه
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">عنوان</label>
                <input
                  name="title"
                  type="text"
                  defaultValue={editingItem?.title || ''}
                  placeholder="عنوان آیتم..."
                  required
                  className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">توضیحات</label>
              <textarea
                name="description"
                defaultValue={editingItem?.description || ''}
                placeholder="توضیحات آیتم"
                rows={2}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">لینک</label>
                <input
                  name="linkUrl"
                  type="url"
                  defaultValue={editingItem?.linkUrl || ''}
                  placeholder="مثال: /courses یا https://example.com"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">ترتیب</label>
                <input
                  name="order"
                  type="number"
                  defaultValue={editingItem?.order || ''}
                  placeholder="0"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                name="isActive"
                type="checkbox"
                defaultChecked={editingItem?.isActive ?? true}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label className="text-sm">فعال</label>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
                className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50"
              >
                انصراف
              </button>
              <button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {createMutation.isPending || updateMutation.isPending ? 'در حال ذخیره...' : 'ذخیره'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b">
          <h4 className="font-semibold">آیتم‌های موجود</h4>
        </div>
        <div className="divide-y">
          {quickAccessItems && quickAccessItems.map((item: any) => (
            <div key={item.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {item.iconUrl && (
                  <img
                    src={item.iconUrl}
                    alt={item.title}
                    className="w-8 h-8 object-cover rounded"
                  />
                )}
                <div>
                  <h5 className="font-medium">{item.title}</h5>
                  {item.description && (
                    <p className="text-sm text-gray-600">{item.description}</p>
                  )}
                  {item.linkUrl && (
                    <p className="text-xs text-blue-600">{item.linkUrl}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">ترتیب: {item.order}</span>
                <div className={`w-2 h-2 rounded-full ${item.isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
                <button
                  onClick={() => {
                    setEditingItem(item);
                    setShowForm(true);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteMutation.mutate(item.id)}
                  disabled={deleteMutation.isPending}
                  className="text-red-600 hover:text-red-800 disabled:opacity-50"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {(!quickAccessItems || quickAccessItems?.length === 0) && (
            <div className="p-8 text-center text-gray-500">
              هیچ آیتمی یافت نشد. اولین آیتم را اضافه کنید.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AboutUsTab() {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const { data: aboutUsData, isLoading } = useQuery<any[]>({
    queryKey: ['/api/about-us'],
    queryFn: () => fetch('/api/about-us').then(res => res.json()),
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('/api/about-us', { method: 'POST', body: JSON.stringify(data) });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/about-us'] });
      setShowForm(false);
      setEditingItem(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      return await apiRequest(`/api/about-us/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/about-us'] });
      setShowForm(false);
      setEditingItem(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/about-us/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/about-us'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      title: formData.get('title'),
      mainContent: formData.get('mainContent'),
      mission: formData.get('mission'),
      vision: formData.get('vision'),
      values: formData.get('values'),
      mainImageUrl: formData.get('mainImageUrl'),
      foundingYear: formData.get('foundingYear'),
      companySize: formData.get('companySize'),
      isActive: formData.get('isActive') === 'on',
    };

    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">در حال بارگذاری...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">مدیریت صفحه درباره ما</h3>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            افزودن محتوا
          </button>
        </div>

        {showForm && (
          <div className="p-4 border-b bg-gray-50">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">عنوان</label>
                <input
                  name="title"
                  type="text"
                  defaultValue={editingItem?.title || ''}
                  placeholder="درباره ما"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">محتوای اصلی</label>
                <textarea
                  name="mainContent"
                  defaultValue={editingItem?.mainContent || ''}
                  placeholder="متن اصلی درباره شرکت..."
                  rows={6}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">ماموریت</label>
                  <textarea
                    name="mission"
                    defaultValue={editingItem?.mission || ''}
                    placeholder="ماموریت شرکت..."
                    rows={3}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">چشم‌انداز</label>
                  <textarea
                    name="vision"
                    defaultValue={editingItem?.vision || ''}
                    placeholder="چشم‌انداز شرکت..."
                    rows={3}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">ارزش‌ها</label>
                  <textarea
                    name="values"
                    defaultValue={editingItem?.values || ''}
                    placeholder="ارزش‌های شرکت..."
                    rows={3}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">تصویر اصلی</label>
                  <input
                    name="mainImageUrl"
                    type="url"
                    defaultValue={editingItem?.mainImageUrl || ''}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">سال تأسیس</label>
                  <input
                    name="foundingYear"
                    type="text"
                    defaultValue={editingItem?.foundingYear || ''}
                    placeholder="1400"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">اندازه شرکت</label>
                  <input
                    name="companySize"
                    type="text"
                    defaultValue={editingItem?.companySize || ''}
                    placeholder="50-100 نفر"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  name="isActive"
                  type="checkbox"
                  defaultChecked={editingItem?.isActive ?? true}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label className="text-sm">فعال</label>
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                  className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {createMutation.isPending || updateMutation.isPending ? 'در حال ذخیره...' : 'ذخیره'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="divide-y">
          {aboutUsData && aboutUsData.map((item: any) => (
            <div key={item.id} className="p-4 flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-lg">{item.title}</h4>
                <p className="text-gray-600 mt-1 line-clamp-2">{item.mainContent}</p>
                <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-500">
                  {item.foundingYear && <span>تأسیس: {item.foundingYear}</span>}
                  {item.companySize && <span>اندازه: {item.companySize}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${item.isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
                <button
                  onClick={() => {
                    setEditingItem(item);
                    setShowForm(true);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteMutation.mutate(item.id)}
                  disabled={deleteMutation.isPending}
                  className="text-red-600 hover:text-red-800 disabled:opacity-50"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {(!aboutUsData || aboutUsData.length === 0) && (
            <div className="p-8 text-center text-gray-500">
              هیچ محتوایی یافت نشد. اولین محتوا را اضافه کنید.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ContactUsTab() {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const { data: contactUsData, isLoading } = useQuery<any[]>({
    queryKey: ['/api/contact-us'],
    queryFn: () => fetch('/api/contact-us').then(res => res.json()),
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('/api/contact-us', { method: 'POST', body: JSON.stringify(data) });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact-us'] });
      setShowForm(false);
      setEditingItem(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      return await apiRequest(`/api/contact-us/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact-us'] });
      setShowForm(false);
      setEditingItem(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/contact-us/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact-us'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const socialLinks = {
      instagram: formData.get('instagram') || '',
      telegram: formData.get('telegram') || '',
      linkedin: formData.get('linkedin') || '',
      twitter: formData.get('twitter') || '',
    };

    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      address: formData.get('address'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      workingHours: formData.get('workingHours'),
      mapUrl: formData.get('mapUrl'),
      mapLatitude: formData.get('mapLatitude'),
      mapLongitude: formData.get('mapLongitude'),
      socialLinks,
      isActive: formData.get('isActive') === 'on',
    };

    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">در حال بارگذاری...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">مدیریت صفحه تماس با ما</h3>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            افزودن اطلاعات تماس
          </button>
        </div>

        {showForm && (
          <div className="p-4 border-b bg-gray-50">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">عنوان</label>
                <input
                  name="title"
                  type="text"
                  defaultValue={editingItem?.title || ''}
                  placeholder="تماس با ما"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">توضیحات</label>
                <textarea
                  name="description"
                  defaultValue={editingItem?.description || ''}
                  placeholder="متن توضیحات برای صفحه تماس..."
                  rows={3}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">آدرس</label>
                <textarea
                  name="address"
                  defaultValue={editingItem?.address || ''}
                  placeholder="آدرس کامل شرکت..."
                  rows={2}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">تلفن</label>
                  <input
                    name="phone"
                    type="text"
                    defaultValue={editingItem?.phone || ''}
                    placeholder="021-12345678"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">ایمیل</label>
                  <input
                    name="email"
                    type="email"
                    defaultValue={editingItem?.email || ''}
                    placeholder="info@company.com"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">ساعات کاری</label>
                <input
                  name="workingHours"
                  type="text"
                  defaultValue={editingItem?.workingHours || ''}
                  placeholder="شنبه تا چهارشنبه 9 الی 17"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">URL نقشه (Google Maps Embed)</label>
                <input
                  name="mapUrl"
                  type="url"
                  defaultValue={editingItem?.mapUrl || ''}
                  placeholder="https://www.google.com/maps/embed?pb=..."
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">عرض جغرافیایی</label>
                  <input
                    name="mapLatitude"
                    type="text"
                    defaultValue={editingItem?.mapLatitude || ''}
                    placeholder="35.6892"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">طول جغرافیایی</label>
                  <input
                    name="mapLongitude"
                    type="text"
                    defaultValue={editingItem?.mapLongitude || ''}
                    placeholder="51.3890"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">شبکه‌های اجتماعی</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">اینستاگرام</label>
                    <input
                      name="instagram"
                      type="url"
                      defaultValue={editingItem?.socialLinks?.instagram || ''}
                      placeholder="https://instagram.com/..."
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">تلگرام</label>
                    <input
                      name="telegram"
                      type="url"
                      defaultValue={editingItem?.socialLinks?.telegram || ''}
                      placeholder="https://t.me/..."
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">لینکدین</label>
                    <input
                      name="linkedin"
                      type="url"
                      defaultValue={editingItem?.socialLinks?.linkedin || ''}
                      placeholder="https://linkedin.com/..."
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">توییتر</label>
                    <input
                      name="twitter"
                      type="url"
                      defaultValue={editingItem?.socialLinks?.twitter || ''}
                      placeholder="https://twitter.com/..."
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  name="isActive"
                  type="checkbox"
                  defaultChecked={editingItem?.isActive ?? true}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label className="text-sm">فعال</label>
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                  className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {createMutation.isPending || updateMutation.isPending ? 'در حال ذخیره...' : 'ذخیره'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="divide-y">
          {contactUsData && contactUsData.map((item: any) => (
            <div key={item.id} className="p-4 flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-lg">{item.title}</h4>
                <p className="text-gray-600 mt-1">{item.description}</p>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  {item.address && <div><strong>آدرس:</strong> {item.address}</div>}
                  {item.phone && <div><strong>تلفن:</strong> {item.phone}</div>}
                  {item.email && <div><strong>ایمیل:</strong> {item.email}</div>}
                  {item.workingHours && <div><strong>ساعات کاری:</strong> {item.workingHours}</div>}
                </div>
                {item.socialLinks && typeof item.socialLinks === 'object' && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {Object.entries(item.socialLinks as Record<string, string>)
                      .filter(([, url]) => !!url)
                      .map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          {platform}
                        </a>
                      ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${item.isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
                <button
                  onClick={() => {
                    setEditingItem(item);
                    setShowForm(true);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteMutation.mutate(item.id)}
                  disabled={deleteMutation.isPending}
                  className="text-red-600 hover:text-red-800 disabled:opacity-50"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {(!contactUsData || contactUsData.length === 0) && (
            <div className="p-8 text-center text-gray-500">
              هیچ اطلاعات تماسی یافت نشد. اولین اطلاعات را اضافه کنید.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function WebinarsTab() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingWebinar, setEditingWebinar] = useState<any>(null);
  const [createData, setCreateData] = useState({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    eventDate: '',
    posterUrl: '',
    isActive: true
  });

  const queryClient = useQueryClient();

  const { data: webinars, isLoading } = useQuery<any[]>({
    queryKey: ['/api/webinars'],
    queryFn: async () => {
      const response = await fetch('/api/webinars');
      if (!response.ok) throw new Error('Failed to fetch webinars');
      return response.json();
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest('/api/webinars', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/webinars'] });
      setShowCreateForm(false);
      setCreateData({
        title: '',
        description: '',
        instructor: '',
        duration: '',
        eventDate: '',
        posterUrl: '',
        isActive: true
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      return apiRequest(`/api/webinars/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/webinars'] });
      setEditingWebinar(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest(`/api/webinars/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/webinars'] });
    }
  });

  const handleCreate = () => {
    if (!createData.title.trim()) {
      alert('عنوان وبینار الزامی است');
      return;
    }
    createMutation.mutate(createData);
  };

  if (isLoading) return <div>در حال بارگذاری...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          وبینار جدید
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">ایجاد وبینار جدید</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">عنوان</label>
              <input
                type="text"
                value={createData.title}
                onChange={(e) => setCreateData({...createData, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">مدرس</label>
              <input
                type="text"
                value={createData.instructor}
                onChange={(e) => setCreateData({...createData, instructor: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">مدت زمان</label>
              <input
                type="text"
                value={createData.duration}
                onChange={(e) => setCreateData({...createData, duration: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">تاریخ برگزاری</label>
              <input
                type="date"
                value={createData.eventDate}
                onChange={(e) => setCreateData({...createData, eventDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">توضیحات</label>
            <textarea
              value={createData.description}
              onChange={(e) => setCreateData({...createData, description: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">عکس پوستر</label>
            <input
              type="text"
              value={createData.posterUrl}
              onChange={(e) => setCreateData({...createData, posterUrl: e.target.value})}
              placeholder="آدرس عکس پوستر"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleCreate}
              disabled={createMutation.isPending}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {createMutation.isPending ? 'در حال ایجاد...' : 'ایجاد'}
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              لغو
            </button>
          </div>
        </div>
      )}

      {editingWebinar && (
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">ویرایش وبینار</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">عنوان</label>
              <input
                type="text"
                value={editingWebinar.title}
                onChange={(e) => setEditingWebinar({...editingWebinar, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">مدرس</label>
              <input
                type="text"
                value={editingWebinar.instructor}
                onChange={(e) => setEditingWebinar({...editingWebinar, instructor: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">مدت زمان</label>
              <input
                type="text"
                value={editingWebinar.duration}
                onChange={(e) => setEditingWebinar({...editingWebinar, duration: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">تاریخ برگزاری</label>
              <input
                type="date"
                value={editingWebinar.eventDate}
                onChange={(e) => setEditingWebinar({...editingWebinar, eventDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">توضیحات</label>
            <textarea
              value={editingWebinar.description}
              onChange={(e) => setEditingWebinar({...editingWebinar, description: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">عکس پوستر</label>
            <input
              type="text"
              value={editingWebinar.posterUrl || ''}
              onChange={(e) => setEditingWebinar({...editingWebinar, posterUrl: e.target.value})}
              placeholder="آدرس عکس پوستر"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => updateMutation.mutate({ id: editingWebinar.id, data: editingWebinar })}
              disabled={updateMutation.isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {updateMutation.isPending ? 'در حال ویرایش...' : 'ویرایش'}
            </button>
            <button
              onClick={() => setEditingWebinar(null)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              لغو
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b">
          <h4 className="font-semibold">وبینارهای موجود</h4>
        </div>
        <div className="divide-y">
          {webinars && webinars.map((webinar: any) => (
            <div key={webinar.id} className="p-4 flex items-center justify-between">
              <div className="flex-1">
                <h5 className="font-medium">{webinar.title}</h5>
                <p className="text-sm text-gray-600">{webinar.description}</p>
                <div className="flex gap-4 mt-2 text-xs text-gray-500">
                  {webinar.instructor && <span>👨‍🏫 {webinar.instructor}</span>}
                  {webinar.duration && <span>⏱️ {webinar.duration}</span>}
                  {webinar.eventDate && <span>📅 {webinar.eventDate}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setEditingWebinar(webinar)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => {
                    if (confirm('آیا مطمئن هستید که می‌خواهید این وبینار را حذف کنید؟')) {
                      deleteMutation.mutate(webinar.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          {(!webinars || webinars.length === 0) && (
            <div className="p-8 text-center text-gray-500">
              هنوز وبیناری اضافه نشده است.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EducationalVideosTab() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<any>(null);
  const [createData, setCreateData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    thumbnailUrl: '',
    duration: '',
    isActive: true
  });

  const queryClient = useQueryClient();

  const { data: videos, isLoading } = useQuery<any[]>({
    queryKey: ['/api/educational-videos'],
    queryFn: async () => {
      const response = await fetch('/api/educational-videos');
      if (!response.ok) throw new Error('Failed to fetch educational videos');
      return response.json();
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest('/api/educational-videos', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/educational-videos'] });
      setShowCreateForm(false);
      setCreateData({
        title: '',
        description: '',
        videoUrl: '',
        thumbnailUrl: '',
        duration: '',
        isActive: true
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest(`/api/educational-videos/${editingVideo.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/educational-videos'] });
      setEditingVideo(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest(`/api/educational-videos/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/educational-videos'] });
    }
  });

  const handleCreateSubmit = () => {
    if (!createData.title.trim()) {
      alert('عنوان الزامی است');
      return;
    }
    createMutation.mutate(createData);
  };

  if (isLoading) return <div>در حال بارگذاری...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          ایجاد ویدیو جدید
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">ایجاد ویدیو جدید</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">عنوان</label>
              <input
                type="text"
                value={createData.title}
                onChange={(e) => setCreateData({...createData, title: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="عنوان ویدیو..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">توضیحات</label>
              <textarea
                value={createData.description}
                onChange={(e) => setCreateData({...createData, description: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="توضیحات ویدیو..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">آدرس ویدیو</label>
                <input
                  type="url"
                  value={createData.videoUrl}
                  onChange={(e) => setCreateData({...createData, videoUrl: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/video.mp4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">تصویر کوچک</label>
                <input
                  type="url"
                  value={createData.thumbnailUrl}
                  onChange={(e) => setCreateData({...createData, thumbnailUrl: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="/uploads/thumbnail.jpg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">مدت زمان</label>
              <input
                type="text"
                value={createData.duration}
                onChange={(e) => setCreateData({...createData, duration: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="مثال: 15 دقیقه"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCreateSubmit}
                disabled={createMutation.isPending}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {createMutation.isPending ? 'در حال ایجاد...' : 'ایجاد ویدیو'}
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                لغو
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h4 className="font-semibold">لیست ویدیوهای آموزشی</h4>
        </div>

        {!videos || videos.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            هنوز ویدیویی اضافه نشده است.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {videos.map((video) => (
              <div key={video.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-900">{video.title}</h5>
                    <p className="text-sm text-gray-600 mt-1">{video.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      {video.duration && <span>⏱️ {video.duration}</span>}
                      <span className={`px-2 py-1 rounded-full text-xs ${video.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {video.isActive ? 'فعال' : 'غیرفعال'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingVideo(video)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('آیا مطمئن هستید که می‌خواهید این ویدیو را حذف کنید؟')) {
                          deleteMutation.mutate(video.id);
                        }
                      }}
                      disabled={deleteMutation.isPending}
                      className="text-red-600 hover:text-red-800 disabled:opacity-50"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editingVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">ویرایش ویدیو</h3>
                <button
                  onClick={() => setEditingVideo(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">عنوان</label>
                  <input
                    type="text"
                    value={editingVideo.title}
                    onChange={(e) => setEditingVideo({...editingVideo, title: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">توضیحات</label>
                  <textarea
                    value={editingVideo.description}
                    onChange={(e) => setEditingVideo({...editingVideo, description: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">آدرس ویدیو</label>
                    <input
                      type="url"
                      value={editingVideo.videoUrl}
                      onChange={(e) => setEditingVideo({...editingVideo, videoUrl: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">تصویر کوچک</label>
                    <input
                      type="url"
                      value={editingVideo.thumbnailUrl}
                      onChange={(e) => setEditingVideo({...editingVideo, thumbnailUrl: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">مدت زمان</label>
                  <input
                    type="text"
                    value={editingVideo.duration}
                    onChange={(e) => setEditingVideo({...editingVideo, duration: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => updateMutation.mutate(editingVideo)}
                    disabled={updateMutation.isPending}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {updateMutation.isPending ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                  </button>
                  <button
                    onClick={() => setEditingVideo(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    لغو
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}