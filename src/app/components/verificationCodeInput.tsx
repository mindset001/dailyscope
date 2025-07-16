'use client';
import { useState, useRef, useEffect } from 'react';

export default function VerificationCodeInput({ length = 6 }: { length?: number }) {
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    
    // Only allow single digits
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      // Auto-focus next input
      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, length);
    const newCode = [...code];
    
    pasteData.split('').forEach((char, i) => {
      if (i < length && /^\d*$/.test(char)) {
        newCode[i] = char;
      }
    });
    
    setCode(newCode);
  };

  return (
    <div className="flex gap-2">
      {code.map((digit, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="text-3xl h-[48px] w-[63px] text-center bg-[#F4F4F4] rounded-md focus:border-blue-500 focus:outline-none"
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
}