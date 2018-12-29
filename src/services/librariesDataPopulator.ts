import LibraryHours from "hey-hkul-hours/dist/service/hour/model/LibraryHours";
import {LibraryProps} from "@/types/LibraryProps";

export default {
    populateData(libraries: LibraryProps[], promiseRetrieve: Promise<LibraryHours>) {
        return promiseRetrieve.then(libraryHours => {
                console.log("retrieved library hours");
                const hoursForAllZones = libraryHours.getHoursForAllZones();
                Object.keys(hoursForAllZones)
                    .forEach(zone =>
                        libraries.push({
                            name: zone,
                            hours: hoursForAllZones[zone]
                        })
                    );
                console.log(`done retrieved library hours - #lib: ${libraries.length}`);
            }
        );
    }
};