(function(models){

  models.UserTodoList = Backbone.Firebase.Collection.extend({

    url: function() {
      if(!tiy.currentUser.uid) {
        throw new Error("A user must be logged in.");
      }
      var uid = encodeURIComponent(tiy.currentUser.uid);
      return tiy.firebaseURL + "/todos/" + uid;
    }

  });

})(tiy.models);
