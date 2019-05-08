import moment from "moment";

import {AllZonesHours} from "hey-hkul-hours/dist/service/hour/model/LibraryHours";
import {LibraryProps} from "@/types/LibraryProps";
import {HkuLibraryHoursFetcher} from "hey-hkul-hours";
import mockHtmlFetcher from "@/services/mockHtmlFetcher";

const useMockFetcher = false;
const overrides = useMockFetcher ? {htmlFetcher: mockHtmlFetcher} : {};
const hkuLibraryHoursFetcher = new HkuLibraryHoursFetcher(overrides);

export default {
    populateData() {
        return hkuLibraryHoursFetcher.retrieveHours(moment())
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