
import React, { useState, useEffect } from 'react';
import { PestControlForm } from './components/PestControlForm';
import { CleaningForm } from './components/CleaningForm';
import { ResultsPage } from './components/ResultsPage';
import { ServiceType, PestControlBooking, CleaningBooking, BookingResponse, ScheduleRecommendation } from './types';
import { ShieldCheck, Lock, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { submitBooking } from './services/api';

const App: React.FC = () => {
  // Get initial service from URL parameter, default to 'pest'
  const getInitialService = (): ServiceType => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');
    if (serviceParam === 'pest') {
      return 'pest';
    }
    if (serviceParam === 'clean' || serviceParam === 'cleaning') {
      return 'cleaning';
    }
    return 'pest';
  };

  const [activeService, setActiveService] = useState<ServiceType>(getInitialService());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<BookingResponse | null>(null);
  const [pestLogoError, setPestLogoError] = useState(false);
  const [cleaningLogoError, setCleaningLogoError] = useState(false);

  // 定義 Logo 路徑
  const PEST_LOGO = "pest_killer_logo.png";
  const CLEANING_LOGO = "cleaning_lab_logo.png";

  const handlePestSubmit = async (data: PestControlBooking) => {
    setIsLoading(true);
    setError(null);

    const result = await submitBooking({ serviceType: 'pest', data });

    setIsLoading(false);
    setResponse(result);

    if (result.success) {
      setIsSubmitted(true);
    } else {
      setError(result.message);
    }
  };

  const handleCleaningSubmit = async (data: CleaningBooking) => {
    setIsLoading(true);
    setError(null);

    const result = await submitBooking({ serviceType: 'cleaning', data });

    setIsLoading(false);
    setResponse(result);

    if (result.success) {
      setIsSubmitted(true);
    } else {
      setError(result.message);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setError(null);
    setResponse(null);
  };

  const handleSelectSlot = (recommendation: ScheduleRecommendation) => {
    console.log('[App] Selected slot:', recommendation);
    alert(`已選擇時段：\n${recommendation.staff}\n${recommendation.date} ${recommendation.startTime}-${recommendation.endTime}`);
  };

  // Update URL when service changes
  const handleServiceChange = (service: ServiceType) => {
    setActiveService(service);
    // Update URL without page reload (use 'clean' instead of 'cleaning' in URL)
    const url = new URL(window.location.href);
    const urlService = service === 'cleaning' ? 'clean' : service;
    url.searchParams.set('service', urlService);
    window.history.pushState({}, '', url.toString());
  };

  // Listen for URL changes (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const newService = getInitialService();
      setActiveService(newService);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (isSubmitted && response?.data) {
    return (
      <ResultsPage
        data={response.data}
        serviceType={activeService}
        onBack={handleReset}
        onSelectSlot={handleSelectSlot}
      />
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${activeService === 'pest' ? 'bg-zinc-100' : 'bg-slate-50'}`}>
      {/* 品牌導航切換 */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-24 flex items-center justify-between">
          <div className="flex items-center">
             {/* 左上角 Logo 容器 */}
             <div className="h-16 flex items-center overflow-hidden">
                {activeService === 'pest' ? (
                  pestLogoError ? (
                    <span className="text-xl font-black text-zinc-900">滅蟲職人 PEST KILLER</span>
                  ) : (
                    <img 
                      src={PEST_LOGO} 
                      alt="滅蟲職人 Pest Killer" 
                      className="h-14 w-auto object-contain transition-all duration-300"
                      onError={() => setPestLogoError(true)}
                    />
                  )
                ) : (
                  cleaningLogoError ? (
                    <span className="text-xl font-bold text-blue-600">匠人潔淨社 CLEANING LAB</span>
                  ) : (
                    <img 
                      src={CLEANING_LOGO} 
                      alt="匠人潔淨社 Cleaning Lab" 
                      className="h-14 w-auto object-contain transition-all duration-300"
                      onError={() => setCleaningLogoError(true)}
                    />
                  )
                )}
             </div>
          </div>
          
          <nav className="flex p-1 bg-slate-100 rounded-xl text-xs font-bold shadow-inner">
            <button
              onClick={() => handleServiceChange('pest')}
              className={`px-4 py-2 rounded-lg transition-all ${activeService === 'pest' ? 'bg-zinc-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              滅蟲服務
            </button>
            <button
              onClick={() => handleServiceChange('cleaning')}
              className={`px-4 py-2 rounded-lg transition-all ${activeService === 'cleaning' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              清潔服務
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`pt-16 pb-24 text-center ${activeService === 'pest' ? 'bg-zinc-900 text-white' : 'bg-white text-slate-900 border-b border-slate-100'}`}>
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight animate-in slide-in-from-top duration-700">
            {activeService === 'pest' ? '滅蟲職人線上快速預約' : '匠人潔淨社線上快速預約'}
          </h1>
          <p className={`${activeService === 'pest' ? 'text-zinc-400' : 'text-slate-500'} text-lg max-w-xl mx-auto animate-in fade-in duration-1000`}>
            {activeService === 'pest' 
              ? '專業職人精神，為您打造無蟲煩惱的純淨空間' 
              : '匠心獨運，細緻入微，還原家居最初的潔淨本質'}
          </p>
        </div>
      </section>

      {/* Form Container */}
      <main className="max-w-4xl mx-auto px-4 -mt-12 pb-20">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 relative">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className={`w-12 h-12 animate-spin ${activeService === 'pest' ? 'text-zinc-900' : 'text-blue-600'}`} />
                <p className="text-slate-600 font-medium">正在提交預約...</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mx-8 mt-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-700 font-medium">提交失敗</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          )}

          <div className="p-8 md:p-12">
            {activeService === 'pest' ? (
              <PestControlForm onSubmit={handlePestSubmit} isLoading={isLoading} />
            ) : (
              <CleaningForm onSubmit={handleCleaningSubmit} isLoading={isLoading} />
            )}
          </div>
        </div>

        {/* 隱私保護底部資訊 */}
        <div className="mt-12 max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-100">
            <Lock className="w-4 h-4 mr-2" />
            您的個人資料已受到 256-bit 加密保護
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start space-x-3 text-slate-400 text-xs leading-relaxed">
              <ShieldCheck className="w-5 h-5 flex-shrink-0 text-slate-300" />
              <p>我們嚴格遵守《個人資料（私隱）條例》，所有提交的資訊僅用於本次服務預約確認，絕不向第三方透露或作營銷用途。</p>
            </div>
            <div className="flex items-start space-x-3 text-slate-400 text-xs leading-relaxed">
              <EyeOff className="w-5 h-5 flex-shrink-0 text-slate-300" />
              <p>技術員在服務過程中僅記錄必要的環境數據以優化施工效果，您的居家隱私是我們的首要考量。</p>
            </div>
          </div>
          <p className="pt-8 text-slate-300 text-[10px] uppercase tracking-widest">
            Privacy First • Secure Data • Expert Service
          </p>
        </div>
      </main>
    </div>
  );
};

export default App;
