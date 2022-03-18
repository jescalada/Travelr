var currentUser;

// TWO VALID CASES:
// LOGGED IN USER ACCESSING OWN PROFILE
// LOGGED IN USER ACCESSING OTHER PROFILE
// ELSE: RETURN TO LOGIN PAGE

function insertUserData() {

    firebase.auth().onAuthStateChanged(user => {
        let userId = getUserIdFromURL();
        console.log(userId);
        console.log(user.uid);

        // Check if user is signed in:
        if (user) {

            if (user.uid == userId) {
                // User is viewing own profile

                currentUser = db.collection("users").doc(user.uid);
                //get the document for current user.
                currentUser.get()
                    .then(userDoc => {
                        let userData = userDoc.data();
                        console.log(`User data: ${JSON.stringify(userData)}`);
 
                        // We insert the data into the front end using jQuery
                        $("#profile-full-name").text(userData.name);

                        $("#description").val(userData.description);
                        $("#email").val(userData.email);
                        $("#location").val(userData.location);

                        $("#status").text(userData.status);
                        $("#username").text("@" + userData.username);

                        $("#profile-pic").attr("src", userData.photo);

                        // Todo, append Edit functionality only if current user viewing own profile
                    })
            } else {
                // User is logged in, but viewing someone else's profile
                currentUser = db.collection("users").doc(userId);
                //get the document for current user.
                currentUser.get()
                    .then(userDoc => {
                        let userData = userDoc.data();
                        console.log(`User data: ${JSON.stringify(userData)}`);
 
                        // We insert the data into the front end using jQuery
                        $("#profile-full-name").text(userData.name);

                        $("#description").val(userData.description);
                        $("#email").val(userData.email);
                        $("#location").val(userData.location);

                        $("#status").text(userData.status);
                        $("#username").text("@" + userData.username);

                        $("#profile-pic").attr("src", userData.photo);

                        // Todo, append Edit functionality only if current user viewing own profile
                    })
            }

        } else {
            // No user is signed in.
            // todo Do Something if no user logged in (redirect to login page?)
        }
    });
}

function editUserInfo() {
    //Enable the form fields
    $("input").prop('disabled', false);
}

function saveUserInfo() {
    let aboutMe = $("#description").val(); //get the value of the field with id="description"
    let email = $("#email").val(); //get the value of the field with id="emial"
    let location = $("#location").val(); //get the value of the field with id="location"

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);

            currentUser.update({
                    description: aboutMe,
                    email: email,
                    location: location
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    $("input").prop('disabled', true);
                })
        }

    });
}

function getUserIdFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

insertUserData();