var currentGroup;

// Three valid cases when loading a group:
// A logged user accessing a group where he is a leader
// A logged user accessing a group where he is a member
// A logged user accessing a group where he is not a member
// If not logged in, redirect to login page
function loadGroup() {
    firebase.auth().onAuthStateChanged(user => {
        let groupId = getGroupIdFromURL();
        if (user) { // Check if user is signed in
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get() // Gets the document for current user.
                .then(userDoc => { // Asyncronous function that brings the userDoc from database
                    currentGroup = db.collection("groups").doc(groupId); // Gets the current group, given the groupId of the group
                    currentGroup.get()
                        .then((groupDocument) => {
                            let groupData = groupDocument.data();
                            loadGroupData(groupData);
                            checkIfMemberAndModifyDOM(groupData, user.uid);
                            groupData.users.forEach(userId => { // For each user in the list of users in the group
                                userDocument = db.collection("users").doc(userId);
                                userDocument.get() //get the document for current user.
                                    .then(userDoc => {
                                        let userData = userDoc.data();
                                        loadUserData(userId, userData);
                                    });
                            });
                        });
                });
        } else {
            window.location.href = "../login.html";
        };
    });
}

// loadUserData appends a new user to the group's user list, given a userId and a JSON containing userData
function loadUserData(userId, userData) {
    let userListItem = `
    <a href="profile.html?id=${userId}" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
    <img src="${userData.photo}" alt="twbs" width="64" height="64"
      class="rounded-circle flex-shrink-0">
    <div class="d-flex gap-2 w-100 pt-2 justify-content-between">
      <div>
        <h6 class="mb-0">${userData.name}</h6>
        <p class="mb-0 opacity-75">${userData.status}</p>
      </div>
      <small class="opacity-50 text-nowrap">Now</small>
    </div>
    </a>
    `;

    $("#member-list").append(userListItem);
}

// loadGroupData edits the info about a group in the DOM, given a JSON containing groupData
function loadGroupData(groupData) {
    $("#group-name").text(groupData.group_name);
    $("#group-intro").text(groupData.group_intro);
    $("#group-location").text(groupData.location);
    $("#group-photo").attr("src", groupData.group_photo);
    $("#edit-group-name").val(groupData.group_name);
    $("#edit-group-intro").val(groupData.group_intro);
    $("#edit-location").val(groupData.location);
    $("#group-image-url").val(groupData.group_photo);
}

// checks what type of member the user is, and modifies the DOM accordingly 
function checkIfMemberAndModifyDOM(groupData, userId) {
    if (groupData.users[0] == userId) { // If the logged in user is the leader of the current group
        $("#join").prop("disabled", true).text("Joined"); // Disable the join button
        $("#edit-info-modal-button").prop("hidden", false); // Hide the edit info button
    } else if (groupData.users.includes(userId, 1)) { // If the logged in user is a member of the current group
        $("#join").prop("disabled", true).text("Joined"); // Also disables the join button
    }
}

// A fucntion that gets triggered when a non-member clicks Join, joins the current group by updating the backend and then refreshes the page
function joinGroup() {
    let groupId = getGroupIdFromURL();
    let userId = getCurrentUserId();
    currentUser = db.collection("users").doc(userId);
    // We push the data corresponding to the new user and new group into both documents' arrays
    // Set the document for current user.
    currentUser.set({
            groups: firebase.firestore.FieldValue.arrayUnion(groupId)
        }, {
            merge: true
        })
        .then(function () {});
    // Set the document for the current group
    currentGroup.set({
            users: firebase.firestore.FieldValue.arrayUnion(userId)
        }, {
            merge: true
        })
        .then(function () {
            location.reload(); // Refresh the page to see changes when successful
        });
}

// Gets the group Id form the URL
function getGroupIdFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

// Updates the picture in the edit info modal dynamically when a new URL is inputted
function updateValue(e) {
    const input = $('#group-image-url');
    const img = $("#group-pic");
    img.attr("src", input.val());
}

// Saves the group info by reading the values in the modal's fields
function saveGroupInfo() {
    // Sets variables with the values of the fields
    let groupName = $("#edit-group-name").val();
    let groupIntro = $("#edit-group-intro").val();
    let location = $("#edit-location").val();
    let groupPictureURL = $("#group-image-url").val();
    let groupId = getGroupIdFromURL();
    firebase.auth().onAuthStateChanged(user => { // Get the current user (to prevent people from using the function if not logged in)
        if (user) {
            currentGroup = db.collection("groups").doc(groupId); // Get the current group document
            currentGroup.update({ // Updates the database using the variables defined before
                    group_name: groupName,
                    group_intro: groupIntro,
                    location: location,
                    group_photo: groupPictureURL
                })
                .then(() => {
                    window.location.href = `groupInfo.html?id=${groupId}` // after successfully editing refresh to show new data
                })
        } else {
            window.location.href = "../login.html"; // Redirect to login page if not logged in
        }
    });
}

loadGroup();


function logout() {
    console.log("logging out user");
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href = "index.html";
      }).catch((error) => {
        // An error happened.
      });
}