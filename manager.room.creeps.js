const roles = {
    'harvester': require('role.harvester'),
    'builder': require('role.builder')
};

module.exports = {

    spawned: false,

    run: function(room, creeps) 
    {
        const harvesters = creeps.filter(c => c.memory.role == 'harvester');
        const builders = creeps.filter(c => c.memory.role == 'builder');

        for (let source of room.sources) {
            const hrv = harvesters.filter(c => c.memory.sourceID == source.id);
            if (hrv.length < source.spots) this.spawnHarvester(room, source.id);
        }

        if (!this.spawned && /*room.constructionSites.length > 0 && */builders.length < 1) this.spawnBuilder(room);

        for (const creep of creeps) {
            if (roles[creep.memory.role]) roles[creep.memory.role].run(creep);
        }
    },

    spawnBuilder: function(room)
    {
        let bodyParts;

        if(room.energyAvailable <= 300) {
            bodyParts = [WORK, CARRY, MOVE, MOVE];
        }
    
        else if(room.energyAvailable <= 400) {
            bodyParts = [WORK, CARRY, MOVE, MOVE];
        }
        else if(room.energyAvailable <= 500) {
            bodyParts = [WORK,CARRY,CARRY,MOVE,MOVE,MOVE]; // 350
        }
        else if(room.energyAvailable < 1500) {
            bodyParts = [WORK,CARRY,CARRY,CARRY,CARRY, CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
        }
        else if(room.energyAvailable >= 1500) {
          bodyParts = [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY, CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
        }
        else {
            bodyParts = [WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
        }

        const spawn = room.spawns[0];

        if (spawn && bodyParts) {
            spawn.spawnCreep(bodyParts, `bld_${Game.time}`, {
                memory: {
                    role: 'builder',
                    room: room.name
                }
            });
            this.spawned = true;
        }
    },

    spawnHarvester: function(room, sourceID)
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
            spawn.spawnCreep(bodyParts, `hrv_${Game.time}`, {
                memory: {
                    role: 'harvester',
                    room: room.name,
                    sourceID: sourceID
                }
            });
            this.spawned = true;
        }
    }
}