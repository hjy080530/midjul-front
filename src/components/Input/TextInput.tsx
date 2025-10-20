'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { processText } from '@/lib/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const Container = styled.div`
  width: 100%;
  max-width: 800px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 400px;
  padding: ${theme.spacing.xl};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.xl};
  font-size: ${theme.typography.fontSize.md};
  line-height: ${theme.typography.lineHeight.relaxed};
  resize: vertical;
  transition: all 0.3s ease;
  background: ${theme.colors.surface};
  color: ${theme.colors.text.primary};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.accent};
  }
  
  &::placeholder {
    color: ${theme.colors.text.light};
  }
`;

const SubmitButton = styled(motion.button)`
  margin-top: ${theme.spacing.lg};
  padding: ${theme.spacing.lg} ${theme.spacing.xxl};
  background: ${theme.colors.primary};
  color: ${theme.colors.text.white};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  width: 100%;
  box-shadow: ${theme.shadows.md};
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: ${theme.colors.primaryDark};
    box-shadow: ${theme.shadows.lg};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CharCount = styled.div`
  text-align: right;
  margin-top: ${theme.spacing.sm};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.light};
`;

export default function TextInput() {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e?: React.MouseEvent<HTMLButtonElement>) => {
        // 기본 동작 방지
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (!text.trim()) {
            toast.error('텍스트를 입력해주세요');
            return;
        }

        if (text.length < 10) {
            toast.error('최소 10자 이상 입력해주세요');
            return;
        }

        setLoading(true);

        try {
            console.log('📤 텍스트 전송 중...', { length: text.length });
            const result = await processText(text);
            console.log('✅ 분석 완료:', result);

            toast.success('분석 완료!');

            // 결과 페이지로 이동
            router.push(`/result/${result.id}`);
        } catch (error: any) {
            console.error('❌ 분석 실패:', error);
            toast.error(error.response?.data?.detail || '분석 실패');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <TextArea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="분석할 텍스트를 입력하세요..."
                disabled={loading}
                onKeyDown={(e) => {
                    // Ctrl+Enter로 제출
                    if (e.ctrlKey && e.key === 'Enter') {
                        handleSubmit();
                    }
                }}
            />
            <CharCount>{text.length.toLocaleString()}자</CharCount>
            <SubmitButton
                type="button"  // 중요!
                onClick={handleSubmit}
                disabled={loading || text.length < 10}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
            >
                {loading ? '분석 중...' : '분석 시작'}
            </SubmitButton>
        </Container>
    );
}