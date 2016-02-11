/**
 * Displays the selected place information.
 */
var DeadBox = React.createClass({
    getInitialState: function() {
        return {selected: DEADS_STORE.selected()};
    },
    componentDidMount: function() {
        DEADS_STORE.addListener(this.placeChanged);
    },
    componentWillUnmount: function() {
        DEADS_STORE.removeListener(this.placeChanged );
    },

    placeChanged: function() {
        this.setState({selected: DEADS_STORE.selected()});
    },

    render: function() {
        return (
            <div className="deadBox panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">A man is dead, you choose his fate!</h3>
                </div>
                <div className="panel-body">
                    <DeadDesc dead={this.state.dead} />
                </div>
            </div>
        );
    }
});

var DeadDesc = React.createClass({
    render: function() {
        var dead = this.props.dead;
        var subs = dead.stories.map(function(story){
          return (
            <li className="list-group-item">{story[0]}, {story[1]}, {story[2]}</li>
          );
        });
        return (
          <ul className="deadDesc list-group">
            {subs}
          </ul>
        );
    }
});

ReactDOM.render(
  <DeadBox />,
  document.getElementById('dead')
);
