require('prototype.room');

const roles = {
    'harvester': require('role.harvester')
};

const controllers = {
    'room': require('controller.room')
};

module.exports.loop = () => {

    for (const room of Object.values(Game.rooms)) {
        if (room.controller.my) controllers['room'].run(room);
    }
}