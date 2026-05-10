import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Calendar as CalendarIcon, Clock, LogIn, AlertCircle, RefreshCw } from 'lucide-react';
import { formatDateVN } from '../lib/utils';
import { useApp } from '../store';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

interface GoogleEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
  htmlLink: string;
}

function PersonalScheduleContent() {
  const { currentUser } = useApp();
  const [events, setEvents] = useState<GoogleEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const fetchEvents = async (token: string) => {
    setLoading(true);
    setError(null);
    try {
      const timeMin = new Date().toISOString();
      const timeMax = new Date();
      timeMax.setMonth(timeMax.getMonth() + 1);
      
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax.toISOString())}&orderBy=startTime&singleEvents=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Lỗi khi tải lịch Google Calendar');
      }
      
      const data = await response.json();
      setEvents(data.items || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Lỗi không xác định');
    } finally {
      setLoading(false);
    }
  };

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      setAccessToken(tokenResponse.access_token);
      fetchEvents(tokenResponse.access_token);
    },
    onError: error => setError('Đăng nhập Google thất bại'),
    scope: 'https://www.googleapis.com/auth/calendar.events.readonly',
  });

  const handleLoginClick = () => {
    if (!GOOGLE_CLIENT_ID) {
      alert('Vui lòng cấu hình VITE_GOOGLE_CLIENT_ID trong phần cài đặt (Settings -> Environment variables) để sử dụng tính năng này.');
      return;
    }
    
    login();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Lịch cá nhân</h2>
          <p className="text-slate-500 mt-2 text-lg">Đồng bộ lịch công tác từ Google Calendar của {currentUser?.email || 'bạn'}</p>
        </div>
        {!accessToken ? (
          <button 
            onClick={handleLoginClick}
            className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Đồng bộ Google Calendar
          </button>
        ) : (
          <button 
            onClick={() => fetchEvents(accessToken)}
            className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            Làm mới lịch
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 min-h-[60vh]">
        {!accessToken ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-slate-500">
            <CalendarIcon size={64} className="text-slate-300 mb-4" />
            <p className="text-lg font-medium">Bạn chưa đồng bộ Google Calendar</p>
            <p className="text-sm mt-2 text-slate-400 max-w-md text-center">Vui lòng chọn nút "Đồng bộ Google Calendar" ở góc trên để xem lịch công tác cá nhân của bạn.</p>
            {!GOOGLE_CLIENT_ID && (
               <div className="mt-4 p-4 bg-amber-50 text-amber-800 rounded-lg text-sm border border-amber-200">
                  <p className="font-bold mb-1">Cấu hình hệ thống (Dành cho Quản trị viên):</p>
                  <p>Vui lòng bổ sung biến môi trường <code>VITE_GOOGLE_CLIENT_ID</code> để tính năng đồng bộ lịch hoạt động.</p>
               </div>
            )}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-red-500">
            <AlertCircle size={48} className="mb-4" />
            <p className="text-lg font-medium">Lỗi đồng bộ lịch</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-blue-500">
            <RefreshCw size={48} className="mb-4 animate-spin opacity-50" />
            <p className="text-lg font-medium">Đang tải lịch từ Google...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-slate-500">
             <CalendarIcon size={48} className="text-slate-300 mb-4" />
             <p className="text-lg font-medium">Không có sự kiện nào sắp tới</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {events.map((event) => {
              const startDate = event.start.dateTime ? new Date(event.start.dateTime) : (event.start.date ? new Date(event.start.date) : new Date());
              const endDate = event.end.dateTime ? new Date(event.end.dateTime) : null;
              
              const isAllDay = !event.start.dateTime;
              
              return (
                <div key={event.id} className="p-6 hover:bg-slate-50 transition-colors flex gap-6">
                  <div className="flex flex-col items-center justify-center min-w-[80px] h-20 bg-blue-50 text-blue-700 rounded-xl">
                    <span className="text-3xl font-black">{startDate.getDate()}</span>
                    <span className="text-sm font-semibold uppercase">Th {startDate.getMonth() + 1}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold text-slate-800">{event.summary || '(Không có tiêu đề)'}</h3>
                      <a 
                        href={event.htmlLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 transition-colors shrink-0"
                      >
                        Mở Google Calendar
                      </a>
                    </div>
                    
                    <div className="flex flex-col gap-1.5 mt-3">
                      <div className="flex items-center gap-2 text-slate-600 font-medium">
                        <Clock size={16} className="text-blue-500 shrink-0" />
                        {isAllDay ? 'Cả ngày' : (
                          `${startDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} ${endDate ? `- ${endDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}` : ''}`
                        )}
                      </div>
                      
                      {event.location && (
                        <div className="flex items-center gap-2 text-slate-600 font-medium">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                      
                      {event.description && (
                        <div className="mt-2 text-slate-500 text-sm italic" dangerouslySetInnerHTML={{ __html: event.description }} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export function PersonalSchedule() {
  if (!GOOGLE_CLIENT_ID) {
    // Wrap to show error but not break app if missing
    return (
      <GoogleOAuthProvider clientId="dummy-client-id-to-prevent-crash">
        <PersonalScheduleContent />
      </GoogleOAuthProvider>
    );
  }
  
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <PersonalScheduleContent />
    </GoogleOAuthProvider>
  );
}
