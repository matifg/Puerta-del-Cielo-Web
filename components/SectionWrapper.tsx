import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, className = "" }) => (
  <section className={`max-w-6xl mx-auto py-16 px-6 ${className}`}>
    {children}
  </section>
);

export default SectionWrapper;

