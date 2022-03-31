function initChat() {
  //get the ID of who we are chatting with
  let params = new URL(window.location.href);
  let uid = params.searchParams.get("uid"); //parse "uid"
  let name = params.searchParams.get("name"); //parse "name"

  //set the title to show that person's name
  document.getElementById("friend").innerHTML = name;

  // generate a random 4 digit ID
  chatid = Math.random().toString().substring(2, 4);
  console.log(chatid);
  db.collection("chats").doc(chatid).set({
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(doc => {
      alert("Your Chat ID is " + chatid + ". Pass this to your friend.");
      postMessageListen(chatid);
      clearButtonListen(chatid);
      listenNewMessage(chatid);
  })  
}
initChat();


        //------------------------------------------------------
        // This function allows the Logged in user post a message. 
        // Will create a new doc with .add() to Firestore messsages
        // subcollection for this chat.
        //-------------------------------------------------------
        function postMessageListen(chatid) {
          var textInput = document.getElementById("text");
          var postButton = document.getElementById("post");
          postButton.addEventListener("click", function () {
              var msgText = textInput.value; //user provided message
              firebase.auth().onAuthStateChanged(function (user) {
                  db.collection('chats').doc(chatid).collection("messages")
                      .add({
                          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                          name: user.displayName,
                          text: msgText
                      })
                  textInput.value = "";
              })
          });
      }


        //-------------------------------------------------------------
        //This function clears the entire chat log.
        //gets the messsages collection, and deletes each doc one by one
        //in Firestore, and deletes the DOM of class name "msg" (see template)
        //-------------------------------------------------------------
        function clearButtonListen(chatid) {
          var clearButton = document.getElementById("clear");
          clearButton.addEventListener("click", function () {
              console.log("in clear function");
              db.collection('chats').doc(chatid).collection("messages")
                  .get()
                  .then(snap => {
                      snap.docs.forEach(doc => {
                          doc.ref.delete();
                      })
                      var msg = document.getElementsByClassName("item");
                      while (msg[0]) {
                          msg[0].remove();
                      }
                  })
          })
      }

          //--------------------------------------------------------------------
        // When a new message doc has been added, let's display it.
        // Use "onSnapshot()" to listen to changes.
        // https://firebase.google.com/docs/firestore/query-data/listen.html#view_changes_between_snapshots
        //--------------------------------------------------------------------
        function listenNewMessage(chatid) {
          db.collection("chats").doc(chatid).collection("messages")
              .onSnapshot(snap => {
                  snap.docChanges().forEach(change => {
                      if (change.type == "added") {
                          console.log("new message ", change.doc.data());
                          let msgCard = document.getElementById("card-template")
                              .content.cloneNode(true);
                          msgCard.querySelector('.card-body').innerHTML = change.doc.data().text;
                          msgCard.querySelector('.card-name').innerHTML = change.doc.data().name;
                          document.getElementById("results").appendChild(msgCard);
                      }
                  })
              })
      }






































// function sendMessage(e) {
// e.preventDefault();
  
//     // get values to be submitted
//     const timestamp = Date.now();
//     const messageInput = document.getElementById("message-input");
//     const message = messageInput.value;
  
//     // clear the input box
//     messageInput.value = "";
  
//     //auto scroll to bottom
//     document
//       .getElementById("messages")
//       .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  
//     // create db collection and send in the data
//     db.ref("messages/" + timestamp).set({
//       message,
//     });
//   }
  
// // add function call to the send button
// document.getElementById("message-form").addEventListener("submit", sendMessage);

// // receive message
// const fetchChat = db.ref("messages/");

// fetchChat.on("child_added", function (snapshot) {


//   const messages = snapshot.val();
//   const message = `<li><span>${messages.message}</li>`;
//   // class=${userName === messages.userName ? "sent" : "receive"}
  
//   // append the message on the page
//   document.getElementById("messages").innerHTML += message;
// });

