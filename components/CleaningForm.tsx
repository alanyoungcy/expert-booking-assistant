
import React, { useState } from 'react';
import { CleaningBooking } from '../types';
import {
  LOCATION_DATA,
  CLEANING_SERVICES,
  CLEANING_ADD_SERVICES,
  SQ_FT_OPTIONS,
  QUANTITY_OPTIONS
} from '../constants';
import { SearchableSelect } from './SearchableSelect';
import { User, Phone, MapPin, Sparkles, MessageSquare, PlusCircle, Loader2 } from 'lucide-react';

interface Props {
  onSubmit: (data: CleaningBooking) => void;
  isLoading?: boolean;
}

export const CleaningForm: React.FC<Props> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<CleaningBooking>({
    name: '',
    phone: '',
    altContact: '',
    altPhone: '',
    region: LOCATION_DATA[0].region,
    subDistrict: LOCATION_DATA[0].subDistricts[0],
    address: '',
    mainService: CLEANING_SERVICES[0],
    addServices: [],
    carpetCount: 'N/A',
    mattressCount: 'N/A',
    curtainCount: 'N/A',
    sqFt: SQ_FT_OPTIONS[0],
    remarks: ''
  });

  const [errors, setErrors] = useState<{phone?: string, altPhone?: string}>({});

  const handlePhoneChange = (field: string, val: string) => {
    const numericValue = val.replace(/\D/g, '').slice(0, 8);
    setFormData({...formData, [field]: numericValue});
    
    if (numericValue.length > 0 && numericValue.length < 8) {
      setErrors(prev => ({...prev, [field]: '請輸入 8 位數字電話'}));
    } else {
      setErrors(prev => ({...prev, [field]: undefined}));
    }
  };

  const toggleAddService = (id: string) => {
    setFormData(prev => ({
      ...prev,
      addServices: prev.addServices.includes(id) 
        ? prev.addServices.filter(s => s !== id) 
        : [...prev.addServices, id]
    }));
  };

  const subDistricts = LOCATION_DATA.find(l => l.region === formData.region)?.subDistricts || [];

  // 過濾當前主服務可用的追加服務
  const availableAddServices = CLEANING_ADD_SERVICES.filter(s => 
    s.applicableTo.includes(formData.mainService)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.length !== 8) {
      alert('請填寫有效的 8 位數字聯絡電話');
      return;
    }
    onSubmit(formData);
  };

  const showSqFt = formData.mainService !== '通渠';

  return (
    <form onSubmit={handleSubmit} className="space-y-10 animate-in fade-in duration-700">
      {/* 聯絡資料 */}
      <section className="space-y-6">
        <div className="flex items-center space-x-2 pb-2 border-b border-blue-50">
          <User className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-slate-900">聯絡資料</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">您的稱呼 (必填)</label>
            <input
              required
              type="text"
              placeholder="例如：王小姐"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all text-slate-900"
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
              className={`w-full px-4 py-3 rounded-xl border bg-slate-100 ${errors.phone ? 'border-red-500 focus:ring-red-100' : 'border-slate-200 focus:ring-blue-600'} outline-none transition-all text-slate-900`}
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
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all text-slate-900"
              value={formData.altContact}
              onChange={e => setFormData({...formData, altContact: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">第二聯絡人電話 (如有)</label>
            <input
              type="tel"
              placeholder="選填"
              className={`w-full px-4 py-3 rounded-xl border bg-slate-100 ${errors.altPhone ? 'border-red-500' : 'border-slate-200'} focus:ring-2 focus:ring-blue-600 outline-none transition-all text-slate-900`}
              value={formData.altPhone}
              onChange={e => handlePhoneChange('altPhone', e.target.value)}
            />
             {errors.altPhone && <p className="text-xs text-red-500 font-medium">{errors.altPhone}</p>}
          </div>
        </div>
      </section>

      {/* 地點資料 */}
      <section className="space-y-6">
        <div className="flex items-center space-x-2 pb-2 border-b border-blue-50">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-slate-900">服務地址</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">大區</label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all text-slate-900"
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
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">詳細地址</label>
          <textarea
            required
            rows={2}
            placeholder="街道、屋苑、座數、單位"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none text-slate-900"
            value={formData.address}
            onChange={e => setFormData({...formData, address: e.target.value})}
          />
        </div>
      </section>

      {/* 服務選擇 */}
      <section className="space-y-6">
        <div className="flex items-center space-x-2 pb-2 border-b border-blue-50">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-slate-900">清潔服務項目</h3>
        </div>
        
        <div className="space-y-4">
          <label className="text-sm font-semibold text-slate-700">主要服務內容</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CLEANING_SERVICES.map(s => (
              <button
                key={s}
                type="button"
                onClick={() => setFormData({...formData, mainService: s, addServices: []})} // 切換主服務時重置追加服務
                className={`p-3 text-sm border rounded-xl transition-all font-medium ${
                  formData.mainService === s 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg transform scale-[1.03]' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {availableAddServices.length > 0 && (
          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-700 flex items-center">
              <PlusCircle className="w-4 h-4 mr-2 text-blue-500" /> 推薦追加服務
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableAddServices.map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggleAddService(s.id)}
                  className={`p-4 text-left border rounded-2xl transition-all flex items-center justify-between group ${
                    formData.addServices.includes(s.id) 
                      ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' 
                      : 'bg-white border-slate-200 hover:border-blue-200'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className={`text-sm font-bold ${formData.addServices.includes(s.id) ? 'text-blue-700' : 'text-slate-700'}`}>{s.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{s.description}</span>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                    formData.addServices.includes(s.id) ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-100'
                  }`}>
                    {formData.addServices.includes(s.id) ? '✓' : '+'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 數量選擇 */}
        {(formData.addServices.includes('carpet') || formData.addServices.includes('mattress') || formData.addServices.includes('curtain')) && (
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4">
            {formData.addServices.includes('carpet') && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">地毯數目</label>
                <select className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-100 text-slate-900" value={formData.carpetCount} onChange={e => setFormData({...formData, carpetCount: e.target.value})}>
                  {QUANTITY_OPTIONS.map(o => <option key={o} value={o} className="text-slate-900">{o === '5個/張或以上' ? '5張或以上' : (o === 'N/A' ? 'N/A' : `${o}張`)}</option>)}
                </select>
              </div>
            )}
            {formData.addServices.includes('mattress') && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">床褥數目</label>
                <select className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-100 text-slate-900" value={formData.mattressCount} onChange={e => setFormData({...formData, mattressCount: e.target.value})}>
                  {QUANTITY_OPTIONS.map(o => <option key={o} value={o} className="text-slate-900">{o === '5個/張或以上' ? '5張或以上' : (o === 'N/A' ? 'N/A' : `${o}張`)}</option>)}
                </select>
              </div>
            )}
            {formData.addServices.includes('curtain') && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">窗簾/布藝數目</label>
                <select className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-100 text-slate-900" value={formData.curtainCount} onChange={e => setFormData({...formData, curtainCount: e.target.value})}>
                  {QUANTITY_OPTIONS.map(o => <option key={o} value={o} className="text-slate-900">{o === '5個/張或以上' ? '5塊或以上' : (o === 'N/A' ? 'N/A' : `${o}塊`)}</option>)}
                </select>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {showSqFt && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">單位尺數 (平方尺)</label>
              <select
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all text-slate-900"
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
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none text-slate-900"
              placeholder="有其他特定清潔要求？"
              value={formData.remarks}
              onChange={e => setFormData({...formData, remarks: e.target.value})}
            />
          </div>
        </div>
      </section>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            <span>提交中...</span>
          </>
        ) : (
          <span>確認預約</span>
        )}
      </button>
    </form>
  );
};
