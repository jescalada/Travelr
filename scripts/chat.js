function sendMessage(e) {
    e.preventDefault();
      
        // get values to be submitted
        const timestamp = Date.now();
        const messageInput = document.getElementById("message-input");
        const message = messageInput.value;
        const senderName = getCurrentUserName();
      
        // clear the input box
        messageInput.value = "";
      
        //auto scroll to bottom
        document
          .getElementById("messages")
          .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
      
        // create db collection and send in the data
        realtimeDb.ref("messages/" + timestamp).set({
          message: message,
          sender: senderName
        });
      }
      
    // add function call to the send button
    document.getElementById("message-form").addEventListener("submit", sendMessage);
    
    // receive message
    const fetchChat = realtimeDb.ref("messages/");
    
    fetchChat.on("child_added", function (snapshot) {
    
    
      const messages = snapshot.val();
      const message = `
        <li>
            <div>${messages.sender} says: </div>
            <p><span>${messages.message}</span></p>
        </li>`;
      // class=${userName === messages.userName ? "sent" : "receive"}
      
      // append the message on the page
      $("#messages").append(message);
    });
    


    // <!--added chat in box>
function appendChat(e) {
  var id = e.target.id;
  var notEmpty = $(".usertext").val() != "",
      isEnterKeypress = e.type == "keypress" && e.keyCode == 13,
      isSendClick = e.type == "click" && id == "send";

  if( notEmpty && (isEnterKeypress || isSendClick) ) {
    var txt = "<b>me:</b>"+$(".usertext").val();
    $("#chatlog").append($("<li>").html(txt));
    $(".usertext").val("");
  }
}

$("#send").click(appendChat);
$(".chav_box_in").keypress(appendChat);


function logout() {
  console.log("logging out user");
  firebase.auth().signOut().then(() => {
      // Sign-out successful.
      window.location.href = "index.html";
    }).catch((error) => {
      // An error happened.
    });
}