import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.19"],
  /* config options here */
};
const withMDX = createMDX();

export default withMDX(nextConfig);
