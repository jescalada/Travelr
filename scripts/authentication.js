// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

// This variable is a default variable defined by Firebase
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      //------------------------------------------------------------------------------------------
      // The code below is modified from default snippet provided by the FB documentation.
      //
      // If the user is a "brand new" user, then create a new "user" in your own database.
      // Assign this user with the name and email provided.
      // Before this works, you must enable "Firestore" from the firebase console.
      // The Firestore rules must allow the user to write. 
      //------------------------------------------------------------------------------------------
      var user = authResult.user; // Get the user object from the Firebase authentication database
      if (authResult.additionalUserInfo.isNewUser) { // If new user
        let userName = generateUsername(user.displayName);  // The username is randomly generated (so it's unique)
        db.collection("users").doc(user.uid).set({ // Write a new user to database using default values which can then be cahnged
            name: user.displayName,
            email: user.email,
            username: userName,
            photo: "https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg", // Default picture is selected
            status: "I'm ready to Travel!",
            description: `Hi, I'm ${user.displayName}. Welcome to my profile!`,
            groups: [],
            location: "Nowhere"
          }).then(function () {
            console.log("New user added to firestore");
            window.location.assign("../html/main.html"); // Redirects to main.html after signup
          })
          .catch(function (error) {
            console.log("Error adding new user: " + error);
          });
      } else {
        return true;
      }
      return false;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '../html/main.html',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};


// Generates a username for the current user being created. Takes their full name and returns a string with their generated username.
function generateUsername(displayName) {
  let trailingNumber = Math.floor(Math.random() * 10000);
  displayName = displayName.replace(/\s/g, '').toLowerCase();
  return displayName + trailingNumber;
}

// Start the firebase UI container
ui.start('#firebaseui-auth-container', uiConfig);