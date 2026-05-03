// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: ['localhost', 'yourdomain.com', 'cdn.example.com' , 'example.com'],
//   },
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "yourdomain.com",
      },
      {
          protocol: "https",
          hostname: "cdn.example.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "revolvebypreethi-image-upload.s3.ap-south-1.amazonaws.com",
      }   
    ],
  },
};

export default nextConfig;
