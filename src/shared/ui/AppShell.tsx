import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export type NavItem = {
  id: string;
  title: string;
  href: string;
};

export type NavSection = {
  label: string;
  pages: NavItem[];
};

type Props = {
  sections: NavSection[];
  currentPath: string;
};

export default function AppShell({ sections, currentPath }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Header onMenuToggle={() => setIsOpen((prev) => !prev)} />
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <Sidebar sections={sections} currentPath={currentPath} isOpen={isOpen} />
    </>
  );
}
