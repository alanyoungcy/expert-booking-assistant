
import React, { useState } from 'react';
import { PestControlBooking } from '../types';
import {
  LOCATION_DATA,
  PEST_SERVICES,
  SQ_FT_OPTIONS,
  QUANTITY_OPTIONS
} from '../constants';
import { SearchableSelect } from './SearchableSelect';
import { User, Phone, MapPin, Search, MessageSquare, Bug, Loader2 } from 'lucide-react';

interface Props {
  onSubmit: (data: PestControlBooking) => void;
  isLoading?: boolean;
}

export const PestControlForm: React.FC<Props> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<PestControlBooking>({
    name: '',
    phone: '',
    altContact: '',
    altPhone: '',
    region: LOCATION_DATA[0].region,
    subDistrict: LOCATION_DATA[0].subDistricts[0],
    address: '',
    service: PEST_SERVICES[0],
    roomCount: 'N/A',
    mattressCount: 'N/A',
    sqFt: SQ_FT_OPTIONS[0],
    remarks: ''
  });

  const [errors, setErrors] = useState<{phone?: string, altPhone?: string}>({});

  const handlePhoneChange = (field: string, val: string) => {
    // 僅允許數字並限制 8 位
    const numericValue = val.replace(/\D/g, '').slice(0, 8);
    setFormData({...formData, [field]: numericValue});
    
    if (numericValue.length > 0 && numericValue.length < 8) {
      setErrors(prev => ({...prev, [field]: '請輸入 8 位數字電話號碼'}));
    } else {
      setErrors(prev => ({...prev, [field]: undefined}));
    }
  };

  const subDistricts = LOCATION_DATA.find(l => l.region === formData.region)?.subDistricts || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.length !== 8) {
      alert('請填寫有效的 8 位數字聯絡電話');
      return;
    }
    onSubmit(formData);
  };

  const isBedbug = formData.service === '床蝨';
  const showSqFt = !['蜂巢移除', '蛀木蟲'].includes(formData.service);

  return (
    <form onSubmit={handleSubmit} className="space-y-10 animate-in fade-in duration-700">
      {/* 個人資料 */}
      <section className="space-y-6">
        <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
          <User className="w-5 h-5 text-zinc-900" />
          <h3 className="font-bold text-zinc-900">聯絡資料</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">稱呼 (必填)</label>
            <input
              required
              type="text"
              placeholder="例如：陳先生"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 focus:ring-2 focus:ring-zinc-900 outline-none transition-all text-slate-900"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">聯絡電話 (必填)</label>
            <input
              required
              type="tel"
              placeholder="8 位數字電話"
              className={`w-full px-4 py-3 rounded-xl border bg-slate-100 ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-zinc-900'} outline-none transition-all text-slate-900`}
              value={formData.phone}
              onChange={e => handlePhoneChange('phone', e.target.value)}
            />
            {errors.phone && <p className="text-xs text-red-500 font-medium">{errors.phone}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">第二聯絡人 (如有)</label>
            <input
              type="text"
              placeholder="選填"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 focus:ring-2 focus:ring-zinc-900 outline-none transition-all text-slate-900"
              value={formData.altContact}
              onChange={e => setFormData({...formData, altContact: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">第二聯絡人電話 (如有)</label>
            <input
              type="tel"
              placeholder="選填"
              className={`w-full px-4 py-3 rounded-xl border bg-slate-100 ${errors.altPhone ? 'border-red-500' : 'border-slate-200'} focus:ring-2 focus:ring-zinc-900 outline-none transition-all text-slate-900`}
              value={formData.altPhone}
              onChange={e => handlePhoneChange('altPhone', e.target.value)}
            />
             {errors.altPhone && <p className="text-xs text-red-500 font-medium">{errors.altPhone}</p>}
          </div>
        </div>
      </section>

      {/* 地點資料 */}
      <section className="space-y-6">
        <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
          <MapPin className="w-5 h-5 text-zinc-900" />
          <h3 className="font-bold text-zinc-900">服務地址</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">大區</label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 focus:ring-2 focus:ring-zinc-900 outline-none transition-all text-slate-900"
              value={formData.region}
              onChange={e => setFormData({...formData, region: e.target.value, subDistrict: LOCATION_DATA.find(l => l.region === e.target.value)?.subDistricts[0] || ''})}
            >
              {LOCATION_DATA.map(l => <option key={l.region} value={l.region} className="text-slate-900">{l.region}</option>)}
            </select>
          </div>
          <SearchableSelect 
            label="細分地區 (可搜尋)"
            options={subDistricts}
            value={formData.subDistrict}
            onChange={(val) => setFormData({...formData, subDistrict: val})}
            placeholder="請選擇或輸入搜尋地區"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">詳細地址</label>
          <textarea
            required
            rows={2}
            placeholder="街道、大廈、座數、單位"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 focus:ring-2 focus:ring-zinc-900 outline-none transition-all resize-none text-slate-900"
            value={formData.address}
            onChange={e => setFormData({...formData, address: e.target.value})}
          />
        </div>
      </section>

      {/* 服務細節 */}
      <section className="space-y-6">
        <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
          <Bug className="w-5 h-5 text-zinc-900" />
          <h3 className="font-bold text-zinc-900">服務細項</h3>
        </div>
        <div className="space-y-4">
          <label className="text-sm font-semibold text-slate-700">所需滅蟲服務</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PEST_SERVICES.map(s => (
              <button
                key={s}
                type="button"
                onClick={() => setFormData({...formData, service: s})}
                className={`p-3 text-sm border rounded-xl transition-all font-medium ${
                  formData.service === s 
                    ? 'bg-zinc-900 border-zinc-900 text-white shadow-lg transform scale-[1.03]' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-zinc-400'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {isBedbug && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-zinc-50 rounded-2xl border border-zinc-200">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 underline underline-offset-4 decoration-zinc-300">房間數目 (床蝨專用)</label>
              <select
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-slate-100 focus:ring-2 focus:ring-zinc-900 outline-none transition-all text-slate-900"
                value={formData.roomCount}
                onChange={e => setFormData({...formData, roomCount: e.target.value})}
              >
                {QUANTITY_OPTIONS.map(o => (
                  <option key={o} value={o} className="text-slate-900">
                    {o === '5個/張或以上' ? '5間或以上' : (o === 'N/A' ? 'N/A' : `${o}間`)}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 underline underline-offset-4 decoration-zinc-300">床褥數目 (床蝨專用)</label>
              <select
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-slate-100 focus:ring-2 focus:ring-zinc-900 outline-none transition-all text-slate-900"
                value={formData.mattressCount}
                onChange={e => setFormData({...formData, mattressCount: e.target.value})}
              >
                {QUANTITY_OPTIONS.map(o => (
                  <option key={o} value={o} className="text-slate-900">
                    {o === '5個/張或以上' ? '5張或以上' : (o === 'N/A' ? 'N/A' : `${o}張`)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {showSqFt && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">單位尺數 (平方尺)</label>
              <select
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 focus:ring-2 focus:ring-zinc-900 outline-none transition-all text-slate-900"
                value={formData.sqFt}
                onChange={e => setFormData({...formData, sqFt: e.target.value})}
              >
                {SQ_FT_OPTIONS.map(o => <option key={o} value={o} className="text-slate-900">{o}</option>)}
              </select>
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" /> 備註 (選填)
            </label>
            <textarea
              rows={1}
              placeholder="有任何特別要求？"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 focus:ring-2 focus:ring-zinc-900 outline-none transition-all resize-none text-slate-900"
              value={formData.remarks}
              onChange={e => setFormData({...formData, remarks: e.target.value})}
            />
          </div>
        </div>
      </section>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-5 bg-zinc-900 text-white rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl shadow-zinc-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>提交中...</span>
          </>
        ) : (
          <span>提交預約訂單</span>
        )}
      </button>
    </form>
  );
};
