import React from 'react';
import { BookingResultData, ScheduleRecommendation, ServiceType } from '../types';
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  FileText,
  Star,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Award,
  TrendingUp,
  Info,
  XCircle,
  AlertTriangle
} from 'lucide-react';

interface Props {
  data: BookingResultData;
  serviceType: ServiceType;
  onBack: () => void;
  onSelectSlot?: (recommendation: ScheduleRecommendation) => void;
}

export const ResultsPage: React.FC<Props> = ({ data, serviceType, onBack, onSelectSlot }) => {
  const allRecommendations = data.recommendations || [];
  const meta = data.meta;

  // Filter out recommendations with skill mismatch - they cannot do the job
  const validRecommendations = allRecommendations.filter(
    rec => !rec.constraints?.skillNoMatch
  );
  const skippedRecommendations = allRecommendations.filter(
    rec => rec.constraints?.skillNoMatch
  );

  const hasValidRecommendations = validRecommendations.length > 0;
  const hasSkippedRecommendations = skippedRecommendations.length > 0;

  const isPest = serviceType === 'pest';

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = weekdays[date.getDay()];
    return `${month}月${day}日 (${weekday})`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 120) return 'text-green-600 bg-green-50';
    if (score >= 100) return 'text-blue-600 bg-blue-50';
    if (score >= 80) return 'text-amber-600 bg-amber-50';
    if (score >= 0) return 'text-gray-600 bg-gray-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 120) return '極佳';
    if (score >= 100) return '良好';
    if (score >= 80) return '可行';
    if (score >= 0) return '一般';
    return '不適合';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className={`${isPest ? 'bg-zinc-900' : 'bg-blue-600'} text-white py-6`}>
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回預約表單</span>
          </button>
          <h1 className="text-2xl font-bold flex items-center space-x-3">
            <CheckCircle2 className="w-8 h-8" />
            <span>預約提交成功</span>
          </h1>
          <p className="text-white/80 mt-2">
            {hasValidRecommendations
              ? `系統已為您找到 ${validRecommendations.length} 個推薦時段`
              : hasSkippedRecommendations
              ? '目前沒有符合技能的職員可供預約，我們將盡快與您聯繫'
              : '預約已成功提交，我們將盡快與您聯繫'}
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Booking Summary Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className={`${isPest ? 'bg-zinc-800' : 'bg-blue-500'} text-white px-6 py-4`}>
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>預約摘要</span>
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.品牌 && (
                <div className="flex items-start space-x-3">
                  <Award className={`w-5 h-5 ${isPest ? 'text-zinc-500' : 'text-blue-500'} mt-0.5`} />
                  <div>
                    <p className="text-sm text-slate-500">品牌</p>
                    <p className="font-medium text-slate-800">{data.品牌}</p>
                  </div>
                </div>
              )}
              {data.服務 && (
                <div className="flex items-start space-x-3">
                  <Star className={`w-5 h-5 ${isPest ? 'text-zinc-500' : 'text-blue-500'} mt-0.5`} />
                  <div>
                    <p className="text-sm text-slate-500">服務類型</p>
                    <p className="font-medium text-slate-800">{data.服務}</p>
                  </div>
                </div>
              )}
              {data.客戶名稱 && (
                <div className="flex items-start space-x-3">
                  <User className={`w-5 h-5 ${isPest ? 'text-zinc-500' : 'text-blue-500'} mt-0.5`} />
                  <div>
                    <p className="text-sm text-slate-500">客戶名稱</p>
                    <p className="font-medium text-slate-800">{data.客戶名稱}</p>
                  </div>
                </div>
              )}
              {data.聯絡電話 && (
                <div className="flex items-start space-x-3">
                  <Phone className={`w-5 h-5 ${isPest ? 'text-zinc-500' : 'text-blue-500'} mt-0.5`} />
                  <div>
                    <p className="text-sm text-slate-500">聯絡電話</p>
                    <p className="font-medium text-slate-800">{data.聯絡電話}</p>
                  </div>
                </div>
              )}
              {data.地區 && (
                <div className="flex items-start space-x-3">
                  <MapPin className={`w-5 h-5 ${isPest ? 'text-zinc-500' : 'text-blue-500'} mt-0.5`} />
                  <div>
                    <p className="text-sm text-slate-500">服務地區</p>
                    <p className="font-medium text-slate-800">{data.地區}</p>
                  </div>
                </div>
              )}
              {data.詳細地址 && (
                <div className="flex items-start space-x-3 md:col-span-2">
                  <MapPin className={`w-5 h-5 ${isPest ? 'text-zinc-500' : 'text-blue-500'} mt-0.5`} />
                  <div>
                    <p className="text-sm text-slate-500">詳細地址</p>
                    <p className="font-medium text-slate-800">{data.詳細地址}</p>
                  </div>
                </div>
              )}
              {data.單位尺數 && (
                <div className="flex items-start space-x-3">
                  <TrendingUp className={`w-5 h-5 ${isPest ? 'text-zinc-500' : 'text-blue-500'} mt-0.5`} />
                  <div>
                    <p className="text-sm text-slate-500">單位面積</p>
                    <p className="font-medium text-slate-800">{data.單位尺數} 平方尺</p>
                  </div>
                </div>
              )}
              {data.提交日期 && data.提交時間 && (
                <div className="flex items-start space-x-3">
                  <Clock className={`w-5 h-5 ${isPest ? 'text-zinc-500' : 'text-blue-500'} mt-0.5`} />
                  <div>
                    <p className="text-sm text-slate-500">提交時間</p>
                    <p className="font-medium text-slate-800">{data.提交日期} {data.提交時間}</p>
                  </div>
                </div>
              )}
              {data.備註 && (
                <div className="flex items-start space-x-3 md:col-span-2">
                  <FileText className={`w-5 h-5 ${isPest ? 'text-zinc-500' : 'text-blue-500'} mt-0.5`} />
                  <div>
                    <p className="text-sm text-slate-500">備註</p>
                    <p className="font-medium text-slate-800">{data.備註}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Skill Mismatch Warning */}
        {hasSkippedRecommendations && !hasValidRecommendations && (
          <div className="bg-red-50 rounded-2xl shadow-lg border border-red-200 overflow-hidden">
            <div className="bg-red-500 text-white px-6 py-4">
              <h2 className="text-lg font-semibold flex items-center space-x-2">
                <XCircle className="w-5 h-5" />
                <span>沒有合適的職員</span>
              </h2>
            </div>
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <p className="text-red-800 font-medium mb-2">
                    目前沒有具備相關技能的職員可以處理此服務
                  </p>
                  <p className="text-red-600 text-sm mb-4">
                    系統已記錄您的預約，我們的客服團隊將會盡快與您聯繫，為您安排合適的服務時間。
                  </p>
                  <div className="bg-red-100 rounded-lg p-3 text-sm text-red-700">
                    <p className="font-medium mb-1">已過濾 {skippedRecommendations.length} 個不符合技能的時段：</p>
                    <ul className="list-disc list-inside space-y-1">
                      {skippedRecommendations.slice(0, 3).map((rec, idx) => (
                        <li key={idx}>{rec.staff} - 技能不匹配</li>
                      ))}
                      {skippedRecommendations.length > 3 && (
                        <li>...還有 {skippedRecommendations.length - 3} 個</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {hasValidRecommendations ? (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className={`${isPest ? 'bg-amber-500' : 'bg-sky-500'} text-white px-6 py-4`}>
              <h2 className="text-lg font-semibold flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>推薦時段</span>
              </h2>
              {meta && (
                <p className="text-white/80 text-sm mt-1">
                  從 {meta.totalOptionsEvaluated || allRecommendations.length} 個可用時段中精選
                  {hasSkippedRecommendations && ` (已過濾 ${skippedRecommendations.length} 個技能不符)`}
                </p>
              )}
            </div>
            <div className="divide-y divide-slate-100">
              {validRecommendations.map((rec, index) => (
                <div
                  key={index}
                  className={`p-6 hover:bg-slate-50 transition-colors ${
                    index === 0 ? 'bg-gradient-to-r from-amber-50/50 to-transparent' : ''
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      {/* Rank Badge */}
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                          index === 0
                            ? `${isPest ? 'bg-amber-500' : 'bg-sky-500'} text-white`
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        #{rec.rank || index + 1}
                      </div>

                      <div className="flex-1">
                        {/* Staff & Date */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="font-semibold text-slate-800 text-lg">{rec.staff}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getScoreColor(rec.qualityScore)}`}>
                            {getScoreLabel(rec.qualityScore)} ({rec.qualityScore}分)
                          </span>
                        </div>

                        {/* Date & Time */}
                        <div className="flex items-center space-x-4 text-slate-600">
                          <div className="flex items-center space-x-1.5">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(rec.date)}</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <Clock className="w-4 h-4" />
                            <span>{rec.startTime} - {rec.endTime}</span>
                          </div>
                        </div>

                        {/* Reasons */}
                        {rec.reasons && rec.reasons.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {rec.reasons.map((reason, rIdx) => (
                              <span
                                key={rIdx}
                                className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs"
                              >
                                <Info className="w-3 h-3 mr-1" />
                                {reason}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Select Button */}
                    {onSelectSlot && (
                      <button
                        onClick={() => onSelectSlot(rec)}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                          isPest
                            ? 'bg-zinc-900 hover:bg-black text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        選擇此時段
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Meta Info */}
            {meta?.disclaimer && (
              <div className="px-6 py-4 bg-amber-50 border-t border-amber-100">
                <p className="text-amber-700 text-sm flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{meta.disclaimer}</span>
                </p>
              </div>
            )}
          </div>
        ) : (
          /* No Recommendations */
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
            <div className={`w-16 h-16 mx-auto rounded-full ${isPest ? 'bg-zinc-100' : 'bg-blue-100'} flex items-center justify-center mb-4`}>
              <Clock className={`w-8 h-8 ${isPest ? 'text-zinc-500' : 'text-blue-500'}`} />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">預約已提交</h3>
            <p className="text-slate-600 mb-6">
              我們的團隊將根據您的需求安排最合適的服務時間，並盡快與您聯繫確認。
            </p>
            <div className="inline-flex items-center space-x-2 text-sm text-slate-500 bg-slate-100 px-4 py-2 rounded-full">
              <Phone className="w-4 h-4" />
              <span>預計在 24 小時內回覆</span>
            </div>
          </div>
        )}

        {/* Raw Data (for debugging) */}
        <details className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <summary className="px-6 py-4 cursor-pointer hover:bg-slate-50 transition-colors text-slate-600 font-medium">
            查看完整回應數據 (開發用)
          </summary>
          <div className="px-6 py-4 bg-slate-900 overflow-x-auto">
            <pre className="text-green-400 text-xs font-mono whitespace-pre-wrap">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </details>

        {/* Back Button */}
        <div className="text-center pt-4">
          <button
            onClick={onBack}
            className={`px-8 py-4 rounded-xl font-semibold transition-all ${
              isPest
                ? 'bg-zinc-900 hover:bg-black text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            返回預約表單
          </button>
        </div>
      </main>
    </div>
  );
};
