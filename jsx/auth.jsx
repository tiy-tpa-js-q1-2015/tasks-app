(function(views){

  var TextField = React.createClass({
    render: function() {
      var name = this.props.name;
      var htmlID = "react-textfield-" + name + "-" + Math.random();
      var label = this.props.label || name;
      var type = this.props.type || "text";
      return (
        <div className="textfield">
          <div>
            <label htmlFor={htmlID}>{label}</label>
          </div>
          <div>
            <input id={htmlID} type={type} name={name}/>
          </div>
        </div>
      );
    }
  });

  var Login = React.createClass({
    onSubmit: function(e) {
      e.preventDefault();
      data = $(e.target).serializeJSON();
      this.props.onSubmit(data);
    },

    render: function() {
      return (
        <form onSubmit={this.onSubmit}>
          <TextField name="email"/>
          <TextField name="password" type="password"/>
          <button>Sign In</button>
        </form>
      );
    }
  });

  var AuthBox = React.createClass({

    getInitialState: function() {
      return {
        view: "login"
      };
    },

    registerView: function() {
      return <Register/>;
    },

    loginView: function() {
      return <Login onSubmit={defaultLogin2}/>;
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
        <div>
          {this.getView()}
        </div>
      );
    }

  });

  $(function(){
    React.render(<AuthBox/>, $(".login").get(0));
  });

})(tiy.views);
