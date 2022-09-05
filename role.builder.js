module.exports = {

    /**
     * TODO:
     * - Make dedicated repair unit
     *  
     */
    run: function(creep)
    {
        if (typeof creep.memory.working === 'undefined') creep.memory.working = false;

        const freeCarry = creep.carryCapacity - creep.carry[RESOURCE_ENERGY];

        if (creep.memory.working && freeCarry == creep.carryCapacity) {
            creep.memory.working = false;
            creep.memory.upgrade = false;
        }
        if (freeCarry === 0) creep.memory.working = true;

        if(!creep.memory.working && freeCarry > 0) {
            let target = creep.room.containers.filter(c => c.store[RESOURCE_ENERGY] > creep.carryCapacity * 2)[0];
            if (!target) {
                const droppedResources = creep.room.find(FIND_DROPPED_RESOURCES)[0];
                if (droppedResources && droppedResources.amount > creep.carryCapacity) {
                    if (creep.pickup(droppedResources) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(droppedResources, {visualizePathStyle: {stroke: '#ffaa00'}, maxRooms: 1});
                    }
                
                    return;
                }
                target = creep.room.spawns.filter(c => c.store[RESOURCE_ENERGY] > 250)[0];
            }

            if (target) {
                if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}, maxRooms: 1});
                }
            }
        }

        if (creep.memory.working) {
            const needsUpgradeController = creep.room.controller.ticksToDowngrade < CONTROLLER_DOWNGRADE[creep.room.controller.level] / 2;
            if (!creep.memory.upgrade && needsUpgradeController) creep.memory.upgrade = true;

            if (creep.memory.upgrade) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffaa00'}, maxRooms: 1});
                }
            } else {
                if (creep.room.constructionSites.length) {
                    if (creep.build(creep.room.constructionSites[0]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.constructionSites[0], {visualizePathStyle: {stroke: '#ffaa00'}, maxRooms: 1});
                    }
                }
                else {
                    const damaged = creep.room.find(FIND_STRUCTURES, {
                        filter: s => s.hits < (s.hitsMax * 0.7) && s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART
                    });
                    if (damaged.length) {
                        if (creep.repair(damaged[0]) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}, maxRooms: 1});
                        }
                    }
                    else {
                        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffaa00'}, maxRooms: 1});
                        }
                    }
                }
            }
        }
    }
};