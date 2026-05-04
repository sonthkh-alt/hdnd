import { useState } from 'react';
import { Search, MapPin, Building, Contact, Download } from 'lucide-react';
import { deputiesData } from '../data/deputies';
import { Deputy } from '../types';

export function DeputiesManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeputy, setSelectedDeputy] = useState<Deputy | null>(null);

  const filtered = deputiesData.filter(d => 
    (d.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (d.hometown || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (d.jobTitle || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-full mx-auto h-full flex flex-col">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Danh sách Đại biểu HĐND</h2>
          <p className="text-slate-500 mt-2 text-lg">Khóa XIX, nhiệm kỳ 2026 - 2031 (Tổng số: {deputiesData.length} đại biểu)</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Tìm kiếm họ tên, quê quán..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-72 shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium shadow-sm transition-colors">
             <Download size={18} />
             Xuất Excel
          </button>
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm">
                <tr className="text-slate-600 text-sm border-b border-slate-200">
                  <th className="p-4 font-semibold whitespace-nowrap">STT</th>
                  <th className="p-4 font-semibold whitespace-nowrap">Họ và Tên</th>
                  <th className="p-4 font-semibold whitespace-nowrap">Năm sinh</th>
                  <th className="p-4 font-semibold">Chức vụ - Nơi công tác</th>
                  <th className="p-4 font-semibold whitespace-nowrap">Trình độ</th>
                  <th className="p-4 font-semibold text-center whitespace-nowrap">Chi tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(deputy => (
                  <tr key={deputy.id} className="hover:bg-blue-50/50 transition-colors cursor-pointer" onClick={() => setSelectedDeputy(deputy)}>
                    <td className="p-4 text-slate-500">{deputy.id}</td>
                    <td className="p-4">
                      <div className="font-bold text-blue-900">{deputy.fullName}</div>
                      <div className="text-xs text-slate-500">{deputy.gender}</div>
                    </td>
                    <td className="p-4 text-slate-700">{deputy.dateOfBirth}</td>
                    <td className="p-4">
                      <div className="text-sm font-medium text-slate-800 line-clamp-1" title={deputy.jobTitle}>{deputy.jobTitle}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Building size={12} /> <span className="line-clamp-1" title={deputy.workplace}>{deputy.workplace}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-slate-600 line-clamp-1">{deputy.profession}</div>
                    </td>
                    <td className="p-4 text-center">
                       <button className="text-blue-600 hover:text-blue-800 text-sm font-medium py-1 px-3 border border-blue-200 hover:border-blue-300 rounded bg-blue-50 transition-colors">
                          Xem
                       </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                     <td colSpan={6} className="p-8 text-center text-slate-500">
                        Không tìm thấy đại biểu phù hợp.
                     </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selectedDeputy && (
          <div className="w-1/3 min-w-[400px] bg-white rounded-xl shadow-lg border border-slate-200 overflow-y-auto flex flex-col animate-in slide-in-from-right-8 duration-300">
            <div className="p-6 border-b border-slate-100 relative bg-gradient-to-br from-blue-50 to-white">
              <button 
                onClick={() => setSelectedDeputy(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-white rounded-full p-1 shadow-sm"
              >
                &times;
              </button>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl shadow-inner shrink-0">
                  {selectedDeputy.fullName.split(' ').pop()?.[0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">{selectedDeputy.fullName}</h3>
                  <div className="text-sm text-slate-500 mt-1 flex gap-3">
                    <span>{selectedDeputy.dateOfBirth}</span>
                    <span>&bull;</span>
                    <span>{selectedDeputy.gender}</span>
                    <span>&bull;</span>
                    <span>{selectedDeputy.ethnicity}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
               <section>
                 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 border-b pb-1">Công tác</h4>
                 <div className="space-y-3">
                    <div>
                      <div className="text-xs text-slate-500 mb-0.5">Nghề nghiệp, chức vụ</div>
                      <div className="text-sm font-medium text-slate-800">{selectedDeputy.jobTitle || 'Không có'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-0.5">Nơi công tác</div>
                      <div className="text-sm font-medium text-slate-800">{selectedDeputy.workplace || 'Không có'}</div>
                    </div>
                    {selectedDeputy.councilRole && (
                      <div>
                        <div className="text-xs text-slate-500 mb-0.5">Vai trò HĐND</div>
                        <div className="text-sm font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded inline-block border border-blue-100">{selectedDeputy.councilRole}</div>
                      </div>
                    )}
                 </div>
               </section>

               <section>
                 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 border-b pb-1">Lý lịch</h4>
                 <div className="space-y-3 grid grid-cols-2 gap-x-4">
                    <div className="col-span-2">
                       <div className="text-xs text-slate-500 flex items-center gap-1 mb-0.5"><MapPin size={12}/> Quê quán</div>
                       <div className="text-sm text-slate-800">{selectedDeputy.hometown}</div>
                    </div>
                    <div className="col-span-2">
                       <div className="text-xs text-slate-500 flex items-center gap-1 mb-0.5"><Contact size={12}/> Nơi ở hiện nay</div>
                       <div className="text-sm text-slate-800">{selectedDeputy.currentResidence}</div>
                    </div>
                    <div>
                       <div className="text-xs text-slate-500 mb-0.5">Tôn giáo</div>
                       <div className="text-sm text-slate-800">{selectedDeputy.religion}</div>
                    </div>
                    <div>
                       <div className="text-xs text-slate-500 mb-0.5">Ngày vào Đảng</div>
                       <div className="text-sm font-medium text-red-600">{selectedDeputy.partyDate || 'Chưa vào Đảng'}</div>
                    </div>
                 </div>
               </section>

               <section>
                 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 border-b pb-1">Học vấn & Trình độ</h4>
                 <div className="space-y-3">
                    <div>
                       <div className="text-xs text-slate-500 mb-0.5">Chuyên môn, nghiệp vụ</div>
                       <div className="text-sm font-medium text-slate-800">{selectedDeputy.profession || 'Không có'}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                         <div className="text-xs text-slate-500 mb-0.5">Học hàm, học vị</div>
                         <div className="text-sm text-slate-800">{selectedDeputy.degree || 'Không'}</div>
                       </div>
                       <div>
                         <div className="text-xs text-slate-500 mb-0.5">Lý luận chính trị</div>
                         <div className="text-sm text-slate-800">{selectedDeputy.politicalTheory || 'Không'}</div>
                       </div>
                       <div>
                         <div className="text-xs text-slate-500 mb-0.5">Ngoại ngữ</div>
                         <div className="text-sm text-slate-800">{selectedDeputy.foreignLanguage || 'Không'}</div>
                       </div>
                       <div>
                         <div className="text-xs text-slate-500 mb-0.5">GD Phổ thông</div>
                         <div className="text-sm text-slate-800">{selectedDeputy.education || '12/12'}</div>
                       </div>
                    </div>
                 </div>
               </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
