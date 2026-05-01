import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, ShieldAlert, FileSearch, ExternalLink } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

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
      content: 'Chào đồng chí. Tôi là Trợ lý số chuyên trách của Văn phòng Đoàn ĐBQH và HĐND. Tôi có thể hỗ trợ tóm tắt nghị quyết, phân tích nội dung, lên lịch công tác tự động và báo cáo tiến độ. Xin lưu ý không nhập nội dung thuộc danh mục bí mật Nhà nước.'
    }
  ]);
  const [input, setInput] = useState('');
  const [fileContext, setFileContext] = useState<{name: string, content: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1000000) {
      alert("Tệp quá lớn, vui lòng chọn tệp nhỏ hơn 1MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setFileContext({ name: file.name, content });
      setMessages(prev => [...prev, {
         id: Date.now().toString(),
         role: 'assistant',
         content: `Đã đọc tệp **${file.name}**. Đồng chí có thể đặt câu hỏi về nội dung tệp này.`
      }]);
    };
    reader.readAsText(file);
    // Reset file input
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Security check mock
    const forbiddenWords = ['mật', 'tối mật', 'tuyệt mật', 'bí mật', 'quốc phòng'];
    const isPotentiallySecret = forbiddenWords.some(w => input.toLowerCase().includes(w));
    
    if (isPotentiallySecret) {
      alert("CẢNH BÁO: Thông tin có thể chứa nội dung mật. Vui lòng kiểm tra lại theo quy định bảo vệ bí mật Nhà nước.");
      return;
    }

    const newMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
      const ai = new GoogleGenAI({ apiKey });
      let contextStr = '';
      if (fileContext) {
         contextStr = `\n\nNỘI DUNG TÀI LIỆU (${fileContext.name}):\n${fileContext.content}\n\nHãy trả lời câu hỏi dựa trên nội dung tài liệu này.`;
      }

      const prompt = `HỆ THỐNG QUẢN TRỊ SỐ VĂN PHÒNG ĐBQH & HĐND
1. ĐỊNH DANH VÀ TƯ DUY HỆ THỐNG
Bạn là Hệ thống Trợ lý Quản trị Thông minh (E-Office Assistant) tích hợp sức mạnh NotebookLM (phân tích sâu tài liệu) và Gemini.
2. QUY TẮC BẢO MẬT: Không tiết lộbí mật Nhà nước.
3. OUTPUT: Chuẩn form hành chính.

Yêu cầu của cán bộ:
${input}${contextStr}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      const text = response.text || "Đã xảy ra lỗi khi kết nối.";
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: "Xin lỗi đồng chí, hệ thống đang bận. Vui lòng thử lại sau." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = (content: string) => {
    // A very simple markdown styled parser for basic bold, italic, and tables
    // For a real app, use react-markdown
    const lines = content.split('\n');
    let inTable = false;
    const elements: React.ReactNode[] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('|')) {
            inTable = true;
            // Extremely naive table rendering
            const cells = line.split('|').filter(c => c.trim() !== '' && !c.includes('---'));
            if (cells.length > 0) {
               elements.push(
                <tr key={i} className="border-b border-slate-200">
                  {cells.map((cell, idx) => (
                    <td key={idx} className="p-2 border border-slate-300 text-sm">{cell.trim()}</td>
                  ))}
                </tr>
               );
            }
        } else {
            if (inTable) {
                // Table ended
                inTable = false;
            }
            if (line.trim() !== '') {
                // Parse bold styling
                const parts = line.split(/(\*\*.*?\*\*)/g);
                const partElements = parts.map((part, idx) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={idx} className="font-bold">{part.slice(2, -2)}</strong>;
                    }
                    if (part.startsWith('*') && part.endsWith('*')) {
                        return <em key={idx} className="italic text-slate-600">{part.slice(1, -1)}</em>;
                    }
                    return part;
                });
                elements.push(<p key={i} className="mb-2">{partElements}</p>);
            }
        }
    }
    
    // Wrap tables
    const parsedElements: React.ReactNode[] = [];
    let tempTable: React.ReactNode[] = [];
    
    elements.forEach((el: any) => {
      if (el.type === 'tr') {
         tempTable.push(el);
      } else {
         if (tempTable.length > 0) {
             parsedElements.push(
               <div className="overflow-x-auto my-4 w-full" key={`table-${parsedElements.length}`}>
                 <table className="w-full text-left border-collapse border border-slate-300 bg-white">
                    <tbody className="divide-y divide-slate-200">
                       {tempTable}
                    </tbody>
                 </table>
               </div>
             );
             tempTable = [];
         }
         parsedElements.push(el);
      }
    });

    if (tempTable.length > 0) {
         parsedElements.push(
            <div className="overflow-x-auto my-4 w-full" key={`table-${parsedElements.length}`}>
               <table className="w-full text-left border-collapse border border-slate-300 bg-white">
                  <tbody className="divide-y divide-slate-200">
                     {tempTable}
                  </tbody>
               </table>
            </div>
         );
    }
    return parsedElements;
  };

  return (
    <div className="p-8 max-w-5xl mx-auto h-[calc(100vh-2rem)] flex flex-col space-y-6">
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2.5 rounded-lg text-blue-700">
            <Bot size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Trợ lý Số</h2>
            <p className="text-slate-500 mt-1">Phân tích văn bản, lập báo cáo, dự thảo lịch công tác tự động.</p>
          </div>
        </div>
        <a 
          href="https://notebooklm.google.com/notebook/3a84275e-5abd-45d0-b437-ddb7efc74ce8" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-200"
        >
          <ExternalLink size={16} />
          Mở Không gian làm việc NotebookLM
        </a>
      </div>

      <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center gap-2 text-sm text-slate-600 font-medium">
          <ShieldAlert size={16} className="text-amber-600" />
          Môi trường bảo mật. Không nhập tài liệu Mật.
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50" ref={scrollRef}>
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-slate-700 text-white' : 'bg-blue-600 text-white'}`}>
                {msg.role === 'user' ? <span className="text-sm font-bold">CB</span> : <Bot size={18} />}
              </div>
              <div className={`rounded-2xl px-5 py-4 shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white pb-3' : 'bg-white border border-slate-200 text-slate-800'}`}>
                {msg.role === 'user' ? (
                  <p>{msg.content}</p>
                ) : (
                  <div className="prose prose-slate prose-sm max-w-none">
                    {renderContent(msg.content)}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 max-w-[80%]">
              <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-600 text-white">
                <Bot size={18} />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm flex gap-1 items-center">
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-.15s]"></div>
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-.3s]"></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-white border-t border-slate-200">
           {fileContext && (
             <div className="max-w-4xl mx-auto mb-2 flex items-center pr-12 text-sm text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md w-max">
               <FileSearch size={14} className="mr-2" />
               Đang lấy ngữ cảnh từ tệp: <strong className="ml-1">{fileContext.name}</strong>
               <button onClick={() => setFileContext(null)} className="ml-3 text-slate-400 hover:text-red-500 font-bold">&times;</button>
             </div>
           )}
           <div className="flex items-end gap-3 max-w-4xl mx-auto">
             <input 
               type="file" 
               className="hidden" 
               ref={fileInputRef} 
               onChange={handleFileUpload} 
               accept=".txt,.md,.csv" 
             />
             <button 
               onClick={() => fileInputRef.current?.click()}
               className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors shrink-0" 
               title="Tải lên tài liệu (.txt, .md, .csv) để phân tích"
             >
               <FileSearch size={22} />
             </button>
             <div className="flex-1 relative">
                <textarea 
                  className="w-full border border-slate-300 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32 min-h-[52px]"
                  placeholder="Yêu cầu trợ lý tổng hợp báo cáo, lên lịch hoặc phân tích văn bản..."
                  rows={2}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
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
