/**
 * Displays the dead guys information.
 */
var DeadBox = React.createClass({
    createState: function() {
        return {
          dead: STORIES_STORE.dead(),
          nbHeaven: DEADS_STORE.number(HEAVEN),
          nbHell: DEADS_STORE.number(HELL),
          boss: {
            name: STORIES_STORE.bossName(),
            says: STORIES_STORE.bossSays(),
          },
        };
    },
    deadsChanged: function() {
        this.setState(this.createState());
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

    render: function() {
        return (
            <div className="deadBox panel panel-default">
                <div className="panel-heading">
                    <h2 className="panel-title">A man is dead, you choose his fate!</h2>
                </div>
                <div className="panel-body">
                    <Boss boss={this.state.boss} />
                    <DeadDesc dead={this.state.dead} />
                </div>
                <div className="panel-footer">
                  <div className="btn-group" role="group">
                    <FateButton fate={HEAVEN} nb={this.state.nbHeaven} dead={this.state.dead} />
                    <FateButton fate={HELL} nb={this.state.nbHell} dead={this.state.dead} />
                  </div>
                </div>
            </div>
        );
    }
});

var Boss = React.createClass({
    render: function() {
        var boss = this.props.boss;
        var classname = boss.says.danger ? "boss bg-danger" : "boss"
        return (
          <h4 className={classname}><i>{boss.name}</i>: {boss.says.text}</h4>
        );
    }
});

var DeadDesc = React.createClass({
    render: function() {
        var dead = this.props.dead;
        if (!dead) {
          return (
            <p className="deadDesc">Searching for a dead soul...</p>
          );
        }
        var className = dead.expects == HELL ? "bg-danger" : " bg-success";
        return (
          <div className="deadDesc">
            <DeadStories dead={dead} />
            <p className={className}>This dead soul expects to go to {dead.expects}: "{dead.says}"</p>
          </div>
        );
    }
});

var DeadStories = React.createClass({
    render: function() {
        var stories = this.props.dead.stories.map(function(story){
          return (
            <li key={story.reason+story.action+story.consequence} className="list-group-item">To {story.reason}, I {story.action} and {story.consequence}.</li>
          );
        });
        return (
          <ul className="deadStories list-group">
            {stories}
          </ul>
        );
    }
});

var FateButton = React.createClass({
    handleClick: function(event) {
      Actions.selectFate(this.props.dead, this.props.fate);
    },
    render: function() {
        var className = "fateButton btn btn-lg " + (this.props.fate == HELL ? "btn-danger" : " btn-success");
        return (
          <button type="button" className={className} onClick={this.handleClick}>
            {this.props.fate} ({this.props.nb * 1} souls)
          </button>
        );
    }
});

ReactDOM.render(
  <DeadBox />,
  document.getElementById('dead')
);
