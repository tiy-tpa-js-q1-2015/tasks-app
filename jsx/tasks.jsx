(function(views){

  views.AddForm = React.createClass({
    onSubmit: function(e) {
      e.preventDefault();
      var form = this.getDOMNode();
      var data = $(form).serializeJSON();
      this.props.onAdd(data);
    },

    render: function() {
      var adding = this.props.adding;
      var placeholder = "Add a " + adding;
      return (
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="name"
            placeholder={placeholder}/>
        </form>
      );
    }
  });

  views.Milestone = React.createBackboneClass({
    toggleComplete: function() {
      this.props.model.toggleComplete();
    },

    render: function() {
      var d = this.props.model.toJSON();
      return (
        <div className="milestone item">
          <span>{d.name}</span>
          <views.Toggle
            on={!!d.completed_at}
            onToggle={this.toggleComplete}/>
        </div>
      );
    }
  });

  views.Milestones = React.createBackboneClass({
    getItem: function(model, index) {
      return <views.Milestone model={model} key={index}/>
    },
    add: function(data) {
      this.props.collection.add(data);
    },
    render: function() {
      return (
        <div className="milestones list">
          <div className="heading">
            <h2>{this.props.title}</h2>
          </div>
          <div className="items">
            { this.props.collection.map(this.getItem) }
          </div>
          <div className="add-item">
            <views.AddForm adding="Milestone" onAdd={this.add}/>
          </div>
        </div>
      );
    }
  });

  views.Task = React.createBackboneClass({
    destroy: function() {
      this.props.model.destroy();
    },

    render: function() {
      var d = this.props.model.toJSON()
      return (
        <div className="task item" {...this.props}>
          <span>{d.name}</span>
          <views.DeleteButton
            confirm="This will delete all milestones for this task."
            onDelete={this.destroy}/>
          <views.Progress percent={d.percent_complete}/>
        </div>
      );
    }
  });

  views.Tasks = React.createBackboneClass({
    selectTask: function(model) {
      this.props.onSelect(model);
    },

    getItem: function(model, index) {
      return (
        <views.Task
          model={model}
          key={index}
          onClick={this.selectTask.bind(this, model)}/>
      );
    },

    add: function(data) {
      this.props.collection.add(data);
    },

    render: function() {
      return (
        <div className="tasks list">
          <div className="heading">
            <h2>Tasks</h2>
          </div>
          <div className="items">
            { this.props.collection.map(this.getItem, this) }
          </div>
          <div className="add-item">
            <views.AddForm adding="Task" onAdd={this.add}/>
          </div>
        </div>
      );
    }
  });

  views.Main = React.createBackboneClass({

    render: function() {
      if (this.props.loading) {
        return (
          <div className="main-loading">
            <views.Icon fa="spinner" spin="true"/>
          </div>
        );
      }
      else if (this.props.collection && this.props.task) {
        var taskId = this.props.task;
        var c = this.props.collection;
        var t = c.get(taskId);
        return <views.Milestones
          collection={t.milestones}
          title={t.get("name")}/>;
      }
      else if (this.props.collection) {
        return <views.Tasks
          collection={this.props.collection}
          onSelect={this.props.onTaskSelect}/>;
      }
      else {
        return <div className="please-signin">Please log in to view tasks</div>
      }
    }

  });

})(tiy.views);
