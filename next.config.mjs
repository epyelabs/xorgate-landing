import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

/** @type {import('next').NextConfig} */
const config = {
  // S3 + CloudFront static hosting: no Node server anywhere in the path.
  output: "export",
  // S3 website endpoints resolve `dir/` to `dir/index.html`, so emit
  // directories rather than sibling `.html` files (same as xorgate-docs).
  trailingSlash: true,
  // No image-optimizer server in a static export.
  images: { unoptimized: true },
  reactStrictMode: true,
  // This project is standalone, but it sits under directories that carry their
  // own lockfiles. Pin the root so Turbopack does not infer an ancestor.
  turbopack: { root: dirname(fileURLToPath(import.meta.url)) },
}

export default config
