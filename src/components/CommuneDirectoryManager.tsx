import React, { useState } from 'react';
import { Search, MapPin, Phone, Mail, Building } from 'lucide-react';
import { communeOfficials } from '../data/communeDirectory';

export function CommuneDirectoryManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');

  const districts = Array.from(new Set(communeOfficials.map(o => o.district))).sort();

  const filtered = communeOfficials.filter(o => {
    const matchesSearch = 
      o.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      o.commune.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.phone.includes(searchTerm) ||
      o.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDistrict = districtFilter ? o.district === districtFilter : true;
    
    return matchesSearch && matchesDistrict;
  });

  return (
    <div className="p-8 max-w-full mx-auto h-full flex flex-col">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Danh bạ 166 xã, phường</h2>
          <p className="text-slate-500 mt-2 text-lg">Tra cứu thông tin liên hệ cán bộ cấp xã/phường ({filtered.length} kết quả)</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Tìm kiếm họ tên, đơn vị, sđt, email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full shadow-sm"
          />
        </div>
        <select
          value={districtFilter}
          onChange={(e) => setDistrictFilter(e.target.value)}
          className="border border-slate-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Tất cả Quận/Huyện --</option>
          {districts.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        <div className="overflow-x-auto min-h-0 flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm">
              <tr className="text-slate-600 text-sm border-b border-slate-200">
                <th className="p-4 font-semibold whitespace-nowrap">Đơn vị hành chính</th>
                <th className="p-4 font-semibold whitespace-nowrap">Họ và Tên</th>
                <th className="p-4 font-semibold">Chức vụ</th>
                <th className="p-4 font-semibold whitespace-nowrap">Số điện thoại</th>
                <th className="p-4 font-semibold whitespace-nowrap">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((official, idx) => (
                <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                  <td className="p-4">
                    <div className="font-semibold text-slate-800">{official.commune}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 whitespace-nowrap">
                      <MapPin size={12} /> {official.district}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-blue-900">{official.fullName}</div>
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-700">
                    {official.position}
                  </td>
                  <td className="p-4">
                    <a href={`tel:${official.phone}`} className="flex items-center gap-1.5 text-slate-700 hover:text-blue-600 font-medium">
                      <Phone size={14} className="text-slate-400" /> {official.phone}
                    </a>
                  </td>
                  <td className="p-4">
                    <a href={`mailto:${official.email}`} className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm">
                      <Mail size={14} className="text-blue-400" /> {official.email}
                    </a>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                   <td colSpan={5} className="p-8 text-center text-slate-500">
                      Không tìm thấy cán bộ phù hợp.
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
