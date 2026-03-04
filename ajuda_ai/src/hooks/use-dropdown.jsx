import { useState, useCallback, useEffect } from "react";

export function useDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    function handleClickOutside() {
      close();
    }
    if (isOpen) {
      window.addEventListener("click", handleClickOutside);
    }
    return () => window.removeEventListener("click", handleClickOutside);
  }, [isOpen, close]);

  return { isOpen, toggle, close };
}
