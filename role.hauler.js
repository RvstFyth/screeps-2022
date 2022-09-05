module.exports = {

    run: function(creep)
    {
        const freeCarry = creep.carryCapacity - creep.carry[RESOURCE_ENERGY];
        if (freeCarry === 0) creep.memory.hauling = false;
        else if (freeCarry === creep.carryCapacity) creep.memory.hauling = true;

        const source = Game.getObjectById(creep.memory.targetID);
        const containerPos = new RoomPosition(
            source.containerPos.x,
            source.containerPos.y,
            creep.room.name
        )
        
        if (creep.memory.hauling) {
            const droppedResources = containerPos.findInRange(FIND_DROPPED_RESOURCES, 1)[0];
            if (droppedResources) {
                if (creep.pickup(droppedResources) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedResources, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                const container = containerPos.findInRange(FIND_STRUCTURES, 1, {
                    filter: s => s.structureType === STRUCTURE_CONTAINER
                })[0];

                if (container && creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        else {
            let target;
            const spawn = creep.room.spawns.filter(s => s.store.getFreeCapacity(RESOURCE_ENERGY) > 0)[0];
            if (spawn) target = spawn;

            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }
}