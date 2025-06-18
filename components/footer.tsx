// app/components/Header.tsx
import Link from 'next/link';
import Image from 'next/image';

// Define the shape of our navigation link objects
interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/manager/ukms", label: "Your UKMs" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
  { href: "/profile", label: "Profile" },
];

export default function Header() {
  return (
    <header className="w-full bg-[#243E7E] text-white">
      <nav className="container mx-auto flex h-20 items-center justify-center gap-8 px-4">
        <Link href="/">
          <Image
            src="/logo.png" // Replace with your actual logo
            alt="MyUKM Logo"
            width={113}
            height={79}
            className="h-full w-auto"
            />
        </Link>
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-bold transition-colors hover:text-[#FDBB3E]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}