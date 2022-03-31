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
    