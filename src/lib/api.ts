import axios from 'axios';
import { supabase } from './supabase';
import { ProcessResponse, DocumentListItem } from './types';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

// Axios 인스턴스
const api = axios.create({
    baseURL: API_URL,
});

// 요청 인터셉터: 토큰 자동 추가 (개선)
api.interceptors.request.use(
    async (config) => {
        try {
            const { data: { session } } = await supabase.auth.getSession();

            console.log('🔐 세션 확인:', session ? '있음' : '없음');

            if (session?.access_token) {
                config.headers.Authorization = `Bearer ${session.access_token}`;
                console.log('✅ 토큰 추가됨');
            } else {
                console.warn('⚠️ 세션 없음 - 토큰 없이 요청');
            }
        } catch (error) {
            console.error('❌ 토큰 가져오기 실패:', error);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터: 401 에러 처리
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            console.error('❌ 401 Unauthorized - 로그인 페이지로 이동');

            // 로그인 페이지로 리다이렉트
            if (typeof window !== 'undefined') {
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

// 텍스트 처리
export const processText = async (text: string): Promise<ProcessResponse> => {
    const formData = new FormData();
    formData.append('text', text);

    const response = await api.post('/process/text', formData);
    return response.data;
};

// PDF 처리
export const processPDF = async (file: File): Promise<ProcessResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/process/pdf', formData);
    return response.data;
};

// 문서 목록 조회
export const getDocuments = async (limit = 20, offset = 0): Promise<DocumentListItem[]> => {
    const response = await api.get('/process/documents', {
        params: { limit, offset },
    });
    return response.data;
};

// 문서 상세 조회
export const getDocument = async (id: string): Promise<ProcessResponse> => {
    const response = await api.get(`/process/documents/${id}`);
    return response.data;
};

// 문서 삭제
export const deleteDocument = async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/process/documents/${id}`);
    return response.data;
};

export default api;