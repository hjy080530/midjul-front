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

      html,
      body {
        font-family: ${theme.typography.fontFamily.sans};
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