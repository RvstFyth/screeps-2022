Object.defineProperty(Room.prototype, 'sources', {
    get: function()
    {
      if(!this._sources) {
        if(!this.memory.sourceIDs) {
          this.memory.sourceIDs = this.find(FIND_SOURCES).map(s => s.id);
        }
        this._sources = this.memory.sourceIDs.map(id => Game.getObjectById(id))
      }
      return this._sources;
    }
});

Object.defineProperty(Room.prototype, 'mineral', {
    get: function()
    {
      if(!this._mineral) {
        this._mineral = this.find(FIND_MINERALS)[0];
      }
      return this._mineral;
    }
});

Object.defineProperty(Room.prototype, 'spawns', {
    get: function()
    {
      if(!this._spawns) {
        this._spawns = this.find(FIND_STRUCTURES, {
          filter: s => s.structureType === STRUCTURE_SPAWN
        });
      }
      return this._spawns;
    }
});