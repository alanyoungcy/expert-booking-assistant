import { PestControlBooking, CleaningBooking, BookingResponse } from '../types';

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://pestkiller.app.n8n.cloud/webhook-test/booking-assistant';

export interface SubmitBookingParams {
  serviceType: 'pest' | 'cleaning';
  data: PestControlBooking | CleaningBooking;
}

export async function submitBooking({ serviceType, data }: SubmitBookingParams): Promise<BookingResponse> {
  const payload = {
    serviceType,
    timestamp: new Date().toISOString(),
    ...data,
  };

  console.log('[API] Submitting booking to n8n:', payload);

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[API] Server error:', response.status, errorText);
      throw new Error(`Server error: ${response.status}`);
    }

    const result = await response.json();
    console.log('[API] Response from n8n:', result);

    return {
      success: true,
      message: result.message || '預約已成功提交',
      data: result,
    };
  } catch (error) {
    console.error('[API] Request failed:', error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        success: false,
        message: '網絡連接失敗，請檢查您的網絡連接',
        error: 'NETWORK_ERROR',
      };
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : '提交失敗，請稍後重試',
      error: 'SUBMISSION_ERROR',
    };
  }
}
