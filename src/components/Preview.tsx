// src/components/Preview.tsx

import React, { useRef, useEffect } from 'react';

interface PreviewProps {
  text: string;
  textColor: string;
  baseImage: string;
}

const Preview: React.FC<PreviewProps> = ({ text, textColor, baseImage }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const img = new Image();
        img.src = baseImage;
        img.onload = () => {
          // Set canvas width and height based on image aspect ratio
          canvas.width = img.width;
          canvas.height = img.height;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          ctx.fillStyle = textColor;
          ctx.font = '24px Arial';
          ctx.textAlign = 'center';

          const lines = text.split('\n');
          const lineHeight = 30;
          const yOffset = (canvas.height - (lines.length - 1) * lineHeight) / 2;

          lines.forEach((line, index) => {
            ctx.fillText(line, canvas.width / 2, yOffset + index * lineHeight);
          });

          updateDownloadLink();
        };
      }
    }
  }, [text, textColor, baseImage]);

  const updateDownloadLink = () => {
    const canvas = canvasRef.current;
    if (canvas && downloadLinkRef.current) {
      const base64Image = canvas.toDataURL('image/png');
      downloadLinkRef.current.href = base64Image;
      downloadLinkRef.current.download = 'christmas-card.png';
    }
  };

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    //e.preventDefault();
  };

  return (
    <div className="preview-container" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}></canvas>
      <a
        ref={downloadLinkRef}
        href="/"
        download="christmas-card.png"
        onClick={handleDownloadClick}
        style={{
          display: 'inline-block',
          textDecoration: 'none',
          backgroundColor: '#007bff',
          color: 'white',
          padding: '10px 16px',
          fontSize: '16px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        ダウンロード
      </a>
      <img
        src={baseImage}
        alt="Preview"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          display: 'none',
        }}
      />
    </div>
  );
};

export default Preview;
