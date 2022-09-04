module.exports = {
    run: function(room, creeps) 
    {
        const harvesters = creeps.filter(c => c.memory.role == 'harvester');
        if (harvesters.length < 2) this.spawnHarvester(room);
    },

    spawnHarvester: function(room)
    {
        let bodyParts;

        if(room.energyAvailable <= 450) {
            bodyParts = [WORK,CARRY,MOVE,MOVE]; // 300
        }
        else if(room.energyAvailable <= 700 ){
            bodyParts = [WORK, WORK, WORK, CARRY, MOVE, MOVE]; // 550
        }
        else if(room.energyAvailable <= 800){
            bodyParts = [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY];
        }
        else {
          bodyParts = [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]; // 750
        }

        const spawn = room.spawns[0];
        if (spawn && bodyParts) {
            spawn.spawnCreep(bodyParts, `harvester_${Game.time}`, {
                memory: {
                    role: 'harvester',
                    room: room.name
                }
            });
        }
    }
}