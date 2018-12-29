import LibraryHours from "hey-hkul-hours/dist/service/hour/model/LibraryHours";

export default {
    populateData(libraries:[], promiseRetrieve: Promise<LibraryHours>){
        return promiseRetrieve.then(libraryHours => {
                console.log("retrieved library hours");
                const hoursForAllZones = libraryHours.getHoursForAllZones();
                Object.keys(hoursForAllZones)
                    .forEach(zone =>
                        (libraries as any).push({
                            name: zone,
                            hours: hoursForAllZones[zone]
                        })
                    );
                console.log(`done retrieved library hours - #lib: ${libraries.length}`);
            }
        );
    }
};