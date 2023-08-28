/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  async redirects() {
    return [
      {
        source: "/produk/new",
        destination: "/produk",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
