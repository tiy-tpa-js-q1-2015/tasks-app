(function(views){

  var TwitterLoggedIn = React.createClass({displayName: "TwitterLoggedIn",
    render: function() {
        return (
        React.createElement("div", {className: "logged-in", onClick: tiy.logout.bind(tiy)}, 
          React.createElement("img", {className: "profile-image", src: this.props.img, alt: ""}), 
          " ", 
          React.createElement("span", null, this.props.name), 
          " ", 
          React.createElement(views.Icon, {fa: "sign-out"})
        )
      );
    }
  })

  var TwitterNotLogged = React.createClass({displayName: "TwitterNotLogged",
    render: function() {
        return (
        React.createElement("div", {className: "not-logged-in", onClick: tiy.twitterLogin.bind(tiy)}, 
          React.createElement("span", null, "Sign In With"), 
          " ", 
          React.createElement(views.Icon, {fa: "twitter"})
        )
      );
    }
  })

  var TwitterLogin = React.createBackboneClass({
    getChild: function() {
      if (this.props.model.id) {
        var name = this.props.model.get("name");
        var img = this.props.model.get("profile_image_url");
        return React.createElement(TwitterLoggedIn, {name: name, img: img})
      }
      else {
        return React.createElement(TwitterNotLogged, null)
      }
    },

    render: function() {
      return (
        React.createElement("div", {className: "twitter-login"}, 
           this.getChild() 
        )
      );
    }

  });

  var Header = React.createBackboneClass({
    render: function() {
      return (
        React.createElement("div", null, 
          React.createElement("div", {className: "logo"}, "Taskify"), 
          React.createElement(TwitterLogin, {model: this.props.model})
        )
      );
    }
  });

  views.TwitterLogin = TwitterLogin;
  views.Header = Header;

})(tiy.views);

(function(views){

  var Icon = React.createClass({displayName: "Icon",
    render: function() {
      // Create the fa class
      var cssClass = "fa fa-" + this.props.fa;
      // Add spin effect
      if(this.props.spin) {
        cssClass += " fa-spin";
      }

      return React.createElement("i", {className: cssClass});
    }
  });

  var Toggle = React.createClass({displayName: "Toggle",

    render: function() {
      var icon = this.props.on ? "toggle-on" : "toggle-off"
      return (
        React.createElement("label", {className: "toggle", onClick: this.props.onToggle}, 
          React.createElement("span", null, this.props.name), 
          React.createElement(Icon, {fa: icon})
        )
      );
    }

  });

  var Progress = React.createClass({displayName: "Progress",
    render: function() {
      // Get percent or zero
      percent = this.props.percent || 0;
      // Normalize value
      var percent = Math.round(percent * 100);
      // Cap at 99
      var percent = _.min([percent, 99]);
      // No less than 10 either
      var percent = _.max([percent, 10]);
      // Make a string
      var percent = percent.toString() + "%";
      return (
        React.createElement("div", {className: "progress"}, 
          React.createElement("div", {className: "complete", style: {width: percent}})
        )
      );
    }
  });

  var BreadCrumbs = React.createBackboneClass({
    build: function() {
      return (this.props.data || []).map(function(crumb, index){
        return React.createElement("a", {href: "#", key: index, "data-route": crumb.route}, crumb.title)
      });
    },
    render: function() {
      if (!this.props.model.id) {
        return React.createElement("div", null);
      }
      return (
        React.createElement("div", {className: "breadcrumbs"}, 
          this.build()
        )
      );
    }
  });

  views.Icon = Icon;
  views.Toggle = Toggle;
  views.Progress = Progress;
  views.BreadCrumbs = BreadCrumbs;

})(tiy.views);

(function(views){

  views.Milestone = React.createBackboneClass({
    toggleComplete: function() {
      this.props.model.toggleComplete();
    },

    render: function() {
      var d = this.props.model.toJSON();
      return (
        React.createElement("div", {className: "milestone item"}, 
          React.createElement("span", null, d.name), 
          React.createElement(views.Toggle, {
            on: !!d.completed_at, 
            onToggle: this.toggleComplete})
        )
      );
    }
  });

  views.Milestones = React.createBackboneClass({
    getItem: function(model, index) {
      return React.createElement(views.Milestone, {model: model, key: index})
    },
    render: function() {
      return (
        React.createElement("div", {className: "milestones list"}, 
          React.createElement("div", {className: "heading"}, 
            React.createElement("h2", null, this.props.title)
          ), 
          React.createElement("div", {className: "items"}, 
             this.props.collection.map(this.getItem) 
          )
        )
      );
    }
  });

  views.Task = React.createBackboneClass({
    render: function() {
      var d = this.props.model.toJSON()
      return (
        React.createElement("div", React.__spread({className: "task item"},  this.props), 
          React.createElement("span", null, d.name), 
          React.createElement(views.Progress, {percent: d.percent_complete})
        )
      );
    }
  });

  views.Tasks = React.createBackboneClass({
    selectTask: function(model) {
      this.props.onSelect(model);
    },

    getItem: function(model, index) {
      return (
        React.createElement(views.Task, {
          model: model, 
          key: index, 
          onClick: this.selectTask.bind(this, model)})
      );
    },

    render: function() {
      return (
        React.createElement("div", {className: "tasks list"}, 
          React.createElement("div", {className: "heading"}, 
            React.createElement("h2", null, "Tasks")
          ), 
          React.createElement("div", {className: "items"}, 
             this.props.collection.map(this.getItem, this) 
          )
        )
      );
    }
  });

  views.Main = React.createBackboneClass({

    render: function() {
      if (this.props.loading) {
        return (
          React.createElement("div", {className: "main-loading"}, 
            React.createElement(views.Icon, {fa: "spinner", spin: "true"})
          )
        );
      }
      else if (this.props.collection && this.props.task) {
        var taskId = this.props.task;
        var c = this.props.collection;
        var t = c.get(taskId);
        return React.createElement(views.Milestones, {
          collection: t.milestones, 
          title: t.get("name")});
      }
      else if (this.props.collection) {
        return React.createElement(views.Tasks, {
          collection: this.props.collection, 
          onSelect: this.props.onTaskSelect});
      }
      else {
        return React.createElement("div", {className: "please-signin"}, "Please log in to view tasks")
      }
    }

  });

})(tiy.views);
