function search() {
    let locationQuery = $("#location-box").val();
    location.href = "../search.html?location=" + locationQuery;
}

$(document).on('keypress',function(e) {
    if(e.which == 13) {
        search();
    }
})

function logout() {
    console.log("logging out user");
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href = "index.html";
      }).catch((error) => {
        // An error happened.
      });
}