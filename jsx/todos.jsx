(function(views){

  views.Todos = React.createBackboneClass({

    li: function (model) {
      return <li>{model.get("task")}</li>;
    },

    render: function() {
      if (this.props.collection) {
        return (
          <ul>
            {this.props.collection.map(this.li)}
          </ul>
        );
      } else {
        return <ul><li>Nothing to show here</li></ul>;
      }
    }

  });

})(tiy.views);
