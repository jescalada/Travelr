document.getElementById("message-form").addEventListener("submit", sendMessage);

function sendMessage(e) {
    e.preventDefault();
  
    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
  
    // clear the input box
    messageInput.value = "";
  
    //auto scroll to bottom
    document
      .getElementById("messages")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  
    // create db collection and send in the data
    db.ref("messages/" + timestamp).set({
      username,
      message,
    });
  }

  // add recieving function
  document.getElementById("message-form").addEventListener("submit", sendMessage);

  const fetchChat = db.ref("messages/");

  fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
      username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
  });


















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

