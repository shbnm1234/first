import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { type Project } from "@shared/schema";
import ProjectCard from "@/components/project/ProjectCard";
// کامپوننت‌های ساده بدون UI library

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: projects = [], isLoading } = useQuery<Project[]>({ 
    queryKey: ['/api/projects'] 
  });
  
  // Filter only webinars (projects with type "webinar")
  const webinars = projects.filter(project => {
    const title = project.title || '';
    const desc = project.description || '';
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch && project.type === 'webinar';
  });
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-neutral-500 mb-2">وبینارهای آموزشی پیستاط</h2>
        <p className="text-neutral-300">مشاهده تمام وبینارهای آموزشی موجود</p>
      </div>
      
      <div className="mb-6">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="جستجوی وبینارها..."
            className="pl-10 pr-4 py-2 w-full border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {isLoading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="w-full h-36 bg-gray-200 animate-pulse" />
              <div className="p-4">
                <div className="w-3/4 h-6 mb-2 bg-gray-200 animate-pulse" />
                <div className="w-full h-4 mb-3 bg-gray-200 animate-pulse" />
                <div className="flex justify-between items-center">
                  <div className="w-1/3 h-4 bg-gray-200 animate-pulse" />
                  <div className="w-20 h-8 rounded bg-gray-200 animate-pulse" />
                </div>
              </div>
            </div>
          ))
        ) : webinars.length > 0 ? (
          webinars.map(project => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description || ''}
              thumbnailUrl={project.thumbnailUrl || ''}
              type={project.type as "project" | "magazine"}
              dueDate={project.dueDate || undefined}
              pages={project.pages ?? undefined}
              isLocked={Boolean(project.isLocked)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-neutral-400">هیچ وبیناری با معیارهای شما یافت نشد.</p>
            <button 
              className="text-primary hover:underline mt-2"
              onClick={() => setSearchTerm("")}
            >
              پاک کردن جستجو
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
