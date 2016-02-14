/**
 * Displays the game over screen.
 */
var GameOver = React.createClass({
    createState: function() {
        return {
          text: DEADS_STORE.gameOver(),
        };
    },

    getInitialState: function() {
        return this.createState();
    },
    componentDidMount: function() {
        DEADS_STORE.addListener(this.deadsChanged);
    },
    componentWillUnmount: function() {
        DEADS_STORE.removeListener(this.deadsChanged);
    },

    deadsChanged: function() {
        this.setState(this.createState());
        if (this.state.text) {
          $('#gameOverModal').modal('show');
        }
    },

    onClickRestart: function() {
        $('#gameOverModal').on('hidden.bs.modal', function (e) {
          Actions.gameRestart();
        });
        $('#gameOverModal').modal('hide');
    },

    render: function() {
        return (
          <div className="gameOver" >
            <div className="modal fade" id="gameOverModal" tabIndex="-1" role="dialog" aria-labelledby="gameOverLabel">
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h2 className="modal-title" id="gameOverLabel">Game Over</h2>
                  </div>
                  <div className="modal-body">
                    <p className="lead"><strong>{this.state.text}</strong></p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Continue playing</button>
                    <button type="button" className="btn btn-primary" onClick={this.onClickRestart}>Start new game</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
});

ReactDOM.render(
  <GameOver />,
  document.getElementById('gameOver')
);
