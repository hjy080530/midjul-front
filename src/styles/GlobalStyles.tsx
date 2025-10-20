'use client';

import { Global, css } from '@emotion/react';
import { theme } from './theme';

export const GlobalStyles = () => (
    <Global
        styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
            @font-face {
                font-family: 'ChosunGu';
                src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@1.0/ChosunGu.woff') format('woff');
                font-weight: normal;
                font-style: normal;
                font-display: swap;
            }

      html,
      body {
        font-family: ${theme.typography.fontFamily.joseon};
        font-size: ${theme.typography.fontSize.md};
        color: ${theme.colors.text.primary};
        background-color: ${theme.colors.background};
        line-height: 1.6;
      }

      button {
        font-family: inherit;
        cursor: pointer;
        border: none;
        background: none;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      input,
      textarea {
        font-family: inherit;
      }

      ::selection {
        background-color: ${theme.colors.highlight.high};
        color: ${theme.colors.text.primary};
      }
    `}
    />
);