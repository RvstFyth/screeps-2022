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

Object.defineProperty(Room.prototype, 'constructionSites', {
    get: function()
    {
      if(!this._constructionSites) {
        this._constructionSites = this.find(FIND_CONSTRUCTION_SITES);
      }
      return this._constructionSites;
    }
});

Object.defineProperty(Room.prototype, 'containers', {
    get: function() {
      if(!this._containers) {
        this._containers = this.find(FIND_STRUCTURES, {
          filter: s => s.structureType === STRUCTURE_CONTAINER
        })
      }

      return this._containers;
    }
});

Object.defineProperty(Room.prototype, 'walls', {
    get: function() {
      if(!this._walls) {
        this._walls = this.find(FIND_STRUCTURES, {
          filter: s => s.structureType === STRUCTURE_WALL
        })
      }

      return this._walls;
    }
});

Object.defineProperty(Room.prototype, 'roads', {
  get: function() {
    if(!this._roads) {
      this._roads = this.find(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_ROAD
      })
    }

    return this._roads;
  }
});

Object.defineProperty(Room.prototype, 'hostiles', {
  get: function()
  {
    if(!this._hostiles) {
      this._hostiles = this.find(FIND_HOSTILE_CREEPS, {
        filter: c => alliList.indexOf(c.owner.username) === -1
      });
    }

    return this._hostiles;
  }
});