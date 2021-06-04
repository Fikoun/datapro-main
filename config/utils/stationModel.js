// async function findStation(username, room) {
//     try {
//         const userExists = await strapi.services.users.find({ username, room });
//         return userExists;
//     } catch(err) {
//         console.log("error while fetching", err);
//     }
// }


async function setState(name, state="unknown") {
    const DataStations = strapi.services['data-stations'];
    try {
        DataStations.update({ name }, { state });
    } catch (err) {
        console.log("State couldn't be changed. Try again!")
    }
    return false;
}

async function pingStation(name, socketId) {
    const DataStations = strapi.services['data-stations'];
    try {
        if ((await DataStations.find({ name })).length) {
            console.log(`Already exists.. putting online [${name}]`);
            DataStations.update({ name }, { state: "online", socketId});
        } else {
            const station = await DataStations.create({
                name,
                socketId: socket
            });
            console.log(`Creating new station  [${name}]`);
            return station;
        }
    } catch (err) {
        console.log("Station couldn't be created. Try again!")
    }
    return false;
}
module.exports = {
    pingStation,
    setState,
}