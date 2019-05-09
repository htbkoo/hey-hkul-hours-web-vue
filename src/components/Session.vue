<template>
    <div class="session-group">
        <md-icon>access_time</md-icon>
        <div class="session-from-to">
            <md-button>{{formattedSession.from}}</md-button>
            <md-button disabled>-</md-button>
            <md-button>{{formattedSession.to}}</md-button>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import Hour from "hey-hkul-hours/dist/service/hour/model/Hour";

    const TIME_FORMAT = "HH:mm";

    type FormattedHour = {
        from: string,
        to: string,
    }

    @Component
    export default class Session extends Vue {
        @Prop() private session!: Hour;

        get formattedSession(): FormattedHour {
            const from = this.session.getFrom().format(TIME_FORMAT);
            return {
                from,
                to: formatEndTime(this.session),
            };

            function formatEndTime(session: Hour): string {
                const to = session.getTo();
                const isFollowingDay = to.isAfter(session.getFrom(), "day");
                const formattedTime = to.format(TIME_FORMAT);
                if (isFollowingDay) {
                    return `${formattedTime} (+1)`
                } else {
                    return formattedTime;
                }
            }
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