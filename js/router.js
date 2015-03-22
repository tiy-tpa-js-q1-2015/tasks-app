tiy.Router = Backbone.Router.extend({

  routes: {
    ""            : "showIndex",
    "tasks"       : "showTasks",
    "tasks/:task" : "showMilestones"
  },

  initialize: function() {

    this.header = React.render(
      React.createElement(
        tiy.views.Header,
        {model: tiy.currentUser}
      ),
      $("header").get(0)
    );

    this.nav = React.render(
      React.createElement(
        tiy.views.BreadCrumbs,
        {model: tiy.currentUser}
      ),
      $("nav").get(0)
    );

    this.tasks = tiy.currentUser.id ? new tiy.models.Tasks() : null;

    this.main = React.render(
      React.createElement(
        tiy.views.Main,
        {collection: this.tasks, onTaskSelect: this.onTaskSelect.bind(this)}
      ),
      $("main").get(0)
    );

    this.listenTo(tiy, "sign:out", function(){
      this.tasks = null;
      this.main.setProps({collection: this.tasks});
    });

    this.listenTo(tiy, "sign:in", function(){
      this.tasks = new tiy.models.Tasks();
      this.main.setProps({collection: this.tasks});
    });
  },


  onTaskSelect: function(task) {
    this.showMilestones(task.id);
    this.navigate("tasks/" + task.id);
  },

  showMilestones: function(task) {
    // Check for presence of task
    if(this.tasks.get(task)) {

      // We have the task.. good to go.
      this.main.setProps({task: task});

      // set breadcrumbs
      var taskName = this.tasks.get(task).get("name");
      this.nav.setProps({data: [
        {route: "tasks",        title: "Tasks"},
        {route: "tasks/"+task,  title: taskName}
      ]});

    } else {
      // Set to loading
      this.main.setProps({loading: true});

      // May just need to wait for data
      this.tasks.fetch({
        success: function(){

          if(this.tasks.get(task)) {

            // Now we have the task.. good to go.
            this.main.setProps({task: task, loading: false});

            // set breadcrumbs
            var taskName = this.tasks.get(task).get("name");
            this.nav.setProps({data: [
              {route: "tasks",        title: "Tasks"},
              {route: "tasks/"+task,  title: taskName}
            ]});

          } else {
            // no task
          }

        }.bind(this)
      });
    }
  },

  showTasks: function() {
    this.main.setProps({task: null});

    // set breadcrumbs
    this.nav.setProps({data: [
      {route: "tasks", title: "Tasks"}
    ]});
  },

  showIndex: function() {
    // redirect to tasks
    this.navigate("tasks", {trigger: true, replace: true});
  }

});
