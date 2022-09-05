const roles = {
    'harvester': require('role.harvester'),
    'builder': require('role.builder'),
    'miner': require('role.miner'),
    'hauler': require('role.hauler')
};

module.exports = {

    spawned: false,

    run: function(room, creeps) 
    {
        this.spawned = false;
        const builders = creeps.filter(c => c.memory.role == 'builder');
        const miners = creeps.filter(c => c.memory.role == 'miner');
        const haulers = creeps.filter(c => c.memory.role == 'hauler');
        const rangers = creeps.filter(c => c.memory.role == 'ranger');

        for (let source of room.sources) {
            const mnr = miners.filter(c => c.memory.targetID == source.id);
            if (!mnr.length) this.spawnMiner(room, source);
            const hlr = haulers.filter(c => c.memory.targetID == source.id);
            if (!this.spawned && !hlr.length) this.spawnHauler(room, source);
            // const hrv = harvesters.filter(c => c.memory.sourceID == source.id);
            // if (hrv.length < source.spots) this.spawnHarvester(room, source.id);
        }

        if (!this.spawned && /*room.constructionSites.length > 0 && */builders.length < 1) this.spawnBuilder(room);
        if (!this.spawned && room.hostiles.length && !rangers.length) this.spawnRanger(room);

        for (const creep of creeps) {
            if (roles[creep.memory.role]) roles[creep.memory.role].run(creep);
        }
    },

    spawnRanger(room) 
    {
        let bodyParts = [RANGED_ATTACK,MOVE];

        const spawn = room.spawns[0];

        if (spawn && bodyParts) {
            spawn.spawnCreep(bodyParts, `rngr_${Game.time}`, {
                memory: {
                    role: 'ranger',
                    room: room.name
                }
            });
            this.spawned = true;
        }
    },

    spawnMiner: function(room, source)
    {
        let bodyParts = [WORK,MOVE];

        const spawn = room.spawns[0];

        if (spawn && bodyParts) {
            spawn.spawnCreep(bodyParts, `mnr_${Game.time}`, {
                memory: {
                    role: 'miner',
                    room: room.name,
                    targetID: source.id,
                    targetX: source.containerPos.x,
                    targetY: source.containerPos.y
                }
            });
            this.spawned = true;
        }
    },

    spawnHauler: function(room, source)
    {
        let bodyParts = [CARRY,CARRY,MOVE,MOVE];

        const spawn = room.spawns[0];

        if (spawn && bodyParts) {
            spawn.spawnCreep(bodyParts, `hlr_${Game.time}`, {
                memory: {
                    role: 'hauler',
                    room: room.name,
                    targetID: source.id
                }
            });
            this.spawned = true;
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