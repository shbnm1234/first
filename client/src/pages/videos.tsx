import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import ReactPlayer from 'react-player';

interface VideosPageProps {
  videoId?: number | null;
}

export default function VideosPage({ videoId }: VideosPageProps = {}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  
  const { data: videos, isLoading } = useQuery<any[]>({
    queryKey: ['/api/educational-videos/active'],
  });

  const { data: videoDetails } = useQuery<any>({
    queryKey: [`/api/educational-videos/${videoId}`],
    enabled: !!videoId,
  });

  const currentVideo = selectedVideo || (videoId && videoDetails);

  const handleVideoClick = (video: any) => {
    setSelectedVideo(video);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    window.postMessage({ type: 'SWITCH_TAB', tab: 'videos' }, '*');
  };

  const filteredVideos = videos?.filter(video => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button 
            onClick={() => window.postMessage({ type: 'SHOW_HOME' }, '*')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowRight className="h-5 w-5" />
            بازگشت
          </button>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">ویدیوهای آموزشی</h1>
          
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="جستجو در ویدیوها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <div 
              key={video.id} 
              className="bg-white rounded-xl p-4 shadow-sm border cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleVideoClick(video)}
            >
              <div className="w-full h-48 rounded-lg mb-3 flex items-center justify-center overflow-hidden bg-gray-100">
                {video.thumbnailUrl ? (
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <h3 className="font-medium text-gray-800 mb-2">{video.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{video.description}</p>
              <div className="flex items-center justify-between">
                {video.duration && (
                  <span className="text-sm text-orange-600">⏱️ {video.duration}</span>
                )}
                {video.instructor && (
                  <span className="text-sm text-purple-600">👨‍🏫 {video.instructor}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            هیچ ویدیویی پیدا نشد.
          </div>
        )}
      </div>

      {currentVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" dir="rtl">
          <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">{currentVideo.title}</h2>
              <button 
                onClick={handleCloseVideo}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="bg-white rounded-lg">
              <div className="bg-black relative aspect-video">
                <ReactPlayer
                  url={currentVideo.videoUrl}
                  width="100%"
                  height="100%"
                  controls
                  playing={true}
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload'
                      }
                    }
                  }}
                />
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 mb-4">{currentVideo.description}</p>
                {currentVideo.instructor && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span>👨‍🏫 مدرس: {currentVideo.instructor}</span>
                    {currentVideo.duration && (
                      <span>⏱️ مدت: {currentVideo.duration}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}