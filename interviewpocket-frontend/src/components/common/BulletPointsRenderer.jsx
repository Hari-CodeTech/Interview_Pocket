import React, { useState } from 'react';
import { FiCopy, FiCheck, FiChevronRight } from 'react-icons/fi';

/**
 * Parses inline formatting like **bold text** and `inline code`.
 */
export const formatInlineText = (text) => {
  if (!text) return text;

  // Split by code blocks or bold tags
  const tokens = [];
  const regex = /(\*\*.*?\*\*|`.*?`)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(text.substring(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      tokens.push(
        <strong key={match.index} className="fw-bold" style={{ color: 'var(--text-primary)' }}>
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      tokens.push(
        <code
          key={match.index}
          className="font-monospace px-1.5 py-0.5 rounded mx-0.5 border"
          style={{
            backgroundColor: 'rgba(0, 98, 255, 0.08)',
            color: '#0062ff',
            fontSize: '0.88em',
            borderColor: 'rgba(0, 98, 255, 0.2)'
          }}
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push(text.substring(lastIndex));
  }

  return tokens.length > 0 ? tokens : text;
};

/**
 * Renders structured technical content with prominent, styled bullet points.
 * Ensures points are not displayed as dense paragraphs, but as clean, readable bullet items.
 */
export default function BulletPointsRenderer({ content, bulletColor = '#0062ff' }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!content) return null;

  const handleCopy = (codeText, idx) => {
    navigator.clipboard.writeText(codeText);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Split into code blocks vs text parts
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="bullet-content-wrapper" style={{ lineHeight: 1.7, fontSize: '0.96rem', color: 'var(--text-primary)' }}>
      {parts.map((part, index) => {
        // 1. Code Blocks
        if (part.startsWith('```')) {
          const lines = part.slice(3, -3).trim().split('\n');
          const lang = lines[0].trim().toLowerCase();
          const code = (lang === 'java' || lang === 'sql' || lang === 'bash') ? lines.slice(1).join('\n') : lines.join('\n');

          return (
            <div key={index} className="my-3 rounded-4 overflow-hidden border shadow-sm" style={{ backgroundColor: '#0f172a' }}>
              <div
                className="d-flex align-items-center justify-content-between px-3 py-2 border-bottom border-secondary border-opacity-25"
                style={{ backgroundColor: '#1e293b' }}
              >
                <span className="small font-monospace text-info fw-semibold text-uppercase" style={{ fontSize: '0.75rem' }}>
                  {lang || 'JAVA'}
                </span>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-light border-0 py-1 px-2 d-flex align-items-center gap-1 small"
                  style={{ fontSize: '0.75rem' }}
                  onClick={() => handleCopy(code, index)}
                >
                  {copiedIndex === index ? (
                    <>
                      <FiCheck className="text-success" />
                      <span className="text-success">Copied!</span>
                    </>
                  ) : (
                    <>
                      <FiCopy />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3 mb-0 font-monospace text-white overflow-x-auto" style={{ fontSize: '0.88rem', tabSize: 4 }}>
                <code>{code}</code>
              </pre>
            </div>
          );
        }

        // 2. Markdown Tables
        if (part.includes('|') && part.includes('---')) {
          const tableLines = part.trim().split('\n').filter(l => l.trim().startsWith('|'));
          if (tableLines.length >= 2) {
            const headers = tableLines[0].split('|').map(c => c.trim()).filter(Boolean);
            const dataRows = tableLines.slice(2).map(r => r.split('|').map(c => c.trim()).filter(Boolean));

            return (
              <div key={index} className="table-responsive my-3 rounded-3 border shadow-sm">
                <table className="table table-hover mb-0 align-middle">
                  <thead style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <tr>
                      {headers.map((h, hIdx) => (
                        <th key={hIdx} className="fw-bold small py-2 px-3" style={{ color: 'var(--text-primary)' }}>
                          {formatInlineText(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dataRows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="small py-2 px-3" style={{ color: 'var(--text-secondary)' }}>
                            {formatInlineText(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
        }

        // 3. Text Paragraphs & Bullet Points
        const blocks = part.split(/\n\s*\n/);

        return (
          <div key={index} className="d-flex flex-column gap-2.5">
            {blocks.map((block, bIdx) => {
              const trimmed = block.trim();
              if (!trimmed) return null;

              // Check for Headings
              if (trimmed.startsWith('### ')) {
                return (
                  <h4 key={bIdx} className="fw-bold mt-3 mb-1" style={{ color: 'var(--text-primary)', fontSize: '1.18rem' }}>
                    {trimmed.replace('### ', '')}
                  </h4>
                );
              }
              if (trimmed.startsWith('#### ')) {
                return (
                  <h5 key={bIdx} className="fw-bold mt-2 mb-1" style={{ color: 'var(--text-primary)', fontSize: '1.02rem' }}>
                    {trimmed.replace('#### ', '')}
                  </h5>
                );
              }

              // Check for Blockquotes / Callouts
              if (trimmed.startsWith('> ')) {
                return (
                  <div
                    key={bIdx}
                    className="p-3 my-2 rounded-3 border-start border-4"
                    style={{
                      backgroundColor: 'rgba(0, 98, 255, 0.06)',
                      borderColor: '#0062ff',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {formatInlineText(trimmed.replace(/^> /gm, ''))}
                  </div>
                );
              }

              // Split lines within this block to find bullet points
              const lines = trimmed.split('\n');
              const hasBullets = lines.some(l => l.trim().match(/^([-*•]|\d+\.)\s+/));

              if (hasBullets) {
                return (
                  <div key={bIdx} className="d-flex flex-column gap-2 my-1">
                    {lines.map((line, lIdx) => {
                      const trimmedLine = line.trim();
                      if (!trimmedLine) return null;

                      const bulletMatch = trimmedLine.match(/^([-*•]|\d+\.)\s+(.*)/);
                      if (bulletMatch) {
                        const marker = bulletMatch[1];
                        const text = bulletMatch[2];
                        const isNumber = /^\d+\./.test(marker);

                        return (
                          <div key={lIdx} className="d-flex align-items-start gap-2.5 ps-1">
                            {isNumber ? (
                              <span
                                className="badge rounded-pill mt-1 flex-shrink-0"
                                style={{
                                  backgroundColor: 'rgba(0, 98, 255, 0.12)',
                                  color: bulletColor,
                                  fontSize: '0.72rem',
                                  minWidth: '22px'
                                }}
                              >
                                {marker}
                              </span>
                            ) : (
                              <span
                                className="d-inline-flex align-items-center justify-content-center mt-1 flex-shrink-0 rounded-circle"
                                style={{
                                  width: '18px',
                                  height: '18px',
                                  backgroundColor: 'rgba(0, 98, 255, 0.12)',
                                  color: bulletColor
                                }}
                              >
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: bulletColor }}></span>
                              </span>
                            )}
                            <div className="flex-grow-1" style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                              {formatInlineText(text)}
                            </div>
                          </div>
                        );
                      }

                      // Ordinary text line preceding or following bullets
                      return (
                        <p key={lIdx} className="mb-1 fw-semibold" style={{ color: 'var(--text-primary)' }}>
                          {formatInlineText(trimmedLine)}
                        </p>
                      );
                    })}
                  </div>
                );
              }

              // Fallback for plain paragraph: check if it contains multiple sentences that should be bulletized
              return (
                <p key={bIdx} className="mb-2" style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  {formatInlineText(trimmed)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

