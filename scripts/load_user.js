var currentUserId;

function loadUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {                                                                 
            // Do something for the current logged-in user here: 
            console.log(user.uid);
            currentUserId = user.uid;

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid);
            //get the document for current user.
            currentUser.get()
                  .then(userDoc => {
               var userName = userDoc.data().name;
               console.log(`User data: ${JSON.stringify(userDoc.data())}`);
               //method #2:  insert using jquery
               $("#navbarDropdownMenuLink").text(userName);                         //using jquery
               $("#footer-profile-icon").attr("onclick", `location.href='../profile.html?id=${user.uid}';`)
            })
        } else {
            // No user is signed in.
            window.location.href = "../login.html";
        }
    });
}
loadUserInfo();

function getCurrentUserId() {
    return currentUserId;
}