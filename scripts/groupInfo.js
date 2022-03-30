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

                                // if user is leader of group
                                if (groupData.users[0] == user.uid) {
                                    // Todo append leader functionality (edit details)
                                    console.log("I'm the leader");
                                    $("#join").prop("disabled", true).text("Joined");
                                }
                                // if user is member of group
                                else if (groupData.users.includes(user.uid, 1)) {
                                    // Add see pictures functionality, group chat access, no Join button
                                    console.log("I'm a member");

                                    $("#join").prop("disabled", true).text("Joined");
                                }
                                // else, user is accessing other group
                                else {
                                    // Add Join button, can only see public group pictures
                                    console.log("Not in this group");
                                }

                                groupData.users.forEach(userId => {

                                    userDocument = db.collection("users").doc(userId);
                                    //get the document for current user.
                                    userDocument.get()
                                        .then(userDoc => {
                                            let userData = userDoc.data();
                                            let userListItem = `
                                            <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
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

loadGroup();