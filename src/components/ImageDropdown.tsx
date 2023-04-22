// src/components/ImageDropdown.tsx
import React, { useState, useRef } from 'react';
import '../styles/ImageDropdown.css';

interface ImageDropdownProps {
  images: string[];
  onSelect: (image: string) => void;
}

const ImageDropdown: React.FC<ImageDropdownProps> = ({ images, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleImageClick = (image: string) => {
    onSelect(image);
    setSelectedImage(image);
    setIsOpen(false);
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="image-dropdown">
      <div className="selected-image" onClick={() => setIsOpen(!isOpen)}>
        <img
          src={selectedImage}
          alt="Selected"
          style={{ maxWidth: '50px', maxHeight: '50px', objectFit: 'contain' }}
        />
      </div>
      {isOpen && (
        <ul className="image-list">
          {images.map((image) => (
            <li key={image} className="image-item" onClick={() => handleImageClick(image)}>
              <img
                src={image}
                alt={image}
                style={{ maxWidth: '50px', maxHeight: '50px', objectFit: 'contain' }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ImageDropdown;