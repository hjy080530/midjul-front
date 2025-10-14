'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { motion } from 'framer-motion';

const TooltipContainer = styled(motion.div)<{ x: number; y: number }>`
  position: fixed;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  transform: translate(-50%, -100%);
  background: ${theme.colors.text.primary};
  color: white;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.sm};
  max-width: 300px;
  box-shadow: ${theme.shadows.xl};
  z-index: 1000;
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: ${theme.colors.text.primary};
  }
`;

const Word = styled.div`
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing.xs};
`;

interface Props {
    word: string;
    definition: string;
    x: number;
    y: number;
}

export default function Tooltip({ word, definition, x, y }: Props) {
    return (
        <TooltipContainer
            x={x}
            y={y}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <Word>{word}</Word>
            <div>{definition}</div>
        </TooltipContainer>
    );
}