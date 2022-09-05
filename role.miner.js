module.exports = {

    /**
     * Drop miner. Creep only mines and drops the resources on the tile below.
     * @param {Creep} creep 
     */
    run: function(creep)
    {
        if (creep.pos.x != creep.memory.targetX || creep.pos.y != creep.memory.targetY) {
            creep.moveTo(creep.memory.targetX, creep.memory.targetY, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        else {
            const source = Game.getObjectById(creep.memory.targetID);
            creep.harvest(source);
        }
    }
}