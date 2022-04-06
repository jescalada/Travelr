// When search button is pressed, redirects to search page with a location query from the DOM
function search() {
    let locationQuery = $("#location-box").val();
    location.href = "../search.html?location=" + locationQuery;
}

// Adds a listener that executes a search when Enter key is pressed
$(document).on('keypress',function(e) {
    if(e.which == 13) {
        search();
    }
})