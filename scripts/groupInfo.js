// THREE VALID CASES:
// LOGGED IN USER ACCESSING OWN GROUP AND LEADER
// LOGGED IN USER ACCESSING OWN GROUP AND MEMBER
// LOGGED IN USER ACCESSING OTHER GROUP
// ELSE: RETURN TO LOGIN PAGE

function loadGroup() {
    firebase.auth().onAuthStateChanged(user => {
        let groupId = getGroupIdFromURL();
        console.log("Group ID to query: " + groupId);

        // Check if user is signed in:
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    let userData = userDoc.data();
                    console.log(`User data: ${JSON.stringify(userData)}`);

                    var groupToQuery = db.collection("groups").doc(groupId);

                    groupToQuery.get()
                        .then((groupDocument) => {
                            let groupData = groupDocument.data();
                            console.log("printed group!");
                            console.log(JSON.stringify(groupData));

                            $("#group-name").text(groupData.group_name);
                            $("#group-intro").text(groupData.group_intro);
                            $("#group-location").text(groupData.location);
                            
                            // if user is leader of group
                            if (groupData.users[0] == user.uid) {
                                // Todo append leader functionality (edit details)
                                console.log("I'm the leader");
                            } 
                            // if user is member of group
                            else if (groupData.users.includes(user.uid, 1)) {
                                // Add see pictures functionality, group chat access, no Join button
                                console.log("I'm a member");
                            } 
                            // else, user is accessing other group
                            else {
                                // Add Join button, can't see group pictures
                                console.log("Not in this group");
                            }
                        });

                });
        } else {
            // No user is signed in.
            // todo Do Something if no user logged in (redirect to login page?)
        }
    });

}

function getGroupIdFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

loadGroup();