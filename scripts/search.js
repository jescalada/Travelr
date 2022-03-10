function createGroup() {
    // let groupName = document.getElementById("group_name").value;
    // let location = document.getElementById("location").value;
    // let maxSize = document.getElementById("max_size").value;
    // let groupIntro = document.getElementById("group_intro").value;
    let groupName = $("#group_name").val();
    let location= $("#location").val();
    let maxSize = $("#max_size").val();
    let groupIntro = $("#group_intro").val();
  
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
                      userID: {"leader_id" : userID}
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