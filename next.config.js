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
    async redirects() {
        return [
            {
                source: '/services/chipping-and-wood-splitting-services-tauranga',
                destination: '/services',
                permanent: true,
            },
            
            {
                source: '/services/tree-health-monitoring-and-assessments-tauranga',
                destination: '/services',
                permanent: true,
            },
            {
                source: '/category/:slug',
                destination: '/services',
                permanent: true,
            },
            {
                source: '/firewood-mulch',
                destination: '/services/firewood-and-mulch-tauranga',
                permanent: true,
            },   {
                source: '/chipping-wood-splitting',
                destination: '/services',
                permanent: true,
            },
            {
                source: '/testimonial',
                destination: '/testimonials',
                permanent: true,
            }, 
            {
                source: '/testimonial/:slug',
                destination: '/testimonials',
                permanent: true,
            },   {
                source: '/shop/:slug',
                destination: '/',
                permanent: true,
            },   {
                source: '/contact',
                destination: '/contact-us',
                permanent: true,
            },   {
                source: '/chipping',
                destination: '/services',
                permanent: true,
            },   {
                source: '/2024/05/27',
                destination: '/services',
                permanent: true,
            },   {
                source: '/firewood',
                destination: '/services/firewood-and-mulch-tauranga',
                permanent: true,
            },   {
                source: '/group-2-3',
                destination: '/',
                permanent: true,
            },   {
                source: '/neww',
                destination: '/services',
                permanent: true,
            },   {
                source: '/gallery-classic',
                destination: '/our-work/gallery',
                permanent: true,
            },   {
                source: '/blogs',
                destination: '/',
                permanent: true,
            },
            {
                source: '/home',
                destination: '/',
                permanent: true,
            },
            {
                source: '/_frog',
                destination: '/',
                permanent: true,
            },
            {
                source: '/group-2-2',
                destination: '/',
                permanent: true,
            },
            {
                source: '/faqs',
                destination: '/faq',
                permanent: true,
            },
            {
                source: '/copy-of-land-clearing',
                destination: '/services/land-clearing-tauranga',
                permanent: true,
            },
            {
                source: '/product-category/:slug',
                destination: '/',
                permanent: true,
            },
            {
                source: '/gardening',
                destination: '/services',
                permanent: true,
            },
            {
                source: '/boost-your-garde%E2%80%A6ide-to-tree-care',
                destination: '/services',
                permanent: true,
            },
            {
                source: '/arborist-tauranga',
                destination: '/services',
                permanent: true,
            },
           
        ]
    },
}

module.exports = withBundleAnalyzer(nextConfig)
