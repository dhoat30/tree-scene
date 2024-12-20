const { siteUrl } = require('./next-sitemap.config');

// bundle analyzer 
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfigp} */
const nextConfig = {

    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
    },
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'cms.treescene.co.nz',
            port: '',
            pathname: '/**'
        },
        {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
            pathname: '/**'
        }
        
    ],
    },
    env: {
        url: "https://cms.treescene.co.nz",
        siteUrl: "https://treescene.co.nz",
        name: "Tree Scene Tauranga",
        GOOGLE_REDIRECT_URI: process.env.NODE_ENV === 'production' ? 'https://treescene.co.nz' : 'http://localhost:3000'
    },

}

module.exports = withBundleAnalyzer(nextConfig)
