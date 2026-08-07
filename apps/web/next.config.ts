import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";
import path from "path";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.19"],
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
};
const withMDX = createMDX({});

export default withMDX(nextConfig);
