import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, ShieldAlert, FileSearch, ExternalLink } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Chào đồng chí. Tôi là Trợ lý số của Văn phòng. Do chính sách bảo mật của Google, không gian làm việc NotebookLM nên được sử dụng trong cửa sổ riêng để đảm bảo hiệu suất và đồng bộ dữ liệu tốt nhất. Đồng chí có thể sử dụng nút bên trên để mở kho tri thức, hoặc hỏi tôi tại đây các vấn đề nhanh.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const notebookUrl = "https://notebooklm.google.com/notebook/3a84275e-5abd-45d0-b437-ddb7efc74ce8";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const newMessage: Message = { id, role: 'user', content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY is not defined. Please check your environment variables.');
      }
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      const prompt = `HỆ THỐNG TRỢ LÝ QUẢN TRỊ THÔNG MINH (E-OFFICE)
1. ĐỊNH DANH: Bạn là trợ lý số hỗ trợ nhanh. 
2. NGUYÊN TẮC: Trả lời ngắn gọn, chuẩn văn phong hành chính.
3. LƯU Ý: Nhắc người dùng tham khảo thêm NotebookLM của cơ quan (đã được cấu hình chuyên sâu) nếu câu hỏi yêu cầu phân tích dữ liệu lịch sử lớn.

YÊU CẦU: ${input}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text() || "Đã xảy ra lỗi khi kết nối với hệ thống AI.";
      setMessages(prev => [...prev, { id: `${Date.now()}-assistant`, role: 'assistant', content: text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: `${Date.now()}-error`, role: 'assistant', content: "Xin lỗi đồng chí, hệ thống đang bận. Vui lòng sử dụng NotebookLM để có kết quả chính xác nhất." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto h-[calc(100vh-2rem)] flex flex-col space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <Bot size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Trung tâm Trợ lý Số</h2>
              <p className="text-blue-100 text-sm mt-1">Tích hợp dữ liệu văn phòng & AI phân tích chuyên sâu</p>
            </div>
          </div>
          <a 
            href={notebookUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-xl font-bold shadow-sm hover:bg-blue-50 transition-all hover:scale-105"
          >
            <ExternalLink size={20} />
            Mở không gian hỏi đáp liên quan đến HĐND tỉnh Thanh Hóa
          </a>
        </div>
      </div>

      <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between">
           <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             Hệ thống Gemini sẵn sàng hỗ trợ nhanh
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30" ref={scrollRef}>
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'assistant' && (
                <div className="shrink-0 w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <Bot size={18} />
                </div>
              )}
              <div className={`rounded-xl px-4 py-3 max-w-[80%] text-sm shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border border-slate-100 text-slate-800'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Bot size={18} />
              </div>
              <div className="bg-white border border-slate-100 rounded-xl px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-white border-t border-slate-200">
           <div className="flex items-center gap-2 max-w-4xl mx-auto">
             <div className="flex-1 relative">
                <input 
                  type="text"
                  className="w-full border border-slate-200 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập câu hỏi hỗ trợ tại đây..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  <Send size={18} />
                </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

