import { useState, useCallback, useRef } from 'react';
import { projects } from '../content/projects';
import { notes } from '../content/notes';
import { about } from '../content/about';
import { siteConfig } from '../content/siteConfig';

export interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

export function useTerminal(scrollToSection?: (id: string) => void) {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const addOutput = useCallback((content: string) => {
    setHistory(prev => [...prev, { type: 'output', content }]);
  }, []);

  const addError = useCallback((content: string) => {
    setHistory(prev => [...prev, { type: 'error', content }]);
  }, []);

  const executeCommand = useCallback((raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setHistory(prev => [...prev, { type: 'input', content: `harbin@workspace ~ % ${trimmed}` }]);
    setInputHistory(prev => [trimmed, ...prev]);
    setHistoryIndex(-1);

    const [cmd, ...args] = trimmed.toLowerCase().split(/\s+/);

    switch (cmd) {
      case 'help':
        addOutput(
          `Available commands:\n` +
          `  help      — Show this command list\n` +
          `  about     — Display bio & skills\n` +
          `  work      — List projects\n` +
          `  notes     — List recent notes\n` +
          `  contact   — Show contact links\n` +
          `  clear     — Clear terminal\n` +
          `  echo      — Repeat your words`
        );
        break;

      case 'about':
        addOutput(
          `${about.name} — ${about.tagline}\n\n` +
          about.bio.join('\n\n') + '\n\n' +
          about.skills.map(s => `${s.category}: ${s.items.join(', ')}`).join('\n')
        );
        scrollToSection?.('about');
        break;

      case 'work':
      case 'projects':
        addOutput(
          `Projects:\n` +
          projects.map(p => `  [${p.year}] ${p.title} — ${p.category}`).join('\n') +
          `\n\nScroll down or click a project to view details.`
        );
        scrollToSection?.('desktop');
        break;

      case 'notes':
      case 'blog':
        addOutput(
          `Recent notes:\n` +
          notes.map(n => `  [${n.date}] ${n.title}`).join('\n') +
          `\n\nVisit /notes/:slug to read full articles.`
        );
        scrollToSection?.('projects');
        break;

      case 'contact':
        addOutput(
          `Get in touch:\n` +
          `  Email    → ${siteConfig.email}\n` +
          `  GitHub   → ${siteConfig.links.github}\n` +
          `  LinkedIn → ${siteConfig.links.linkedin}\n` +
          `  Twitter  → ${siteConfig.links.twitter}`
        );
        scrollToSection?.('contact');
        break;

      case 'clear':
        setHistory([]);
        break;

      case 'echo':
        addOutput(args.join(' ') || '...');
        break;

      default:
        addError(`command not found: ${cmd}. Type "help" for available commands.`);
    }
  }, [addOutput, addError, scrollToSection]);

  const navigateHistory = useCallback((direction: 'up' | 'down') => {
    if (inputHistory.length === 0) return '';
    let newIndex = historyIndex;
    if (direction === 'up') {
      newIndex = Math.min(historyIndex + 1, inputHistory.length - 1);
    } else {
      newIndex = Math.max(historyIndex - 1, -1);
    }
    setHistoryIndex(newIndex);
    return newIndex >= 0 ? inputHistory[newIndex] : '';
  }, [historyIndex, inputHistory]);

  return { history, executeCommand, navigateHistory, inputRef };
}
