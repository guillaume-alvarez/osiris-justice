var Actions = {
    ACTION_SELECT_FATE: "ACTION_DATA_LOADED",
    ACTION_SELECT_FATE: "ACTION_SELECT_FATE",

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

};
