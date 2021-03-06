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
                        <div>
                            <md-datepicker v-model="state.selectedDate" md-immediately/>
                        </div>
                        <div>
                            Libraries opening hours are as follow:
                        </div>
                    </md-card-content>
                </md-card-area>
            </md-card-media-cover>

            <div v-if="state.isLoading" class="loading-spinner-container">
                <md-progress-spinner md-mode="indeterminate"/>
            </div>
            <Library
                    v-else
                    v-for="(library, index) in state.libraries"
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
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import moment from "moment";

    import Library from "@/components/Library.vue";
    import {LibraryProps} from "@/types/LibraryProps";
    import hkulDataPopulator from "@/services/hkulDataPopulator";

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
        // @Prop() private libraries!: LibraryProps[];
        // @Prop() private status!: { isLoading: boolean };
        // @Prop() private selectedDate!: Date;

        state: {
            libraries: LibraryProps[],
            isLoading: boolean,
            selectedDate: Date
        } = {
            libraries: [],
            isLoading: true,
            selectedDate: moment().toDate()
        };

        mounted() {
            console.log("Mounted <App/>");
            this.populateData();
        }

        @Watch("state.selectedDate")
        onSelectedDateChange() {
            this.populateData();
        }

        populateData() {
            console.log(`Populating data for "${this.meta.name}" on "${moment(this.state.selectedDate).format("YYYY-MMM-DD")}"`);
            this.state.isLoading = true;
            const date = moment(this.state.selectedDate);
            hkulDataPopulator.populateData(date)
                .then(data => this.state.libraries = data)
                .then(() => this.state.isLoading = false);
        }


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

    .loading-spinner-container {
        justify-content: center;
        display: flex;
    }
</style>