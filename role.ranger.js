module.exports = {

    /**
     * 
     * @param {Creep} creep 
     */
    run: function(creep)
    {
        const hostiles = creep.room.find(FIND_HOSTILES);
        if (hostiles.length)  {
            const target = creep.pos.findClosestByRange(hostiles);
            if (creep.rangedAttack(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};