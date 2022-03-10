function createGroup() {
    // let groupName = document.getElementById("group_name").value;
    // let location = document.getElementById("location").value;
    // let maxSize = document.getElementById("max_size").value;
    // let groupIntro = document.getElementById("group_intro").value;
    let groupName = $("#group_name").val();
    let location = $("#location").val();
    let maxSize = $("#max_size").val();
    let groupIntro = $("#group_intro").val();

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    // Start a new collection called groups and add all data in it.
                    db.collection("groups").add({
                            group_name: groupName,
                            location: location,
                            max_size: maxSize,
                            group_intro: groupIntro,
                            userID: {
                                "leader_id": userID
                            }
                        })
                        .then(function () { //new
                            window.location.href = "search.html"; //new
                        }); //new
                })

        } else {
            // No user is signed in.
            console.log("no user signed in");
        }
    });
}

function searchGroups() {
    let searchInput = $("#search-input").val();

    // Create a reference to the cities collection
    var groupsRef = db.collection("groups");

    // Create a query against the collection.
    var query = groupsRef.where("location", "==", searchInput);
    
    query.get()
    .then((querySnapshot) => {
        $("#results").empty();

        querySnapshot.forEach((doc, index) => {
            let group = doc.data();
            let html = `
            <div id="result-container" class="my-4 job-box d-md-flex align-items-center justify-content-between mb-30">
                <div class="job-left my-4 d-md-flex align-items-center flex-wrap">
                    <div id="group-img-${index}" class="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                    
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
                        <p id="group-members-0" style="display: inline; margin-right: 1rem;">1/${group.max_size}</p>
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

            // doc.data() is never undefined for query doc snapshots
            $("#results").append(html);
            
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}