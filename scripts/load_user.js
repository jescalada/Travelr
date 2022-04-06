// This file is used in every page, for loading user-related info onto the nav and footer, as well as making the current User's ID available globally 

var currentUserId;
var currentUserName;

// Loads the user info onto the nav and footer.
function loadUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in, then updates the DOM with their data:
        if (user) {                                             
            currentUserId = user.uid;
            // Go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid);
            // Get the document for current user.
            currentUser.get()
                  .then(userDoc => {
               var userName = userDoc.data().name;
               currentUserName = userName;
               // Insert various user parameters to DOM using jquery
               $("#navbarDropdownMenuLink").text(userName);
               $("#my-profile-link-navbar").attr("onclick", `location.href='../profile.html?id=${user.uid}';`);
               $("#footer-profile-icon").attr("onclick", `location.href='../profile.html?id=${user.uid}';`);
            })
        } else {
            // No user is signed in.
            window.location.href = "../index.html";
        }
    });
}

// Returns the current user's ID to be used in other pages
function getCurrentUserId() {
    return currentUserId;
}

// Returns the current user's Name to be used in other page (chat page only)
function getCurrentUserName() {
    return currentUserName;
}

// Logs out the current user
function logout() {
    console.log("logging out user");
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href = "index.html"; // Redirects to index.html
      }).catch((error) => {
        // An error happened.
      });
}

loadUserInfo();