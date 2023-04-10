// src/components/ImageSelector.tsx
import React from 'react';

interface ImageSelectorProps {
  onSelect: (imageUrl: string) => void;
}

const images = ['image1.png', 'image2.png', 'image3.png'];

const ImageSelector: React.FC<ImageSelectorProps> = ({ onSelect }) => {
  return (
    <div>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Base image ${index + 1}`}
          onClick={() => onSelect(image)}
        />
      ))}
    </div>
  );
};

export default ImageSelector;