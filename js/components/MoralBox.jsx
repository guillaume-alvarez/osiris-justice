/**
 * Displays the current moral, i.e. best and worst sentences.
 */
var MoralBox = React.createClass({
    createState: function() {
        return {
          worst: STORIES_STORE.getStories(3, function(a,b){return a - b}),
          best: STORIES_STORE.getStories(3, function(a,b){return b - a}),
        };
    },
    storiesChanged: function() {
        this.setState(this.createState());
    },

    getInitialState: function() {
        return this.createState();
    },
    componentDidMount: function() {
        STORIES_STORE.addListener(this.storiesChanged);
    },
    componentWillUnmount: function() {
        STORIES_STORE.removeListener(this.storiesChanged);
    },

    render: function() {
        return (
            <div className="moralBox">
                    <Stories stories={this.state.best} type={"panel-success"} title={"Good things"} />
                    <Stories stories={this.state.worst} type={"panel-danger"} title={"Bad things"} />
            </div>
        );
    }
});

var Stories = React.createClass({
    render: function() {
        var stories = this.props.stories.map(function(story){
          return (
            <li key={story} className="list-group-item">{story}</li>
          );
        });
        return (
          <div className={"stories panel " + this.props.type}>
              <div className="panel-heading">
                  <h2 className="panel-title">{this.props.title}</h2>
              </div>
              <ul className="list-group">
                {stories}
              </ul>
          </div>
        );
    }
});

ReactDOM.render(
  <MoralBox />,
  document.getElementById('moralBox')
);
