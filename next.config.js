/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "backend.livementors.org",
            }
        ],
    },
    env: {
        API_URL: process.env.API_URL,
        SITE_URL: process.env.SITE_URL,
    },
}


module.exports = nextConfig;
