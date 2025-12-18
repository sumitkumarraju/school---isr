export default function sitemap() {
    const baseUrl = 'https://ishwarinternationalschool.com';

    const routes = [
        '',
        '/about',
        '/academics',
        '/gallery',
        '/contact',
        '/admissions',
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }));
}
