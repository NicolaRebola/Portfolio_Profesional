import { LangSwitcher } from "@/app/_components/landing/LangSwitcher";

export default function Nav({
  logo = "NR/",
  links = [
    { href: "#about", label: "ABOUT" },
    { href: "#experience", label: "EXPERIENCE" },
    { href: "#stack", label: "STACK" },
    { href: "#blog", label: "BLOG" },
    { href: "#contact", label: "CONTACT" },
  ],
}: {
  logo?: string;
  links?: { href: string; label: string }[];
}) {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/50 px-6 py-5 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6">
        <a
          href="#hero"
          className="font-[var(--font-syne)] text-[1.05rem] font-extrabold tracking-[-0.02em] text-transparent bg-clip-text"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgb(99,102,241), rgb(6,182,212))",
          }}
        >
          {logo}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[0.875rem] tracking-[0.08em] text-white/50 hover:text-white/90"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LangSwitcher />
        </div>
      </div>
    </nav>
  );
}