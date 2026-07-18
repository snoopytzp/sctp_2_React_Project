// src/hooks/useDebounce.js
import { useState, useEffect } from "react";

const DELAY = 300;

export function useDebounce(value) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, DELAY);
    return () => clearTimeout(timer);
  }, [value]);

  return debouncedValue;
}