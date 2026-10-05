export function PixelArt() {
  return (
    <div className="pixel-art-detail" style={{ bottom: '40px', right: '12%' }} aria-hidden="true">
      {/* CSS pixel coffee cup */}
      <div style={{
        width: '4px',
        height: '4px',
        background: 'transparent',
        boxShadow: `
          /* Cup body */
          4px 16px 0 0 #8B4513,
          8px 16px 0 0 #8B4513,
          12px 16px 0 0 #8B4513,
          16px 16px 0 0 #8B4513,
          20px 16px 0 0 #8B4513,
          4px 20px 0 0 #A0522D,
          8px 20px 0 0 #D2B48C,
          12px 20px 0 0 #D2B48C,
          16px 20px 0 0 #D2B48C,
          20px 20px 0 0 #A0522D,
          24px 20px 0 0 #8B4513,
          28px 20px 0 0 #8B4513,
          4px 24px 0 0 #A0522D,
          8px 24px 0 0 #D2B48C,
          12px 24px 0 0 #D2B48C,
          16px 24px 0 0 #D2B48C,
          20px 24px 0 0 #A0522D,
          24px 24px 0 0 transparent,
          28px 24px 0 0 #8B4513,
          4px 28px 0 0 #8B4513,
          8px 28px 0 0 #8B4513,
          12px 28px 0 0 #8B4513,
          16px 28px 0 0 #8B4513,
          20px 28px 0 0 #8B4513,
          24px 28px 0 0 #8B4513,
          /* Steam */
          8px 8px 0 0 rgba(200,200,200,0.5),
          12px 4px 0 0 rgba(200,200,200,0.4),
          16px 8px 0 0 rgba(200,200,200,0.3)
        `,
        imageRendering: 'pixelated' as const,
        transform: 'scale(1.5)',
      }} />
    </div>
  );
}
