//----------------------------------------------
// Show is list of all users EXCEPT me (who is logged in)
//----------------------------------------------
function showAllUsers() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            myid = user.uid;
            db.collection("users").get()
                .then(snap => {
                    snap.forEach(doc => {
                        if (doc.id != myid) {
                            let newCard = document.getElementById("card-template")
                                .content.cloneNode(true);
                            newCard.querySelector('.card-name').innerHTML = doc.data().name;
                            newCard.querySelector('.card-href').href = "chat.html?uid=" +
                                doc.id + "&name=" + doc.data().name;  //pass name and id
                            document.getElementById("friends-go-here").appendChild(newCard);
                        }
                    })
                })

        } else {
            // No user is signed in.
            console.log("no user signed in");
        }
    })
}
showAllUsers();

function logout() {
    console.log("logging out user");
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href = "index.html";
      }).catch((error) => {
        // An error happened.
      });
}