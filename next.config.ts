import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* The vinext build remains the source-of-truth typecheck for the Cloudflare target. */
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
