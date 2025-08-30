import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack:{
    root:'/home/student/assignment-webs/next-movie-app/movie-website-next.js/movie-app',
  },
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"image.tmdb.org",
        pathname:"/t/p/**",
      }
    ]
  }
};

export default nextConfig;
