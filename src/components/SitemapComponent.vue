<template>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url v-for="route in routesWithSitemap" :key="route.path">
            <loc>{{ baseUrl + route.path }}</loc>
            <lastmod>{{ getCurrentDate() }}</lastmod>
            <changefreq>daily</changefreq>
            <priority>0.8</priority>
        </url>
    </urlset>
</template>
  
<script>
export default {
    data() {
        return {
            baseUrl: 'https://proximoferiadoargentino.com.ar',
        };
    },
    computed: {
        routesWithSitemap() {
            return this.$router.options.routes.filter((route) => route.meta && route.meta.sitemap);
        },
    },
    methods: {
        getCurrentDate() {
            const now = new Date();
            return now.toISOString();
        },
    },
};
</script>
  