<template>
    <div class="hours-container">
        <md-card class="md-card-example">
            <md-card-media-cover md-text-scrim>
                <md-card-media>
                    <img :src="require(`@/assets/${banner.src}`)" :alt="banner.alt">
                </md-card-media>

                <md-card-area md-inset>
                    <md-card-header>
                        <h2 class="md-title">Hours of {{libraryName}}</h2>
                        <div class="md-subhead">
                            <md-icon>location_on</md-icon>
                            <span>HKU</span>
                        </div>
                    </md-card-header>

                    <md-card-content>
                        Libraries opening hours are as follow:
                    </md-card-content>
                </md-card-area>
            </md-card-media-cover>

            <md-card-content>
                <h3 class="md-subheading">{{libraryName}}</h3>
                <div class="card-reservation">
                    <md-icon>access_time</md-icon>
                    <div class="md-button-group">
                        <md-button>5:30PM</md-button>
                        <md-button>7:30PM</md-button>
                        <md-button>9:00PM</md-button>
                    </div>
                </div>
            </md-card-content>

            <!--<md-card-actions>-->
            <!--<md-button class="md-primary">Reserve</md-button>-->
            <!--</md-card-actions>-->
        </md-card>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    type BannerProps = {
        src: string,
        alt: string
    }

    @Component
    export default class Place extends Vue {
        @Prop() private banner!: BannerProps;
        @Prop() private libraryName!: string;
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

    .md-app {
        border: 1px solid rgba(0, 0, 0, .12);
    }

    .md-drawer {
        width: 230px;
        max-width: calc(100vw - 125px);
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

    .card-reservation {
        display: flex;
    }
</style>