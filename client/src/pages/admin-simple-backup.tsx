import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { type Course, type Project } from "@shared/schema";
import { Calendar, Edit, Eye, File, Folder, Image, Lock, Plus, Trash, Video } from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("courses");

  return (
    <div dir="rtl" className="container mx-auto py-6 pb-20">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">پنل مدیریت</h1>
        <p className="text-gray-600">مدیریت محتوا و تنظیمات سایت</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b overflow-x-auto">
        {[
          { id: "courses", label: "دوره‌ها", icon: Video },
          { id: "projects", label: "پروژه‌ها", icon: Folder },
          { id: "documents", label: "آرشیو مقالات", icon: File },
          { id: "slides", label: "اسلایدها", icon: Image },
          { id: "magazines", label: "مجله‌ها", icon: Calendar },
          { id: "users", label: "کاربران", icon: Lock }
        ].map(tab => {
          const IconComponent = tab.icon as any;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 font-medium'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <IconComponent className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === "courses" && <CoursesTab />}
        {activeTab === "projects" && <ProjectsTab />}
        {activeTab === "documents" && <DocumentsTab />}
        {activeTab === "slides" && <div>اسلایدها (در دست ساخت)</div>}
        {activeTab === "magazines" && <div>مجله‌ها (در دست ساخت)</div>}
        {activeTab === "users" && <div>کاربران (در دست ساخت)</div>}
      </div>
    </div>
  );
}

function CoursesTab() {
  const { data: courses = [], isLoading } = useQuery<Course[]>({
    queryKey: ['/api/courses'],
    queryFn: async () => {
      const res = await fetch('/api/courses');
      if (!res.ok) return [];
      return res.json();
    }
  });

  if (isLoading) return <div className="text-center py-8">در حال بارگذاری...</div>;

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b flex items-center justify-between">
        <h2 className="text-xl font-semibold">دوره‌های آموزشی</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2">
          <Plus className="h-4 w-4" /> افزودن دوره جدید
        </button>
      </div>
      <div className="p-6">
        {courses.length > 0 ? (
          <div>
            {courses.map(c => (
              <div key={c.id} className="border-b py-3 flex justify-between">
                <div>{c.title}</div>
                <div className="text-xs text-gray-500">فعال</div>
              </div>
            ))}
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
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects');
      if (!res.ok) return [];
      return res.json();
    }
  });

  if (isLoading) return <div className="text-center py-8">در حال بارگذاری...</div>;

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b flex items-center justify-between">
        <h2 className="text-xl font-semibold">پروژه‌ها</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2">
          <Plus className="h-4 w-4" /> افزودن پروژه جدید
        </button>
      </div>
      <div className="p-6">
        {projects.length > 0 ? (
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
  const [subTab, setSubTab] = useState<'articles' | 'featured'>('articles');
  const endpoint = subTab === 'articles' ? '/api/articles' : '/api/documents/featured';
  const { data: documents = [], isLoading } = useQuery<any[]>({
    queryKey: [endpoint],
    queryFn: async () => {
      const res = await fetch(endpoint);
      if (!res.ok) return [];
      return res.json();
    }
  });

  if (isLoading) return <div className="text-center py-8">در حال بارگذاری...</div>;

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button onClick={() => setSubTab('articles')} className={`px-3 py-1 rounded ${subTab==='articles'? 'bg-blue-50 text-blue-600':'text-gray-600'}`}>مقالات</button>
            <button onClick={() => setSubTab('featured')} className={`px-3 py-1 rounded ${subTab==='featured'? 'bg-blue-50 text-blue-600':'text-gray-600'}`}>مقالات منتخب</button>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="h-4 w-4" />
            افزودن مورد جدید
          </button>
        </div>
      </div>
      <div className="p-6">
        <AddDocumentForm />

        <div className="mt-6 space-y-4">
          {documents && documents.length > 0 ? (
            documents.map((doc: any) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <File className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-medium">{doc.title}</h3>
                    <p className="text-sm text-gray-600">{doc.excerpt}</p>
                    {doc.is_featured || doc.isFeatured ? <span className="text-xs text-green-600">منتخب</span> : null}
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
            <div className="text-center py-12">
              <File className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">هیچ سندی یافت نشد</h3>
              <p className="text-gray-600">برای شروع، سند جدیدی اضافه کنید</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

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
  }

  return (
    <form onSubmit={submit} className="p-4 border rounded mb-4 flex gap-2">
      <input className="flex-1 p-2 border rounded" placeholder="عنوان" value={title} onChange={e => setTitle(e.target.value)} />
      <input className="flex-1 p-2 border rounded" placeholder="خلاصه" value={excerpt} onChange={e => setExcerpt(e.target.value)} />
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
      if (res.ok) {
        qc.invalidateQueries({ queryKey: ['/api/documents', '/api/documents/featured', '/api/articles'] });
      } else {
        alert('خطا در به‌روزرسانی');
      }
    } catch (err) {
      alert('خطا در ارتباط با سرور');
    } finally { setLoading(false); }
  }

  return (
    <button onClick={toggle} className={`p-2 rounded ${isFeatured ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`} disabled={loading}>
      {isFeatured ? 'مقاله منتخب' : 'افزودن به منتخب'}
    </button>
  );
}


// Removed Magazine and Users heavy components to keep this admin page focused and compile-safe.