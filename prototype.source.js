Object.defineProperty(Source.prototype, 'memory', {
    configurable: true,
    get: function() {
        if(_.isUndefined(Memory.mySourcesMemory)) {
            Memory.mySourcesMemory = {};
        }
        if(!_.isObject(Memory.mySourcesMemory)) {
            return undefined;
        }
        return Memory.mySourcesMemory[this.id] =
                Memory.mySourcesMemory[this.id] || {};
    },
    set: function(value) {
        if(_.isUndefined(Memory.mySourcesMemory)) {
            Memory.mySourcesMemory = {};
        }
        if(!_.isObject(Memory.mySourcesMemory)) {
            throw new Error('Could not set source memory');
        }
        Memory.mySourcesMemory[this.id] = value;
    }
});

Object.defineProperty(Source.prototype, 'containerPos', {

    get: function () {
        if (this._containerPos == undefined) {
            if (this.memory.containerPos == undefined) {
                let pos;
                const container = this.pos.findInRange(room.containers, 1)[0];
                if (container) pos = container.pos;
                else {
                    const construction = source.pos.findInRange(room.constructionSites, 1).filter(c => c.structureType === STRUCTURE_CONTAINER)[0];
                    if (construction) post = construction.pos;
                    else {
                        const path = room.findPath(room.controller.pos, source.pos, {
                            ignoreCreeps: true,
                            ignoreRoads: true,
                            ignoreDestructibleStructures: true
                        });
    
                        pos = path[path.length - 2];
                    }
                }
                this._containerPos = pos;
            }
        }

        return this._containerPos;
    },

    enumerable: false,
    configurable: true
});

Object.defineProperty(Source.prototype, 'spots', {
    get: function () {
        if (this._freeSpaceCount == undefined) {
            if (this.memory.freeSpaceCount == undefined) {
                const terrain = Game.map.getRoomTerrain(this.room.name);
                let freeSpaceCount = 0;
                [this.pos.x - 1, this.pos.x, this.pos.x + 1].forEach(x => {
                    [this.pos.y - 1, this.pos.y, this.pos.y + 1].forEach(y => {
                        if (terrain.get(x, y) != TERRAIN_MASK_WALL)
                                freeSpaceCount++;
                            }, this);
                    }, this);
                this.memory.freeSpaceCount = freeSpaceCount;
            }
            this._freeSpaceCount = this.memory.freeSpaceCount;
        }
        return this._freeSpaceCount;
    },
    enumerable: false,
    configurable: true
});