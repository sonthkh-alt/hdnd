import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, FileText, Download, Loader2, Sparkles, AlertCircle, 
  FileCode, Settings2, Trash2, Paperclip, X, FileUp, Book, 
  Library, FileCheck, CheckCircle2, Info, ChevronRight,
  FileBadge, StickyNote, Mail, ClipboardList
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, Table, TableRow, TableCell, WidthType } from 'docx';
import { saveAs } from 'file-saver';
import { motion, AnimatePresence } from 'motion/react';

interface AttachedFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  code?: string;
  isGeneratingFile?: boolean;
  files?: AttachedFile[];
}

const DOCUMENT_TEMPLATES = [
  { id: 'report', label: 'Báo cáo', icon: FileBadge, prompt: 'Soạn thảo Báo cáo kết quả thực hiện nhiệm vụ quý... ' },
  { id: 'submission', label: 'Tờ trình', icon: ClipboardList, prompt: 'Soạn thảo Tờ trình về việc phê duyệt chủ trương... ' },
  { id: 'official', label: 'Công văn', icon: Mail, prompt: 'Soạn thảo Công văn phúc đáp về việc... ' },
  { id: 'notice', label: 'Thông báo', icon: StickyNote, prompt: 'Soạn thảo Thông báo kết luận cuộc họp về... ' },
];

