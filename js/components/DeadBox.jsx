/**
 * Displays the dead guys information.
 */
var DeadBox = React.createClass({
    createState: function() {
        return {
          dead: STORIES_STORE.dead(),
          nbHeaven: DEADS_STORE.number(HEAVEN),
          nbHell: DEADS_STORE.number(HELL),
        };
    },

    getInitialState: function() {
        return this.createState();
    },
    componentDidMount: function() {
        DEADS_STORE.addListener(this.deadsChanged);
        STORIES_STORE.addListener(this.deadsChanged);
    },
    componentWillUnmount: function() {
        DEADS_STORE.removeListener(this.deadsChanged);
        STORIES_STORE.removeListener(this.deadsChanged);
    },

    deadsChanged: function() {
        this.setState(this.createState());
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
                <div className="panel-footer">
                    <FateButton name={HEAVEN} nb={this.state.nbHeaven} />
                    <FateButton name={HELL} nb={this.state.nbHell} />
                </div>
            </div>
        );
    }
});

var DeadDesc = React.createClass({
    render: function() {
        var dead = this.props.dead;
        if (!dead) {
          return (
            <ul className="deadDesc list-group">
              <li key="NOT_LOADED">Searching for a dead soul...</li>
            </ul>
          );
        }

        var stories = dead.stories.map(function(story){
          return (
            <li key={story.reason+story.action+story.consequence} className="list-group-item">To {story.reason}, I {story.action} and {story.consequence}.</li>
          );
        });
        return (
          <ul className="deadDesc list-group">
            {stories}
          </ul>
        );
    }
});

var FateButton = React.createClass({
    render: function() {
        return (
          <button className="fateButton">
            {this.props.name} ({this.props.nb * 1} souls)
          </button>
        );
    }
});

ReactDOM.render(
  <DeadBox />,
  document.getElementById('dead')
);
