
export type ServiceType = 'pest' | 'cleaning';

export interface LocationOption {
  region: string;
  subDistricts: string[];
}

export interface PestControlBooking {
  name: string;
  phone: string;
  altContact: string;
  altPhone: string;
  region: string;
  subDistrict: string;
  address: string;
  service: string;
  roomCount: string;
  mattressCount: string;
  sqFt: string;
  remarks: string;
}

export interface CleaningBooking {
  name: string;
  phone: string;
  altContact: string;
  altPhone: string;
  region: string;
  subDistrict: string;
  address: string;
  mainService: string;
  addServices: string[];
  carpetCount: string;
  mattressCount: string;
  curtainCount: string;
  sqFt: string;
  remarks: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  data?: BookingResultData;
  error?: string;
}

export interface BookingResultData {
  recommendations?: ScheduleRecommendation[];
  meta?: {
    totalOptionsEvaluated?: number;
    requiresHumanConfirmation?: boolean;
    disclaimer?: string;
  };
  status?: string;
  // Original submission data echoed back
  服務類型?: string;
  品牌?: string;
  服務?: string;
  地區?: string;
  客戶名稱?: string;
  聯絡電話?: string;
  詳細地址?: string;
  單位尺數?: number;
  備註?: string;
  提交日期?: string;
  提交時間?: string;
}

export interface ScheduleRecommendation {
  rank: number;
  staff: string;
  date: string;
  startTime: string;
  endTime: string;
  qualityScore: number;
  reasons: string[];
  constraints?: {
    skillNoMatch?: boolean;
    isFirstJob?: boolean;
    isLastJob?: boolean;
    firstJobDelayed?: boolean;
    hasNoJobsToday?: boolean;
    [key: string]: any;
  };
}
