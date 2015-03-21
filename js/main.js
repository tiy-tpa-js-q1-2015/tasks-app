var ref, col, view;

function twitterLogin () {
  ref.authWithOAuthRedirect("twitter", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      // We'll never get here, as the page will redirect on success.
      console.log("Authenticated successfully with payload:", authData);
    }
  });
}

function createUser (user, pass) {
  ref.createUser({
    email    : user,
    password : pass
  }, function(error, userData) {
    if (error) {
      console.log("Error creating user:", error);
    } else {
      console.log("Successfully created user account with uid:", userData.uid);
    }
  });
}

function defaultLogin (user, pass) {
  ref.authWithPassword({
  email    : user,
  password : pass
  }, function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
    }
  });
}

function defaultLogin2 (data) {
  ref.authWithPassword(data, function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
    }
  });
}

function authDataCallback(authData) {
  if (authData) {
    window.tiy.currentUser = authData;
    view.setProps({collection: new tiy.models.UserTodoList});
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
  } else {
    view.setProps({collection: null});
    console.log("User is logged out");
  }
}

$(function(){
  view = React.render(
    React.createElement(tiy.views.Todos),
    $(".user-todos").get(0)
  );

  ref = new Firebase("https://tiy-intro.firebaseio.com");
  ref.onAuth(authDataCallback);
  $("button.twitter-login").click(twitterLogin);
  $(".logout").click(function(){
    ref.unauth();
  });

})
