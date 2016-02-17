/**
 * Contains the places known to the system.
 */
function StoriesStore () {
    Store.call(this);
    this._reasons = {};
    this._actions = {};
    this._consequences = {};
    this._wishes = {};
    this._boss = {};
    this._dead = null;
};
StoriesStore.prototype = Object.create(Store.prototype);
StoriesStore.prototype.constructor = StoriesStore;

StoriesStore.prototype.dead = function () {
    return this._dead;
};
StoriesStore.prototype.bossName = function () {
    return this._boss.name;
};
StoriesStore.prototype.bossSays = function () {
    return this._boss.says;
};

function rand_item(array) { return array[Math.floor(Math.random() * array.length)]; }
StoriesStore.prototype._generateNewDead = function () {
    var stories = [];
    var used = [];
    var karma = 0;
    function rand_karma(obj) {
      var items = Object.getOwnPropertyNames(obj);
      var item = rand_item(items);
      for (it=0; it<3 && $.inArray(item, used); it++)
        item = rand_item(items);
      used.push(item);
      karma += obj[item];
      return item;
    }
    for (i = 0; i < 2; i++) {
      stories.push({
        reason: rand_karma(this._reasons),
        action: rand_karma(this._actions),
        consequence: rand_karma(this._consequences),
      });
    }
    var fate = karma >= 0 ? HEAVEN : HELL;
    return {
      name: "Some guy",
      stories: stories,
      expects: fate,
      says: rand_item(this._wishes[fate]),
    };
};
StoriesStore.prototype._updateStories = function (stories, karma) {
  var store = this;
  stories.forEach(function(story){
    store._reasons[story.reason] += karma;
    store._actions[story.action] += karma;
    store._consequences[story.consequence] += karma;
  });
};
StoriesStore.prototype._updateBoss = function (expected, fate) {
  var boss = this._boss;
  boss.tutorialIndex++;
  var i = boss.tutorialIndex;
  if (i < boss.tutorial.length) {
    boss.says = boss.tutorial[i];
  } else if (expected == fate) {
    boss.says = rand_item(boss.follows);
  } else {
    boss.says = rand_item(boss.contradicts);
  }
};

StoriesStore.prototype.handle = function (event) {
    switch(event.actionType) {
        case Actions.ACTION_DATA_LOADED:
            var data = event.data;
            function toObject (obj, array) {
              array.forEach(function(p) { obj[p] = 0; });
            }
            toObject(STORIES_STORE._reasons, data["reasons"]);
            toObject(STORIES_STORE._actions, data["actions"]);
            toObject(STORIES_STORE._consequences, data["consequences"]);
            STORIES_STORE._wishes = data["wishes"];
            STORIES_STORE._boss = data["boss"];
            STORIES_STORE._boss.tutorialIndex = 0;
            STORIES_STORE._boss.says = STORIES_STORE._boss.tutorial[0];
            STORIES_STORE._dead = STORIES_STORE._generateNewDead();
            break;
        case Actions.ACTION_SELECT_FATE:
            STORIES_STORE._updateBoss(event.dead.expects, event.fate);
            STORIES_STORE._updateStories(event.dead.stories, event.fate == HELL ? -1 : 1);
            STORIES_STORE._dead = STORIES_STORE._generateNewDead();
            break;
        case Actions.ACTION_GAME_RESTART:
            function reset(propositions) {
              Object.getOwnPropertyNames(propositions).forEach(function(str) {
                propositions[str] = 0;
              });
            }
            reset(STORIES_STORE._reasons);
            reset(STORIES_STORE._actions);
            reset(STORIES_STORE._consequences);
            STORIES_STORE._boss.tutorialIndex = 0;
            STORIES_STORE._boss.says = STORIES_STORE._boss.tutorial[0];
            STORIES_STORE._dead = STORIES_STORE._generateNewDead();
            break;
        default:
            return true;
    }
    STORIES_STORE.emitChange();
    return true;
};

var STORIES_STORE = new StoriesStore();
AppDispatcher.register(STORIES_STORE.handle);

$.getJSON('data/egypt_en.json', function (data) {
  Actions.dataLoaded(data);
});
