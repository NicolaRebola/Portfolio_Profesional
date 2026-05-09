import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "Portfolio_Profesional";

/** Matches GitHub Pages URL segment(s): prod `/Portfolio_Profesional`, UAT `/Portfolio_Profesional/uat`. */
const prodBasePath =
  process.env.NEXT_PUBLIC_SITE_BASE_PATH?.replace(/\/$/, "") ||
  `/${repoName}`;

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },
  basePath: isProd ? prodBasePath : "",
  assetPrefix: isProd ? `${prodBasePath}/` : "",
  trailingSlash: true
};

export default nextConfig;
