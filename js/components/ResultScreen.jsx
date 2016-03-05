/**
 * Displays the game over screen.
 */
var ResultScreen = React.createClass({
    createState: function() {
        return {
          dead: DEADS_STORE.lastDead(),
        };
    },

    getInitialState: function() {
        return this.createState();
    },
    componentDidMount: function() {
        DEADS_STORE.addListener(this.displayChoiceResult);
    },
    componentWillUnmount: function() {
        DEADS_STORE.removeListener(this.displayChoiceResult);
    },

    displayChoiceResult: function() {
        var state = this.createState();
        if (state.dead.fate) {
          this.setState(state);
          $('#resultScreenModal').one('hidden.bs.modal', function (e) {
            Actions.generateDead();
          });
          $('#resultScreenModal').modal('show');
        }
    },

    render: function() {
        var dead  = this.state.dead;
        var success = dead.fate == dead.expects;
        return (
          <div className="resultScreen" >
            <div className="modal fade" id="resultScreenModal" tabIndex="-1" role="dialog" aria-labelledby="resultScreenLabel">
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h2 className="modal-title" id="resultScreenLabel">{success ? "You chose wisely!" : "You chose poorly!"}</h2>
                  </div>
                  <div className="modal-body">
                    <p className="lead"><strong>This dead soul expected {dead.expects}: "{dead.says}"</strong></p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-dismiss="modal">Click anywhere to continue</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
});

ReactDOM.render(
  <ResultScreen />,
  document.getElementById('resultScreen')
);
