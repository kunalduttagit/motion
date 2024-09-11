/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
         domains: ['localhost', 'image.tmdb.org', 'www.flaticon.com'],
         unoptimized: true, //for deployment and saving on image optimzations
    }
};

export default nextConfig;

// module.exports = {
//     images: {
//       remotePatterns: [
//         {
//           protocol: 'https',
//           hostname: 'https://image.tmdb.org',
//         },
//       ],
//     },
//   }
