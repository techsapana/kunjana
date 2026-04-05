import { ReactNode } from "react";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

export default function SectionWrapper({
  id,
  className,
  containerClassName,
  children,
}: SectionWrapperProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className ?? ""}`}>
      <div
        className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${containerClassName ?? ""}`}
      >
        {children}
      </div>
    </section>
  );
}
