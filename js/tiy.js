window.tiy = {

  // Namespace for views
  views: {},

  // Namespace for models
  models: {},

  // Raw auth data
  authData: null,

  // User Model
  currentUser: null,

  // Firebase *Base* URL
  firebaseURL: "https://tiy-intro.firebaseio.com/planner",

  // Firebase reference
  fireRef: null,

  // Initialize
  init: function() {
    _.extend(this, Backbone.Events);

    this.currentUser = new Backbone.Model();

    this.fireRef = new Firebase(this.firebaseURL);
    this.fireRef.onAuth(this.onAuthCallback);
  },

  // Login in with Twitter
  twitterLogin: function() {
    this.fireRef.authWithOAuthRedirect("twitter", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
  },

  // Log out
  logout: function() {
    this.fireRef.unauth();
  },

  // Called when a user logs in or out
  onAuthCallback: function(authData) {
    if (authData) {
      tiy.authData = authData;
      tiy.currentUser.set(authData.twitter.cachedUserProfile);
      console.log("A user is logged in:", authData.uid);
      tiy.trigger("sign:in");
    } else {
      tiy.authData = null;
      tiy.currentUser.clear();
      console.log("No one is logged in.");
      tiy.trigger("sign:out");
    }
    tiy.trigger("sign:in:out");
  }
}
