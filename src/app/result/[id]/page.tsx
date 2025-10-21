'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import Header from '@/components/Layout/Header';
import HighlightedText from '@/components/Result/HighlightedText';
import Summary from '@/components/Result/Summary';
import { useEffect, useState } from 'react';
import { getDocument, deleteDocument } from '@/lib/api';
import { ProcessResponse } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { use } from 'react';

const Container = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background};
`;

const Main = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${theme.spacing.xxl};
`;

const TopActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

const BackButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.surface};
  color: ${theme.colors.secondary};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.sm};
  transition: all 0.2s;

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primary};
    color: white;
  }
`;

const DeleteButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.surface};
  color: #dc3545;
  border: 1px solid #dc3545;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.sm};
  transition: all 0.2s;

  &:hover {
    background: #dc3545;
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.text.secondary};
`;

const ProcessingInfo = styled.div`
  background: ${theme.colors.surface};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  text-align: center;
`;

// 모달 스타일
const ModalOverlay = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const ModalTitle = styled.h3`
  margin: 0 0 ${theme.spacing.md};
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.text.primary};
`;

const ModalMessage = styled.p`
  margin: 0 0 ${theme.spacing.xl};
  font-size: ${theme.typography.fontSize.md};
  color: ${theme.colors.text.secondary};
  line-height: 1.5;
`;

const ModalActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  justify-content: flex-end;
`;

const ModalButton = styled.button<{ variant?: 'danger' | 'default' }>`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.md};
  transition: all 0.2s;
  border: none;
  cursor: pointer;

  ${props => props.variant === 'danger' ? `
    background: #dc3545;
    color: white;

    &:hover {
      background: #c82333;
    }
  ` : `
    background: ${theme.colors.surface};
    color: ${theme.colors.text.secondary};
    border: 1px solid ${theme.colors.border};

    &:hover {
      background: ${theme.colors.background};
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function ResultPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [data, setData] = useState<ProcessResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const resolvedParams = use(params);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getDocument(resolvedParams.id);
                setData(result);
            } catch (error) {
                console.error(error);
                router.push('/dashboard');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [resolvedParams.id, router]);

    const handleDeleteClick = () => {
        setIsModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        setIsDeleting(true);
        try {
            await deleteDocument(resolvedParams.id);
            alert('문서가 삭제되었습니다.');
            router.push('/dashboard');
        } catch (error) {
            console.error('삭제 실패:', error);
            alert('문서 삭제에 실패했습니다.');
            setIsDeleting(false);
            setIsModalOpen(false);
        }
    };

    const handleDeleteCancel = () => {
        setIsModalOpen(false);
    };

    if (loading) {
        return (
            <Container>
                <Header />
                <Main>
                    <LoadingContainer>로딩 중...</LoadingContainer>
                </Main>
            </Container>
        );
    }

    if (!data) {
        return null;
    }

    return (
        <Container>
            <Header />
            <Main>
                <TopActions>
                    <BackButton onClick={() => router.push('/dashboard')}>
                        ← 돌아가기
                    </BackButton>
                    <DeleteButton onClick={handleDeleteClick} disabled={isDeleting}>
                        삭제하기
                    </DeleteButton>
                </TopActions>

                <ProcessingInfo>
                    처리 시간: {data.processing_time.toFixed(2)}초 |
                    생성일: {new Date(data.created_at).toLocaleString('ko-KR')}
                </ProcessingInfo>

                <HighlightedText
                    html={data.highlighted_html}
                    difficultWords={data.difficult_words}
                />

                <Summary
                    summary={data.summary}
                    keywords={data.keywords}
                />
            </Main>

            {/* 삭제 확인 모달 */}
            <ModalOverlay isOpen={isModalOpen} onClick={handleDeleteCancel}>
                <ModalContent onClick={(e) => e.stopPropagation()}>
                    <ModalTitle>문서 삭제</ModalTitle>
                    <ModalMessage>
                        정말로 이 문서를 삭제하시겠습니까?<br />
                        삭제된 문서는 복구할 수 없습니다.
                    </ModalMessage>
                    <ModalActions>
                        <ModalButton onClick={handleDeleteCancel} disabled={isDeleting}>
                            취소
                        </ModalButton>
                        <ModalButton
                            variant="danger"
                            onClick={handleDeleteConfirm}
                            disabled={isDeleting}
                        >
                            {isDeleting ? '삭제 중...' : '삭제'}
                        </ModalButton>
                    </ModalActions>
                </ModalContent>
            </ModalOverlay>
        </Container>
    );
}