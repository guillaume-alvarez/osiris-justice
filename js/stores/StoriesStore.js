/**
 * Contains the places known to the system.
 */
function StoriesStore () {
    Store.call(this);
    this._reasons = [];
    this._actions = [];
    this._consequences = [];
    this._dead = null;
};
StoriesStore.prototype = Object.create(Store.prototype);
StoriesStore.prototype.constructor = StoriesStore;

StoriesStore.prototype.dead = function () {
    return this._dead;
};

function rand(items) {
   return items[Math.floor(Math.random() * items.length)];
}
StoriesStore.prototype._generateNewDead = function () {
    var stories = [];
    for (i = Math.floor((Math.random() * 5) + 3); i > 0; i--) {
      stories.push({
        reason: rand(this._reasons),
        action: rand(this._actions),
        consequence: rand(this._consequences),
      });
    }
    return {
      name: "Some guy",
      stories: stories,
    };
};

StoriesStore.prototype.handle = function (event) {
    switch(event.actionType) {
        case Actions.ACTION_DATA_LOADED:
            var data = event.data;
            this._reasons = data["reasons"];
            this._actions = data["actions"];
            this._consequences = data["consequences"];
            this._dead = _generateNewDead();
            break;
        case Actions.ACTION_SELECT_FATE:
            this._dead = _generateNewDead();
            break;
        default:
            return true;
    }
    this.emitChange();
    return true;
};

var STORIES_STORE = new StoriesStore();
AppDispatcher.register(STORIES_STORE.handle);

$.getJSON('data/egypt_en.json', function (data) {
  Actions.dataLoaded(data);
});
