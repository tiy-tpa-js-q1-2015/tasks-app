(function(models){

  models.UserTodoList = Backbone.Firebase.Collection.extend({

    url: function() {
      if(!tiy.authData.uid) {
        throw new Error("A user must be logged in.");
      }
      var uid = encodeURIComponent(tiy.authData.uid);
      return tiy.firebaseURL + "/todos/" + uid;
    }

  });

  models.Task = Backbone.Model.extend({
    initialize: function() {
      this.milestones = new models.Milestones(null, {task: this});

      this.listenTo(this.milestones, "change:completed_at", function(){
        var percent = this.calcPercentComplete();
        this.set("percent_complete", percent);
      });
    },

    calcPercentComplete: function() {
      // Sum the completed milstones (1 for complete else 0)
      var sum = this.milestones.reduce(function(memo, mstone){
        return memo + Number(!!mstone.get("completed_at"));
      }, 0);

      return sum / this.milestones.length;
    }
  });

  models.Tasks = Backbone.Firebase.Collection.extend({

    model: models.Task,

    url: function() {
      if(!tiy.currentUser.id) {
        throw new Error("A user must be logged in.");
      }
      var uid = encodeURIComponent(tiy.authData.uid);
      return tiy.firebaseURL + "/" + uid + "/tasks";
    }

  });

  models.Milestone = Backbone.Model.extend({

    toggleComplete: function() {
      if(!!this.get("completed_at")) {
        this.set("completed_at", null);
      }
      else {
        this.set("completed_at", new Date().toString());
      }
    }

  });

  models.Milestones = Backbone.Firebase.Collection.extend({

    model: models.Milestone,

    url: function() {
      if(!tiy.authData.uid) {
        throw new Error("A user must be logged in.");
      }
      if(!this.task) {
        throw new Error("I need a task.");
      }
      var uid = encodeURIComponent(tiy.authData.uid);
      var tid = this.task.id;
      return tiy.firebaseURL + "/" + uid + "/milestones/" + tid;
    },

    initialize: function(data, options) {
      options || (options = {});
      this.task = options.task;
    }

  })

})(tiy.models);
