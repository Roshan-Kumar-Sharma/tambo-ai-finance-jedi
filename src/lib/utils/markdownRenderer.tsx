// lib/utils/markdownRenderer.tsx

import React from 'react';

export function parseMarkdown(text: string): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  let currentIndex = 0;
  let key = 0;

  // Remove ** artifacts and parse markdown
  const cleanText = text.replace(/\*\*/g, '');
  
  // Split by newlines to handle paragraphs
  const lines = cleanText.split('\n');
  
  lines.forEach((line, lineIndex) => {
    if (line.trim() === '') {
      elements.push(<br key={`br-${key++}`} />);
      return;
    }

    // Parse inline markdown in each line
    const parsed = parseInlineMarkdown(line, key);
    elements.push(
      <span key={`line-${lineIndex}`} className="block mb-2">
        {parsed}
      </span>
    );
    key++;
  });

  return elements;
}

function parseInlineMarkdown(text: string, startKey: number): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  let currentPos = 0;
  let key = startKey;

  // Bold pattern: **text** or __text__
  const boldPattern = /(\*\*|__)(.*?)\1/g;
  // Italic pattern: *text* or _text_
  const italicPattern = /(\*|_)(.*?)\1/g;
  // Code pattern: `text`
  const codePattern = /`([^`]+)`/g;
  // Link pattern: [text](url)
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

  // Combined pattern
  const combinedPattern = /(\*\*|__)(.*?)\1|(\*|_)(.*?)\3|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;

  let match;
  while ((match = combinedPattern.exec(text)) !== null) {
    // Add text before match
    if (match.index > currentPos) {
      elements.push(text.substring(currentPos, match.index));
    }

    if (match[2] !== undefined) {
      // Bold
      elements.push(<strong key={`bold-${key++}`}>{match[2]}</strong>);
    } else if (match[4] !== undefined) {
      // Italic
      elements.push(<em key={`italic-${key++}`}>{match[4]}</em>);
    } else if (match[5] !== undefined) {
      // Code
      elements.push(
        <code key={`code-${key++}`} className="px-1.5 py-0.5 bg-slate-700 rounded text-sm">
          {match[5]}
        </code>
      );
    } else if (match[6] !== undefined && match[7] !== undefined) {
      // Link
      elements.push(
        <a
          key={`link-${key++}`}
          href={match[7]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline"
        >
          {match[6]}
        </a>
      );
    }

    currentPos = match.index + match[0].length;
  }

  // Add remaining text
  if (currentPos < text.length) {
    elements.push(text.substring(currentPos));
  }

  return elements.length > 0 ? elements : [text];
}

export function shouldHideContent(content: any): boolean {
  // Hide tool_use blocks and other technical content
  if (typeof content === 'object') {
    if (content.type === 'tool_use' || content.type === 'tool_result') {
      return true;
    }
  }
  return false;
}

export function extractTextContent(content: any): string {
  if (typeof content === 'string') {
    return content;
  }
  
  if (Array.isArray(content)) {
    return content
      .filter(item => item.type === 'text' && !shouldHideContent(item))
      .map(item => item.text)
      .join('\n');
  }
  
  if (content && content.type === 'text') {
    return content.text;
  }
  
  return '';
}