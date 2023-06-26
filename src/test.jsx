import React, { useState } from 'react';

function Type() {
  const text = 'OpenAI'; // The text to be typed
  const [typedText, setTypedText] = useState('');
  
  const handleChange = (e) => {
    const inputValue = e.target.value;
    setTypedText(inputValue);
  }

  return (
    <div>
      <h2>Typing App</h2>
      <p>
        {text.split('').map((char, index) => (
          <span
            key={index}
            style={{ color: typedText[index] === char ? 'green' : 'black' }}
          >
            {char}
          </span>
        ))}
      </p>
      <input type="text" value={typedText} onChange={handleChange} />
    </div>
  );
}

export default Type;
