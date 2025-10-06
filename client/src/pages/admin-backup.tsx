import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { type Course, type Project, type Document, type MediaContent, type Magazine, type Article, type ArticleContent, type Slide, type Workshop, type WorkshopSection, type WorkshopRegistration } from "@shared/schema";
import { Calendar, Edit, Eye, File, Folder, Image, Lock, LockOpen, MoreHorizontal, Plus, RefreshCw, Trash, Upload, Video } from "lucide-react";
import WorkshopsTab from "@/components/admin/WorkshopsTab";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("workshop-registrations");

  const tabs = [
    { id: "courses", label: "دوره‌ها", icon: Video },
    { id: "webinars", label: "وبینارهای آموزشی", icon: Video },
  { id: "documents", label: "آرشیو مقالات", icon: File },
    { id: "slides", label: "اسلایدها", icon: Image },
    { id: "magazines", label: "مجله‌ها", icon: Calendar },
    { id: "workshops", label: "کارگاه‌ها", icon: Calendar },
    { id: "workshop-registrations", label: "ثبت‌نام کارگاه‌ها", icon: Edit },
    { id: "users", label: "کاربران", icon: Lock }
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">پنل مدیریت</h1>
          <p className="text-gray-600">مدیریت محتوا و تنظیمات سایت</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-white rounded-lg border p-4 h-fit shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">دسته‌بندی‌ها</h3>
          <nav className="space-y-1">
            {tabs.map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-right ${
                    activeTab === tab.id 
                      ? 'bg-blue-50 text-blue-600 font-medium border-r-2 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {activeTab === "courses" && <CoursesTab />}
          {activeTab === "webinars" && <WebinarsManagerTab />}
          {activeTab === "documents" && <DocumentsTab />}
          {activeTab === "slides" && <SlidesTab />}
          {activeTab === "magazines" && <MagazinesTab />}
          {activeTab === "workshops" && <WorkshopsTab />}
          {activeTab === "workshop-registrations" && <WorkshopRegistrationsTab />}
          {activeTab === "users" && <UsersTab />}
        </div>
      </div>
    </div>
  );
}

function WebinarsManagerTab() {
  const { data: webinars, isLoading } = useQuery<any[]>({
    queryKey: ['/api/webinars'],
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">وبینارهای آموزشی</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          وبینار جدید
        </button>
      </div>

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
                <button className="text-blue-600 hover:text-blue-800">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="text-red-600 hover:text-red-800">
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

function CoursesTab() {
  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ['/api/courses'],
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">دوره‌ها</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          دوره جدید
        </button>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b">
          <h4 className="font-semibold">دوره‌های موجود</h4>
        </div>
        <div className="divide-y">
          {courses && courses.map((course: Course) => (
            <div key={course.id} className="p-4 flex items-center justify-between">
              <div>
                <h5 className="font-medium">{course.title}</h5>
                <p className="text-sm text-gray-600">{course.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DocumentsTab() {
  const [subTab, setSubTab] = useState<'articles' | 'featured'>('articles');
  const { data: documents = [], isLoading } = useQuery<any[]>({
    queryKey: [subTab === 'articles' ? '/api/articles' : '/api/documents/featured'],
    queryFn: async ({ queryKey }) => {
      const res = await fetch(queryKey[0] as string);
      if (!res.ok) return [];
      return res.json();
    }
  });

  if (isLoading) {
    return <div className="text-center py-8">در حال بارگذاری...</div>;
  }

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button onClick={() => setSubTab('articles')} className={`px-3 py-1 rounded ${subTab==='articles'? 'bg-blue-50 text-blue-600':'text-gray-600'}`}>مقالات</button>
            <button onClick={() => setSubTab('featured')} className={`px-3 py-1 rounded ${subTab==='featured'? 'bg-blue-50 text-blue-600':'text-gray-600'}`}>مقالات منتخب</button>
          </div>
          <span className="text-sm text-gray-600">تعداد: {documents.length}</span>
        </div>
      </div>
      <div className="p-4">
        <AddDocumentForm />
      </div>
      <div className="divide-y">
        {documents && documents.length > 0 ? (
          documents.map((doc: any) => (
            <div key={doc.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <File className="h-8 w-8 text-green-600" />
                <div>
                  <h5 className="font-medium">{doc.title}</h5>
                  <p className="text-sm text-gray-600">{doc.excerpt || doc.description || ''}</p>
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
                <ToggleFeaturedButton document={doc} />
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">مقاله‌ای یافت نشد.</div>
        )}
      </div>
    </div>
  );
}

function SlidesTab() {
  return <div>اسلایدها</div>;
}

function MagazinesTab() {
  return <div>مجله‌ها</div>;
}

function UsersTab() {
  return <div>کاربران</div>;
}

function WorkshopRegistrationsTab() {
  const { data: registrations = [], isLoading } = useQuery<WorkshopRegistration[]>({
    queryKey: ['/api/workshop-registrations']
  });

  const { data: workshops = [] } = useQuery<Workshop[]>({
    queryKey: ['/api/workshops']
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => 
      fetch(`/api/workshop-registrations/${id}`, {
        method: 'DELETE'
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/workshop-registrations'] });
    },
  });

  if (isLoading) {
    return <div className="text-center py-8">در حال بارگذاری...</div>;
  }

  const getWorkshopName = (workshopId: number) => {
    const workshop = workshops.find(w => w.id === workshopId);
    return workshop?.title || 'نامشخص';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">ثبت‌نام‌های کارگاه</h2>
        <span className="text-sm text-gray-600">تعداد: {registrations.length}</span>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h4 className="font-semibold">لیست ثبت‌نام‌ها</h4>
        </div>
        
        {registrations.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            هنوز ثبت‌نامی انجام نشده است.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">نام کارگاه</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">نام کاربر</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">ایمیل</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">تلفن</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">وضعیت</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاریخ ثبت‌نام</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {registrations.map((registration) => (
                  <tr key={registration.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-900 font-medium">
                      {getWorkshopName(registration.workshopId)}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {registration.userName}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {registration.userEmail}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {registration.userPhone || '-'}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        registration.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : registration.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {registration.status === 'confirmed' ? 'تایید شده' : 
                         registration.status === 'pending' ? 'در انتظار' : 'لغو شده'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {registration.registrationDate 
                        ? new Date(registration.registrationDate).toLocaleDateString('fa-IR')
                        : '-'
                      }
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <button
                        onClick={() => deleteMutation.mutate(registration.id)}
                        disabled={deleteMutation.isPending}
                        className="text-red-600 hover:text-red-800 disabled:opacity-50"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Simple add form and toggle button for documents
function AddDocumentForm() {
  const qc = useQueryClient();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, excerpt, slug: title.toLowerCase().replace(/\s+/g,'-') })
      });
      if (res.ok) {
        setTitle(''); setExcerpt('');
        qc.invalidateQueries({ queryKey: ['/api/documents', '/api/documents/featured', '/api/articles'] });
      } else {
        const j = await res.json().catch(()=>({}));
        alert((j && j.message) || 'خطا در ایجاد سند');
      }
    } catch (err) {
      alert('خطا در ارتباط با سرور');
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input className="flex-1 border px-3 py-2 rounded" placeholder="عنوان" value={title} onChange={e => setTitle(e.target.value)} />
      <input className="flex-1 border px-3 py-2 rounded" placeholder="خلاصه" value={excerpt} onChange={e => setExcerpt(e.target.value)} />
      <button className="px-3 py-2 bg-blue-600 text-white rounded" disabled={loading}>{loading ? 'در حال ارسال...' : 'افزودن'}</button>
    </form>
  );
}

function ToggleFeaturedButton({ document }: { document: any }) {
  const qc = useQueryClient();
  const [loading, setLoading] = useState(false);
  const isFeatured = document.is_featured ?? document.isFeatured ?? false;

  const toggle = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/documents/${document.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !isFeatured })
      });
      if (res.ok) qc.invalidateQueries({ queryKey: ['/api/documents', '/api/documents/featured', '/api/articles'] });
      else alert('خطا در به‌روزرسانی');
    } catch (err) {
      alert('خطا در ارتباط با سرور');
    } finally { setLoading(false); }
  };

  return (
    <button onClick={toggle} className={`px-2 py-1 rounded ${isFeatured ? 'bg-green-600 text-white' : 'border'}`} disabled={loading}>
      {isFeatured ? 'حذف از منتخب' : 'انتخاب به‌عنوان منتخب'}
    </button>
  );
}