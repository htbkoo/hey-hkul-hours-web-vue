<template>
    <div class="library-container">
        <md-card-content>
            <h3 class="md-subheading">{{name}}</h3>
            <Session
                    v-for="(session, index) in sessions"
                    :key="index"
                    :session="session"

            />
        </md-card-content>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import Hour from "hey-hkul-hours/dist/service/hour/model/Hour";
    import Hours from "hey-hkul-hours/dist/service/hour/model/Hours";

    import Session from './Session.vue';

    @Component({
        components: {
            Session,
        },
    })
    export default class Library extends Vue {
        @Prop() private name!: string;
        @Prop() private hours!: Hours;

        get sessions(): Hour[] {
            return this.hours.asArray();
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

    .session-group {
        display: flex;
    }
</style>