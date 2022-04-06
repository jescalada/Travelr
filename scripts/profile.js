var currentUser;

// Loads a user's data into the DOM
// Two possible cases:
// Logged in user, accesses own profile
// Logged in user, accesses someone else's profile
// ELSE: Redirects to login (handled in load_user page)
function loadUserData() {
    firebase.auth().onAuthStateChanged(user => {
        let userId = getUserIdFromURL();
        // Check if user is signed in:
        if (user) {
            if (user.uid == userId) { // User is viewing own profile
                currentUser = db.collection("users").doc(user.uid); // Get the document for current user.
                currentUser.get()
                    .then(userDoc => {
                        let userData = userDoc.data();
                        console.log(`User data: ${JSON.stringify(userData)}`);
                        insertDataIntoDOM(userData);
                        // Append Edit functionality only if current user viewing own profile
                        $("#change-info-buttons").prop('hidden', false);
                    })
            } else {
                // User is logged in, but viewing someone else's profile
                currentUser = db.collection("users").doc(userId);
                //get the document for current user.
                currentUser.get()
                    .then(userDoc => {
                        let userData = userDoc.data();
                        // We insert the data into the front end using jQuery
                        insertDataIntoDOM(userData);
                        // Append Edit functionality only if current user viewing own profile
                        $("#change-info-buttons").prop('hidden', true);
                    })
            }
        }
    });
}

// Takes user data from JSON and appends it into the DOM
function insertDataIntoDOM(userData) {
    $("#profile-full-name").text(userData.name);
    $("#description").val(userData.description);
    $("#email").val(userData.email);
    $("#location").val(userData.location);
    $("#status").text(userData.status);
    $("#username").text("@" + userData.username);
    $("#profile-pic").attr("src", userData.photo);
    $("#edit-profile-name").val(userData.name);
    $("#edit-profile-pic").val(userData.photo);
    $("#edit-profile-status").val(userData.status);

}

// Enables form fields for editing profile
function editUserInfo() {
    //Enable the form fields
    $("input").prop('disabled', false);
    $("#email").prop('disabled', true);
    $("#edit-name-row").prop("hidden", false);
    $("#edit-profile-pic-row").prop("hidden", false);
    $("#edit-status-row").prop("hidden", false);
}

function saveUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            updateDatabase(user); // Updates the database only if there's a logged in user (prevents bugs)
        }
    });
}

// Updates the database given a user (from the auth, which has a uid)
function updateDatabase(user) {
    // Gets the values of form fields
    let aboutMe = $("#description").val();
    let email = $("#email").val();
    let location = $("#location").val();
    let name = $("#edit-profile-name").val();
    let photo = $("#edit-profile-pic").val();
    let status = $("#edit-profile-status").val();

    currentUser = db.collection("users").doc(user.uid); // Get the doc for the current user
            currentUser.update({ // Updates the info of the current user using the doc
                    description: aboutMe,
                    email: email,
                    location: location,
                    name: name,
                    photo: photo,
                    status: status
                })
                .then(() => {
                    window.location.href = `profile.html?id=${user.uid}` // Refreshes the page if successfully edited profile
                })
}

// Gets the user's ID from the URL
function getUserIdFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

// Automatically loads the user data
loadUserData();