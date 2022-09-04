require('prototype.room');
require('prototype.source');

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

    // Delete memory from creeps that died
    for (const name in Memory.creeps) {
        if (!(name in Game.creeps)) {
          delete Memory.creeps[name];
        }
    }
}