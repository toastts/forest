import React from 'react';

interface ScrapbookLetterProps {
  letter: string;
  fontClass: string;
}

const randomTransform = () => {
  const skewX = Math.floor(Math.random() * 2 + 2);
  const skewY = Math.floor(Math.random() * 2 + 2);
  const translateX = Math.floor(Math.random() * 2 + 2);
  const translateY = Math.floor(Math.random() * 20 + 2);
  return `translate(${translateX}px, ${translateY}px) skew(${skewX}deg, ${skewY}deg)`;
};

const ScrapbookLetter: React.FC<ScrapbookLetterProps> = ({ letter, fontClass }) => {
  if (letter === ' ') {
    return <span className="inline-block p-1 m-1">{' '}</span>; // Ensure spaces are gaps
  }

  const textColor = '#161615'; // Flour-text color

  return (
    <span
      className={`${fontClass} inline-block p-1 m-1 relative`}
      style={{
        color: textColor,
        borderRadius: '5px',
        transform: randomTransform(),
      }}
    >
      {letter}
    </span>
  );
};

export default ScrapbookLetter;
