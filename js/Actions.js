var Actions = {
    ACTION_DATA_LOADED: "ACTION_DATA_LOADED",
    ACTION_GAME_RESTART: "ACTION_GAME_RESTART",
    ACTION_SELECT_FATE: "ACTION_SELECT_FATE",
    ACTION_GENERATE_DEAD: "ACTION_GENERATE_DEAD",

  /**
   * @param  {object} data
   */
  dataLoaded: function(data) {
    AppDispatcher.dispatch({
        actionType: this.ACTION_DATA_LOADED,
        data: data,
    });
  },

  /**
   * @param  {string} dead
   * @param  {object} fate
   */
  selectFate: function(dead, fate) {
    AppDispatcher.dispatch({
        actionType: this.ACTION_SELECT_FATE,
        dead: dead,
        fate: fate,
    });
  },

  /**
   * No parameter, just generate a new dead guy.
   */
  generateDead: function() {
    AppDispatcher.dispatch({
        actionType: this.ACTION_GENERATE_DEAD,
    });
  },

  /**
   * Restart the game from raw data, discard player progress so far.
   */
  gameRestart: function() {
    AppDispatcher.dispatch({
        actionType: this.ACTION_GAME_RESTART,
    });
  },

};
