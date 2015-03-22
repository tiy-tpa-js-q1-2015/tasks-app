(function(views){

  var TwitterLoggedIn = React.createClass({
    render: function() {
        return (
        <div className="logged-in" onClick={tiy.logout.bind(tiy)}>
          <img className="profile-image" src={this.props.img} alt=""/>
          {" "}
          <span>{this.props.name}</span>
          {" "}
          <views.Icon fa="sign-out"/>
        </div>
      );
    }
  })

  var TwitterNotLogged = React.createClass({
    render: function() {
        return (
        <div className="not-logged-in" onClick={tiy.twitterLogin.bind(tiy)}>
          <span>Sign In With</span>
          {" "}
          <views.Icon fa="twitter"/>
        </div>
      );
    }
  })

  var TwitterLogin = React.createBackboneClass({
    getChild: function() {
      if (this.props.model.id) {
        var name = this.props.model.get("name");
        var img = this.props.model.get("profile_image_url");
        return <TwitterLoggedIn name={name} img={img}/>
      }
      else {
        return <TwitterNotLogged/>
      }
    },

    render: function() {
      return (
        <div className="twitter-login">
          { this.getChild() }
        </div>
      );
    }

  });

  var Header = React.createBackboneClass({
    render: function() {
      return (
        <div>
          <div className="logo">Taskify</div>
          <TwitterLogin model={this.props.model}/>
        </div>
      );
    }
  });

  views.TwitterLogin = TwitterLogin;
  views.Header = Header;

})(tiy.views);
