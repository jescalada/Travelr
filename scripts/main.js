function search() {
    let locationQuery = $("#location-box").val();
    location.href = "../search.html?location=" + locationQuery;
}

$(document).on('keypress',function(e) {
    if(e.which == 13) {
        search();
    }
})