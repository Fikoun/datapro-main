const { pingStation, setState } = require("../utils/stationModel")
const tokenKey = "000000";

module.exports = () => {
    const io = require("socket.io")(strapi.server);

    io.use((socket, next) => {
        console.log(socket.id);
        if (socket.handshake.auth.token === tokenKey) {
          next();
        } else { 
          next(new Error("invalid auth token"));
        }
    });

    io.on('error', function (ioerror) {
        console.log({ ioerror });
    });

    io.on('connection', function (socket) {
        pingStation("Test_station", socket.id);
        socket.on('disconnect', function() {
            setState("Test_station", "offline")
        })

        console.log("> Connected");
        console.log(socket.id);
    });

    // io.on("connect_error", (err) => {
    //     console.log(`connect_error due to ${err.message}`);
    // });
    
    strapi.io = io;
};