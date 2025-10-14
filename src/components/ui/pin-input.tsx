'use client';

import React, { useRef, useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface PinInputProps {
  length?: number;
  onComplete?: (pin: string) => void;
}

export function PinInput({ length = 4, onComplete }: PinInputProps) {
  const [pin, setPin] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    // Allow only single digits
    if (/^[0-9]$/.test(value) || value === '') {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      // Move to the next input if a digit is entered
      if (value !== '' && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // If all fields are filled, call onComplete
      if (newPin.every(digit => digit !== '') && onComplete) {
        onComplete(newPin.join(''));
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to the previous input on backspace if the current input is empty
    if (e.key === 'Backspace' && pin[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  if (!isClient) {
    // Render a placeholder or null on the server
    return null;
  }

  return (
    <div className="flex w-full justify-between gap-2 md:gap-4">
      {pin.map((digit, index) => (
        <Input
          key={index}
          ref={el => (inputRefs.current[index] = el)}
          type="tel" // Use "tel" to bring up numeric keyboard on mobile
          maxLength={1}
          value={digit}
          onChange={e => handleChange(e, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          className="h-14 w-full text-center text-2xl font-bold"
          aria-label={`PIN digit ${index + 1}`}
        />
      ))}
    </div>
  );
}
