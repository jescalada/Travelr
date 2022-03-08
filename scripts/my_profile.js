function insertUserData() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {                                                                 
            // Do something for the current logged-in user here: 
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid);
            //get the document for current user.
            currentUser.get()
                  .then(userDoc => {
                let userData = userDoc.data();
               console.log(`User data: ${JSON.stringify(userDoc.data())}`);

               //method #2:  insert using jquery
               $("#navbarDropdownMenuLink").text(userData.name);
               $("#description").text(userData.description);
               $("#email").text(userData.email);
               $("#location").text(userData.location);
               $("#status").text(userData.status);

               $("#profile-image").attr("src", userData.photo);

            })
        } else {
            // No user is signed in.
            // todo Do Something if no user logged in (redirect to login page?)
        }
    });
}
insertUserData();