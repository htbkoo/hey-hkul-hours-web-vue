<template>
    <div id="app">
        <md-app md-waterfall md-mode="fixed" class="page-content">
            <md-app-toolbar class="md-primary">
                <span class="md-title">Libraries Hours</span>
            </md-app-toolbar>

            <!--<md-app-drawer md-permanent="full">
                <md-toolbar class="md-transparent" md-elevation="0">
                    Navigation
                </md-toolbar>

                <md-list>
                    <md-list-item>
                        <md-icon>move_to_inbox</md-icon>
                        <span class="md-list-item-text">Inbox</span>
                    </md-list-item>

                    <md-list-item>
                        <md-icon>send</md-icon>
                        <span class="md-list-item-text">Sent Mail</span>
                    </md-list-item>

                    <md-list-item>
                        <md-icon>delete</md-icon>
                        <span class="md-list-item-text">Trash</span>
                    </md-list-item>

                    <md-list-item>
                        <md-icon>error</md-icon>
                        <span class="md-list-item-text">Spam</span>
                    </md-list-item>
                </md-list>
            </md-app-drawer>-->

            <md-app-content>
                <Place
                        v-for="place in places"
                        v-bind:key="place.id"
                        v-bind:meta="place.meta"
                        v-bind:banner="place.banner"
                        v-bind:libraries="place.libraries"
                        v-bind:status="place.status"
                        v-bind:selectedDate="place.selectedDate"
                />
            </md-app-content>
        </md-app>
    </div>
</template>

<script lang="ts">
    import VueMaterial from 'vue-material';
    import 'vue-material/dist/vue-material.min.css';
    import 'vue-material/dist/theme/default-dark.css';
    import {Component, Vue} from 'vue-property-decorator';
    import moment from "moment";

    import Place from './components/Place.vue';
    import hkulDataPopulator from "@/services/hkulDataPopulator";
    import {LibraryProps} from "@/types/LibraryProps";

    Vue.use(VueMaterial as any);

    @Component({
        components: {
            Place,
        },
    })
    export default class App extends Vue {
        places = [
            {
                id: 1,
                meta: {name: "HKU Library", location: "Pok Fu Lam"},
                banner: {src: "hkul/wikipedia/hkul_banner.jpg", alt: "HKU Main Library"},
                libraries: [],
                status: {isLoading: true},
                selectedDate: moment().toDate()
            }
        ];

        mounted() {
            console.log("Mounted <App/>");
            this.places.forEach(this.populateData)
        }

        private populateData(place) {
            console.log(`Populating data for "${place.meta.name}"`);
            hkulDataPopulator.populateData(moment(place.selectedDate))
                .then(data => data.forEach(libraryProps => place.libraries.push(libraryProps)))
                .then(() => place.status.isLoading = false);
        }
    }
</script>

<style>
    #app {
    }

    body {
    }

    .md-app {
        max-height: 100vh;
        border: 1px solid rgba(0, 0, 0, .12);
    }

    .md-drawer {
        width: 230px;
        max-width: calc(100vw - 125px);
    }

    .page-content {
        min-height: 100vh;
    }
</style>
