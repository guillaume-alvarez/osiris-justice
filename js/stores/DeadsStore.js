/**
 * Contains the places known to the system.
 */
function DeadsStore () {
    Store.call(this);
    this._deads = {};
    this._nb = {};
    this._nb[HEAVEN] = 0;
    this._nb[HELL] = 0;
    this._nbAtheists = 0;
};
DeadsStore.prototype = Object.create(Store.prototype);
DeadsStore.prototype.constructor = DeadsStore;

DeadsStore.prototype.number = function (fate) {
    return this._nb[fate];
};
DeadsStore.prototype.gameOverProgress = function (fate) {
    switch(fate) {
      case ATHEISM:
        return this._nbAtheists - (this._nb[HEAVEN] + this._nb[HELL] + 10) / 2;
      case HELL:
        return this._nb[HELL] - (this._nb[HEAVEN] + 10);
      case HEAVEN:
        return this._nb[HEAVEN] - (this._nb[HELL] + 10);
    }
};
DeadsStore.prototype.isGameOver = function (fate) {
    return this.gameOverProgress(fate) > 0;
};
DeadsStore.prototype.gameOver = function () {
    if (this.isGameOver(ATHEISM)) {
      return "The livings no longer believe in Us!";
    } else if (this.isGameOver(HEAVEN)) {
      return "The livings no longer fear Us!"
    } else if (this.isGameOver(HELL)) {
      return "The deads are revolting against Us!"
    } else {
      return false;
    }
};

DeadsStore.prototype.handle = function (event) {
    switch(event.actionType) {
        case Actions.ACTION_SELECT_FATE:
            var dead = event.dead;
            dead.fate = event.fate;
            DEADS_STORE._deads[dead.id] = dead;
            DEADS_STORE._nb[event.fate]++;
            if (dead.expects != dead.fate) {
              DEADS_STORE._nbAtheists++;
            }
            break;
        case Actions.ACTION_GAME_RESTART:
            DEADS_STORE._deads = {};
            DEADS_STORE._nb[HEAVEN] = 0;
            DEADS_STORE._nb[HELL] = 0;
            DEADS_STORE._nbAtheists = 0;
            break;
        default:
            return true;
    }
    DEADS_STORE.emitChange();
    return true;
};

var DEADS_STORE = new DeadsStore();
AppDispatcher.register(DEADS_STORE.handle);
