// src/components/Preview.tsx
import React, { useRef, useEffect } from 'react';

interface PreviewProps {
  baseImage: string;
  text: string;
  textColor: string;
}

const Preview: React.FC<PreviewProps> = ({ baseImage, text, textColor }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !downloadLinkRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = baseImage;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
// テキストの描画
  ctx.fillStyle = textColor;
  ctx.font = '24px sans-serif';
  const lines = text.split('\n');
  const lineHeight = 30;
  const xOffset = 10;
  const yOffset = 40;
  lines.forEach((line, index) => {
    ctx.fillText(line, xOffset, yOffset + index * lineHeight);
  });

  // Base64エンコードとダウンロードリンクの設定
  const base64Image = canvas.toDataURL('image/png');
  if(downloadLinkRef.current) {
    downloadLinkRef.current.href = base64Image;
    downloadLinkRef.current.download = 'christmas-card.png';
  }
};
}, [baseImage, text, textColor]);

return (
<div>
<canvas ref={canvasRef} width={400} height={400} />
<a ref={downloadLinkRef} href="#">
Download Christmas Card
</a>
</div>
);
};

export default Preview;