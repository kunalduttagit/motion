/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
         remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
            },
            {
                protocol: 'https',
                hostname: 'www.flaticon.com',
            },
         ],
         unoptimized: true, //for deployment and saving on image optimzations
    }
};

export default nextConfig;
