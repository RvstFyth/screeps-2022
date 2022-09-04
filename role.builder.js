module.exports = {

    run: function(creep)
    {
        if (typeof creep.memory.working === 'undefined') creep.memory.working = false;

        const freeCarry = creep.carryCapacity - creep.carry[RESOURCE_ENERGY];
        if (creep.memory.working && freeCarry == creep.carryCapacity) creep.memory.working = false;
        if (freeCarry === 0) creep.memory.working = true;

        if(!creep.memory.working && freeCarry > 0) {
            let target = creep.room.containers.filter(c => c.store[RESOURCE_ENERGY] > creep.carryCapacity * 2)[0];
            if (!target) {
                target = creep.room.spawns.filter(c => c.store[RESOURCE_ENERGY] > creep.carryCapacity)[0];
            }

            if (target) {
                if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }

        if (creep.memory.working && creep.room.constructionSites.length) {
            if (creep.build(creep.room.constructionSites[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.constructionSites[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};