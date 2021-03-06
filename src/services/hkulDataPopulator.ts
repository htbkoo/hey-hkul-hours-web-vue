import moment from "moment";

import {AllZonesHours} from "hey-hkul-hours/dist/service/hour/model/LibraryHours";
import UrlAppender from "hey-hkul-hours/dist/service/UrlAppender";
import {HkuLibraryHoursFetcher} from "hey-hkul-hours";
import {LibraryProps} from "@/types/LibraryProps";
import mockHtmlFetcher from "@/services/mockHtmlFetcher";

const useMockFetcher = false;

const overrides = useMockFetcher ? {htmlFetcher: mockHtmlFetcher} : {};
const hkuLibraryHoursFetcher = new HkuLibraryHoursFetcher({
    ...overrides,
    urlAppender: new UrlAppender("https://cors-anywhere.herokuapp.com/https://lib.hku.hk/hours/daily/opening_hours_", ".html"),
});

export default {
    populateData(date = moment()) {
        return hkuLibraryHoursFetcher.retrieveHours(date)
            .then(libraryHours => {
                    const hoursForAllZones = libraryHours.getHoursForAllZones();
                    const allZones = Object.keys(hoursForAllZones);
                    console.debug(`retrieved library hours - # of zones: ${allZones.length}`);
                    return allZones.map(toLibraryProps(hoursForAllZones));
                }
            );
    }
};

function toLibraryProps(hoursForAllZones: AllZonesHours): (zoneName: string) => LibraryProps {
    return zoneName => ({name: zoneName, hours: hoursForAllZones[zoneName]});
}