export function DraftAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Chào đồng chí. Tôi là Trợ lý Soạn thảo chuyên nghiệp. Hệ thống đã sẵn sàng hỗ trợ đồng chí soạn thảo văn bản đúng quy chuẩn Nghị định 30/2020/NĐ-CP.'
    }
  ]);
  const [input, setInput] = useState('');
  const [template, setTemplate] = useState('');
  const [showConfig, setShowConfig] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setAttachedFiles(prev => [...prev, ...Array.from(files)]);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const applyTemplate = (prompt: string) => {
    setInput(prompt);
  };

  const generateDocx = async (rawContent: string) => {
    let cleanContent = rawContent;
    if (cleanContent.includes('---')) {
      cleanContent = cleanContent.split('---')[0];
    }

    const docLines = cleanContent.split('\n').map(line => line.trim()).filter(line => 
      !line.toLowerCase().includes('đây là dự thảo') && 
      !line.toLowerCase().includes('đã soạn thảo') &&
      !line.toLowerCase().includes('hệ thống đang xuất bản') &&
      line.length > 0
    );
    
    const docSize = 28; // 14pt
    
    // Advanced Extraction based on Decree 30 and Template awareness
    let leftHeader: string[] = [];
    let rightHeader: string[] = [];
    let contentStartIndex = 0;

    // Detect if AI used explicit block markers or try to find them
    const mottoIdx = docLines.findIndex(l => l.toUpperCase().includes("CỘNG HÒA XÃ HỘI"));
    const subMottoIdx = docLines.findIndex(l => l.includes("Độc lập - Tự do"));

    if (mottoIdx !== -1) {
      // Lines above/next to motto are for agency
      leftHeader = docLines.slice(0, mottoIdx);
      rightHeader = [docLines[mottoIdx], docLines[subMottoIdx] || ""];
      
      // Find the date line (usually starts with ..., ngày ...)
      const dateIdx = docLines.findIndex((l, i) => i > subMottoIdx && l.toLowerCase().includes("ngày") && l.includes("tháng"));
      if (dateIdx !== -1) {
        rightHeader.push(docLines[dateIdx]);
        contentStartIndex = dateIdx + 1;
      } else {
        contentStartIndex = Math.max(mottoIdx, subMottoIdx) + 1;
      }
    } else {
      contentStartIndex = 0;
    }

    const doc = new Document({
      sections: [{
        properties: {
          page: {
            margin: { top: 1134, right: 1134, bottom: 1134, left: 1701 },
          },
        },
        children: [
          // Elegant Header Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE },
            },
            rows: [
              new TableRow({
                children: [
                   new TableCell({
                    width: { size: 45, type: WidthType.PERCENTAGE },
                    children: leftHeader.map((line, i) => new Paragraph({
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({ 
                          text: line, 
                          bold: i === leftHeader.length - 1, 
                          size: 24, 
                          font: "Times New Roman" 
                        }),
                      ],
                    })).concat(leftHeader.length > 0 ? [
                       new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [new TextRun({ text: "───────", size: 12, font: "Times New Roman" })]
                      })
                    ] : []),
                  }),
                  new TableCell({
                    width: { size: 55, type: WidthType.PERCENTAGE },
                    children: rightHeader.map((line, i) => new Paragraph({
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({ 
                          text: line, 
                          bold: i < 2, 
                          size: i === 1 ? 28 : 26, 
                          font: "Times New Roman",
                          underline: i === 1 ? { type: BorderStyle.SINGLE, color: "000000" } : undefined
                        }),
                      ],
                    })),
                  }),
                ],
              }),
            ],
          }),
          new Paragraph({ text: "", spacing: { after: 300 } }),
          
          // Refined Body Generation
          ...docLines.slice(contentStartIndex).map(line => {
            const trimmedLine = line.trim();
            const isHeading = trimmedLine.startsWith('#') || 
                            (trimmedLine.toUpperCase() === trimmedLine && trimmedLine.length > 5 && trimmedLine.length < 150 && !trimmedLine.includes("NGÀY")) ||
                            /^(Điều|Chương|Mục|Phần)\s+\d+/.test(trimmedLine);

            return new Paragraph({
              alignment: isHeading ? AlignmentType.CENTER : AlignmentType.LEFT,
              spacing: { before: 150, after: 150, line: 360 },
              indent: isHeading ? undefined : { firstLine: 708 },
              children: [
                new TextRun({
                  text: trimmedLine.replace(/^#+\s*/, ''),
                  bold: isHeading,
                  size: docSize,
                  font: "Times New Roman"
                }),
              ],
            });
          })
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `Du_thao_van_ban_chuan_${Date.now()}.docx`);
  };

  const handleSend = async () => {
    if (!input.trim() && attachedFiles.length === 0) return;

    const currentFiles = attachedFiles.map(f => ({
      name: f.name,
      size: f.size,
      type: f.type,
      lastModified: f.lastModified
    }));

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input || (currentFiles.length > 0 ? `Đã gửi ${currentFiles.length} tệp tài liệu tham khảo.` : ''),
      files: currentFiles
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setAttachedFiles([]);
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error('Cấu hình AI chưa hoàn tất.');

      const ai = new GoogleGenAI({ apiKey });
      
      const fileContext = currentFiles.length > 0 
        ? `Người dùng có gửi kèm các tệp: ${currentFiles.map(f => f.name).join(', ')}. Hãy ưu tiên các thông tin trong tệp này.`
        : '';

      const systemInstruction = `# ROLE
Bạn là một Chuyên gia Pháp chế và Soạn thảo văn bản hành chính Nhà nước cấp cao.

# CƠ SỞ PHÁP LÝ & QUY ĐỊNH
- Tuân thủ tuyệt đối Nghị định 30/2020/NĐ-CP về văn thư lưu trữ.
- Sử dụng văn phong hành chính: Trang trọng, khách quan, chính xác (Văn phong công vụ).

# CHIẾN LƯỢC SOẠN THẢO (ƯU TIÊN 1)
1. BÁM SÁT VĂN BẢN MẪU: Nếu có mẫu, bạn phải TRÙNG KHỚP 100% cấu trúc tiêu đề, headers, xưng hô và các phần mục từ mẫu đó.
2. NỘI DUNG LOGIC: Diễn đạt mạch lạc, chặt chẽ, đúng thẩm quyền.
3. KHÔNG GIẢI THÍCH: Tuyệt đối không thêm lời dẫn giải, lưu ý hay giải thích vào phần nội dung văn bản. 

# VĂN BẢN MẪU ĐỊNH HƯỚNG (PHẢI TUÂN THỦ)
${template || "Sử dụng mẫu chuẩn quy định tại Nghị định 30/2020/NĐ-CP."}

${fileContext}

# QUY TRÌNH XUẤT BẢN
- Phản hồi của bạn CHỈ chứa nội dung văn bản hành chính hoàn chỉnh.
- Bắt đầu văn bản bằng thông tin Cơ quan, Quốc hiệu như trong mẫu.
- Kết thúc văn bản bằng dòng kẻ "---" và dòng chữ "Hệ thống đang xuất bản tệp văn bản chuẩn..." để kích hoạt bộ lọc xuất file.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: input || "Hãy hỗ trợ soạn thảo văn bản.",
        config: {
          systemInstruction: systemInstruction,
        }
      });

      const text = response.text || "Xin lỗi, tôi không thể xử lý yêu cầu này lúc này.";
      
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'assistant', 
        content: text,
        isGeneratingFile: true
      }]);

      setTimeout(() => {
        generateDocx(text);
      }, 1500);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'assistant', 
        content: "Lỗi kết nối AI. Vui lòng thử lại." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 lg:flex-row overflow-hidden font-sans antialiased">
      {/* Sidebar - Thư viện & Văn bản mẫu */}
      <motion.div 
        initial={false}
        animate={{ width: showConfig ? 384 : 0 }}
        className="flex flex-col bg-white border-r border-slate-200 shadow-2xl z-20 overflow-hidden relative"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur sticky top-0 z-10">
          <h3 className="font-black text-slate-800 flex items-center gap-3 tracking-tighter text-lg">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <Book size={20} />
            </div>
            THƯ VIỆN DỰ THẢO
          </h3>
          <button 
            onClick={() => setShowConfig(false)} 
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
          <section>
            <div className="flex items-center justify-between mb-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Tệp đính kèm</label>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 text-[11px] font-bold hover:text-blue-700 transition-colors"
              >
                Tải lên +
              </button>
            </div>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="group border-2 border-dashed border-slate-100 hover:border-blue-400 hover:bg-blue-50/50 transition-all p-8 rounded-3xl cursor-pointer flex flex-col items-center gap-3"
            >
              <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform shadow-sm">
                <FileUp size={28} />
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-slate-700">Tải tệp tham khảo</p>
                <p className="text-[10px] font-medium text-slate-400 mt-1">PDF, DOCX, TXT</p>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} multiple className="hidden" />
            </div>
            
            <AnimatePresence>
              {attachedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {attachedFiles.map((file, idx) => (
                    <motion.div 
                      key={idx + file.name}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center justify-between bg-slate-50 p-3.5 rounded-2xl border border-slate-100 group"
                    >
                      <div className="flex items-center gap-3 truncate">
                        <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg">
                          <FileCheck size={14} />
                        </div>
                        <span className="text-xs font-bold text-slate-600 truncate">{file.name}</span>
                      </div>
                      <button onClick={() => removeFile(idx)} className="p-1 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <X size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Văn bản mẫu</label>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 text-amber-600 rounded-lg text-[9px] font-black">
                <Sparkles size={10} />
                AI LEARNING
              </div>
            </div>
            <div className="relative group">
              <textarea 
                className="w-full h-[400px] bg-slate-50 border border-slate-100 rounded-3xl p-6 text-sm font-medium text-slate-700 shadow-inner focus:ring-4 focus:ring-blue-100 focus:bg-white outline-none leading-relaxed transition-all resize-none"
                placeholder="Dán văn bản mẫu tinh chỉnh vào đây..."
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
              />
              <div className="absolute top-4 right-4 text-slate-300 group-focus-within:text-blue-400 transition-colors">
                <Settings2 size={18} />
              </div>
            </div>
          </section>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex gap-3 items-start">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
              <Info size={16} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Mẹo hay</p>
              <p className="text-[11px] font-semibold text-slate-700 leading-normal">
                Tải lên mẫu Báo cáo/Tờ trình cũ để AI bắt chước đúng phong cách của đơn vị đồng chí.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur border-b border-slate-200 px-8 py-5 flex items-center justify-between shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-5">
            {!showConfig && (
              <motion.button 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setShowConfig(true)}
                className="p-3 bg-white text-slate-500 rounded-2xl hover:text-blue-600 transition-all border border-slate-200 shadow-sm hover:shadow-md"
              >
                <Library size={22} />
              </motion.button>
            )}
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter">PHÒNG THẢO VĂN BẢN</h2>
                <div className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-[10px] font-black tracking-widest flex items-center gap-1.5">
                  <CheckCircle2 size={10} />
                  CHUYÊN NGHIỆP
                </div>
              </div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.25em] mt-1">Hỗ trợ soạn thảo Công vụ 4.0</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                  {i}
                </div>
              ))}
            </div>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-2xl text-[11px] font-black tracking-widest ring-4 ring-slate-100">
              <Sparkles size={14} className="text-amber-400" />
              ULTRA AI
            </div>
          </div>
        </div>

        {/* Messaging Area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-14 space-y-12 scrollbar-hide" ref={scrollRef}>
          <div className="max-w-4xl mx-auto space-y-12">
            {messages.map((msg, idx) => (
              <motion.div 
                key={msg.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx === 0 ? 0 : 0.1 }}
                className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-12 h-12 rounded-[1.25rem] shrink-0 flex items-center justify-center shadow-2xl relative group ${
                  msg.role === 'user' ? 'bg-white text-slate-400 border border-slate-100' : 'bg-slate-900 text-white'
                }`}>
                  {msg.role === 'user' ? <div className="text-sm font-black">U</div> : <FileCode size={22} />}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                </div>

                <div className={`space-y-4 flex-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block px-8 py-7 rounded-[2.5rem] shadow-xl border text-lg leading-[1.8] font-medium transition-all ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white border-blue-500 rounded-tr-none' 
                      : 'bg-white text-slate-800 border-slate-100 rounded-tl-none font-serif'
                  }`}>
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                    
                    {msg.files && msg.files.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-blue-400/30 flex flex-wrap gap-3 justify-end">
                        {msg.files.map((file, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2.5 bg-blue-500/20 px-4 py-2 rounded-2xl text-[11px] font-black border border-blue-300/30 shadow-inner">
                            <Paperclip size={14} />
                            {file.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {msg.isGeneratingFile && !isLoading && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex justify-start"
                    >
                      <button 
                         onClick={() => generateDocx(msg.content)}
                         className="group flex items-center gap-3 bg-slate-900 text-white px-7 py-4 rounded-[1.5rem] text-xs font-black tracking-[0.2em] hover:bg-emerald-600 transition-all shadow-2xl hover:scale-105 active:scale-95"
                      >
                         <div className="p-1.5 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                           <Download size={18} />
                         </div>
                         XUẤT BẢN VĂN BẢN (.DOCX)
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
            
            <AnimatePresence>
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex gap-6 items-start"
                >
                  <div className="w-12 h-12 rounded-[1.25rem] bg-slate-900 flex items-center justify-center text-white shadow-xl">
                     <Loader2 size={22} className="animate-spin" />
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] rounded-tl-none px-8 py-6 w-2/3 shadow-inner">
                    <div className="space-y-3">
                      <motion.div 
                        initial={{ width: '40%' }}
                        animate={{ width: '90%' }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="h-2 bg-slate-200 rounded-full"
                      />
                      <motion.div 
                        initial={{ width: '20%' }}
                        animate={{ width: '70%' }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                        className="h-2 bg-slate-200 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Templates and Input Area */}
        <div className="px-8 py-10 bg-white border-t border-slate-100">
           <div className="max-w-4xl mx-auto space-y-8">
             {/* Document Templates */}
             <div className="flex flex-wrap items-center justify-center gap-3">
                {DOCUMENT_TEMPLATES.map((docType) => (
                  <button 
                    key={docType.id}
                    onClick={() => applyTemplate(docType.prompt)}
                    className="flex items-center gap-3 px-6 py-3.5 bg-white border border-slate-100 rounded-2xl text-xs font-bold text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 active:translate-y-0"
                  >
                    <docType.icon size={16} />
                    {docType.label}
                  </button>
                ))}
             </div>

             <div className="relative group p-3 bg-slate-50 border border-slate-200 rounded-[3rem] focus-within:bg-white focus-within:border-blue-400 focus-within:ring-[12px] focus-within:ring-blue-50 transition-all duration-300 flex items-end">
               <textarea 
                  rows={2}
                  className="flex-1 bg-transparent border-none py-6 pl-10 pr-24 focus:ring-0 text-xl font-bold text-slate-800 placeholder:text-slate-300 placeholder:font-medium resize-none scrollbar-hide leading-snug"
                  placeholder="Đồng chí cần soạn thảo văn bản gì?"
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
                  disabled={isLoading || (!input.trim() && attachedFiles.length === 0)}
                  className="p-5 bg-slate-900 text-white rounded-full hover:bg-blue-600 disabled:opacity-20 transition-all shadow-2xl active:scale-90 mb-2 mr-2 group-hover:scale-105"
               >
                 <Send size={28} />
               </button>
             </div>
             
             <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-black text-slate-300 uppercase tracking-widest">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
                 TIMES NEW ROMAN 14PT
               </div>
               <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]"></div>
                  decreto 30/2020 compliance
               </div>
               <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"></div>
                 AUTO-WORD PUBLISHING
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
