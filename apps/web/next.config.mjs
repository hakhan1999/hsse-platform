// The browser only ever talks to this site. /api/* is forwarded to the Express API,
// so login cookies stay on one origin and no CORS setup is needed.
// API_URL is read at build time on Vercel, so set it before deploying.
const apiUrl = process.env.API_URL || 'http://localhost:4000';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${apiUrl}/api/:path*` }];
  },
};

export default nextConfig;
