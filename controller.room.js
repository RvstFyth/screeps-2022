const creepsManager = require('manager.room.creeps');

module.exports = {

    run: function(room) {
        const creeps = Object.values(Game.creeps).filter(c => c.memory.room == room.name);
        
        creepsManager.run(room, creeps);
        this.checkSourceContainers(room);
    },

    checkSourceContainers: function(room)
    {
        for (let source of room.sources)
        {
            const container = source.pos.findInRange(room.containers, 1)[0];
            if (!container) {
                const construction = source.pos.findInRange(room.constructionSites, 1).filter(c => c.structureType === STRUCTURE_CONTAINER)[0];
                if (!construction) {
                    const path = room.findPath(room.controller.pos, source.pos, {
                        ignoreCreeps: true,
                        ignoreRoads: true,
                        ignoreDestructibleStructures: true
                    });

                    let lastStep = path[path.length - 2];
                    room.createConstructionSite(lastStep.x, lastStep.y, STRUCTURE_CONTAINER);
                }
            }
        }
    },
};