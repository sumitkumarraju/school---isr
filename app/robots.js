export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: 'https://ishwarinternationalschool.com/sitemap.xml',
    }
}
