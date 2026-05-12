import type { NextConfig } from "next";

const siteBasePath =
  process.env.NEXT_PUBLIC_SITE_BASE_PATH?.replace(/\/$/, "") ?? "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },
  basePath: siteBasePath,
  assetPrefix: siteBasePath ? `${siteBasePath}/` : "",
  trailingSlash: true
};

export default nextConfig;
