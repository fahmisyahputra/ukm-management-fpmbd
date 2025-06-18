// app/components/ui/Button.tsx
import Link from 'next/link';
import type { ReactNode } from 'react';

// Define the props interface
interface ButtonProps {
  href?: string;
  variant?: 'primary' | 'outline';
  children: ReactNode;
}

export default function Button1({ href, variant = 'primary', children }: ButtonProps) {
  const baseStyles = "px-6 py-3 font-semibold rounded-lg transition-transform transform hover:scale-105";
  
  const variants = {
    primary: "bg-[#FDBB3E] text-[#243E7E]",
    outline: "text-white border border-[#FDBB3E]",
  };
  
  const styles = `${baseStyles} ${variants[variant]}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={styles}>
      {children}
    </button>
  );
}