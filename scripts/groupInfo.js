// THREE VALID CASES:
// LOGGED IN USER ACCESSING OWN GROUP AND LEADER
// LOGGED IN USER ACCESSING OWN GROUP AND MEMBER
// LOGGED IN USER ACCESSING OTHER GROUP
// ELSE: RETURN TO LOGIN PAGE

var currentGroup;

function loadGroup() {
    firebase.auth().onAuthStateChanged(user => {
        let groupId = getGroupIdFromURL();
        // Check if user is signed in:
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    let userData = userDoc.data();
                    currentGroup = db.collection("groups").doc(groupId);

                    currentGroup.get()
                        .then((groupDocument) => {
                            let groupData = groupDocument.data();

                            $("#group-name").text(groupData.group_name);
                            $("#group-intro").text(groupData.group_intro);
                            $("#group-location").text(groupData.location);
                            $("#group-photo").attr("src", groupData.group_photo);


                            $("#edit-group-name").val(groupData.group_name);
                            $("#edit-group-intro").val(groupData.group_intro);
                            $("#edit-location").val(groupData.location);
                            $("#group-image-url").val(groupData.group_photo);

                            // if user is leader of group
                            if (groupData.users[0] == user.uid) {
                                // Todo append leader functionality (edit details)
                                console.log("I'm the leader");
                                $("#join").prop("disabled", true).text("Joined");
                                $("#edit-info-modal-button").prop("hidden", false);
                            }
                            // if user is member of group
                            else if (groupData.users.includes(user.uid, 1)) {
                                // Add see pictures functionality, group chat access
                                console.log("I'm a member");

                                $("#join").prop("disabled", true).text("Joined");
                            }
                            // else, user is accessing other group
                            else {
                                console.log("Not in this group");
                            }

                            groupData.users.forEach(userId => {

                                userDocument = db.collection("users").doc(userId);
                                //get the document for current user.
                                userDocument.get()
                                    .then(userDoc => {
                                        let userData = userDoc.data();
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

                                    });

                            });

                        });


                });

        } else {

        };
    });

}

function joinGroup() {
    let groupId = getGroupIdFromURL();
    let userId = getCurrentUserId();

    currentUser = db.collection("users").doc(userId);
    //get the document for current user.
    currentUser.set({
            groups: firebase.firestore.FieldValue.arrayUnion(groupId)
        }, {
            merge: true
        })
        .then(function () {
            console.log("Group has been added for: " + currentUser);
        });

    currentGroup.set({
            users: firebase.firestore.FieldValue.arrayUnion(userId)
        }, {
            merge: true
        })
        .then(function () {
            console.log("User has been added for: " + currentGroup);
            location.reload();
        });
}

function getGroupIdFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

function updateValue(e) {
    const input = $('#group-image-url');
    const img = $("#group-pic");
    img.attr("src", input.val());
}

function saveGroupInfo() {
    let groupName = $("#edit-group-name").val();
    let groupIntro = $("#edit-group-intro").val();
    let location = $("#edit-location").val();
    let groupPictureURL = $("#group-image-url").val();

    let groupId = getGroupIdFromURL();

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentGroup = db.collection("groups").doc(groupId);

            currentGroup.update({
                    group_name: groupName,
                    group_intro: groupIntro,
                    location: location,
                    group_photo: groupPictureURL
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    // after successfully editing show success prompt and refresh
                    window.location.href = `groupInfo.html?id=${groupId}`
                })
        } else {
            // redirect or something
        }

    });

    $("#edit-name-row").prop("hidden", true);
    $("#edit-profile-pic-row").prop("hidden", true);
    $("#edit-status-row").prop("hidden", true);

    $("#profile-pic").attr("src", photo);
    $("#profile-full-name").text(name);
    $("#status").text(status);

}

loadGroup();