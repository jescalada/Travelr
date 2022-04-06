// Gets a reference to the messages collection in the realtime database
const fetchChat = realtimeDb.ref("messages/");

// Sends a message by adding the text to the realtime database
function sendMessage(e) {
  e.preventDefault();
  // get values to be submitted from the DOM
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;
  const senderName = getCurrentUserName(); // Current username of sender is obtained
  // clear the input box
  messageInput.value = "";
  //auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest"
    });
  // create db collection and send in the data
  realtimeDb.ref("messages/" + timestamp).set({
    message: message,
    sender: senderName,
    timestamp: timestamp
  });
}

// A listener function that constantly listens and appends messages on the page
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  // We generate a div that represents a styled message
  let message = `
  <div class="chat-message-left pb-4">
      <div class="text-muted small text-nowrap m-2">${formatTimestamp(messages.timestamp)}</div>
    
        <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
    		<div class="font-weight-bold mb-1">${messages.sender}</div>
			${messages.message}
		</div>
	</div>
  `;
  // append the message on the page
  $("#messages").append(message);
});

// Add chat to the chat box
function appendChat(e) {
  var id = e.target.id;
  var notEmpty = $(".usertext").val() != "",
    isEnterKeypress = e.type == "keypress" && e.keyCode == 13,
    isSendClick = e.type == "click" && id == "send";
  if (notEmpty && (isEnterKeypress || isSendClick)) {
    var txt = "<b>me:</b>" + $(".usertext").val();
    $("#chatlog").append($("<li>").html(txt));
    $(".usertext").val("");
  }
}

// Formats a timestamp into HH:MM:SS form
function formatTimestamp(timestamp) {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(timestamp);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();
  // Will display time in HH:MM:SS format
  return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}

// Adds listener to the chat box
$("#send").click(appendChat);

// add function call to the send button
document.getElementById("message-form").addEventListener("submit", sendMessage);