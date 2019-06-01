<template>
    <div class="place-container">
        <md-card class="md-card-example">
            <md-card-media-cover md-text-scrim>
                <md-card-media>
                    <img :src="require(`@/assets/${banner.src}`)" :alt="banner.alt">
                </md-card-media>

                <md-card-area md-inset>
                    <md-card-header>
                        <h2 class="md-title">Hours of {{meta.name}}</h2>
                        <div class="md-subhead">
                            <md-icon>location_on</md-icon>
                            <span>{{meta.location}}</span>
                        </div>
                    </md-card-header>

                    <md-card-content>
                        Libraries opening hours are as follow:
                    </md-card-content>
                </md-card-area>
            </md-card-media-cover>

            <div v-if="status.isLoading" class="loading-spinner-container">
                <md-progress-spinner md-mode="indeterminate"/>
            </div>
            <Library
                    v-else
                    v-for="(library, index) in libraries"
                    :key="index"
                    :name="library.name"
                    :hours="library.hours"
            />

            <!--<md-card-actions>-->
            <!--<md-button class="md-primary">Reserve</md-button>-->
            <!--</md-card-actions>-->
        </md-card>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    import Library from "@/components/Library.vue";
    import Hours from "hey-hkul-hours/dist/service/hour/model/Hours";
    import {LibraryProps} from "@/types/LibraryProps";

    export type BannerProps = {
        src: string,
        alt: string
    }

    export type PlaceMetaProps = {
        name: string,
        location: string
    }

    @Component({
        components: {
            Library,
        },
    })
    export default class Place extends Vue {
        @Prop() private banner!: BannerProps;
        @Prop() private meta!: PlaceMetaProps;
        @Prop() private libraries!: LibraryProps[];
        @Prop() private status!: { isLoading: boolean };
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .md-card {
        max-width: 640px;
        /*margin: 4px;*/
        /*display: inline-block;*/
        /*vertical-align: top;*/
    }

    .md-card-example {
        margin-left: auto;
        margin-right: auto;
    }

    .session-group {
        display: flex;
    }

    .session-from-to {
        flex: 1;
    }

    .loading-spinner-container{
        justify-content: center;
        display: flex;
    }
</style>