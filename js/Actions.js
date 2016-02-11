var Actions = {
    ACTION_SELECT_FATE: "ACTION_SELECT_FATE",

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
