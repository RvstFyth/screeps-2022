module.exports = {

    /**
     * 
     * @param {Creep} creep 
     */
    run: function(creep)
    {
        if (creep.store.getFreeCapacity() === 0) creep.memory.hauling = false;
        else if (creep.store.getUsedCapacity() === 0) creep.memory.hauling = true;

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
                    creep.moveTo(droppedResources, {visualizePathStyle: {stroke: '#ffaa00'}, maxRooms: 1});
                }
            } else {
                const container = containerPos.findInRange(FIND_STRUCTURES, 1, {
                    filter: s => s.structureType === STRUCTURE_CONTAINER
                })[0];

                if (container && creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}, maxRooms: 1});
                }
            }
        }
        else {
            let target;
            const spawn = creep.room.spawns.filter(s => s.store.getFreeCapacity(RESOURCE_ENERGY) > 0)[0];
            if (spawn) target = spawn;

            if (!target) {
                const tower = creep.room.towers.filter(s =>s.store.getFreeCapacity(RESOURCE_ENERGY) > 0)[0];
                if (tower) target = tower;
            }

            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}, maxRooms: 1});
                }
            }
        }
    }
}