(function(views){

  var TextField = React.createClass({displayName: "TextField",
    render: function() {
      var name = this.props.name;
      var htmlID = "react-textfield-" + name + "-" + Math.random();
      var label = this.props.label || name;
      var type = this.props.type || "text";
      return (
        React.createElement("div", {className: "textfield"}, 
          React.createElement("div", null, 
            React.createElement("label", {htmlFor: htmlID}, label)
          ), 
          React.createElement("div", null, 
            React.createElement("input", {id: htmlID, type: type, name: name})
          )
        )
      );
    }
  });

  var Login = React.createClass({displayName: "Login",
    onSubmit: function(e) {
      e.preventDefault();
      data = $(e.target).serializeJSON();
      this.props.onSubmit(data);
    },

    render: function() {
      return (
        React.createElement("form", {onSubmit: this.onSubmit}, 
          React.createElement(TextField, {name: "email"}), 
          React.createElement(TextField, {name: "password", type: "password"}), 
          React.createElement("button", null, "Sign In")
        )
      );
    }
  });

  var AuthBox = React.createClass({displayName: "AuthBox",

    getInitialState: function() {
      return {
        view: "login"
      };
    },

    registerView: function() {
      return React.createElement(Register, null);
    },

    loginView: function() {
      return React.createElement(Login, {onSubmit: defaultLogin2});
    },

    getView: function() {
      if (this.state.view === "register") {
        return this.registerView();
      } else {
        return this.loginView();
      }
    },

    render: function() {
      return (
        React.createElement("div", null, 
          this.getView()
        )
      );
    }

  });

  $(function(){
    React.render(React.createElement(AuthBox, null), $(".login").get(0));
  });

})(tiy.views);

(function(views){

  views.Todos = React.createBackboneClass({

    li: function (model) {
      return React.createElement("li", null, model.get("task"));
    },

    render: function() {
      if (this.props.collection) {
        return (
          React.createElement("ul", null, 
            this.props.collection.map(this.li)
          )
        );
      } else {
        return React.createElement("ul", null, React.createElement("li", null, "Nothing to show here"));
      }
    }

  });

})(tiy.views);
