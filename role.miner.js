module.exports = {

    /**
     * Drop miner. Creep only mines and drops the resources on the tile below.
     */

    run: function(creep)
    {
        if (creep.pos.x != creep.memory.targetX || creep.pos.y != creep.memory.targetY) {
            creep.say(1)
            creep.moveTo(creep.memory.targetX, creep.memory.targetY, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        else {
            creep.say(2)
            const source = Game.getObjectById(creep.memory.targetID);
            creep.harvest(source);
        }
    }
}