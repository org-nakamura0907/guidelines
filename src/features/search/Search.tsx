import { useState, useEffect } from "react";
import SearchButton from "./SearchButton";
import SearchModal from "./SearchModal";

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <SearchButton onClick={() => setIsOpen(true)} />
      {isOpen && <SearchModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
