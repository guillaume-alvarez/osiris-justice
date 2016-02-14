/**
 * Contains the places known to the system.
 */
function DeadsStore () {
    Store.call(this);
    this._deads = {};
    this._nb = {HELL: 0, HEAVEN: 0};
};
DeadsStore.prototype = Object.create(Store.prototype);
DeadsStore.prototype.constructor = DeadsStore;

DeadsStore.prototype.number = function (fate) {
    return this._nb[fate];
};

DeadsStore.prototype.handle = function (event) {
    switch(event.actionType) {
        case Actions.ACTION_SELECT_FATE:
            var dead = event.dead;
            dead.fate = event.fate;
            STORIES_STORE._deads[dead.id] = dead;
            STORIES_STORE._nb[event.fate]++;
            break;
        default:
            return true;
    }
    this.emitChange();
    return true;
};

var DEADS_STORE = new DeadsStore();
AppDispatcher.register(DEADS_STORE.handle);
