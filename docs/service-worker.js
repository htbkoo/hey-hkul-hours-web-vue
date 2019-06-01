importScripts("/hey-hkul-hours-web-vue/precache-manifest.f05457445e244839f2a0507083ce37d5.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

"use strict";
console.log("@service-worker.js");
const URL_PATTERN = /https:\/\/lib\.hku\.hk\/hours/;
const handlerCb = ({ url, event, params }) => {
    return fetch(event.request)
        .then((response) => {
        console.log(`got response`);
        return response.text();
    })
        .then((responseBody) => {
        //return new Response(`${responseBody} <!-- Look Ma. Added Content. -->`);
        console.log(`parsed and get body: ${responseBody}`);
        return new Response(responseBody);
    });
};
// @ts-ignore
if (workbox) {
    console.log(`Workbox is loaded`);
    // @ts-ignore
    workbox.precaching.precacheAndRoute(self.__precacheManifest);
    console.log(`registering for url pattern: ${URL_PATTERN.toString()}`);
    // @ts-ignore
    workbox.routing.registerRoute(URL_PATTERN, handlerCb);
}
else {
    console.log(`Workbox didn't load`);
}
//# sourceMappingURL=service-worker.js.map
