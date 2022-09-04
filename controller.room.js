const creepsManager = require('manager.room.creeps');

module.exports = {

    run: function(room) {
        const creeps = Object.values(Game.creeps).filter(c => c.memory.room == room.name);
        
        creepsManager.run(room, creeps);
    }
};