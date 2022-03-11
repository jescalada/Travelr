var groupId = "EtTx7OiRZ8rACQD9NHgP";

function loadGroup() {
    var groupToQuery = db.collection("groups").doc(groupId);

    groupToQuery.get()
        .then((groupDocument) => {
            let groupData = groupDocument.data();
            console.log("printed group!");
            console.log(JSON.stringify(groupData));

            
            $("#group-name").text(groupData.group_name);
            $("#group-intro").text(groupData.group_intro);
            $("#group-location").text(groupData.location);
        });
        
}

loadGroup();