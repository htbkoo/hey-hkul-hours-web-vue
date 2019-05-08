console.log("@service-worker.js");
// @ts-ignore
if (workbox) {
    console.log(`Workbox is loaded`);

    // @ts-ignore
    workbox.precaching.precacheAndRoute(self.__precacheManifest);

}
else {
    console.log(`Workbox didn't load`);
}