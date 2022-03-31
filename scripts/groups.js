function displayGroups() {
    // //let searchInput = $("#search-input").val();
    // let queryLocation = getQueryLocationFromURL();
    

    firebase.auth().onAuthStateChanged(user => {

        // Check if user is signed in:
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    let userData = userDoc.data();
                    let groupsArray = userData.groups;
                    let numberOfGroups = groupsArray.length;
                    let numberOfRows = Math.ceil(numberOfGroups / 3)

                    for (row = 0; row < numberOfRows; row++) {
                        for(index = row * 3; index < row * 3 + 3; index++) {
                            if (index >= numberOfGroups) break;
                            console.log("inside");
                            groupDocument = db.collection("groups").doc(groupsArray[index]);
                        //get the document for current group.
                        groupDocument.get()
                            .then(groupDoc => {
                                let groupData = groupDoc.data();
                                let groupListItem = `
                                
                                            <div class="card card-cover h-100 overflow-hidden text-white bg-dark shadow-lg m-2" style='background-image: url(${groupData.group_photo});
                                                        border-radius: 1em; background-size: 500px;'>
                                                <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                                    <h2 class="pt-5 mt-5 mb-4 display-6 lh-1">Stefan's awesome group</h2>
                                                    <ul class="d-flex list-unstyled mt-auto">
                                                        <li class="me-auto">
                                                            <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32"
                                                                class="rounded-circle border border-white">
                                                        </li>
                                                        <li class="d-flex align-items-center me-3">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="bi me-2" width="1em" height="1em"
                                                                fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                                                <path
                                                                    d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                                            </svg>
                                                            <small>Mars</small>
                                                        </li>
                                                        <li class="d-flex align-items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="bi me-2" width="1em" height="1em"
                                                                fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
                                                                <path
                                                                    d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                                                                <path
                                                                    d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                                            </svg>
                                                            <small>3d</small>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        `;
                                $("#results").append(groupListItem);
                            });
                        }
                    }

                });
            }
        });
}

function getQueryLocationFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('location');
}

function refreshQuery() {
    location.href = "../search.html?location=" + $("#search-input").val();
}

displayGroups();