import { useState } from 'react';
import type { MouseEvent } from 'react';

interface ShareNoteButtonProps {
  slug: string;
  title: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export function ShareNoteButton({ slug, title, onClick, className = '' }: ShareNoteButtonProps) {
  const [message, setMessage] = useState('Share');

  async function share(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onClick?.(event);
    const siteBase = new URL(import.meta.env.BASE_URL, `${window.location.origin}${window.location.pathname}`);
    const url = new URL(`notes/${slug}/`, siteBase);

    try {
      if (navigator.share) {
        await navigator.share({ title, url: url.toString() });
      } else {
        await navigator.clipboard.writeText(url.toString());
        setMessage('Link copied');
        window.setTimeout(() => setMessage('Share'), 2000);
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
      try {
        await navigator.clipboard.writeText(url.toString());
        setMessage('Link copied');
        window.setTimeout(() => setMessage('Share'), 2000);
      } catch {
        setMessage('Unable to share');
        window.setTimeout(() => setMessage('Share'), 2000);
      }
    }
  }

  return <button type="button" className={`note-share-button ${className}`} onClick={share} aria-label={`Share: ${title}`}>{message}</button>;
}
