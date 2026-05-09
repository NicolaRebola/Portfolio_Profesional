"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";

type RevealProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  children?: ReactNode;
  delayMs?: number;
  variant?: "fade" | "rail";
  as?: ElementType;
};

export default function Reveal({
  children,
  className = "",
  delayMs = 0,
  variant = "fade",
  as: Tag = "div",
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const show = () => setShown(true);

    const check = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.top < vh * 0.94 && r.bottom > -r.height * 0.25) {
        show();
        return true;
      }
      return false;
    };

    if (check()) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show();
            io.disconnect();
            return;
          }
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const base = variant === "rail" ? "reveal-rail" : "reveal-fade";
  const active = shown ? `${base}--in` : "";

  const mergedStyle: CSSProperties = {
    ...style,
    ...(shown && delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : {}),
  };

  return (
    <Tag
      ref={ref as never}
      className={`${base} ${active} ${className}`.trim()}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
}
