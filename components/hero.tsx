// app/components/Hero.tsx

interface HeroProps {
  title: string;
  subtitle: string;
}

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="w-full bg-[#1B4A89] py-16 text-white">
      <div className="container mx-auto flex flex-col items-center gap-4 px-4 text-center">
        <h1 className="text-4xl font-bold font-friz-quadrata">{title}</h1>
        <p className="max-w-lg text-base">{subtitle}</p>
      </div>
    </section>
  );
}