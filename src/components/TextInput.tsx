// src/components/TextInput.tsx
import React, { useState } from 'react';

interface TextInputProps {
  onTextChange: (text: string) => void;
  onColorChange: (color: string) => void;
}

const colors = [
  // 16色のカラーコードをここに追加
  '#ffffff',
  '#ff0000',
  '#000000'
];

const TextInput: React.FC<TextInputProps> = ({ onTextChange, onColorChange }) => {
  const [text, setText] = useState('');

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setText(newText);
    onTextChange(newText);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newColor = event.target.value;
    onColorChange(newColor);
  };

  return (
    <div>
      <textarea value={text} onChange={handleTextChange} />
      <select onChange={handleColorChange}>
        {colors.map((color, index) => (
          <option key={index} value={color}>{color}</option>
        ))}
      </select>
    </div>
  );
};

export default TextInput;