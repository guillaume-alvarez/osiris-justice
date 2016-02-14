/**
 * Contains the places known to the system.
 */
function DeadsStore () {
    Store.call(this);
    this._deads = {};
    this._nb = {};
    this._nb[HEAVEN] = 0;
    this._nb[HELL] = 0;
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
            DEADS_STORE._deads[dead.id] = dead;
            DEADS_STORE._nb[event.fate]++;
            break;
        default:
            return true;
    }
    DEADS_STORE.emitChange();
    return true;
};

var DEADS_STORE = new DeadsStore();
AppDispatcher.register(DEADS_STORE.handle);
