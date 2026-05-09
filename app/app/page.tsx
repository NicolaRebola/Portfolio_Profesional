"use client";

import { useEffect } from "react";

/**
 * `/` is outside `[lang]`. Static export cannot rely on middleware (`output: "export"`).
 * Redirect in the client for dev; production root still gets `out/index.html` from postbuild
 * (meta refresh) so `/` works without JS on static hosts.
 */
export default function RootRedirectPage() {
  useEffect(() => {
    window.location.replace(new URL("en/", window.location.href).href);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center text-white/75">
      <p className="font-mono text-sm tracking-wide">Redirecting…</p>
      <a
        href="en/"
        className="mt-4 font-mono text-sm tracking-wide text-cyan-300 underline underline-offset-4 hover:text-cyan-200"
      >
        Continue in English
      </a>
    </div>
  );
}
