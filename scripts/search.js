function createGroup() {
    let groupName = $("group-name").val();
    let location= $("location").val();
    let maxSize = $("max-size").val();
    let groupIntro = $("group-intro").val();
  
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
          var currentUser = db.collection("users").doc(user.uid);
          var userID = user.uid;
          //get the document for current user.
          currentUser.get()
              .then(userDoc => {
                                              // Start a new collection called groups and add all data in it.
                  db.collection("groups").add({
                      group_name: groupName,
                      location: location,
                      max_size: maxSize,
                      group_intro: groupIntro,
                      userID: {"user1": userID}
                  })                   
                  .then(function(){                                //new
                         window.location.href = "search.html";     //new
                  });                                               //new
              })
       
      } else {
          // No user is signed in.
          console.log("no user signed in");
      }
  });
  }