// src/App.tsx
import React, { useState } from 'react';
import ImageDropdown from './components/ImageDropdown';
import TextInput from './components/TextInput';
import Preview from './components/Preview';

const App: React.FC = () => {
  const [baseImage, setBaseImage] = useState('image1.png');
  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState('#000000');

  const images = ['image1.png', 'image2.png', 'image3.png'];

  return (
    <div>
      <ImageDropdown images={images} onSelect={setBaseImage} />
      <TextInput onTextChange={setText} onColorChange={setTextColor} />
      <Preview baseImage={baseImage} text={text} textColor={textColor} />
    </div>
  );
};

export default App;