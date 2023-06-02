/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    SECRET: process.env.SECRET,
    BUCKET_URL: process.env.BUCKET_URL,
  },
};

module.exports = nextConfig;
