var roleHarvester = {

    /**
     * TODO:
     * - Harvesters should not upgrade controller
     * 
     */
    run: function(creep) {
        const freeCarry = creep.carryCapacity - creep.carry[RESOURCE_ENERGY];

        if (creep.memory.upgrading && freeCarry == creep.carryCapacity) creep.memory.upgrading = false;

        if(!creep.memory.upgrading && freeCarry > 0) {
            const sources = creep.room.find(FIND_SOURCES);
            if (creep.memory.sourceID) {
                const source = Game.getObjectById(creep.memory.sourceID);
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else {
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        else {
            let targets;
            if (creep.memory.upgrading) {
                targets = [];
            }
            targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (!targets.length) {
                targets = [creep.room.controller];
                creep.memory.upgrading = true;
            }
            if(targets.length > 0) {
                if (creep.memory.upgrading) {
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }
                }
                else {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
    }
};

module.exports = roleHarvester;