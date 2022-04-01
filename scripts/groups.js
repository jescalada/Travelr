function displayGroups() {
  // //let searchInput = $("#search-input").val();
  // let queryLocation = getQueryLocationFromURL();

  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is signed in:
    if (user) {
      currentUser = db.collection("users").doc(user.uid);
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        let userData = userDoc.data();
        let groupsArray = userData.groups;
        let numberOfGroups = groupsArray.length;
        let numberOfRows = Math.ceil(numberOfGroups / 3);

        for (row = 0; row < numberOfRows; row++) {
          for (index = row * 3; index < row * 3 + 3; index++) {
            if (index >= numberOfGroups) break;
            groupDocument = db.collection("groups").doc(groupsArray[index]);
            console.log("Group array in index is = " + groupsArray[index])
            //get the document for current group.
            groupDocument.get().then((groupDoc) => {
              let groupData = groupDoc.data();
              let groupListItem = `       <div class="container">
                                            <div class="card card-cover h-100 overflow-hidden text-white bg-dark shadow-lg" style='background-image: url(${groupData.group_photo});
                                                        border-radius: 1em; background-size: 500px;' onclick="location.href='../groupInfo.html?id=${groupDoc.id}';">
                                                <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                                    <h3 class="pt-5 mt-5 mb-4 display-6 lh-2" style="color: white; text-shadow: 2px 2px 4px black, 0px 0px 20px black;">${groupData.group_name}</h3>
                                                    <ul class="d-flex list-unstyled mt-auto">
                                                        <li class="d-flex align-items-center me-3">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="bi me-2" width="1em" height="1em" style="color: white; text-shadow: 2px 2px 4px black, 0px 0px 20px black;"
                                                                fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                                                <path
                                                                    d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                                            </svg>
                                                            <small style="color: white; text-shadow: 2px 2px 4px black, 0px 0px 20px black;">${groupData.location}</small>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                          </div>`;
              $("#results").append(groupListItem);
            });
          }
        }
      });
    }
  });
}

displayGroups();
