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

                        $("#edit-profile-name").val(userData.name);
                        $("#edit-profile-pic").val(userData.photo);
                        $("#edit-profile-status").val(userData.status);
            
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
                        console.log(`User data: ${JSON.stringify(userData)}`);

                        // We insert the data into the front end using jQuery
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

                        // Append Edit functionality only if current user viewing own profile
                        $("#change-info-buttons").prop('hidden', true);

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
    $("#email").prop('disabled', true);
    $("#edit-name-row").prop("hidden", false);
    $("#edit-profile-pic-row").prop("hidden", false);
    $("#edit-status-row").prop("hidden", false);
}

function saveUserInfo() {
    let aboutMe = $("#description").val(); //get the value of the field with id="description"
    let email = $("#email").val(); //get the value of the field with id="emial"
    let location = $("#location").val(); //get the value of the field with id="location"
    
    let name = $("#edit-profile-name").val();
    let photo = $("#edit-profile-pic").val();
    let status = $("#edit-profile-status").val();

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);

            currentUser.update({
                    description: aboutMe,
                    email: email,
                    location: location,
                    name: name,
                    photo: photo,
                    status: status
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    $("input").prop('disabled', true);
                })
        }

    });
    
    $("#edit-name-row").prop("hidden", true);
    $("#edit-profile-pic-row").prop("hidden", true);
    $("#edit-status-row").prop("hidden", true);

    $("#profile-pic").attr("src", photo);
    $("#profile-full-name").text(name);
    $("#status").text(status);


}

function getUserIdFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

insertUserData();


