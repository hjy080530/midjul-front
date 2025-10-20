'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { useDropzone } from 'react-dropzone';
import { processPDF } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const DropzoneContainer = styled.div<{ isDragActive: boolean }>`
  width: 100%;
  max-width: 1000px;
  min-height: 400px;
  border: 2px dashed ${({ isDragActive }) =>
    isDragActive ? theme.colors.secondary : theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  background: ${({ isDragActive }) =>
    isDragActive ? theme.colors.background : theme.colors.surface};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.xxl};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${theme.colors.secondary};
    background: ${theme.colors.background};
  }
`;

const Text = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.secondary};
  text-align: center;
`;

const SubText = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.light};
`;

const FileName = styled.div`
  margin-top: ${theme.spacing.md};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.primary};
`;

export default function PDFUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onDrop = async (acceptedFiles: File[]) => {
        const pdfFile = acceptedFiles[0];
        if (!pdfFile) return;

        setFile(pdfFile);
        setLoading(true);

        try {
            const result = await processPDF(pdfFile);
            toast.success('PDF 처리 완료!');
            router.push(`/result/${result.id}`);
        } catch (error) {
            toast.error('PDF 처리 실패');
            console.error(error);
            setFile(null);
        } finally {
            setLoading(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
        },
        maxFiles: 1,
        disabled: loading,
    });

    return (
        <div>
            <DropzoneContainer {...getRootProps()} isDragActive={isDragActive}>
                <input {...getInputProps()} />
                {loading ? (
                    <Text>처리 중...</Text>
                ) : isDragActive ? (
                    <Text>여기에 놓아주세요</Text>
                ) : (
                    <>
                        <Text>PDF 파일을 드래그하거나 클릭하여 선택하세요</Text>
                        <SubText>최대 10MB</SubText>
                    </>
                )}
            </DropzoneContainer>
            {file && !loading && <FileName>📎 {file.name}</FileName>}
        </div>
    );
}