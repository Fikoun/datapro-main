'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    list: (ctx) => new Promise( (resolve, reject) => {
        //strapi.io;
        const { socketId } = ctx.params
        const socket = strapi.io.sockets.sockets.get(socketId)
        if (!socket)
            return new Error("Unknown or disconnected socket!");

        //console.log({ socket });

        socket.on('list-ports', (res, callback) => {
            console.log(res)
            callback({
                status: "ok"
            });
            resolve(res)
        });

        socket.emit('list-ports', {});
    })
};