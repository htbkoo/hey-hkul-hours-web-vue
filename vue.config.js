module.exports = {
    lintOnSave: false,
    devServer: {disableHostCheck: true},
    baseUrl: "/hey-hkul-hours-web-vue/",
    pwa: {
        // configure the workbox plugin
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'public/service-worker.js',
            // ...other Workbox options...
        }
    }
};