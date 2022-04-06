// Creates a group and stores it into database.
function createGroup() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            currentUser.get() // gets the document for the current user
                .then(userDoc => { // Start a new collection called groups and add all data in it.
                    addGroupToDatabase(userID);
                })
        }
    });
}

// Adds a group to database, takes a userID which is the creator of the group
function addGroupToDatabase(userID) {
    // Obtains the values of these parameters from the DOM and sets them to variables
    let groupName = $("#group_name").val();
    let location = $("#location").val();
    let maxSize = $("#max_size").val();
    let groupIntro = $("#group_intro").val();
    let groupPhotoURL = $("#group-image-url").val();
    db.collection("groups").add({
            group_name: groupName,
            location: location,
            max_size: maxSize,
            group_intro: groupIntro,
            group_photo: groupPhotoURL,
            users: [
                userID, // First user represents the leader
            ]
        })
        .then(groupDoc => { // Using the document of the recently created group
            currentUser.set({ // Set this group into the groups list for the user creating this group
                    groups: firebase.firestore.FieldValue.arrayUnion(groupDoc.id)
                }, {
                    merge: true
                })
                .then(function () {
                    window.location.href = `search.html?location=${location}`; // Reload the page upon success
                });
        });
}

// Searches for groups given a city query
function searchGroups() {
    let queryLocation = getQueryLocationFromURL(); // Gets the queried location from the URL
    var groupsRef = db.collection("groups"); // Create a reference to the cities collection
    var query = groupsRef.where("location", "==", queryLocation); // Create a query against the collection.
    query.get() // Gets the results of the query
        .then((querySnapshot) => {
            $("#results").empty(); // Empties the result container in the DOM
            $("#amount-groups-found").text(querySnapshot.size); // Adds various values related to the query
            $("#location-queried").text(queryLocation);
            $("#search-input").val(queryLocation); // Refreshes the search box default value so it's easier to refresh
            querySnapshot.forEach((doc, index) => { // For each document in the query result
                let group = doc.data(); // Get that document's data
                let html = groupResultHTML(group, index, doc); // Get some html related to the group
                $("#results").append(html); // Append that html to the DOM
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error); // If query fails, logs an error to the console
        });
}

// Generates the HTML div to be appended to the DOM
function groupResultHTML(group, index, doc) {
    let html = `
            <div id="result-container" class="my-4 job-box d-md-flex align-items-center justify-content-between mb-30" onclick="location.href='../groupInfo.html?id=${doc.id}';" style="cursor: pointer;">
                <div class="job-left my-4 d-md-flex align-items-center flex-wrap">
                    <div id="group-img-${index}" class="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex"
                    style='background-image: url(${group.group_photo}); background-size: 64px 64px;'>
                    
                    </div>

                    <div class="job-content">
                    <h5 id="group-name-0" class="mx-5 text-md-left">${group.group_name}</h5>
                    <ul class="d-md-flex flex-wrap text-capitalize ff-open-sans">
                        <li class="mr-md-4">
                        <i class="zmdi zmdi-pin mr-2"></i>
                        <p id="group-location-0" style="display: inline; margin-right: 1rem;">${group.location}</p>
                        </li>
                        <li class="mr-md-4">
                        <i class="zmdi zmdi-account mr-2"></i>
                        <p id="group-members-0" style="display: inline; margin-right: 1rem;">${group.users.length}/${group.max_size}</p>
                        </li>
                        <li class="mr-md-4">
                        <i class="zmdi zmdi-time mr-2"></i>
                        <p id="group-created-0" style="display: inline; margin-right: 1rem;">Created 1d Ago</p>
                        </li>
                    </ul>
                    </div>
                </div>
                <div class="job-right my-4 flex-shrink-0">
                    <a href="#" class="btn d-block w-100 d-sm-inline-block btn-primary">Join</a>
                </div>
            </div>
            `;
    return html;
}

// Gets the query form the URL. Can be expanded to get any kind of query.
function getQueryLocationFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('location');
}

// Refreshes the page with whatever is written on the search box at the time
function refreshQuery() {
    location.href = "../search.html?location=" + $("#search-input").val();
}

// Refreshes the group picture when the input box is changed
function updateValue(e) {
    const input = $('#group-image-url');
    const img = $("#group-pic");
    img.attr("src", input.val());
}

// Refreshes the page on Enter
$(document).on('keypress', function (e) {
    if (e.which == 13) {
        refreshQuery();
    }
})

// Searching executes automatically upon accessing the search page
searchGroups();